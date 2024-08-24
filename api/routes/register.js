var express = require('express');
var router = express.Router();
const fs = require('fs');
var path = require('path');
router.use(express.static(path.join(__dirname, 'public')));

const register = require("../controllers/register");

router.post("/", register.register)
router.post("/user-delete", register.user_delete)
router.post("/employee", register.employee_register)
router.post("/register-regrefcod-check", register.register_regrefcod_check)
router.get('/:lang', function (req, res) {
  const lang = req.params.lang
  const lang_json_name = `${lang}.json`

  const lang_json = fs.readFileSync(`./json_lang/${lang_json_name}`, "utf-8");
  const lang_json_parse = JSON.parse(lang_json)
  const lang_telealankodu_json = fs.readFileSync(`./json_lang/${lang}-telealankodu.json`, "utf-8");
  const lang_telealankodu_json_parse = JSON.parse(lang_telealankodu_json)
  res.render('register', {
    lang,
    lang_json_data: lang_json_parse,
    lang_telealankodu_json_parse
  });
});


module.exports = router;
