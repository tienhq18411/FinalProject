const express = require('express');
const router = express.Router();
const Controllers = require('../controller/adminController');


router.get('/admin', Controllers.getAccount);


module.exports = router;