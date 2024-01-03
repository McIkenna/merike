const user = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('./catchAsyncErrors');
const jwt = require('jsonwebtoken');
//Checks if user is authenticated 
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    try{
        const {token} = req.cookies
        if(!token){
            return next(new ErrorHandler('Login first to access this resource.', 401));
        }
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await user.findById(decoded.id);
        next();
    }catch(err){
        return next(new ErrorHandler(err.message, 401));
    }

   

})