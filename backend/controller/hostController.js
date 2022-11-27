const Post = require("../models/post");
const account = require("../models/accounts");

const { v4: uuidv4 } = require('uuid');
const jwt = require("jsonwebtoken");
module.exports = {
  indexHost: async function (req, res) {
    const post = await Post.find();
    res.render("host/viewPost", { post: post });
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
      size: req.body.size,
      price: req.body.price,
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
    await Post.findOneAndUpdate({id: id}, {
      title: req.body.title,
      size: req.body.size,
      price: req.body.price,
      servicesPrice: req.body.servicesPrice,
      address: req.body.address,
      furniture: req.body.furniture,
      convenience: req.body.convenience,
    });
    res.redirect("/host");
  },
  deletePost: async function (req, res) {
    await Post.findOneAndRemove(req.params.id);
    res.redirect("/host");
  },
};
