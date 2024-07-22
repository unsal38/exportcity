var express = require('express');
var router = express.Router();


router.get('/:lang', function(req, res) {
  res.render('403', { 
    title: '403', 
    lang: req.params.lang 
  });
});




router.get('/', function(req, res) {
  res.render('403', { 
    title: '403', 
    lang: "tr"
  });
});

module.exports = router;
