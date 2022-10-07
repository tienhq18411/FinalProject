const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commnent = mongoose.Schema(
  {
    commnent: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("commnent ", commnent);
