var express = require('express');
var router = express.Router();
const fs = require('fs');
const userSchema = require('../db/model/users');
const abonelik_urun_planlariSchema = require("../db/model/abonelik_urun_planlariSchema")
const reklam_urun_planlariSchema = require("../db/model/reklam_urun_planlariSchema");
const ek_urun_planlariSchema = require("../db/model/ek_urun_planlariSchema");
// MİDDLEWARE
const { permissioncheck } = require('../middleware/permissionCheck');

router.get('/panel-urun-giris/:lang', permissioncheck(["pageadmin", "user"]),async function (req, res) {
    //// lOGİN ROLE //////////////////////////////////
    const login_user_id =req.user
    const login_user_data = await userSchema.findById(login_user_id)
    const login_user_role = login_user_data.uyeRole
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
    login_user_role
  });
});
router.get('/panel-odeme-plani-girisi/:lang', permissioncheck(["pageadmin", "employeeOdemeControl"]), async function (req, res) {
    //// lOGİN ROLE //////////////////////////////////
    const login_user_id =req.user
    const login_user_data = await userSchema.findById(login_user_id)
    const login_user_role = login_user_data.uyeRole
    ////İYZCO ABONELİK
  const iyzco_abonelik_uyelikler = "e3a1cef7-9612-4391-b709-44ba2cf3b61d"
  const iyzco_reklam_abonelik_uyelikler = "329d8689-b42e-4ff5-99ef-d325fc8050dd"
  const iyzco_ek_abonelik_uyelikler = "d292fbef-d010-4c2c-b5f7-dbbb4631c088"
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
  const reklam_urun_planlari_uyelikler = await reklam_urun_planlariSchema.find({
    abonelik_urun_referans_kodu: iyzco_reklam_abonelik_uyelikler
  })
  const ek_urun_planlari_uyelikler = await ek_urun_planlariSchema.find({
    abonelik_urun_referans_kodu: iyzco_ek_abonelik_uyelikler
  })
  res.render('panel-odeme-plani-girisi', {
    lang,
    lang_json_data: lang_json_parse,
    lang_telealankodu_json_parse,
    abonelik_urun_planlari_uyelikler,
    reklam_urun_planlari_uyelikler,
    ek_urun_planlari_uyelikler,
    login_user_role
  });
});
router.get("/panel-employee/:lang", permissioncheck(["pageadmin","uyecheck"]),async (req, res) => {
    //// lOGİN ROLE //////////////////////////////////
    const login_user_id =req.user
    const login_user_data = await userSchema.findById(login_user_id)
    const login_user_role = login_user_data.uyeRole
  // DİL JSON DOSYASI //////////////////////////////////
  const lang = req.params.lang
  const lang_telealankodu_json_name = `${lang}-telealankodu.json`
  const lang_json = fs.readFileSync(`./json_lang/${lang}.json`, "utf-8");
  const lang_telealankodu_json = fs.readFileSync(`./json_lang/${lang_telealankodu_json_name}`, "utf-8");
  const lang_json_parse = JSON.parse(lang_json)
  const lang_telealankodu_json_parse = JSON.parse(lang_telealankodu_json)
  //// DATBASE SORGULAMA
  const users_data = await userSchema.find()
  res.render('panel-employee', {
    lang,
    lang_json_data: lang_json_parse,
    lang_telealankodu_json_parse,
    users_data,
    login_user_role
  });
});
router.get("/panel-uye/:lang", permissioncheck(["pageadmin","uyecheck"]), async (req, res) => {
    //// lOGİN ROLE //////////////////////////////////
    const login_user_id =req.user
    const login_user_data = await userSchema.findById(login_user_id)
    const login_user_role = login_user_data.uyeRole
  // DİL JSON DOSYASI //////////////////////////////////
  const lang = req.params.lang
  const lang_telealankodu_json_name = `${lang}-telealankodu.json`
  const lang_json = fs.readFileSync(`./json_lang/${lang}.json`, "utf-8");
  const lang_telealankodu_json = fs.readFileSync(`./json_lang/${lang_telealankodu_json_name}`, "utf-8");
  const lang_json_parse = JSON.parse(lang_json)
  const lang_telealankodu_json_parse = JSON.parse(lang_telealankodu_json)

  ///DATABASE //////////////////////////////////////////////////////////////////
  const all_users = await userSchema.find({uyeRole: "user"})
  console.log(all_users)
  res.render('panel-uye', {
    lang,
    lang_json_data: lang_json_parse,
    lang_telealankodu_json_parse,
    login_user_role,
    all_users
  });
}); //  TAMAMLANMADI



router.get('/:lang', permissioncheck(["pageadmin", "user"]),async function (req, res) {
  //// lOGİN ROLE //////////////////////////////////
  const login_user_id =req.user
  const login_user_data = await userSchema.findById(login_user_id)
  const login_user_role = login_user_data.uyeRole
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
    login_user_role
  });
});

module.exports = router;
