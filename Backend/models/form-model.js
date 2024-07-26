const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const formSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true, 
    },
    inputs: [
        {
            type: {
                type: String,
                enum: ['text', 'email', 'password', 'number', 'date'], 
                required: true,
            },
            title: {
                type: String,
                required: true,
                trim: true, 
            },
            placeholder: {
                type: String,
                required: true,
                trim: true,
            },
        },
    ],
    submissions: [
        {
            data: {
                type: Map,
                of: String,
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            }
        }
    ]
}, { timestamps: true });

const Form = model('Form', formSchema);

module.exports = Form;
