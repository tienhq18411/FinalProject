const express = require('express');
const router = express.Router();
const Controllers = require('../controller/authController');


router.get('/home',Controllers.home );
router.get('/login', Controllers.login);
router.post('/login', Controllers.postLogin);
router.get('/register', Controllers.register);
router.post('/register', Controllers.postRegister);
router.get('/logout', Controllers.logout);

module.exports = router;