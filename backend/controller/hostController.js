const Post = require("../models/post");

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
    console.log(newPost);
    const newPosts = await newPost.save();
    res.redirect("/host");
  },
  updatePost: async function (req, res) {
    const id = req.params.id;
    const newPost = await Post.findById(id);
    res.render("host/updatePost", { newPost: newPost });
  },
  postUpdatePost: async function (req, res) {
    const id = req.body.id;
    await Post.findByIdAndUpdate(id, {
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
    await Post.findByIdAndRemove(req.params.id);
    res.redirect("/host");
  },
};
