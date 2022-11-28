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
router.get("/viewAccountAdmin", Controllers.viewAccountAdmin);

router.get("/updateAccountAdmin/:id", Controllers.updateAccountAdmin);
router.post("/updateAccountAdmin", Controllers.postUpdateAccountAdmin);

router.get("/disableAccountAdmin/:id", Controllers.deleteAccountAdmin);

// manage post
router.get("/viewPost", Controllers.viewPost);
router.get("/disablePost/:id", Controllers.deleteAccountAdmin);
//manage comment
router.get("/viewComment", Controllers.viewComment);
router.get("/disableComment/:id", Controllers.deleteAccountAdmin);


module.exports = router;
