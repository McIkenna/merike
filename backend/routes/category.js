const express = require('express')
const router = express.Router();

const { getCategories, newCategory, getSingleCategory, updateCategory, deleteCategory} = require('../controllers/categoryController');
const {isAuthenticatedUser} = require('../middlewares/auth')
router.route('/admin/category/new').post(isAuthenticatedUser, newCategory);
router.route('/categories').get(getCategories);
router.route('/category/:id').get(getSingleCategory);
router.route('/admin/category/:id').put(isAuthenticatedUser, updateCategory);
router.route('/admin/category/:id').delete(isAuthenticatedUser, deleteCategory);
module.exports = router;