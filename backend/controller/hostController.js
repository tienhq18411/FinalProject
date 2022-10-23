const Post = require("../models/post");
const multer = require("multer");
const fs = require("fs");

module.exports = {
  indexHost: async function (req, res) {
    const post = await Post.find();
    res.render("host/viewPost", { post: post });
  },
  createPost: function (req, res) {
    res.render("host/createPost");
  },
  postCreatepost: async function (req, res) {
    const newPost = await new Post({
      title: req.body.title,
      size: req.body.size,
      price: req.body.price,
      servicesPrice: req.body.servicesPrice,
      address: req.body.address,
      furniture: req.body.furniture,
      convenience: req.body.convenience,
      img: urlImg,
    });
    console.log(newPost)
    const newPosts = await newPost.save();
    res.redirect("/host");
  },
};
