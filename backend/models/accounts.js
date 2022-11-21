const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const account = mongoose.Schema({
  id: {type: String}, 
  name: {type: String}, 
  username: {type: String},
  password: {type: String},
  role: {type: String},
  isActive: {type: String, default: true},
  createDate: {type: Date, default: new Date()}
});

module.exports = mongoose.model("account ", account);
