const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const account = mongoose.Schema({
  id: { type: String }, 
  name: { type: String }, 
  username: { type: String },
});

const post = mongoose.Schema({
  id: { type: String },
  title: { type: String },
  size: { type: String },
  price: { type: String },
  servicesPrice: { type: String },
  address: { type: String },
  furniture: { type: String },
  convenience: { type: String },
  status: { type: String, default: 'INIT' },
  img:[String],
  user: { type: account},
  createDate: {type: Date, default: new Date()}


});

module.exports = mongoose.model("post ", post);
