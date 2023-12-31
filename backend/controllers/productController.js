const Product = require('../models/product');

exports.newProduct = async (req, res, next) => {
    const body = new Product(req.body);
    const product = await body.save();
    res.status(201).json({
        success: true,
        product
    })
};

exports.getProducts = async (req, res, next) => {
    const products = await Product.find();
    res.status(200).json({
        success: true,
        count: products.length,
        products

    })
}

exports.getSingleProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.status(200).json({
            success: true,
            product
        })
    } else {
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        })
    }
}

exports.getSingleProductByName = async (req, res, next) => {
    const product = await Product.findOne({name: req.params.name});
    if (product) {
        res.status(200).json({
            success: true,
            product
        })
    } else {
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        })
    }
}
exports.getProductsByCategory = async (req, res, next) => {
    const product = await Product.find({category: req.params.category});
    console.log('product', product);
    if (product) {
        res.status(200).json({
            success: true,
            product
        })
    } else {
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        })
    }
}

exports.updateProduct = async (req, res, next) => {
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
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        })
    }
}

exports.deleteProduct = async(req, res) => {
    try{
        const product = await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: `${product.name} deleted successfully`
        })
    }catch(err){
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        })
    }
    

}