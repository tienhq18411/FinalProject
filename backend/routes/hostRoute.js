const express = require("express");
const multer = require("multer");
const router = express.Router();
const Controllers = require("../controller/hostController");
const authMiddleware = require("../middleware/jwt.auth");
const upload = require("../middleware/upload");
router.get(
  "/",
  authMiddleware.requireAuth,
  authMiddleware.checkHost,
  Controllers.indexHost
);
router.get("/createPost", upload.single("img"), Controllers.createPost);
router.post("/createPost", upload.single("img"), Controllers.postCreatepost);

module.exports = router;
