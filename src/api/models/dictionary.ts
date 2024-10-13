import {Schema, model} from "mongoose";

export const DictionaryItem = new Schema(
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
		measuringCount: {
            type: Number,
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

export default model('dictionary', DictionaryItem);
