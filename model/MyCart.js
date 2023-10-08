const mongoose = require('mongoose');

const myCartSchema = new mongoose.Schema({
    id :Number,
    name: { type: String, required: true },
    price: { type: Number, required: true },
    ram: String,
    storage: String,
    image_url: String,
    rating: Number,
    quantity: Number,
});

module.exports = mongoose.model('MyCart', myCartSchema); 