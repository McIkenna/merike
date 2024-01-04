const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        trim: true,
        maxLength: [100, 'Product name cannot be more than 100 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please enter product price'],
        maxLength: [100, 'Price cannot be more than 100 characters'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, 'Please enter product description'],
        maxLength: [500, 'Description cannot be more than 100 characters'],
    },
    ratings: {
        type: Number,
        default: 0.0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            }

        }
    ],
    category: {
        type: String,
        required: [true, 'Please select category for this product'],
        message: 'Please select correct category for product'
    },
    seller: {
        type: String,
        required: [true, 'Please enter product seller']
    },
    stock: {
        type: Number,
        required: [true, 'Please enter product stock']
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            name: {
                type: String,
                required: true,
                maxLength: [100, 'review name cannot be more than 100 characters'],
            },
            rating: {
                type: String,
                required: true,
            },
            comment: {
                type: String,
                required: true,
                maxLength: [300, 'Comment cannot be more than 300 characters'],
            }
        }
    ],
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema);