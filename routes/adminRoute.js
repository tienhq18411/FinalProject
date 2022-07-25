const express = require('express');
const router = express.Router();
const Controllers = require('../controller/adminController');
const authMiddleware = require('../middleware/jwt.auth');

router.get('/admin', Controllers.getAccount);


module.exports = router;