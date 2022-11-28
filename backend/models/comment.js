const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const account = mongoose.Schema({
  id: {type: String}, 
  name: {type: String}, 
  username: {type: String},
  createDate: {type: Date, default: () => Date.now()},
});
const post = mongoose.Schema({
  id: {type: String}, 
  title: {type: String}, 
});
const commnent = mongoose.Schema(
  {
    id: {type: String},
    comment: {type: String},
    user: {type: account},
    post: {type: post},
    isActive: {type: Boolean, default: true},
    createDate: {type: Date, default: () => Date.now()}
  },
  { timestamps: true }
);

module.exports = mongoose.model("commnent ", commnent);
