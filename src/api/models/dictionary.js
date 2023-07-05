const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DictionaryItem = new Schema(
    {
        name: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('dictionary', DictionaryItem);
