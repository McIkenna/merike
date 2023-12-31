const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        unique: true,
        required: [true, 'Please enter product name'],
        trim: true,
        maxLength: [100, 'Product name cannot be more than 100 characters']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Category', categorySchema);