const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema(
    {
        dictionaryId: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('products', Product);
