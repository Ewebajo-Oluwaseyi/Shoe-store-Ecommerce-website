const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    name: {type: String, required: true},
    category: {type: String, required: true},
    image: {type: String, required: true},
    price: {type: Number, default: 0, required: true},
    brand: {type: String, required: true},
    countInStock: {type: Number, default: 0, required: true},

})


module.exports = mongoose.model('product', productSchema)