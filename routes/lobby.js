var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('lobby', { title: 'Sala de Espera' });
});

module.exports = router;
