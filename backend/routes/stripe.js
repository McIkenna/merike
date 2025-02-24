const express = require('express');
const router = express.Router();

const { stripeCheckout, stripeWebhook } = require('../controllers/stripeController');
const { isAuthenticatedUser } = require('../middlewares/auth');

router.post('/create-checkout-session', stripeCheckout);
router.post('/webhook', express.raw({ type: 'application/json' }), stripeWebhook);

module.exports = router;