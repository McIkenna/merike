const express = require('express')
const router = express.Router();

const { stripeCheckout} = require('../controllers/stripeController');
const {isAuthenticatedUser} = require('../middlewares/auth')
router.route('/create-checkout-session').post(stripeCheckout);
module.exports = router;