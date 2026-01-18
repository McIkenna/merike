const mongoose = require('mongoose');
const advertSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Welcome Notice'],
        trim: true,
        maxLength: [100, 'Product name cannot be more than 100 characters']
    },
    description: {
        type: String,
        maxLength: [1000, 'Description cannot be more than 1000 characters'],
        required: true
    },
    image: 
        {
            public_id: {
                type: String
            },
            url: {
                type: String
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

module.exports = mongoose.model('Advert', advertSchema);