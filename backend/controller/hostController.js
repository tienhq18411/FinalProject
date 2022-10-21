const Post = require("../models/post");
const multer = require("multer");
const path = require("path");

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
    });
    if (req.file) {
      Post.img = req.file.path;
    }
    const newPosts = await newPost.save();
    res.redirect("/host");
  },
  upload: function (req, res) {
    const storage = multer.diskStorage({
      destination: function (req, file, data) {
        data(null, ".public/images");
      },
      filename: function (req, file, data) {
        data(null, file.originalname);
      },
    });
    const upload = multer({ storage: storage });
    upload.array("file", 10);
    res.redirect("/host");
  },
};
