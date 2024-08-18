var express = require('express');
var router = express.Router();
const fs = require('fs');
const abonelik_urun_planlariSchema = require("../db/model/abonelik_urun_planlariSchema")
// MİDDLEWARE
const { permissioncheck } = require('../middleware/permissionCheck');

router.get('/panel-urun-giris/:lang', permissioncheck(["pageadmin", "user"]), function (req, res) {
  // DİL JSON DOSYASI //////////////////////////////////
  const lang = req.params.lang
  const lang_telealankodu_json_name = `${lang}-telealankodu.json`
  const lang_json = fs.readFileSync(`./json_lang/${lang}.json`, "utf-8");
  const lang_telealankodu_json = fs.readFileSync(`./json_lang/${lang_telealankodu_json_name}`, "utf-8");
  const lang_json_parse = JSON.parse(lang_json)
  const lang_telealankodu_json_parse = JSON.parse(lang_telealankodu_json)
  res.render('panel-urun-giris', {
    lang,
    lang_json_data: lang_json_parse,
    lang_telealankodu_json_parse,
  });
});
router.get('/panel-odeme-plani-girisi/:lang', permissioncheck(["pageadmin", "employeeOdemeControl"]), async function (req, res) {
  const iyzco_abonelik_uyelikler = "e3a1cef7-9612-4391-b709-44ba2cf3b61d"
  // DİL JSON DOSYASI //////////////////////////////////
  const lang = req.params.lang
  const lang_telealankodu_json_name = `${lang}-telealankodu.json`
  const lang_json = fs.readFileSync(`./json_lang/${lang}.json`, "utf-8");
  const lang_telealankodu_json = fs.readFileSync(`./json_lang/${lang_telealankodu_json_name}`, "utf-8");
  const lang_json_parse = JSON.parse(lang_json)
  const lang_telealankodu_json_parse = JSON.parse(lang_telealankodu_json)
    /// DATABASE SORGULAMA ORTAK  //////////////////////////////////////////////////////////////////
  const abonelik_urun_planlari_uyelikler = await abonelik_urun_planlariSchema.find({
    abonelik_urun_referans_kodu: iyzco_abonelik_uyelikler
  });
  res.render('panel-odeme-plani-girisi', {
    lang,
    lang_json_data: lang_json_parse,
    lang_telealankodu_json_parse,
    abonelik_urun_planlari_uyelikler
  });
});
router.get('/:lang',permissioncheck(["pageadmin", "user"]), function (req, res) {
  // DİL JSON DOSYASI //////////////////////////////////
  const lang = req.params.lang
  const lang_telealankodu_json_name = `${lang}-telealankodu.json`
  const lang_json = fs.readFileSync(`./json_lang/${lang}.json`, "utf-8");
  const lang_telealankodu_json = fs.readFileSync(`./json_lang/${lang_telealankodu_json_name}`, "utf-8");
  const lang_json_parse = JSON.parse(lang_json)
  const lang_telealankodu_json_parse = JSON.parse(lang_telealankodu_json)
  res.render('panel', {
    lang,
    lang_json_data: lang_json_parse,
    lang_telealankodu_json_parse,
  });
});

module.exports = router;
