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

const {isAuthenticatedUser} = require('../middlewares/auth')
router.route('/admin/product/new').post(isAuthenticatedUser, newProduct);
router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);
router.route('/product/name/:name').get(getSingleProductByName);
router.route('/products/category/:category').get(getProductsByCategory);
router.route('/admin/product/:id').put(isAuthenticatedUser, updateProduct);
router.route('/admin/product/:id').delete(isAuthenticatedUser, deleteProduct);
// router.use(catchAsyncErrors);
module.exports = router;