const express = require('express')
const router = express.Router();

const { 
    getProducts, 
    newProduct, 
    getSingleProduct, 
    getSingleProductByName, 
    getProductsByCategory, 
    updateProduct, 
    deleteProduct} = require('../controllers/productController');

const {isAuthenticatedUser, authorizedRoles} = require('../middlewares/auth')
router.route('/admin/product/new').post(isAuthenticatedUser, authorizedRoles('admin'), newProduct);
router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);
router.route('/product/name/:name').get(getSingleProductByName);
router.route('/products/category/:category').get(getProductsByCategory);
router.route('/admin/product/:id').put(isAuthenticatedUser, authorizedRoles('admin'), updateProduct);
router.route('/admin/product/:id').delete(isAuthenticatedUser, authorizedRoles('admin'),deleteProduct);
// router.use(catchAsyncErrors);
module.exports = router;