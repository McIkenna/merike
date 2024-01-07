const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) =>{
   const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    let error={...err};
if(process.env.NODE_ENV === 'PRODUCTION'){
    if(error.name === 'CastError'){
        const message = `Resource not found, Invalid:  ${error.path} `
        error = new ErrorHandler(message, 400)
    }
    if(error.name === 'ValidationError'){
        const message = Object.values(err.errors).map(value => value.message)
        error = new ErrorHandler(message, 400)
    }
    if(error.code === 11000){
        const message = `Duplicate ${Object.keys(error.keyValue)} entered`
        error = new ErrorHandler(message, 400)
    }

    if(error.name === 'JsonWebTokenError'){
        const message = 'Json web token is invalid. Try again'
        error = new ErrorHandler(message, 400)
    }
    if(error.name === 'TokenExpiredError'){
        const message = 'Json Web token is expired'
        error = new ErrorHandler(message, 400)
    }
    res.status(error.statusCode).json({
        sucess: false,
        message: message,
        statusCode: statusCode
    })
 

   
}else{
    res.status(error.statusCode).json({
        sucess: false, 
        error: error, 
        message: message,
        statusCode: statusCode,
        stack: err.stack
    })
}
}