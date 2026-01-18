const express = require('express');
const router = express.Router();

const { 
    newOrder, 
    getSingleOrder, 
    myOrders, 
    allOrders, 
    updateOrder, 
    deleteOrder,
    cancelPendingOrder
} = require('../controllers/orderController');
const { isAuthenticatedUser, authorizedRoles } = require('../middlewares/auth')

router.route('/order/new').post(isAuthenticatedUser, newOrder);
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);
router.route('/myOrders/:id').get(isAuthenticatedUser, myOrders);
router.route('/cancelOrder').put(isAuthenticatedUser, cancelPendingOrder)
router.route('/admin/orders').get(isAuthenticatedUser, authorizedRoles('admin'), allOrders);
router.route('/admin/update/:id').put(isAuthenticatedUser, authorizedRoles('admin'), updateOrder);
router.route('/admin/delete/:id').delete(isAuthenticatedUser, authorizedRoles('admin'), deleteOrder);
module.exports = router;