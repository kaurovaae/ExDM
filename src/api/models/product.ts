import {Schema, model} 					from 'mongoose';

export const Product = new Schema(
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

export default model('products', Product);
