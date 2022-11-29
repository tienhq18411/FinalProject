const express = require("express");
const router = express.Router();
const Controllers = require("../controller/adminController");
const authMiddleware = require("../middleware/jwt.auth");

router.get(
  "/",
  authMiddleware.requireAuth,
  authMiddleware.checkAdmin,
  Controllers.indexAdmin
);

// manage account
router.get("/viewAccountAdmin",authMiddleware.requireAuth,authMiddleware.checkAdmin, Controllers.viewAccountAdmin);
router.get("/updateAccountAdmin/:id",authMiddleware.requireAuth,authMiddleware.checkAdmin, Controllers.updateAccountAdmin);
router.post("/updateAccountAdmin",authMiddleware.requireAuth,authMiddleware.checkAdmin, Controllers.postUpdateAccountAdmin);

router.get("/lockAccount/:id",authMiddleware.requireAuth,authMiddleware.checkAdmin, Controllers.lockAccount);
// manage post
router.get("/viewPost",authMiddleware.requireAuth,authMiddleware.checkAdmin, Controllers.viewPost);
router.get("/viewPost/:id",authMiddleware.requireAuth,authMiddleware.checkAdmin, Controllers.viewPost);
router.get("/updateStatusPost/:id",authMiddleware.requireAuth,authMiddleware.checkAdmin, Controllers.updateStatusPost);
//manage comment
router.get("/viewComment",authMiddleware.requireAuth,authMiddleware.checkAdmin, Controllers.viewComment);
router.get("/lockComment/:id",authMiddleware.requireAuth,authMiddleware.checkAdmin, Controllers.lockComment);


module.exports = router;
