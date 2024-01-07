const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    try{
        const { firstName, lastName, email, password } = req.body;
        const user = await User.create({
            firstName,
            lastName,
            email,
            password, 
            avatar: {
                public_id: 'avatar-1',
                url: 'https://png.pngtree.com/png-vector/20190221/ourmid/pngtree-male-avatar-vector-icon-png-image_691595.jpg'
            }
    
        })
        sendToken(user, 200, res)
    }catch(err) {
        return next(new ErrorHandler(err.message , 400))
    } 
})

exports.loginUser = catchAsyncErrors( async(req, res, next) => {
    const { email, password } = req.body;;

    // Checks if email and password is entered by user
    if(!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400))
    }
    const user = await User.findOne({email}).select('+password')
    if(!user){
        return next(new ErrorHandler('This email is not registered', 401));
    }
    const isPasswordMatch = await user.comparePassword(password)
    if(!isPasswordMatch) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }
    sendToken(user, 200, res)
})

//Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    try{
        const user = await User.findOne({email: req.body.email});

        if(!user){
            return next(new ErrorHandler('User not found with this email', 404));
        }
        const resetToken = user.getResetPasswordToken();
        await user.save({ validateBeforeSave: false });
    
        const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;
        const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`;
        try{
    
            await sendEmail({
                email: user.email,
                subject: 'Merike Password Recovery',
                message
            })
            res.status(200).json({
                success: true,
                message: `Email sent to: ${user.email}`
            })
        }catch(error){
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
    
            await user.save({ validateBeforeSave: false });
            return next(new ErrorHandler(error.message, 500));
        }
    }catch(err){
        return next(new ErrorHandler(err.message , 400)) 
    }
   
})

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {$gt: Date.now()}
    })
    if(!user){
        return next(new ErrorHandler('Password reset token is invalid or has been expired', 400))
    }
    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler('Password does not match', 400))
    }
    user.password = req.body.password

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    sendToken(user, 200, res)
})

exports.changePassword = catchAsyncErrors(async (req, res, next) => {
    try{
        const user = await User.findById(req.user.id).select('+password');
        const isMatched = await user.comparePassword(req.body.oldPassword)
        if(!isMatched) {
            return next(new ErrorHandler('old password is incorrect', 400));
        }
        user.password = req.body.password;
        await user.save();
        sendToken(user, 200, res);
    }
    catch (err) {
        return next(new ErrorHandler(err.message, 400))
    }

})

exports.updateUserProfile = catchAsyncErrors(async (req, res, next) => {
    try{
        const newuserData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        }
        const user = await User.findByIdAndUpdate(req.user.id, newuserData, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })
        res.status(200).json({
            success: true,
            message: 'User profile updated successfully'
        })
    }catch(err){
        return next(new ErrorHandler(err.message, 400))
    }
    
})
//Get currenlty logged in user details
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user
    })
})
//Logout User
module.exports.logout = catchAsyncErrors(async(req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
})

exports.allUsers = catchAsyncErrors(async (req, res, next) => {

    const users = await User.find();
    res.status(200).json({
        success: true,
        users});
})

exports.getUserDetails = catchAsyncErrors(async (req, res, next) =>{
    const user = await User.findById(req.params.id);
    if(!user){ 
        return next(new ErrorHandler(`User does not found id: ${req.params.id}`, 400));
    }
    res.status(200).json({
        success: true,
        user
    })
})

exports.updateUser = catchAsyncErrors(async (req, res, next) => {
    try{
        const newuserData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            role: req.body.role
        }
        const user = await User.findByIdAndUpdate(req.params.id, newuserData, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })
        res.status(200).json({
            success: true,
            message: 'User profile updated successfully',
            user
        })
    }catch(err){
        return next(new ErrorHandler(err.message, 400))
    }
    
})

exports.deleteUser = catchAsyncErrors(async (req, res, next) =>{
    try{
        const user = await User.findById(req.params.id);
        if(!user){ 
            return next(new ErrorHandler(`User does not found id: ${req.params.id}`, 400));
        }
        await user.deleteOne();
        res.status(200).json({
            success: true,
            message: 'User Deleted Successfully'
        })
    }catch(err){
        return next(new ErrorHandler(err.message, 400));
    }
    
})