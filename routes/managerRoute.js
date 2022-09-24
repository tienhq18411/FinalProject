const express = require('express');
const router = express.Router();
const Controllers = require('../controller/managerController');
const authMiddleware = require('../middleware/jwt.auth');

router.get('/',authMiddleware.requireAuth,authMiddleware.checkManager , Controllers.indexManager);


module.exports = router;