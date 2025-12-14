const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middlewares/errors');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ verify: (req, res, buf) => { req.rawBody = buf } }));
app.use(cookieParser());
app.use(cors());
const products = require('./routes/product');
const categories = require('./routes/category');
const auth = require('./routes/auth');
const order = require('./routes/order');
const stripe = require('./routes/stripe')
const carousel = require('./routes/carousel');

app.use('/api/v1', products);
app.use('/api/v1', categories);
app.use('/api/v1', auth);
app.use('/api/v1', order);
app.use('/api/v1', stripe);
app.use('/api/v1', carousel);

app.use(errorMiddleware);

module.exports = app