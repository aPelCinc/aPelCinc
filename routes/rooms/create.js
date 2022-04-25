var express = require('express');
var router = express.Router();

let nom = "";
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('rooms/create', { title: "Crear Partida",nick:  req.query.nom});
});

module.exports = router;
