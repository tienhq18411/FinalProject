const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const post = mongoose.Schema({
  title: String,
  size: String,
  price: String,
  servicesPrice: String,
  address: String,
  furniture: String,
  convenience: String,
  status: String,
  img: String
});

module.exports = mongoose.model("post ", post);
