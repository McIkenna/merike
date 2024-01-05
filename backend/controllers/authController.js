const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');

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