const express = require('express');
const router = express.Router();
const {isAuthenticatedUser, authorizedRoles} = require('../middlewares/auth')
const {
  validatePromoCode,
  applyPromoCode,
  getActivePromoCodes,
  createPromoCode,
  updatePromoCode,
  getAllPromoCode,
  deletePromoCode
} = require('../controllers/promoCodeController');

// Public routes
router.route('/active').get( getActivePromoCodes);

// Protected routes (requires authentication)
router.route('/validate').post(isAuthenticatedUser, validatePromoCode);
router.route('/apply').post(isAuthenticatedUser, applyPromoCode);

// Admin routes
router.route('/admin/createPromo').post(isAuthenticatedUser, authorizedRoles('admin'), createPromoCode);
router.route('/admin/updatePromo/:id').put(isAuthenticatedUser, authorizedRoles('admin'), updatePromoCode);
router.route('/admin/deletePromo/:id').delete(isAuthenticatedUser, authorizedRoles('admin'), deletePromoCode);
router.route('/admin/allPromo').get(isAuthenticatedUser, authorizedRoles('admin'), getAllPromoCode)

module.exports = router;