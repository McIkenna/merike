const express = require('express')
const router = express.Router();

const { getCategories, newCategory, getSingleCategory, updateCategory, deleteCategory} = require('../controllers/categoryController');

router.route('/admin/category/new').post(newCategory);
router.route('/categories').get(getCategories);
router.route('/category/:id').get(getSingleCategory);
router.route('/admin/category/:id').put(updateCategory);
router.route('/admin/category/:id').delete(deleteCategory);
module.exports = router;