var express = require('express');
var router = express.Router();
const fs = require('fs');
const urunSchema = require("../db/model/urunSchema")
const sektorSchema = require("../db/model/kategoriSchema")
const altsektorSchema = require("../db/model/kategoriAltSchema")
const referansSchema = require("../db/model/referansSchema")
const temsilciSchema = require("../db/model/temsilciSchema")
const abonelik_urun_planlariSchema = require("../db/model/abonelik_urun_planlariSchema")
const reklam_urun_planlariSchema = require("../db/model/reklam_urun_planlariSchema");
const ek_urun_planlariSchema = require("../db/model/ek_urun_planlariSchema");

var iyzco_abonelik_uyelikler = "e3a1cef7-9612-4391-b709-44ba2cf3b61d"
var iyzco_reklam_abonelik_uyelikler = "329d8689-b42e-4ff5-99ef-d325fc8050dd"
var iyzco_ek_abonelik_uyelikler = "d292fbef-d010-4c2c-b5f7-dbbb4631c088"

router.get('/:lang', async function (req, res) {
  // DİL JSON DOSYASI //////////////////////////////////
  const lang_query = req.params.lang.toString()
  const lang_check = ["tr", "en", "fr", "ar"]
  const check_lang = lang_check.filter(data => data === lang_query);
  if (check_lang.length <= 0) {
    var lang = "tr"
  }
  const lang_telealankodu_json_name = `${lang}-telealankodu.json`
  const lang_json = fs.readFileSync(`./json_lang/${lang}.json`, "utf-8");
  const lang_telealankodu_json = fs.readFileSync(`./json_lang/${lang_telealankodu_json_name}`, "utf-8");
  const lang_json_parse = JSON.parse(lang_json)
  const lang_telealankodu_json_parse = JSON.parse(lang_telealankodu_json)
  /// DATABASE SORGULAMA ORTAK  //////////////////////////////////////////////////////////////////
  const sektor = await sektorSchema.find();
  const alt_sektor = await altsektorSchema.find();
  const referans = await referansSchema.find();
  const temsilci = await temsilciSchema.find();
  const abonelik_urun_planlari_uyelikler = await abonelik_urun_planlariSchema.find({
    abonelik_urun_referans_kodu: iyzco_abonelik_uyelikler
  });
  const reklam_urun_planlari_uyelikler = await reklam_urun_planlariSchema.find({
    abonelik_urun_referans_kodu: iyzco_reklam_abonelik_uyelikler
  })
  const ek_urun_planlari_uyelikler = await ek_urun_planlariSchema.find({
    abonelik_urun_referans_kodu: iyzco_ek_abonelik_uyelikler
  })
  /// DATABASE SORGULAMA MARQUEE  //////////////////////////////////////////////////////////////////
  const urun_listele_marquee = await urunSchema
    .find()
    .sort({ tiklanmaSayisi: -1 })
    .limit(10)
  /// DATABASE SORGULAMA ÖNE ÇIKAN ÜRÜN  //////////////////////////////////////////////////////////////////
  const urun_listele_one_cikan_urun = await urunSchema
    .find({
      urunhizmet: true,
      tiklanmaSayisi: { $gt: 0 }
    })
    .sort({ tiklanmaSayisi: -1 })
    .limit()
  /// DATABASE SORGULAMA ÖNE ÇIKAN HİZMET  //////////////////////////////////////////////////////////////////
  const urun_listele_one_cikan_hizmet = await urunSchema
    .find({
      urunhizmet: false,
      tiklanmaSayisi: { $gt: 0 }
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
    temsilci,
    sektor,
    alt_sektor,
    abonelik_urun_planlari_uyelikler,
    reklam_urun_planlari_uyelikler,
    ek_urun_planlari_uyelikler
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
  const temsilci = await temsilciSchema.find();
  const abonelik_urun_planlari_uyelikler = await abonelik_urun_planlariSchema.find({
    abonelik_urun_referans_kodu: iyzco_abonelik_uyelikler
  });
  const reklam_urun_planlari_uyelikler = await reklam_urun_planlariSchema.find({
    abonelik_urun_referans_kodu: iyzco_reklam_abonelik_uyelikler
  })
  const ek_urun_planlari_uyelikler = await ek_urun_planlariSchema.find({
    abonelik_urun_referans_kodu: iyzco_ek_abonelik_uyelikler
  })

  /// DATABASE SORGULAMA MARQUEE  //////////////////////////////////////////////////////////////////
  const urun_listele_marquee = await urunSchema
    .find()
    .sort({ tiklanmaSayisi: -1 })
    .limit(10)
  /// DATABASE SORGULAMA ÖNE ÇIKAN ÜRÜN  //////////////////////////////////////////////////////////////////
  const urun_listele_one_cikan_urun = await urunSchema
    .find({
      urunhizmet: true,
      tiklanmaSayisi: { $gt: 0 }
    })
    .sort({ tiklanmaSayisi: -1 })
    .limit()
  /// DATABASE SORGULAMA ÖNE ÇIKAN HİZMET  //////////////////////////////////////////////////////////////////
  const urun_listele_one_cikan_hizmet = await urunSchema
    .find({
      urunhizmet: false,
      tiklanmaSayisi: { $gt: 0 }
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
    temsilci,
    referans,
    sektor,
    alt_sektor,
    abonelik_urun_planlari_uyelikler,
    reklam_urun_planlari_uyelikler,
    ek_urun_planlari_uyelikler
  });
});

module.exports = router;