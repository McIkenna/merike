const express = require('express')
const router = express.Router();

const {
    getCarousels,
    newCarousel,
    getCarousel,
    updateCarousel,
    deleteCarousel
} = require('../controllers/carouselController');

const {isAuthenticatedUser, authorizedRoles} = require('../middlewares/auth')

// Admin routes
router.route('/admin/carousel/new').post(isAuthenticatedUser, authorizedRoles('admin'), newCarousel);
router.route('/admin/carousel/:id').put(isAuthenticatedUser, authorizedRoles('admin'), updateCarousel);
router.route('/admin/carousel/:id').delete(isAuthenticatedUser, authorizedRoles('admin'), deleteCarousel);

// Public routes
router.route('/carousels').get(getCarousels);
router.route('/carousel/:id').get(getCarousel);

module.exports = router;