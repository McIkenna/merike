const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middlewares/errors');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cookieParser());

const products = require('./routes/product');
const categories = require('./routes/category');
const auth = require('./routes/auth');

app.use('/api/v1', products);
app.use('/api/v1', categories);
app.use('/api/v1', auth);

app.use(errorMiddleware);

module.exports = app