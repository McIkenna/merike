const user = require('../models/user');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require('./catchAsyncErrors');
const jwt = require('jsonwebtoken');
//Checks if user is authenticated 
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {

    try{
        // console.log('req in middleware -->', req)
        // console.log('req in middleware -->', req?.headers['authorization'])
        const token = req.headers['authorization'];
        if(!token){
            return next(new ErrorHandler('Login first to access this resource.', 401));
        }
    
        const parts = token.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            return res.status(401).json({ message: 'Invalid token format' });
        }
        const jwtToken = parts[1]
        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
        req.user = await user.findById(decoded.id);
        next();
    }catch(err){
        return next(new ErrorHandler(err.message, 401));
    }
})

exports.authorizedRoles = (...roles)=>{
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
           return next(new ErrorHandler(`Role ${req.user.role} is not allowed to access this resource`, 403));
        }
        next();
    }
};