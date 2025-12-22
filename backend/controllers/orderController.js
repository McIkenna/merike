const Order = require('../models/order');
const Product = require('../models/product');

const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// Create a new order
exports.newOrder = catchAsyncErrors(async (req) => {
    try {
        // console.log('req -->', req);
        const customerInfo = req.customer;
        const shippingInfo = {
            address1: customerInfo.shipping.address.line1,
            address2: customerInfo.shipping.address.line2,
            city: customerInfo.shipping.address.city,
            state: customerInfo.shipping.address.state,
            phoneNo: customerInfo.phone,
            postalCode: customerInfo.shipping.address.postal_code,
            country: customerInfo.shipping.address.country
        };
        const reqData = req.data;
        const orderItem = JSON.parse(customerInfo.metadata.cartItems);
        const totalPrice = reqData.amount_subtotal / 100;
        const customerId = reqData.customer
        const paymentInfo = {
            id: reqData.payment_intent,
            status: reqData.payment_status
        };
        const shippingPrice = reqData.total_details.amount_shipping / 100;
        const taxPrice = reqData.total_details.amount_tax / 100;


        const paymentDetails = {
            orderItem,
            shippingInfo,
            shippingPrice,
            taxPrice,
            totalPrice,
            paymentInfo,
            paidAt: Date.now(),
            customerId,
            user: customerInfo.metadata.userId
        };
        const order = await Order.create(paymentDetails)
        return order
        
    } catch (err) {
        return  new ErrorHandler(err.message, 400);
    }
});

exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).select('orderStatus paymentInfo totalPrice');
    if (!order) {
        return next(new ErrorHandler('No Order found with this ID', 404))
    }
    res.status(200).json({
        success: true,
        orderStatus: order.orderStatus,
        paymentStatus: order.paymentInfo.status,
        totalPrice: order.totalPrice
    });
})

exports.myOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.params.id })
    if (!orders) {
        return next(new ErrorHandler('No Order found', 404))
    }
    res.status(200).json({
        success: true,
        orders
    })
})

exports.allOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find()
    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.totalPrice
    })
    if (!orders) {
        return next(new ErrorHandler('No Order found', 404))
    }
    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})

exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id)
        if (order.orderStatus.toLowerCase() === 'delivered') {
            
            return next(new ErrorHandler('You have already delivered this order', 400))
        }
        if(req.body.orderStatus.toLowerCase() === 'delivered'){
            order.deliveredAt = req.body.deliveredAt ?  req.body.deliveredAt : Date.now();
        }
        order.orderItem.forEach(async item => {
            await updateStock(item.product, item.quantity)
        })
        order.orderStatus = req.body.orderStatus;
        

        await order.save()
        res.status(200).json({
            success: true,
            order
        })
    } catch (err) {
        return next(new ErrorHandler(err.message, 404))
    }
})

async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    product.stock = product.stock - quantity;
    await product.save({ validateBeforeSave: false })
}

exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success: true,
            message: `order deleted successfully`,
            order
        })
    } catch (err) {
        return next(new ErrorHandler('order does not exist', 404))
    }

})

exports.cancelPendingOrder = catchAsyncErrors(async (req, res, next) => {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);

    if (!order) {
        return next(new ErrorHandler('Order not found', 404));
    }

    if (order.orderStatus !== 'Pending') {
        return next(new ErrorHandler('Only pending orders can be cancelled', 400));
    }

    order.orderStatus = 'Cancelled';
    order.paymentInfo.status = 'Cancelled';
    await order.save();

    res.status(200).json({
        success: true,
        message: 'Order cancelled successfully'
    });
});