const express = require('express');
const router = express.Router();

const { newOrder, getSingleOrder, myOrders, allOrders, updateOrder} = require('../controllers/orderController');
const { isAuthenticatedUser, authorizedRoles } = require('../middlewares/auth')

router.route('/order/new').post(isAuthenticatedUser, newOrder);
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);
router.route('/orders/me').get(isAuthenticatedUser, myOrders);
router.route('/admin/orders/').get(isAuthenticatedUser, authorizedRoles('admin'), allOrders);
router.route('/admin/order/:id').put(isAuthenticatedUser, authorizedRoles('admin'), updateOrder);
module.exports = router;