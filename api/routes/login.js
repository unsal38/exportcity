var express = require('express');
var router = express.Router();
const urlCheck = require('../middleware/urlCheck');


router.get('/:lang',urlCheck.urlCheck(), function(req, res) {
  res.render('login', { 
    title: 'login', 
    lang: req.params.lang 
  });
});




router.get('/',urlCheck.urlCheck(), function(req, res) {
  res.render('login', { 
    title: 'login', 
    lang: "tr"
  });
});

module.exports = router;
