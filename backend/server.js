const app = require('./app');
const connectDatabase = require('./config/database');
const dotenv = require('dotenv');

// setting up conf
dotenv.config({path: 'backend/config/config.env'})
// connecting to database
connectDatabase();
app.listen(process.env.PORT, (req, res) => {
    console.log(`listening on port: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
})