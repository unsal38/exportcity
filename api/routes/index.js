var express = require('express');
const urlCheck = require('../middleware/urlCheck');
var router = express.Router();

/* GET home page. */




router.get('/:lang',urlCheck.urlCheck(), function(req, res) {
  res.render('index', { 
    title: 'index', 
    lang: req.params.lang 
  });
});
router.get('/',urlCheck.urlCheck(), function(req, res) {
  res.render('index', { 
    title: 'index', 
    lang: "tr"
  });
});

module.exports = router;
