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
const urunSchema = require("../db/model/urunSchema.js")
const kategoriSchema = require("../db/model/kategoriSchema.js");
const altkategoriSchema = require("../db/model/kategoriAltSchema.js");

router.post("/incele", async (req, res) => {
  const access_token_split = req.headers.cookie.split("accessToken=")
  try {
    // TOKEN SORGU - DATABASE SORGU
    const access_token = access_token_split[1]
    const user_data = await jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET)
    const user_server_data = await userSchema.findById(user_data.userid)

    
    // TOKEN SORGU - DATABASE SORGU

    const user_id = user_server_data._id
    const uyeUrunHizmetGorme_server = user_server_data.uyeUrunHizmetGorme
    const maxuyeUrunHizmetGorme_server = user_server_data.maxuyeUrunHizmetGorme
    const click_urun_id = req.body.urun_id
    const urun_server_data = await urunSchema.findById(click_urun_id)
    const urun_kategori = await kategoriSchema.findById(urun_server_data.sektor)
    const urun_alt_kategori = await altkategoriSchema.findById(urun_server_data.kategori)
    const firma_unvani = user_server_data.firmaUnvani
    const new_uyeUrunHizmetGorme_array = new Array()

    if (uyeUrunHizmetGorme_server === undefined) {
      new_uyeUrunHizmetGorme_array.push(click_urun_id)
      await userSchema.findByIdAndUpdate(user_id, { uyeUrunHizmetGorme: new_uyeUrunHizmetGorme_array })
      res.send({ message: true ,urun_data: urun_server_data, urun_kategori, urun_alt_kategori,firma_unvani, user_id})
    } else {
      if (uyeUrunHizmetGorme_server.length <= maxuyeUrunHizmetGorme_server) {
        if (uyeUrunHizmetGorme_server.length === maxuyeUrunHizmetGorme_server) {
          const check = uyeUrunHizmetGorme_server.filter(data => data === click_urun_id)
          if (check.length > 0) res.send({ message: true ,urun_data: urun_server_data, urun_kategori, urun_alt_kategori,firma_unvani, user_id})
          if (check.length == 0) res.send({ message: false })
        } else if (uyeUrunHizmetGorme_server.length < maxuyeUrunHizmetGorme_server) {
          const check = uyeUrunHizmetGorme_server.filter(data => data === click_urun_id)
          if (check.length > 0) res.send({ message: true ,urun_data: urun_server_data, urun_kategori, urun_alt_kategori,firma_unvani, user_id})
          if (check.length == 0) {
            new_uyeUrunHizmetGorme_array.push(click_urun_id)
            uyeUrunHizmetGorme_server.forEach(v => {
              new_uyeUrunHizmetGorme_array.push(v)
            });
            await userSchema.findByIdAndUpdate(user_id, { uyeUrunHizmetGorme: new_uyeUrunHizmetGorme_array })
          }

        }
      }
      if (uyeUrunHizmetGorme_server.length > maxuyeUrunHizmetGorme_server) res.send({ message: false })
    }
  } catch (error) {
    console.log(error)
    res.send(message = false)
  }
})
router.post("/urun-favori", async (req, res) => {
  try {
    const accessToken_split = req.headers.cookie.split("accessToken=")
    const user_data = await jwt.verify(accessToken_split[1], process.env.ACCESS_TOKEN_SECRET)
    const user_id = user_data.userid
    const user_data_server = await userSchema.findById(user_id)
    var click_favori_urun = req.body.favori_urun_id_data
    const user_favori_urun = user_data_server.favoriurun
    var new_favori_array = new Array()
    if (user_favori_urun) { var urun_check = user_favori_urun.filter(data => data === click_favori_urun) }
    if (urun_check) {
      if (urun_check.length == 0) {
        if (click_favori_urun !== undefined) {
          user_favori_urun.forEach(v => {
            new_favori_array.push(v)
          });
        } else { return }
        new_favori_array.push(click_favori_urun)
        await userSchema.findByIdAndUpdate(user_id, {
          favoriurun: new_favori_array
        });
        res.send({
          favori_list: new_favori_array,
          changed_urun: click_favori_urun
        })
      } else if (urun_check.length > 0) {
        user_favori_urun.forEach(v => {
          if (v !== click_favori_urun) new_favori_array.push(v)
        });
        await userSchema.findByIdAndUpdate(user_id, { favoriurun: new_favori_array });
        res.send({
          favori_list: new_favori_array,
          changed_urun: click_favori_urun
        })
      }
    } else {
      new_favori_array.push(click_favori_urun)
      await userSchema.findByIdAndUpdate(user_id, { favoriurun: new_favori_array });
      res.send({
        favori_list: new_favori_array,
        changed_urun: click_favori_urun
      })
    }
  } catch (error) {
    console.log(error, "error urunliste js")
  }
})

router.get('/:lang', permissioncheck(["pageadmin", "user"]), function (req, res, next) {
  const lang = req.params.lang
  const lang_json_name = `${lang}.json`
  const lang_json = fs.readFileSync(`./json_lang/${lang_json_name}`, "utf-8");
  const lang_json_parse = JSON.parse(lang_json)
  res.render('urunlistele', {
    lang,
    lang_json_data: lang_json_parse
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
