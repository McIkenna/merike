const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

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
        const token = user.getJwtToken();
        res.status(201).json({
            success: true,
            token
        })
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
    const token = user.getJwtToken();
    res.status(200).json({
        success: true,
        token
    })
})