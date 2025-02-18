const Category = require('../models/category');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
exports.newCategory = catchAsyncErrors(async (req, res, next) => {
    try{
        const body = new Category(req.body);
        const category = await body.save();
        res.status(201).json({
            success: true,
            category
        })
    }catch (err) {
        return next(new ErrorHandler(err.message , 400))
    }
   
});
exports.getCategories = async (req, res, next) => {
    const categories = await Category.find();
    if (categories) { res.status(200).json({
        success: true,
        count: categories.length,
        categories

    })
}else {
        return next(new ErrorHandler('Category not found', 404))
    }
}
exports.getSingleCategory = async (req, res, next) => {
    const category = await Category.findById(req.params.id);
    if (category) {
        res.status(200).json({
            success: true,
            category
        })
    } else {
        return next(new ErrorHandler('Category not found', 404))
    }
}

exports.updateCategory = catchAsyncErrors(async (req, res, next) => {
    let category = await Category.findById(req.params.id);
    try{
        if (category) {
            category = await Category.findByIdAndUpdate(req.params.id, req.body,{
                new: true,
                runValidators: true,
                
            })
            res.status(200).json({
                success: true,
                category
            })
        } else {
            return next(new ErrorHandler('Category does not exist', 404))
        }
    }catch (err) {
        return next(new ErrorHandler(err.message , 400))
    }
    
})

exports.deleteCategory = async(req, res) => {
    try{
        const category = await Category.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: `${category.categoryName} deleted successfully`
        })
    }catch(err){
        return next(new ErrorHandler('Category does not exist', 404))
    }
}