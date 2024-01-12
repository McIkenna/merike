const Order = require('../models/order');
const Product = require('../models/product');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// Create a new order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    try{
        const { 
            orderItem,
            shippingInfo,
            itemPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
            paymentInfo
        } = req.body;
    
        const order = await Order.create({
            orderItem,
            shippingInfo,
            itemPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
            paymentInfo,
            paidAt: Date.now(),
            user: req.user._id
        })
    
        res.status(200).json({
            success: true,
            order
        })
    }catch(err){
        return next(new ErrorHandler(err.message , 400))
    }
})

exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'firstName lastName email')
    if(!order){
        return next(new ErrorHandler('No Order found with this ID', 404))
    }
    res.status(200).json({
        success: true,
        order
    })
})

exports.myOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({user: req.user.id})
    if(!orders){
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
    if(!orders){
        return next(new ErrorHandler('No Order found', 404))
    }
    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})

exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
    try{
    const order = await Order.findById(req.params.id)
    if(order.orderStatus === 'Delivered'){
        return next(new ErrorHandler('You have already delivered this order', 400))
    }
    order.orderItem.forEach(async item => {
        await updateStock(item.product, item.quantity)
    })
    order.orderStatus = req.body.status,
    order.deliveredAt = Date.now();

    await order.save()
    res.status(200).json({
        success: true,
        order
    })
}catch(err){
    return next(new ErrorHandler(err.message, 404))
}
})

async function updateStock(id, quantity){
    const product = await Product.findById(id);
    product.stock = product.stock - quantity;
    await product.save({ validateBeforeSave: false})
}

exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    try{
        const order = await Order.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success: true,
            message: `order deleted successfully`,
            order
        })
    }catch(err){
        return next(new ErrorHandler('order does not exist', 404))
    }
    
})