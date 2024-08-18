var express = require('express');
var router = express.Router();
const fs = require('fs');

// MİDDLEWARE
const { permissioncheck } = require('../middleware/permissionCheck');

/// SCHEMA //////////////////////////////////////////////////////////////////
const urunSchema = require("../db/model/urunSchema")
const sektorSchema = require("../db/model/kategoriSchema")
const altsektorSchema = require("../db/model/kategoriAltSchema")

router.get('/:lang', permissioncheck(["pageadmin", "user"]), async function (req, res) {
  // DİL JSON DOSYASI //////////////////////////////////
  const lang = req.params.lang
  const lang_telealankodu_json_name = `${lang}-telealankodu.json`
  const lang_json = fs.readFileSync(`./json_lang/${lang}.json`, "utf-8");
  const lang_telealankodu_json = fs.readFileSync(`./json_lang/${lang_telealankodu_json_name}`, "utf-8");
  const lang_json_parse = JSON.parse(lang_json)
  const lang_telealankodu_json_parse = JSON.parse(lang_telealankodu_json)
  /// DATABASE SORGULAMA MARQUEE  //////////////////////////////////////////////////////////////////
  const urun_listele_marquee = await urunSchema
    .find()
    .sort({ tiklanmaSayisi: -1 })
    .limit(10)
  /// DATABASE SORGULAMA ORTAK  //////////////////////////////////////////////////////////////////
  const sektor = await sektorSchema.find();
  const alt_sektor = await altsektorSchema.find();

  res.render('payment', {
    lang,
    lang_json_data: lang_json_parse,
    lang_telealankodu_json_parse,
    urun_listele_marquee,
    sektor,
    alt_sektor
  });
});

module.exports = router;
