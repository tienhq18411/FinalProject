const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const account = mongoose.Schema({
  id: {type: String}, 
  name: {type: String}, 
  username: {type: String},
  password: {type: String},
  role: {type: String, default: 'host'},
  phone: {type: String},
  isActive: {type: Boolean, default: true},
  createDate: {type: Date, default: () => Date.now()},

});

module.exports = mongoose.model("account ", account);
