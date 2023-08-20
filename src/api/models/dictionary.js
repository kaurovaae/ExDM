const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DictionaryItem = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        mfr: {
            type: String,
            required: true
        },
		measuring: {
            type: String,
            required: false
        },
		dose: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('dictionary', DictionaryItem);
