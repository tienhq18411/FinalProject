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
      res.redirect("/admin/viewAccountAdmin");
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  updateAccountAdmin: async function (req, res) {
    const id = req.params.id;
    const newAccount = await account.findById(id);
    res.render(`admin/updateAccountAdmin`, { newAccount: newAccount });
  },
  postUpdateAccountAdmin: async function (req, res) {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);
    const id = req.body.id;
    await account.findByIdAndUpdate(id, {
      name: req.body.name,
      username: req.body.username,
      password: hashed,
      role: "admin",
    });
    res.redirect("/admin/viewAccountAdmin");
  },
  updateAccountUser: function (req, res) {
    res.render("admin/updateAccountUser");
  },
  updateAccountHost: function (req, res) {
    res.render("admin/updateAccountHost");
  },
  deleteAccountAdmin: async function (req, res) {
    await account.findByIdAndRemove(req.params.id);
    res.redirect("/admin/viewAccountAdmin");
  },
};
