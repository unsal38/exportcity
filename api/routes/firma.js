var express = require('express');
var router = express.Router();
const fs = require('fs');
var jwt = require('jsonwebtoken');
var path = require('path');
router.use(express.static(path.join(__dirname, 'public')));
// MİDDLEWARE
const { permissioncheck } = require('../middleware/permissionCheck');
// SCHEMA
const userSchema = require("../db/model/users.js");
const urunSchema = require("../db/model/urunSchema.js");
const sektorSchema = require("../db/model/kategoriSchema");
const altsektorSchema = require("../db/model/kategoriAltSchema");


router.get('/:lang', permissioncheck(["pageadmin", "user"]), async function (req, res) {
  const lang = req.params.lang
  const lang_json = fs.readFileSync(`./json_lang/${lang}.json`, "utf-8");
  const lang_json_parse = JSON.parse(lang_json)
  const lang_telealankodu_json_name = `${lang}-telealankodu.json`
  const lang_telealankodu_json = fs.readFileSync(`./json_lang/${lang_telealankodu_json_name}`, "utf-8");
  const lang_telealankodu_json_parse = JSON.parse(lang_telealankodu_json)
  const firma_user_id = req.query.firma

  
  /// DATABASE SORGULAMA  //////////////////////////////////////////////////////////////////
  try {
   var user_data = await userSchema.findById(firma_user_id) 
  } catch (error) {
    console.log(error);
    res.redirect("/login/tr");
  }
  
  const firma_urun_listele = await urunSchema
    .find({userid: firma_user_id})
    .sort({ tiklanmaSayisi: -1 })
    .limit()




console.log(user_data)

  res.render('firma', {
    lang,
    lang_json_data: lang_json_parse,
    lang_telealankodu_json_parse,
    user_data
  });
});

module.exports = router;
