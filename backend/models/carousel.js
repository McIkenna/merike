const mongoose = require('mongoose');
const carouselSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter carousel name'],
        trim: true,
        maxLength: [100, 'Product name cannot be more than 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Please enter carousel description'],
        maxLength: [500, 'Description cannot be more than 100 characters'],
    },
    image: 
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            }

        },
    createdAt: {
        type: Date,
        default: Date.now,

    },
    updatedAt: {
        type: Date
    }
});

module.exports = mongoose.model('Carousel', carouselSchema);