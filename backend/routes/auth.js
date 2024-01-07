const express = require('express');
const router = express.Router();

const {
    registerUser, 
    loginUser, 
    logout, 
    forgotPassword, 
    resetPassword, 
    getUserProfile, 
    changePassword,
    updateUserProfile,
    allUsers,
    getUserDetails,
    updateUser,
    deleteUser
} = require('../controllers/authController');
const {isAuthenticatedUser, authorizedRoles} = require('../middlewares/auth')
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logout);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/user').get(isAuthenticatedUser, getUserProfile);
router.route('/password/change').put(isAuthenticatedUser, changePassword);
router.route('/user/update').put(isAuthenticatedUser, updateUserProfile);
router.route('/admin/users').get(isAuthenticatedUser,authorizedRoles('admin'), allUsers);
router.route('/admin/user/:id').get(isAuthenticatedUser,authorizedRoles('admin'), getUserDetails);
router.route('/admin/user/update/:id').put(isAuthenticatedUser,authorizedRoles('admin'),updateUser);
router.route('/admin/user/delete/:id').delete(isAuthenticatedUser,authorizedRoles('admin'),deleteUser);
module.exports = router;