const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const account = mongoose.Schema({
  id: { type: String }, 
  name: { type: String }, 
  username: { type: String },
  phone: {type: String},
  createDate: {type: Date, default: () => Date.now()},
  isActive: {type: Boolean}
});
const post = mongoose.Schema({
  id: { type: String },
  title: { type: String },
  size: { type: String },
  price: { type: String },
  city: { type: String }, 
  district: { type: String }, 
  ward: { type: String },
  addressDetail: {type: String},
  addressMap: { type: String },
  bed: { type: String },
  bath: { type: String },
  description: {type: String},
  status: { type: String, default: 'PENDING' },
  img:[String],
  user: { type: account},
  createDate: {type: Date, default: () => Date.now()}
});

module.exports = mongoose.model("post ", post);
