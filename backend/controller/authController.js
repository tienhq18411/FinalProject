const account = require("../models/accounts");
const Post = require("../models/post");
const Comment = require("../models/comment");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');
module.exports = {
  home: async function (req, res) {
    const project = { _id: 0 };
    let post;
    const query = req.query
    console.log(query)
    const _query = {}
    if(query.searchKey) {
      _query.$or = [
        { title: { $regex: query.searchKey } },
      ]
    }
    _query.$and=[]
    if(query.city) {
      _query.$and.push({
        city: query.city
      })  
    }
    if(query.district) {
      _query.$and.push({
        district: query.district 
      })
    }
    if(query.ward) {
      _query.$and.push({
        ward: query.ward
      })
    }
    if(query.minPrice || query.maxPrice) {
      _query.$and.push({
        price: {$gte:query.minPrice,$lte: query.maxPrice}
      })
    }
    if(query.minSize || query.maxSize) {
      _query.$and.push({
        size: {$gte:query.minSize,$lte: query.maxSize}
      })
    }
    if(!_query.$and.length) {
      delete _query.$and
    }
    console.log(_query)
    let sort = {
      createDate: -1,
    };
    if (query.sort) {
      sort = CommonUtils.transformSort(query.sort) || {
        createDate: -1,
      };
      delete query.sort;
    }
    _query.status = 'PENDING'
    const page = query.page || 1;
    const pageSize = query.pageSize || 9;
    delete query.page;
    delete query.pageSize;
    post = await Post
      .find(_query, project)
      .sort(sort)
      .skip(page * pageSize - pageSize)
      .limit(pageSize);
    const count = await Post.countDocuments(_query)
    const totalPage = Math.floor((count + pageSize - 1) / pageSize);
    const pagination = {
      page: page,
      pageCount: totalPage
    }
    const token = req.cookies.token;
    let user = {};
    if(token) {
      user = await account.findOne({id:jwt.verify(token, "mk").id});
    }
    res.render("auth/home", { post: post ,user: user, pagination: pagination});
  },
  // viewDetail: async function (req, res) {
  //   const postD = await Post.findOne({id: req.params.id});
  //   res.render("auth/detail", { postD: postD });
  // },
  postViewDetail: async function (req, res) {
    const id = req.params.id;
    const post = await Post.findOne({id: id});
    const comment = await Comment.find({'post.id': id})
    console.log(comment)
    
    //api lay thong tin cua comment theo id
    res.render("auth/detail",{ postD: post, user: post.user, comment: comment });
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
};
