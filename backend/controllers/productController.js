const Product = require('../models/product');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
    try{
        const product = await Product.create(req.body);
        res.status(201).json({ 
            success: true, 
            product 
        });
    }catch (err) {
        const message = Object.values(err.errors).map(value => value);
        return next(new ErrorHandler(message , 400))
    }
   
});

exports.getProducts = async (req, res, next) => {
    const products = await Product.find();
    res.status(200).json({
        success: true,
        count: products.length,
        products

    })
}

exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
    try{
        const product = await Product.findById(req.params.id);
        if (product) {
            res.status(200).json({
                success: true,
                product
            })
        } else {
            return next(new ErrorHandler('Product not found', 404))
        }
    }catch(err){
        const message = `Resource not found. id: ${req.params.id}`
        return next(new ErrorHandler(message , 400))
    }
    
})

exports.getSingleProductByName = catchAsyncErrors(async (req, res, next) => {
    try{
        const product = await Product.findOne({name: req.params.name});
        if (product) {
            res.status(200).json({
                success: true,
                product
            })
        } else {
            return next(new ErrorHandler('Product not found', 404))
        }
    }catch(err){
        const message = `Resource not found. name: ${req.params.name}`;
        return next(new ErrorHandler(message , 400))
    }
   
})
exports.getProductsByCategory = catchAsyncErrors(async (req, res, next) => {
    try{
    const product = await Product.find({category: req.params.category});
    console.log('product', product);
    if (product) {
        res.status(200).json({
            success: true,
            product
        })
    } else {
        return next(new ErrorHandler('Products not found', 404))
    }
}catch(err){
    const message = `Resource not found. name: ${req.params.name}`
    return next(new ErrorHandler(message , 400))
}
})

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    try{
        let product = await Product.findById(req.params.id);
        if (product) {
            product = await Product.findByIdAndUpdate(req.params.id, req.body,{
                new: true,
                runValidators: true,
                
            })
            res.status(200).json({
                success: true,
                product
            })
        } else {
            return next(new ErrorHandler('Product does not exist', 404))
        }
    }catch (err) {
        return next(new ErrorHandler(err.message , 400))
    }
})

exports.deleteProduct = async(req, res) => {
    try{
        const product = await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: `${product.name} deleted successfully`
        })
    }catch(err){
        return next(new ErrorHandler('Product does not exist', 404))
    }
}