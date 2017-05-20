var config = require('server/config');
var express = require('express');
var router = express.Router();

router.use('/products', require('./products'));

module.exports = router;