const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ApiFeatures = require('../utils/ApiFeatures');
const dotenv = require('dotenv');
dotenv.config({ path: 'backend/config/config.env' });
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_KEY)
const { newOrder } = require('./orderController');



exports.stripeCheckout = catchAsyncErrors(async (req, res, next) => {
    try {
        // console.log('req.body.userId', req.body)
        const customer = await stripe.customers.create({
            metadata: {
                userId: req.body.userId._id,
                cartItems: JSON.stringify(req.body.cartItems.map(item => ({
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    total: item.total,
                    product: item.productId
                })))
            }

        })
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
                        amount: 9.5*100,
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
            customer: customer.id,
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/checkout-success`,
            cancel_url: `${process.env.CLIENT_URL}/cart`,
            tax_id_collection: {
                enabled: true,
            },
            customer_update: {
                shipping: 'auto',
                name: 'auto'
            }

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

exports.stripeWebhook = catchAsyncErrors(async (request, response) => {
    let event;
    const endpointSecret = 'whsec_eee877ca51b26a330c9c64ec77805a2c16da11e2fef236a92ea1463e99848da1';
  
    if (endpointSecret) {
      const signature = request.headers['stripe-signature'];
      try {
        event = stripe.webhooks.constructEvent(
          request.rawBody,
          signature,
          endpointSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return response.sendStatus(400);
      }
    } else {
      event = request.body;
    }
  
    const data = event.data.object;
    const eventType = event.type;
  
    switch (eventType) {
      case 'checkout.session.completed':
        stripe.customers.retrieve(data.customer).then(customer => {
            // console.log('customer -->', customer)
            const reqParam = {customer, data}
            newOrder(reqParam).then(res=>{
                console.log('order saved successfully ')
            })
        }).catch(err => {
            console.log('error', err.message)
        })
        break;
    //   case 'payment_intent.succeeded':
    //     const paymentIntent = data;
    //     console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
    //     break;
    //   case 'payment_method.attached':
    //     const paymentMethod = data;
    //     break;
      default:
        console.log(`Unhandled event type ${eventType}.`);
    }
  
    response.send().end();
  });