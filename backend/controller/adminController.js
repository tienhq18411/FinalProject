const bcrypt = require("bcrypt");
const account = require("../models/accounts");
const { v4: uuidv4 } = require('uuid');

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
      const id = uuidv4();
      const newAdmin = await new account({
        id: id,
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
    await account.findOneAndUpdate({id: id}, {
      name: req.body.name,
      username: req.body.username,
      password: hashed,
      role: "admin",
    });
    res.redirect("/admin/viewAccountAdmin");
  },
  deleteAccountAdmin: async function (req, res) {
    await account.findByIdAndUpdate(req.params.id,  { isActive: false} );
    res.redirect("/admin/viewAccountAdmin");
  },
  postUpdateInfor: async function (req, res) {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);
    const id = req.body.id;
    await account.findOneAndUpdate(id, {
      name: req.body.name,
      username: req.body.username,
      password: hashed,
      role: "admin",
    });
    res.redirect("/admin/viewAccountAdmin");
  },
};
