var express = require('express');
var router = express.Router();
const fs = require('fs');


router.get('/:lang', function(req, res) {
  const lang = req.params.lang 
  const lang_json_name = `${lang}.json`
 
  const lang_json = fs.readFileSync(`./json_lang/${lang_json_name}`, "utf-8");
  const lang_json_parse = JSON.parse(lang_json)
  res.render('blog5', {
    lang,
    lang_json_data :lang_json_parse
  });
});


module.exports = router;
