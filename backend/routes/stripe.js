const express = require('express');
const router = express.Router();

const { stripeCheckout, stripeWebhook, createPendingOrder } = require('../controllers/stripeController');
const { isAuthenticatedUser } = require('../middlewares/auth');

router.post('/create-pending-order', isAuthenticatedUser, createPendingOrder);
router.post('/create-checkout-session', isAuthenticatedUser, stripeCheckout);
router.post('/webhook', express.raw({ type: 'application/json' }), stripeWebhook);

module.exports = router;