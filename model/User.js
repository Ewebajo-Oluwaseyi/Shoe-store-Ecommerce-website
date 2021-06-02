const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true, dropDups: true},
    password: {type: String, required: true},
    isAdmin: {type: String,  default: 'Client'}
})


module.exports = mongoose.model('user', userSchema)