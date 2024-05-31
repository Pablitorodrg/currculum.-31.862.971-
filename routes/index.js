var express = require('express');
var router = express.Router();

const ContactosController = require('./models/model')

const encapsular = new ContactosController();


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("asdads")

  res.render('index', { title: 'Hola mundo',});
});

router.post('/form',(req,res) => encapsular.saveContact(req,res));



module.exports = router;
