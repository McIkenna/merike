const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middlewares/errors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ verify: (req, res, buf) => { req.rawBody = buf } }));
app.use(cookieParser());
dotenv.config();
app.use(cors({
     origin: process.env.CLIENT_URL || 'http://localhost:5173/',
     credentials: true
   }));
const products = require('./routes/product');
const categories = require('./routes/category');
const auth = require('./routes/auth');
const order = require('./routes/order');
const stripe = require('./routes/stripe')
const carousel = require('./routes/carousel');
const advert = require('./routes/advert');
const promoCode = require('./routes/promoCode')

app.use('/api/v1', products);
app.use('/api/v1', categories);
app.use('/api/v1', auth);
app.use('/api/v1', order);
app.use('/api/v1', stripe);
app.use('/api/v1', carousel);
app.use('/api/v1', advert);
app.use('/api/v1', promoCode);

app.use(errorMiddleware);

module.exports = app