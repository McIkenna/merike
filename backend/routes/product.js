const express = require('express')
const router = express.Router();
const { 
    getProducts,
    getAllProducts,
    newProduct, 
    getSingleProduct, 
    getSingleProductByName, 
    getProductsByCategory, 
    updateProduct, 
    deleteProduct,
    createProductReview,
    getProductReviews,
    deleteProductReview
} = require('../controllers/productController');

const {isAuthenticatedUser, authorizedRoles} = require('../middlewares/auth')
router.route('/admin/product/new').post(isAuthenticatedUser, authorizedRoles('admin'), newProduct);
router.route('/products').get(getProducts);
router.route('/allProducts').get(getAllProducts);
router.route('/product/:id').get(getSingleProduct);
router.route('/product/name/:name').get(getSingleProductByName);
router.route('/products/category/:category').get(getProductsByCategory);
router.route('/admin/product/:id').put(isAuthenticatedUser, authorizedRoles('admin'), updateProduct);
router.route('/admin/product/:id').delete(isAuthenticatedUser, authorizedRoles('admin'),deleteProduct);
router.route('/review').put(isAuthenticatedUser, createProductReview);
router.route('/reviews').get(isAuthenticatedUser, getProductReviews);
router.route('/reviews').delete(isAuthenticatedUser, deleteProductReview);
module.exports = router;