const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ApiFeatures = require('../utils/ApiFeatures');
const dotenv = require('dotenv');
dotenv.config({ path: 'backend/config/config.env' });
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_KEY)
const Order = require('../models/order');
const PromoCode = require('../models/promoCode');


const getOrCreateStripeCoupon = async (promoCode) => {
    try {
        // Check if Stripe coupon already exists
        if (promoCode.stripeCouponId) {
            try {
                const existingCoupon = await stripe.coupons.retrieve(promoCode.stripeCouponId);
                if (existingCoupon && existingCoupon.valid) {
                    return existingCoupon;
                }
            } catch (error) {
                console.log('Existing coupon not found, creating new one');
            }
        }

        // Create new Stripe coupon
        let couponData = {
            name: promoCode.code,
            metadata: {
                promoCodeId: promoCode._id.toString(),
                description: promoCode.description || ''
            }
        };

        if (promoCode.discountType === 'percentage') {
            couponData.percent_off = promoCode.discountValue;
            couponData.duration = 'once';
            
            // Add max redemptions if usage limit exists
            if (promoCode.usageLimit) {
                couponData.max_redemptions = promoCode.usageLimit - promoCode.usedCount;
            }
        } else if (promoCode.discountType === 'fixed') {
            couponData.amount_off = Math.round(promoCode.discountValue * 100); // Convert to cents
            couponData.currency = 'usd';
            couponData.duration = 'once';
            
            if (promoCode.usageLimit) {
                couponData.max_redemptions = promoCode.usageLimit - promoCode.usedCount;
            }
        }

        const stripeCoupon = await stripe.coupons.create(couponData);

        // Save Stripe coupon ID to database
        promoCode.stripeCouponId = stripeCoupon.id;
        await promoCode.save();

        return stripeCoupon;
    } catch (error) {
        console.error('Error creating Stripe coupon:', error);
        throw error;
    }
};

// ============================================================================
// UTILITY: VALIDATE PROMO CODE
// ============================================================================
const validatePromoCode = async (promoCodeString, cartTotal) => {
    if (!promoCodeString) {
        return { valid: false, message: 'No promo code provided' };
    }

    // Find promo code in database
    const promoCode = await PromoCode.findOne({
        code: promoCodeString.toUpperCase(),
        isActive: true
    });

    if (!promoCode) {
        return { valid: false, message: 'Invalid promo code' };
    }

    // Check date validity
    const now = new Date();
    if (now < promoCode.validFrom) {
        return { valid: false, message: 'This promo code is not yet active' };
    }

    if (now > promoCode.validUntil) {
        return { valid: false, message: 'This promo code has expired' };
    }

    // Check usage limit
    if (promoCode.usageLimit && promoCode.usedCount >= promoCode.usageLimit) {
        return { valid: false, message: 'This promo code has reached its usage limit' };
    }

    // Check minimum purchase amount
    if (cartTotal < promoCode.minPurchaseAmount) {
        return {
            valid: false,
            message: `Minimum purchase amount of $${promoCode.minPurchaseAmount} required`
        };
    }

    return { valid: true, promoCode };
};

const calculateDiscount = (promoCode, subtotal) => {
    let discount = 0;

    if (promoCode.discountType === 'percentage') {
        discount = (subtotal * promoCode.discountValue) / 100;
        
        if (promoCode.maxDiscountAmount && discount > promoCode.maxDiscountAmount) {
            discount = promoCode.maxDiscountAmount;
        }
    } else if (promoCode.discountType === 'fixed') {
        discount = Math.min(promoCode.discountValue, subtotal);
    }

    return discount;
};

exports.createPendingOrder = catchAsyncErrors(async (req, res, next) => {
    const { cartItems, promoCode, userId } = req.body;

    if (!cartItems || cartItems.length === 0) {
        return next(new ErrorHandler('Cart is empty', 400));
    }

    // Calculate prices
    const itemPrice = cartItems.reduce((sum, item) => {
        return sum + (Number(item.price) * Number(item.quantity));
    }, 0);

    // Validate and calculate discount
    let validatedPromoCode = null;
    let discount = 0;

    if (promoCode) {
        const validation = await validatePromoCode(promoCode, itemPrice);
        
        if (!validation.valid) {
            return next(new ErrorHandler(validation.message, 400));
        }

        validatedPromoCode = validation.promoCode;
        discount = calculateDiscount(validatedPromoCode, itemPrice);
    }

    // Prepare order items
    const orderItems = cartItems.map(item => ({
        name: item.name,
        quantity: Number(item.quantity),
        image: item.image,
        price: Number(item.price),
        product: item.productId
    }));

    // Create pending order
    const order = await Order.create({
        user: userId._id,
        orderItem: orderItems,
        itemPrice: itemPrice.toFixed(2),
        taxPrice: 0, // Will be calculated by Stripe
        shippingPrice: 0, // Will be selected in Stripe checkout
        totalPrice: (itemPrice - discount).toFixed(2),
        promoCode: promoCode || null,
        discount: discount.toFixed(2),
        orderStatus: 'Pending', // Important: Pending status
        paymentInfo: {
            status: 'Pending'
        },
        shippingInfo: {
            // Will be filled after Stripe checkout
            address1: 'Pending',
            city: 'Pending',
            state: 'Pending',
            postalCode: 'Pending',
            country: 'Pending'
        }
    });

    res.status(201).json({
        success: true,
        orderId: order._id.toString(),
        message: 'Pending order created',
        discount: discount
    });
});

exports.stripeCheckout = catchAsyncErrors(async (req, res, next) => {
    try {
        const { orderId, successUrl, cancelUrl, userId } = req.body;

        if (!orderId) {
            return next(new ErrorHandler('Order ID is required', 400));
        }

        // Retrieve the pending order
        const order = await Order.findById(orderId).populate('orderItem.product');

        if (!order) {
            return next(new ErrorHandler('Order not found', 404));
        }

        if (order.orderStatus !== 'Pending') {
            return next(new ErrorHandler('Order has already been processed', 400));
        }

        // Create Stripe customer with MINIMAL metadata
        const customer = await stripe.customers.create({
            email: userId.email,
            metadata: {
                userId: userId._id.toString(),
                orderId: orderId, // Just the order ID - that's it!
            }
        });

        // Prepare line items
        const line_items = order.orderItem.map((item) => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                    images: [item.image],
                    description: item.name,
                    metadata: {
                        productId: item.product._id.toString(),
                    }
                },
                unit_amount: Math.round(Number(item.price) * 100)
            },
            quantity: Number(item.quantity)
        }));

        // Shipping options
        const shippingOptions = [
            {
                shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {
                        amount: 0,
                        currency: 'usd',
                    },
                    display_name: 'Free shipping',
                    delivery_estimate: {
                        minimum: { unit: 'business_day', value: 5 },
                        maximum: { unit: 'business_day', value: 7 },
                    },
                },
            },
            {
                shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {
                        amount: 950, // $9.50
                        currency: 'usd',
                    },
                    display_name: 'Standard shipping',
                    delivery_estimate: {
                        minimum: { unit: 'business_day', value: 3 },
                        maximum: { unit: 'business_day', value: 5 },
                    },
                },
            },
        ];

        // Session configuration
        const sessionConfig = {
            billing_address_collection: 'required',
            shipping_address_collection: {
                allowed_countries: ['US', 'CA'],
            },
            shipping_options: shippingOptions,
            automatic_tax: {
                enabled: true,
            },
            phone_number_collection: {
                enabled: true
            },
            line_items,
            customer: customer.id,
            mode: 'payment',
            success_url: successUrl || `${process.env.CLIENT_URL}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: cancelUrl || `${process.env.CLIENT_URL}/cart`,
            tax_id_collection: {
                enabled: true,
            },
            customer_update: {
                shipping: 'auto',
                name: 'auto'
            },
            metadata: {
                orderId: orderId, // ONLY the order ID - stays under 500 chars!
                userId: userId._id.toString()
            }
        };

        // Apply promo code discount if exists
        if (order.promoCode) {
            const promoCodeDoc = await PromoCode.findOne({ 
                code: order.promoCode.toUpperCase() 
            });

            if (promoCodeDoc) {
                const stripeCoupon = await getOrCreateStripeCoupon(promoCodeDoc);
                sessionConfig.discounts = [{ coupon: stripeCoupon.id }];
            }
        }

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create(sessionConfig);

        // Update order with Stripe session ID
        order.paymentInfo.id = session.id;
        order.customerId = customer.id;
        await order.save();

        res.status(200).json({
            success: true,
            url: session.url,
            sessionId: session.id
        });

    } catch (err) {
        console.error('Stripe Checkout Error:', err);
        return next(new ErrorHandler(err.message || 'Error creating checkout session', 500));
    }
});

exports.stripeWebhook = catchAsyncErrors(async (request, response) => {
    let event;
    const endpointSecret = process.env.STRIPE_WEBHOOK_ENDPOINT;

    if (endpointSecret) {
        const signature = request.headers['stripe-signature'];
        try {
            event = stripe.webhooks.constructEvent(
                request.rawBody,
                signature,
                endpointSecret
            );
        } catch (err) {
            console.log(`⚠️  Webhook signature verification failed:`, err.message);
            return response.sendStatus(400);
        }
    } else {
        event = request.body;
    }

    const data = event.data.object;
    const eventType = event.type;

    switch (eventType) {
        case 'checkout.session.completed':
            try {
                const orderId = data.metadata.orderId;

                if (!orderId) {
                    console.error('No orderId in metadata');
                    return response.status(400).send('No orderId in metadata');
                }

                // Find the pending order
                const order = await Order.findById(orderId);

                if (!order) {
                    console.error(`Order ${orderId} not found`);
                    return response.status(404).send('Order not found');
                }

                console.log('order Info --->', order)

                // Retrieve full session details including shipping
                const session = await stripe.checkout.sessions.retrieve(data.id, {
                    expand: ['line_items', 'customer', 'payment_intent']
                });

                console.log('session Info --->', session)

                // Update shipping information
                if (session.shipping_details) {
                    order.shippingInfo = {
                        address1: session.shipping_details.address.line1 || '',
                        address2: session.shipping_details.address.line2 || '',
                        city: session.shipping_details.address.city || '',
                        state: session.shipping_details.address.state || '',
                        postalCode: session.shipping_details.address.postal_code || '',
                        country: session.shipping_details.address.country || '',
                        phoneNo: session.customer_details?.phone || ''
                    };
                }

                // Update payment information
                order.paymentInfo = {
                    id: session.payment_intent?.id || session.id,
                    status: 'Paid'
                };

                // Update prices (including tax and shipping from Stripe)
                order.taxPrice = (session.total_details?.amount_tax || 0) / 100;
                order.shippingPrice = (session.total_details?.amount_shipping || 0) / 100;
                order.totalPrice = (session.amount_total || 0) / 100;

                // Update order status
                order.orderStatus = 'Processing'; // Change from Pending to Processing
                order.paidAt = new Date();

                await order.save();

                // Update promo code usage if applicable
                if (order.promoCode) {
                    try {
                        const promoCode = await PromoCode.findOne({ 
                            code: order.promoCode.toUpperCase() 
                        });
                        
                        if (promoCode) {
                            promoCode.usedCount += 1;
                            promoCode.usedBy.push({
                                user: order.user,
                                usedAt: new Date(),
                                orderAmount: order.totalPrice,
                                sessionId: session.id
                            });
                            await promoCode.save();
                        }
                    } catch (promoError) {
                        console.error('Error updating promo code:', promoError);
                    }
                }

                console.log(`✅ Order ${orderId} successfully updated`);
                
            } catch (err) {
                console.error('Error processing checkout.session.completed:', err);
                return response.status(500).send('Webhook processing error');
            }
            break;

        case 'checkout.session.expired':
            try {
                const orderId = data.metadata.orderId;
                
                if (orderId) {
                    // Mark order as cancelled/expired
                    await Order.findByIdAndUpdate(orderId, {
                        orderStatus: 'Cancelled',
                        paymentInfo: {
                            status: 'Expired'
                        }
                    });
                    console.log(`Order ${orderId} marked as cancelled (session expired)`);
                }
            } catch (err) {
                console.error('Error handling session expiration:', err);
            }
            break;

        default:
            console.log(`Unhandled event type: ${eventType}`);
    }

    response.send().end();
});