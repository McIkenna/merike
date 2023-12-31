const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/errors');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

const products = require('./routes/product');
const categories = require('./routes/category');

app.use('/api/v1', products);
app.use('/api/v1', categories);

app.use(errorMiddleware);

module.exports = app