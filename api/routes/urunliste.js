var express = require('express');
var router = express.Router();
const urlCheck = require('../middleware/urlCheck');
const { permissioncheck } = require('../middleware/permissionCheck');

/* GET home page. */
router.get('/:lang',urlCheck.urlCheck(),permissioncheck(["pageadmin","user"]), function(req, res, next) {
  
  res.render('urunlistele', { 
    title: 'urunlistele',
    lang: req.params.lang  
  });
});

module.exports = router;
