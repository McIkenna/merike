const express = require('express')
const router = express.Router();

const {
    getAdverts,
    newAdvert,
    getAdvert,
    updateAdvert,
    deleteAdvert
} = require('../controllers/advertController');

const {isAuthenticatedUser, authorizedRoles} = require('../middlewares/auth')

// Admin routes
router.route('/admin/advert/new').post(isAuthenticatedUser, authorizedRoles('admin'), newAdvert);
router.route('/admin/advert/:id').put(isAuthenticatedUser, authorizedRoles('admin'), updateAdvert);
router.route('/admin/advert/:id').delete(isAuthenticatedUser, authorizedRoles('admin'), deleteAdvert);

// Public routes
router.route('/adverts').get(getAdverts);
router.route('/advert/:id').get(getAdvert);

module.exports = router;