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
router.get("/viewAccountAdmin", Controllers.viewAccountAdmin);

router.get("/createAccountAdmin", Controllers.createAccountAdmin);
router.post("/createAccountAdmin", Controllers.postCreateAccountAdmin);

router.get("/viewAccountUser", Controllers.viewAccountUser);
router.get("/viewAccountHost", Controllers.viewAccountHost);

router.get("/updateAccountAdmin", Controllers.updateAccountAdmin);
router.post("/updateAccountAdmin", Controllers.postUpdateAccountAdmin);
router.get("/updateAccountUser", Controllers.updateAccountUser);
router.get("/updateAccountHost", Controllers.updateAccountHost);

router.get("/deleteAccountAdmin", Controllers.deleteAccountAdmin);

module.exports = router;
