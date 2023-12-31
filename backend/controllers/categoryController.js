const Category = require('../models/category');

exports.newCategory = async (req, res, next) => {
    const body = new Category(req.body);
    const category = await body.save();
    res.status(201).json({
        success: true,
        category
    })
};
exports.getCategories = async (req, res, next) => {
    const categories = await Category.find();
    res.status(200).json({
        success: true,
        count: categories.length,
        categories

    })
}
exports.getSingleCategory = async (req, res, next) => {
    const category = await Category.findById(req.params.id);
    if (category) {
        res.status(200).json({
            success: true,
            category
        })
    } else {
        return res.status(404).json({
            success: false,
            message: 'category not found'
        })
    }
}

exports.updateCategory = async (req, res, next) => {
    let category = await Category.findById(req.params.id);
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
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        })
    }
}

exports.deleteCategory = async(req, res) => {
    try{
        const category = await Category.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: `${category.categoryName} deleted successfully`
        })
    }catch(err){
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        })
    }
}