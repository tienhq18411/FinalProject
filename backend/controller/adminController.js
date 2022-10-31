const bcrypt = require("bcrypt");
const account = require("../models/accounts");

module.exports = {
  indexAdmin: function (req, res) {
    res.render("admin/admin");
  },

  viewAccountAdmin: async function (req, res) {
    const accountAdmin = await account.find({ role: "admin" });
    res.render("admin/viewAccountAdmin", { accountAdmin: accountAdmin });
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
  deleteAccountAdmin: async function (req, res) {
    await account.findByIdAndRemove(req.params.id);
    res.redirect("/admin/viewAccountAdmin");
  },
  updateInfor: async function (req, res) {
    const username = req.params.username;
    const AccountU = await account.findById(id);
    res.render(`admin/updateInfor`, { AccountU: AccountU });
  },
  postUpdateInfor: async function (req, res) {
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
};
