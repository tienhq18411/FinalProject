const express = require("express");
const multer = require("multer");
const router = express.Router();
const Controllers = require("../controller/hostController");
const authMiddleware = require("../middleware/jwt.auth");
const upload = require("../middleware/upload");
router.get(
  "/",
  authMiddleware.requireAuth,
  Controllers.indexHost
);
router.get("/createPost",authMiddleware.requireAuth, Controllers.createPost);
router.post("/createPost",authMiddleware.requireAuth, upload.array("img", 10), Controllers.postCreatepost);

router.get("/updatePost/:id",authMiddleware.requireAuth, Controllers.updatePost);
router.post("/updatePost",authMiddleware.requireAuth, Controllers.postUpdatePost);

router.get("/deletePost/:id",authMiddleware.requireAuth, Controllers.deletePost);
router.get("/comment",authMiddleware.requireAuth, Controllers.commentPost);
router.post("/comment",authMiddleware.requireAuth, Controllers.commentPost);
module.exports = router;
