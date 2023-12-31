module.exports = (err, req, res, next) =>{
   const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    let error={...err};
if(process.env.NODE_ENV === 'PRODUCTION'){
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