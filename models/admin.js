const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const admin  = mongoose.Schema({
    email: String,
    username: String,
    password: String, 
    role: String,

});

module.exports = mongoose.model('admin ', admin);