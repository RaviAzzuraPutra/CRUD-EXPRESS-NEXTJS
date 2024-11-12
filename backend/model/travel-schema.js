const { text } = require('express');
const mongoose = require('mongoose');

const TravelSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        require: true,
    },
    location: {
        type: String,
        required: true,
    },
    image_url: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: null
    },
});

module.exports = mongoose.models.Travel || mongoose.model('Travel', TravelSchema);