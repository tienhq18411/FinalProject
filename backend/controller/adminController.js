const bcrypt = require("bcrypt");
const Post = require("../models/post");
const account = require("../models/accounts");
const Comment = require("../models/comment");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  indexAdmin: function (req, res) {
    res.redirect(`/admin/viewAccountAdmin`);
  },

  viewAccountAdmin: async function (req, res) {
    let user = {};
    const project = { _id: 0 };
    const query = req.query;
    console.log(query);
    const _query = {};
    let sort = {
      createDate: -1,
    };
    if (query.searchKey) {
      _query.$or = [
        { username: { $regex: query.searchKey } },
        { user: { $regex: query.searchKey } },
        { phone: { $regex: query.searchKey } },
      ];
    }
    if (query.sort) {
      sort = CommonUtils.transformSort(query.sort) || {
        createDate: -1,
      };
      delete query.sort;
    }
    _query.status = { $nin: ["INIT"] };
    const page = query.page || 1;
    const pageSize = query.pageSize || 9;
    delete query.page;
    delete query.pageSize;
    user = await account
      .find(_query, project)
      .sort(sort)
      .skip(page * pageSize - pageSize)
      .limit(pageSize);
    const count = await account.countDocuments(_query);
    const totalPage = Math.floor((count + pageSize - 1) / pageSize);
    const pagination = {
      page: page,
      pageCount: totalPage,
    };
    res.render("admin/viewAccountAdmin", {
      user: user,
      pagination: pagination,
    });
  },
  lockAccount: async function (req, res) {
    const id = req.params.id;
    const active = req.query.active;
    await account.updateOne({ id: id }, { isActive: active });
    await Post.updateMany({ "user.id": id }, { "user.isActive": active });
    res.redirect(`/admin/viewAccountAdmin`);
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
    await account.findOneAndUpdate(
      { id: id },
      {
        name: req.body.name,
        username: req.body.username,
        password: hashed,
        role: "admin",
      }
    );
    res.redirect("/admin/viewAccountAdmin");
  },
  deleteAccountAdmin: async function (req, res) {
    await account.findByIdAndUpdate(req.params.id, { isActive: false });
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
  viewPost: async function (req, res) {
    let post = {};
    const project = { _id: 0 };
    const query = req.query;
    console.log(query);
    const _query = {};
    let sort = {
      createDate: -1,
    };
    if (query.searchKey) {
      _query.$or = [
        { title: { $regex: query.searchKey } },
        { "user.username": { $regex: query.searchKey } },
      ];
    }
    if (query.sort) {
      sort = CommonUtils.transformSort(query.sort) || {
        createDate: -1,
      };
      delete query.sort;
    }
    _query.status = { $nin: ["INIT", "DELETE"] };
    const page = query.page || 1;
    const pageSize = query.pageSize || 9;
    delete query.page;
    delete query.pageSize;
    post = await Post.find(_query, project)
      .sort(sort)
      .skip(page * pageSize - pageSize)
      .limit(pageSize);
    const count = await Post.countDocuments(_query);
    const totalPage = Math.floor((count + pageSize - 1) / pageSize);
    const pagination = {
      page: page,
      pageCount: totalPage,
    };
    res.render("admin/viewPostAdmin", { post: post, pagination: pagination });
  },
  updateStatusPost: async function (req, res) {
    const id = req.params.id;
    const status = req.query.action;
    await Post.updateOne({ id: id }, { status: status });
    res.redirect(`/admin/viewPost`);
  },
  viewComment: async function (req, res) {
    let comment = {};
    const project = { _id: 0 };
    const query = req.query;
    const _query = {};
    let sort = {
      createDate: -1,
    };
    if (query.searchKey) {
      _query.$or = [
        { comment: { $regex: query.searchKey } },
        { "user.username": { $regex: query.searchKey } },
        { "post.title": { $regex: query.searchKey } },
      ];
    }
    if (query.sort) {
      sort = CommonUtils.transformSort(query.sort) || {
        createDate: -1,
      };
      delete query.sort;
    }
    const page = query.page || 1;
    const pageSize = query.pageSize || 9;
    delete query.page;
    delete query.pageSize;
    comment = await Comment.find(_query, project)
      .sort(sort)
      .skip(page * pageSize - pageSize)
      .limit(pageSize);
    const count = await Comment.countDocuments(_query);
    const totalPage = Math.floor((count + pageSize - 1) / pageSize);
    const pagination = {
      page: page,
      pageCount: totalPage,
    };
    res.render("admin/viewCommentAdmin", {
      comment: comment,
      pagination: pagination,
    });
  },
  lockComment: async function (req, res) {
    const id = req.params.id;
    const active = req.query.active;
    await Comment.updateOne({ id: id }, { isActive: active });
    res.redirect(`/admin/viewComment`);
  },
};
