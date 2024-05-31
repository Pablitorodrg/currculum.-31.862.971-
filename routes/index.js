var express = require('express');
var router = express.Router();
require('dotenv').config()


const ContactosController = require('./controllers/ContactosController')
const encapsular = new ContactosController();


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("asdads")

  res.render('index', { title: 'Hola mundo',
    RPUBLIC: process.env.RPUBLIC
  });
});

router.post('/form',(req,res) => encapsular.saveContact(req,res));

module.exports = router;
