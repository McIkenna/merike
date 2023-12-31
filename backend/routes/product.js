const express = require('express')
const router = express.Router();

const { getProducts, newProduct, getSingleProduct, getSingleProductByName, getProductsByCategory, updateProduct, deleteProduct} = require('../controllers/productController');

router.route('/admin/product/new').post(newProduct);
router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);
router.route('/product/name/:name').get(getSingleProductByName);
router.route('/products/category/:category').get(getProductsByCategory);
router.route('/admin/product/:id').put(updateProduct);
router.route('/admin/product/:id').delete(deleteProduct);
// router.use(catchAsyncErrors);
module.exports = router;