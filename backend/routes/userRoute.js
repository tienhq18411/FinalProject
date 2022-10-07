const express = require('express');
const router = express.Router();
const Controllers = require('../controller/userController');
const authMiddleware = require('../middleware/jwt.auth');

router.get('/',authMiddleware.requireAuth,authMiddleware.checkUser , Controllers.indexUser);


module.exports = router;