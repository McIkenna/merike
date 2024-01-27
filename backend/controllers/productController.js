const Product = require('../models/product');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ApiFeatures = require('../utils/ApiFeatures');

exports.newProduct = catchAsyncErrors(async (req, res, next) => {
    try{
        req.body.user = req.user.id;
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

exports.getProducts = catchAsyncErrors(async (req, res, next) => {
    try{
        const resPerPage = 4;
        const productCount = await Product.countDocuments();
        const apiFeatures = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resPerPage)
        const products = await apiFeatures.query;
        res.status(200).json({
            success: true,
            count: products.length,
            productCount,
            resPerPage,
            products
        })
    }catch(err){
        return next(new ErrorHandler(err.message , 400))
    }
    
})

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

//New review
exports.createProductReview = catchAsyncErrors(async(req, res, next) => {
    try{
    const { rating , comment, productId} = req.body;

    const review = {
        user: req.user.id,
        name: `${req.user.firstName} ${req.user.lastName}`,
        rating: Number(rating),
        comment
    }
    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())
    if(isReviewed){
        product.reviews.forEach(review => {
            if(review.user.toString() === req.user._id.toString()){
                review.comment = comment;
                review.rating = rating
            }
        })

    }else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }

    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

    await product.save({ validateBeforeSave: false})

    res.status(200).json({
        success: true,
        message: `Review submitted successfully`
    })
    }
    catch(err) {
        return next(new ErrorHandler(err.message, 404))
    }
})

// Get Product reviews
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    try{
        const product = await Product.findById(req.query.id)
        res.status(200).json({
            success: true,
            reviews: product.reviews
        })

    }catch(err){
        return next(new ErrorHandler(err.message, 404))
    }
})

exports.deleteProductReview = catchAsyncErrors(async (req, res, next) => {
    try{
        const product = await Product.findById(req.query.productId)
        const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString())
        const numOfReviews = reviews.length;
        const ratings = product.reviews.reduce((acc, item) => item.rating - acc, 0) / numOfReviews
        await Product.findByIdAndUpdate(req.query.productId, {
            reviews,
            ratings,
            numOfReviews
        },{
            new: true,
            runValidators: true,
            useFindAndModify: false
        })
        res.status(200).json({
            success: true,
            message: 'Reviews deleted successfully'
        })

    }catch(err){
        return next(new ErrorHandler(err.message, 404))
    }
})