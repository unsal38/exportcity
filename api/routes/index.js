var express = require('express');
var router = express.Router();
const fs = require('fs');
const urunSchema = require("../db/model/urunSchema")
const sektorSchema = require("../db/model/kategoriSchema")
const altsektorSchema = require("../db/model/kategoriAltSchema")




router.get('/:lang', async function (req, res) {
  // DİL JSON DOSYASI //////////////////////////////////
  const lang = req.params.lang
  const lang_json_name = `${lang}.json`
  const lang_telealankodu_json_name = `${lang}-telealankodu.json`
  const lang_json = fs.readFileSync(`./json_lang/${lang_json_name}`, "utf-8");
  const lang_telealankodu_json = fs.readFileSync(`./json_lang/${lang_telealankodu_json_name}`, "utf-8");
  const lang_json_parse = JSON.parse(lang_json)
  const lang_telealankodu_json_parse = JSON.parse(lang_telealankodu_json)
  /// DATABASE SORGULARITY  //////////////////////////////////////////////////////////////////
  const urun = await urunSchema
    .find()
    .sort({ tiklanmaSayisi: -1 })
    .limit(2)
  const sektor = await sektorSchema.find()
  const alt_sektor = await altsektorSchema.find()
  /// DATABASE SORGULARITY  //////////////////////////////////////////////////////////////////

  res.render('index', {
    lang,
    lang_json_data: lang_json_parse,
    lang_telealankodu_json_parse,
    urun,
    sektor,
    alt_sektor
  });
});
router.get('/', async function (req, res) {
  const lang = "tr"
  const lang_json_name = `${lang}.json`
  const lang_telealankodu_json_name = `${lang}-telealankodu.json`
  const lang_json = fs.readFileSync(`./json_lang/${lang_json_name}`, "utf-8");
  const lang_telealankodu_json = fs.readFileSync(`./json_lang/${lang_telealankodu_json_name}`, "utf-8");
  const lang_json_parse = JSON.parse(lang_json)
  const lang_telealankodu_json_parse = JSON.parse(lang_telealankodu_json)
  /// DATABASE SORGULARITY  //////////////////////////////////////////////////////////////////
  const urun = await urunSchema
    .find()
    .sort({ tiklanmaSayisi: -1 })
    .limit(2)
  const sektor = await sektorSchema.find()
  const alt_sektor = await altsektorSchema.find()
  /// DATABASE SORGULARITY  //////////////////////////////////////////////////////////////////

  res.render('index', {
    lang,
    lang_json_data: lang_json_parse,
    lang_telealankodu_json_parse,
    urun,
    sektor,
    alt_sektor
  });
});

module.exports = router;

  // uruncheck
  // userid
  // urunhizmet // TRUE ÜRÜN FALSE HİZMET
  // satisalis // true SATIŞ MI FALSE ALIŞ
  // urunadi: {
  //   tr
  //   en
  // },
  // aciklama: {
  //   try
  //   en
  // },
  // ulke
  // sektor: , // KATEGORİ SCHEM
  // kategori: , // ALT KATEGORİ SCHEMA
  // miktar: ,
  // serino: ,
  // imgsrc: ,
  // tiklanmaSayisi
  // red_message