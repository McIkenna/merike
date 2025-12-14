const Carousel = require('../models/carousel');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// Create a new carousel item
exports.newCarousel = catchAsyncErrors(async (req, res, next) => {
    try {
        const carousel = await Carousel.create(req.body);
        res.status(201).json({
            statusCode: 201,
            success: true,
            carousel
        });
    } catch (err) {
        const message = Object.values(err.errors).map(value => value.message);
        return next(new ErrorHandler(message, 400));
    }
});

// Get all carousel items
exports.getCarousels = catchAsyncErrors(async (req, res, next) => {
    try {
        const carousels = await Carousel.find();
        res.status(200).json({
            success: true,
            carousels
        });
    } catch (err) {
        return next(new ErrorHandler(err.message, 400));
    }
});

// Get a single carousel item by ID
exports.getCarousel = catchAsyncErrors(async (req, res, next) => {
    try {
        const carousel = await Carousel.findById(req.params.id);
        if (!carousel) {
            return next(new ErrorHandler('No Carousel found with this ID', 404));
        }
        res.status(200).json({
            success: true,
            carousel
        });
    } catch (err) {
        return next(new ErrorHandler(err.message, 400));
    }
});

// Update a carousel item by ID
exports.updateCarousel = catchAsyncErrors(async (req, res, next) => {
    try {
        let carousel = await Carousel.findById(req.params.id);
        if (!carousel) {
            return next(new ErrorHandler('No Carousel found with this ID', 404));
        }
        carousel = await Carousel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });
        res.status(200).json({
            success: true,
            carousel
        });
    }   catch (err) {   
        const message = Object.values(err.errors).map(value => value.message);
        return next(new ErrorHandler(message, 400));
    }
});

// Delete a carousel item by ID
exports.deleteCarousel = catchAsyncErrors(async (req, res, next) => {
    try {
        const carousel = await Carousel.findById(req.params.id);
        if (!carousel) {
            return next(new ErrorHandler('No Carousel found with this ID', 404));
        }
        await carousel.remove();
        res.status(200).json({
            success: true,
            message: 'Carousel item deleted successfully'
        });
    } catch (err) {
        return next(new ErrorHandler(err.message, 400));
    }
});