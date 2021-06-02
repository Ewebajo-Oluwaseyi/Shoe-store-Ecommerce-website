const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    name: {type: String, required: true},
    category: {type: String, required: false},
    image: {type: String, required: false},
    price: {type: Number, default: 0, required: false},
    brand: {type: String, required: false},
    countInStock: {type: Number, default: 0, required: false},
    qty: {type: Number, default: 0, required: false},
    productId: {type: String, default: 0, required: false},
    date: {type: Date,default: Date.now}
})


module.exports = mongoose.model('cart',cartSchema)