const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const account = require("../models/accounts");

module.exports = {
  indexAdmin: function (req, res) {
    res.render("admin/admin");
  },

  viewAccountAdmin: async function (req, res) {
    const accountAdmin = await account.find({ role: "admin" });
    res.render("admin/viewAccountAdmin", { accountAdmin: accountAdmin });
  },
  viewAccountUser: async function (req, res) {
    res.render("admin/viewAccountUser", {
      accountAdmin: await account.find({ role: "user" }),
    });
  },
  viewAccountHost: function (req, res) {
    res.render("admin/viewAccountHost");
  },
  createAccountAdmin: function (req, res) {
    res.render("admin/createAccountAdmin");
  },
  postCreateAccountAdmin: async function (req, res) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      const newAdmin = await new account({
        name: req.body.name,
        username: req.body.username,
        password: hashed,
        role: "admin",
      });
      await newAdmin.save();
      res.redirect("viewAccountAdmin");
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  updateAccountAdmin: async function (req, res) {
    const id = mongoose.Types.ObjectId(id);
    const newAccount = await account.findById(id);
    console.log(newAccount);
    res.render("admin/updateAccountAdmin", { newAccount: newAccount });
  },
  postUpdateAccountAdmin: async function (req, res) {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);
    const id = req.params.id;
    account.findOneAndUpdate({
      id: id,
      role: "admin",
      name: req.body.name,
      password: hashed,
      username: req.body.username,
    });
    res.redirect("viewAccountAdmin");
  },
  updateAccountUser: function (req, res) {
    res.render("admin/updateAccountUser");
  },
  updateAccountHost: function (req, res) {
    res.render("admin/updateAccountHost");
  },
  deleteAccountAdmin: async function (req, res) {
    const user = await account.findByIdAndDelete(req.params.id);
    res.redirect("viewAccountAdmin");
  },
};
