const account = require("../models/accounts");
const Post = require("../models/post");
const Comment = require("../models/comment");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  home: async function (req, res) {
    const post = await Post.find();
    const Account = await account.findById(req.params.id);
    res.render("auth/home", { post: post });
  },
  viewDetail: async function (req, res) {
    const postD = await Post.findById(req.params.id);
    const Account = await account.findOne();
    res.render("auth/detail", { postD: postD, Account: Account });
  },
  postViewDetail: async function (req, res) {
    const id = req.body.id;
    await Post.findById(id);
    res.render("auth/detail");
  },
  comment: function (req, res) {},

  register: function (req, res, next) {
    res.render("auth/register");
  },
  postRegister: async function (req, res, next) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      const newUser = await new account({
        name: req.body.name,
        username: req.body.username,
        password: hashed,
        role: req.body.role,
      });
      const Account = await newUser.save();
      res.redirect("login");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  login: function (req, res, next) {
    res.render("auth/login");
  },
  postLogin: async function (req, res, next) {
    try {
      const user = await account.findOne({ username: req.body.username });
      if (!user) {
        res.status(404).json("wrong username");
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        res.status(404).json("wrong password");
      }
      if (user && validPassword) {
        var token = jwt.sign(
          {
            id: user.id,
          },
          "mk",
          { expiresIn: "30d" }
        );

        res.cookie("token", token);
        res.redirect("/" + user.role);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  logout: function (req, res) {
    res.clearCookie("token");
    res.redirect("login");
  },
  search: async function (req, res) {
    try {
      const post = await Post.find(
        {
          $or: [
            { title: { $regex: req.query.key } },
            { convenience: { $regex: req.query.key } },
            { price: { $regex: req.query.key } },
          ],
        },
        (err, post) => {
          if (err) {
            console.log(err);
          } else {
            res.render("auth/home", { post: post });
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  },
};
