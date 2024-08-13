var express = require('express');
var router = express.Router();
const fs = require('fs');
var path = require('path');
const { access_token } = require('../controllers/access_token');
const { reflesh_token } = require('../controllers/reflesh_token');
const tokenGenerate = require('../controllers/token_gerenate');
router.use(express.static(path.join(__dirname, 'public')));

router.get('/:lang', function(req, res) {
  const lang = req.params.lang 
 
  const lang_json = fs.readFileSync(`./json_lang/${lang}.json`, "utf-8");
  const lang_json_parse = JSON.parse(lang_json)
  res.render('login', {
    lang,
    lang_json_data :lang_json_parse
  });
});
router.post("/refleshToken", reflesh_token)
router.post("/accessToken", access_token)
router.post('/login', tokenGenerate.reflesh_Token_login);
module.exports = router;
