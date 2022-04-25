var express = require('express');
var router = express.Router();

/* GET home page. */
router.use('/', function(req, res, next) {
  res.render('joinroom', { title: 'Unir-se' });
});

module.exports = router;
