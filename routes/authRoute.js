const express = require('express');
const router = express.Router();
const Controllers = require('../controller/authController');

router.get('/login', Controllers.login);
router.post('/login', Controllers.postLogin);
router.get('/register', Controllers.register);
router.post('/register', Controllers.postRegister);

module.exports = router;