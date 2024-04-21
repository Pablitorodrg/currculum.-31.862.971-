var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("asdads")

  res.render('index', { title: 'Hola mundo2',});
});

module.exports = router;
