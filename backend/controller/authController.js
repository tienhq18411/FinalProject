const account = require("../models/accounts");
const Post = require("../models/post");
const Comment = require("../models/comment");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');
module.exports = {
  home: async function (req, res) {
    // const project = { _id: 0 };
    // let post;
    // if (query._fields) {
    //   const fields = query._fields.split(',');
    //   fields.forEach((f) => {
    //     project[f.trim()] = 1;
    //   });
    //   delete query._fields;
    // }
    // let sort = {
    //   modifiedDate: -1,
    // };
    // if (query.sort) {
    //   sort = CommonUtils.transformSort(query.sort) || {
    //     modifiedDate: -1,
    //   };
    //   delete query.sort;
    // }
    // if (query.isPaging) {
    //   const page = query.page;
    //   const pageSize = query.pageSize;
    //   delete query.isPaging;
    //   delete query.page;
    //   delete query.pageSize;
    //   post = await Post
    //     .find(query, project)
    //     .sort(sort)
    //     .skip(page * pageSize - pageSize)
    //     .limit(pageSize);
    // }
    // post = await Post.find(query, project).sort(sort);
    const post = await Post.find();
    const Account = await account.findOne({id: req.params.id});
    res.render("auth/home", { post: post });
  },
  // viewDetail: async function (req, res) {
  //   const postD = await Post.findOne({id: req.params.id});
  //   res.render("auth/detail", { postD: postD });
  // },
  postViewDetail: async function (req, res) {
    const id = req.body.id;
    const post = await Post.findOne({id: id});
    //api lay thong tin cua comment theo id
    res.render("auth/detail",{ postD: post });
  },

  register: function (req, res, next) {
    res.render("auth/register");
  },
  postRegister: async function (req, res, next) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      const id = uuidv4();
      const newUser = await new account({
        id: id,
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
        res.redirect("/" );
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
  changePassword: async function (req, res) {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.newPassword, salt);
    const id = req.body.id;
    const user = await account.findOne({id: id})
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      res.status(404).json("wrong password");
    }else {
      
    }
    await account.findOneAndUpdate({id: id}, {
      name: req.body.name,
      username: req.body.username,
      password: hashed,
    });
  },
  changeUserInfo: async function (req, res) {
    
  },
  commentPost: async function (req, res) {
    const userId = req.cookies()
    const postId = res.body.id
    
    const comment = await new Comment({
      comment: res.body.comment
    });
    await comment.save();
  }
};
