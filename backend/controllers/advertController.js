const Advert = require('../models/advert');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// Create a new advert item
exports.newAdvert = catchAsyncErrors(async (req, res, next) => {
    try {
        const advert = await Advert.create(req.body);
        res.status(201).json({
            statusCode: 201,
            success: true,
            advert
        });
    } catch (err) {
        const message = Object.values(err.errors).map(value => value.message);
        return next(new ErrorHandler(message, 400));
    }
});

// Get all advert items
exports.getAdverts = catchAsyncErrors(async (req, res, next) => {
    try {
        const adverts = await Advert.find();
        res.status(200).json({
            success: true,
            adverts
        });
    } catch (err) {
        return next(new ErrorHandler(err.message, 400));
    }
});

// Get a single advert item by ID
exports.getAdvert = catchAsyncErrors(async (req, res, next) => {
    try {
        const advert = await Advert.findById(req.params.id);
        if (!advert) {
            return next(new ErrorHandler('No Advert found with this ID', 404));
        }
        res.status(200).json({
            success: true,
            advert
        });
    } catch (err) {
        return next(new ErrorHandler(err.message, 400));
    }
});

// Update a advert item by ID
exports.updateAdvert = catchAsyncErrors(async (req, res, next) => {
    try {
        let advert = await Advert.findById(req.params.id);
        if (!advert) {
            return next(new ErrorHandler('No Advert found with this ID', 404));
        }
        advert = await Advert.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });
        res.status(200).json({
            success: true,
            advert
        });
    }   catch (err) {   
        const message = Object.values(err.errors).map(value => value.message);
        return next(new ErrorHandler(message, 400));
    }
});

// Delete a advert item by ID
exports.deleteAdvert = catchAsyncErrors(async (req, res, next) => {
    try {
        const advert = await Advert.findByIdAndDelete(req.params.id);
                res.status(200).json({
                    success: true,
                    message: `${advert.name} deleted successfully`
                });
    } catch (err) {
        return next(new ErrorHandler(err.message, 400));
    }
});