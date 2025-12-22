const app = require('./app');
const connectDatabase = require('./config/database');
const dotenv = require('dotenv');
// Setting up config
dotenv.config();
// Handling Uncaught Exceptions
process.on('uncaughtException', err => {
    console.error(`Error: ${err.message}`);
    console.error('Shutting down server due to uncaught exception');
    process.exit(1);
});



// Connecting to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
});

// Handling Unhandled Promise Rejections
process.on('unhandledRejection', err => {
    console.error(`Error: ${err.message}`);
    console.error('Shutting down server due to unhandled Promise rejection');
    server.close(() => {
        process.exit(1);
    });
});