const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const post = mongoose.Schema({
  title: String,
  size: String,
  password: String,
  price: String,
  servicesPrice: String,
  address: String,
  furniture: String,
  convenience: String,
});

module.exports = mongoose.model("post ", post);
