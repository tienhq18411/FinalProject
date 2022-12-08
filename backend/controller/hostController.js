const Post = require("../models/post");
const account = require("../models/accounts");
const Comment = require("../models/comment");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');
const jwt = require("jsonwebtoken");
module.exports = {
  indexHost: async function (req, res) {
    const token = req.cookies.token;
    let post = {}
    const project = { _id: 0 };
    const query = req.query
    console.log(query)
    const _query = {}
    _query['user.id'] = jwt.verify(token, "mk").id
    if(query.searchKey) {
      _query.$or = [
        { title: { $regex: query.searchKey } },
      ]
    }
    let sort = {
      createDate: -1,
    };
    if (query.sort) {
      sort = CommonUtils.transformSort(query.sort) || {
        createDate: -1,
      };
      delete query.sort;
    }
    _query.status = { $nin: ['DELETE','INIT'] }
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
    res.render("host/viewPost", { post: post, pagination: pagination });
  },
  createPost: function (req, res) {
    res.render("host/createPost");
  },
  postCreatepost: async function (req, res) {
    const arrayUrl = req.files.map((item) => item.filename);
    const id = uuidv4()
    const token = req.cookies.token;
    const user = await account.findOne({id:jwt.verify(token, "mk").id});
   // console.log(user)
    // tu token lay ra thong tin user roi xu li tiep
    const newPost = await new Post({
      id: id,
      title: req.body.title,
      size: Number(req.body.size),
      price: Number(req.body.price),
      city: req.body.city,
      district: req.body.district,
      ward: req.body.ward,
      addressDetail: req.body.addressDetail,
      addressMap: req.body.addressMap,
      bed: req.body.bed,
      bath: req.body.bath,
      img: arrayUrl,
      user: user,
      description: req.body.description
    });
    //console.log(newPost);
    await newPost.save();
    res.redirect("/host");
  },
  updatePost: async function (req, res) {
    const id = req.params.id;
    const newPost = await Post.findOne({id: id});
    res.render("host/updatePost", { newPost: newPost });
  },
  postUpdatePost: async function (req, res) {
    const id = req.body.id;
    await Post.updateOne({id: id}, {
      title: req.body.title,
      size: Number(req.body.size),
      price: Number(req.body.price),
      city: req.body.city,
      district: req.body.district,
      ward: req.body.ward,
      addressDetail: req.body.addressDetail,
      addressMap: req.body.addressMap,
      bed: req.body.bed,
      bath: req.body.bath,
      img: arrayUrl,
      description: req.body.description
    });
    res.redirect("/host");
  },
  deletePost: async function (req, res) {
    await Post.findOneAndRemove(req.params.id);
    res.redirect("/host");
  },

  commentPost: async function (req, res) {
    const postId = req.body.postId
    const id = uuidv4()
    const token = req.cookies.token;
    const user = await account.findOne({id:jwt.verify(token, "mk").id});
    const post = await Post.findOne({id: postId})
    const comment = await new Comment({
      comment: req.body.comment,
      user: user,
      post: post,
      id: id,
    });
    await comment.save();
    res.redirect(`/auth/detail/${postId}`);
  },
  updateStatusPost: async function (req,res) {
    const id = req.params.id
    const status = req.query.action
    await Post.updateOne({id: id}, {status: status})
    res.redirect(`/host`);
  },
  viewUserInfo: async function (req, res) {
    const token = req.cookies.token;
    let user = {};
    if(token) {
      user = await account.findOne({id:jwt.verify(token, "mk").id});
    }
    res.render("host/accountInfo", { user: user })
  },
  changeUserInfo: async function (req, res) {
    let hashed = ''
    if(req.body.password) {
      const salt = await bcrypt.genSalt(10);
      hashed = await bcrypt.hash(req.body.password, salt);
    }
    user = await account.findOne({id:req.body.id});
    console.log(req.body)
    await account.updateOne({id: user.id},{
      name: req.body.name,
      username: req.body.username,
      password: hashed || user.password,
      phone: req.body.phone,
    })
    res.redirect("/host/viewUserInfo");
  }
};
