const app = require('./app');
const connectDatabase = require('./config/database');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down server due to uncaught exception');
    process.exit(1);
})

// setting up conf
dotenv.config({path: 'backend/config/config.env'})
// connecting to database
connectDatabase();
const server = app.listen(process.env.PORT, (req, res) => {
    console.log(`listening on port: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
})

process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down server due to unhandled Promise rejection');
    server.close(() => {
        process.exit(1);
    })
})