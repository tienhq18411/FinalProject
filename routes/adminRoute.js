const express = require('express');
const router = express.Router();
const Controllers = require('../controller/adminController');
const authMiddleware = require('../middleware/jwt.auth');

router.get('/admin',authMiddleware.requireAuth, Controllers.viewAccountAdmin);
router.post('/admin',authMiddleware.checkLogin ,Controllers.postAccount);

module.exports = router;