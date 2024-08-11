var express = require('express');
var router = express.Router();
const fs = require('fs');
const urunSchema = require("../db/model/urunSchema")
const sektorSchema = require("../db/model/kategoriSchema")
const altsektorSchema = require("../db/model/kategoriAltSchema")
const referansSchema = require("../db/model/referansSchema")


router.get('/:lang', async function (req, res) {
  // DİL JSON DOSYASI //////////////////////////////////
  const lang = req.params.lang
  const lang_telealankodu_json_name = `${lang}-telealankodu.json`
  const lang_json = fs.readFileSync(`./json_lang/${lang}.json`, "utf-8");
  const lang_telealankodu_json = fs.readFileSync(`./json_lang/${lang_telealankodu_json_name}`, "utf-8");
  const lang_json_parse = JSON.parse(lang_json)
  const lang_telealankodu_json_parse = JSON.parse(lang_telealankodu_json)
 /// DATABASE SORGULAMA ORTAK  //////////////////////////////////////////////////////////////////
 const sektor = await sektorSchema.find();
 const alt_sektor = await altsektorSchema.find();
 const referans = await referansSchema.find();
 /// DATABASE SORGULAMA MARQUEE  //////////////////////////////////////////////////////////////////
 const urun_listele_marquee = await urunSchema
   .find()
   .sort({ tiklanmaSayisi: -1 })
   .limit(10)
 /// DATABASE SORGULAMA ÖNE ÇIKAN ÜRÜN  //////////////////////////////////////////////////////////////////
 const urun_listele_one_cikan_urun = await urunSchema
 .find({
   urunhizmet: true,
   tiklanmaSayisi: {$gt: 0}
 })
 .sort({ tiklanmaSayisi: -1 })
 .limit()
 /// DATABASE SORGULAMA ÖNE ÇIKAN HİZMET  //////////////////////////////////////////////////////////////////
 const urun_listele_one_cikan_hizmet = await urunSchema
 .find({
   urunhizmet: false,
   tiklanmaSayisi: {$gt: 0}
 })
 .sort({ tiklanmaSayisi: -1 })
 .limit()
 
 res.render('index', {
   lang,
   lang_json_data: lang_json_parse,
   lang_telealankodu_json_parse,
   urun_listele_marquee,
   urun_listele_one_cikan_urun,
   urun_listele_one_cikan_hizmet,
   referans,
    sektor,
    alt_sektor
  });
});
router.get('/', async function (req, res) {
  /// DİL ÇEVİRİ JSONLAR  //////////////////////////////////////////////////////////////////
  const lang = "tr"
  const lang_json_name = `${lang}.json`
  const lang_telealankodu_json_name = `${lang}-telealankodu.json`
  const lang_json = fs.readFileSync(`./json_lang/${lang_json_name}`, "utf-8");
  const lang_telealankodu_json = fs.readFileSync(`./json_lang/${lang_telealankodu_json_name}`, "utf-8");
  const lang_json_parse = JSON.parse(lang_json)
  const lang_telealankodu_json_parse = JSON.parse(lang_telealankodu_json)
  /// DATABASE SORGULAMA ORTAK  //////////////////////////////////////////////////////////////////
  const sektor = await sektorSchema.find();
  const alt_sektor = await altsektorSchema.find();
  const referans = await referansSchema.find();
  /// DATABASE SORGULAMA MARQUEE  //////////////////////////////////////////////////////////////////
  const urun_listele_marquee = await urunSchema
    .find()
    .sort({ tiklanmaSayisi: -1 })
    .limit(10)
  /// DATABASE SORGULAMA ÖNE ÇIKAN ÜRÜN  //////////////////////////////////////////////////////////////////
  const urun_listele_one_cikan_urun = await urunSchema
  .find({
    urunhizmet: true,
    tiklanmaSayisi: {$gt: 0}
  })
  .sort({ tiklanmaSayisi: -1 })
  .limit()
  /// DATABASE SORGULAMA ÖNE ÇIKAN HİZMET  //////////////////////////////////////////////////////////////////
  const urun_listele_one_cikan_hizmet = await urunSchema
  .find({
    urunhizmet: false,
    tiklanmaSayisi: {$gt: 0}
  })
  .sort({ tiklanmaSayisi: -1 })
  .limit()
  
  res.render('index', {
    lang,
    lang_json_data: lang_json_parse,
    lang_telealankodu_json_parse,
    urun_listele_marquee,
    urun_listele_one_cikan_urun,
    urun_listele_one_cikan_hizmet,
    referans,
    sektor,
    alt_sektor
  });
});

module.exports = router;