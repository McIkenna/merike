const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ApiFeatures = require('../utils/ApiFeatures');
const dotenv = require('dotenv');
dotenv.config({ path: 'backend/config/config.env' });
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_KEY)



exports.stripeCheckout = catchAsyncErrors(async (req, res, next) => {
    try {
        const line_items = req.body.cartItems.map((item) => {
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name,
                        images: [item.image],
                        description: item.name,
                        metadata: {
                            id: item.productId,
                        }
                    },
                    unit_amount: item.price * 100
                },
                quantity: item.quantity
            }

        })

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
                        minimum: {
                            unit: 'business_day',
                            value: 5,
                        },
                        maximum: {
                            unit: 'business_day',
                            value: 7,
                        },
                    },
                },
            },
            {
                shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {
                        amount: 20,
                        currency: 'usd',
                    },
                    display_name: 'Standard shipping',
                    delivery_estimate: {
                        minimum: {
                            unit: 'business_day',
                            value: 3,
                        },
                        maximum: {
                            unit: 'business_day',
                            value: 5,
                        },
                    },
                },
            },
        ];

        // const taxRates =await stripe.taxRates.create({
        //         display_name: 'Sales Tax',
        //         inclusive: false,
        //         percentage: 6.25,
        //         country: 'US',
        //         state: 'IL',
        //         jurisdiction: 'US - IL',
        //         description: 'IL Sales Tax',
        // });

        const session = await stripe.checkout.sessions.create({
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
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/checkout-success`,
            cancel_url: `${process.env.CLIENT_URL}/cart`,
            tax_id_collection: {
                enabled: true,
            },
            // tax_rates: [taxRates.id],
        });
        // res.status(201).json({ 
        //     success: true, 
        // });
        // res.redirect(303, session.url);
        res.send({ url: session.url })
    } catch (err) {
        console.log('err', err)
        // const message = Object.values(err.errors).map(value => value);
        // return next(new ErrorHandler(message , 400))
    }

});