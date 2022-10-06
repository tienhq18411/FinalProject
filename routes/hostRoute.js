const express = require("express");
const router = express.Router();
const Controllers = require("../controller/hostController");
const authMiddleware = require("../middleware/jwt.auth");

router.get(
  "/",
  authMiddleware.requireAuth,
  authMiddleware.checkHost,
  Controllers.indexHost
);
router.get("/createPost", Controllers.createPost);
router.post("/createPost", Controllers.postCreatepost);

module.exports = router;
