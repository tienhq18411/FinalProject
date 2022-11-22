const express = require("express");
const router = express.Router();
const Controllers = require("../controller/authController");

router.get("/home", Controllers.home);
router.get("/detail/:id", Controllers.postViewDetail);
// router.post("/detail/:id", Controllers.postViewDetail);
router.get("/login", Controllers.login);
router.post("/login", Controllers.postLogin);
router.get("/register", Controllers.register);
router.post("/register", Controllers.postRegister);
router.get("/logout", Controllers.logout);
router.get("/search", Controllers.search);

module.exports = router;
