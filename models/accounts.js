const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const account  = mongoose.Schema({
    name: String,
    username: String,
    password: String, 
    role: String,

});

module.exports = mongoose.model('account ', account);

