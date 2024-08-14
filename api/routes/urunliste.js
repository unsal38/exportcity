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

const sektorSchema = require("../db/model/kategoriSchema")
const altsektorSchema = require("../db/model/kategoriAltSchema")
/// POST

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
    const urun_kategori = await sektorSchema.findById(urun_server_data.sektor)
    const urun_alt_kategori = await altsektorSchema.findById(urun_server_data.kategori)
    const firma_unvani = user_server_data.firmaUnvani
    const new_uyeUrunHizmetGorme_array = new Array()

    if (uyeUrunHizmetGorme_server === undefined) {
      new_uyeUrunHizmetGorme_array.push(click_urun_id)
      await userSchema.findByIdAndUpdate(user_id, { uyeUrunHizmetGorme: new_uyeUrunHizmetGorme_array })
      res.send({ message: true, urun_data: urun_server_data, urun_kategori, urun_alt_kategori, firma_unvani, user_id })
    } else {
      if (uyeUrunHizmetGorme_server.length <= maxuyeUrunHizmetGorme_server) {
        if (uyeUrunHizmetGorme_server.length === maxuyeUrunHizmetGorme_server) {
          const check = uyeUrunHizmetGorme_server.filter(data => data === click_urun_id)
          if (check.length > 0) res.send({ message: true, urun_data: urun_server_data, urun_kategori, urun_alt_kategori, firma_unvani, user_id })
          if (check.length == 0) res.send({ message: false })
        } else if (uyeUrunHizmetGorme_server.length < maxuyeUrunHizmetGorme_server) {
          const check = uyeUrunHizmetGorme_server.filter(data => data === click_urun_id)
          if (check.length > 0) res.send({ message: true, urun_data: urun_server_data, urun_kategori, urun_alt_kategori, firma_unvani, user_id })
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
/// GET
router.get('/:lang', permissioncheck(["pageadmin", "user"]), async function (req, res, next) {
  const lang = req.params.lang
  const lang_json = fs.readFileSync(`./json_lang/${lang}.json`, "utf-8");
  const lang_json_parse = JSON.parse(lang_json)
  const lang_telealankodu_json_name = `${lang}-telealankodu.json`
  const lang_telealankodu_json = fs.readFileSync(`./json_lang/${lang_telealankodu_json_name}`, "utf-8");
  const lang_telealankodu_json_parse = JSON.parse(lang_telealankodu_json)
  /// DATABASE SORGULAMA ORTAK  //////////////////////////////////////////////////////////////////
  const sektor = await sektorSchema.find();
  const alt_sektor = await altsektorSchema.find();
  /// DATABASE SORGULAMA MARQUEE  //////////////////////////////////////////////////////////////////
  const urun_listele_marquee = await urunSchema
    .find()
    .sort({ tiklanmaSayisi: -1 })
    .limit(10)
  /// DATABASE SORGULAMA  //////////////////////////////////////////////////////////////////
  const query_string = req.query
  const filter_array = new Array()
  /// LİMİT AYARLAMA  //////////////////////////////////////////////////////////////////

  const limit = req.headers.cookie
  const limit_split = limit.split(";")[0]
  var limit_sonuc = limit_split.split("limit=")[1]
  console.log(limit_sonuc)
  if (query_string.sirala !== undefined) {
    /// DATABASE SIRALAMA  //////////////////////////////////////////////////////////////////
    const sirala_query = query_string.sirala
    if (sirala_query === 1) { var sirala = { updateAt: -1 } } else { var sirala = { tiklanmaSayisi: -1 } }


    /// DATABASE URUN HİZMET  //////////////////////////////////////////////////////////////////
    const urun_hizmet_query = query_string.urun_hizmet
    if (urun_hizmet_query === "1") {
      const urun_hizmet = { urunhizmet: true }
      filter_array.push(urun_hizmet)
    } else if (urun_hizmet_query === "2") {
      const urun_hizmet = { urunhizmet: false }
      filter_array.push(urun_hizmet)
    }
    /// DATABASE ULKE  //////////////////////////////////////////////////////////////////
    const ulke_query = query_string.ulke.toUpperCase()
    if (ulke_query !== "0") {
      const ulke = { ulke: ulke_query }
      filter_array.push(ulke)
    }
    /// DATABASE KATEGORİ  //////////////////////////////////////////////////////////////////
    const kategori_query = query_string.kategori
    if (kategori_query !== "0") {
      const sektor_filter = { sektor: kategori_query }
      filter_array.push(sektor_filter)
    }
    /// DATABASE alt KATEGORİ  //////////////////////////////////////////////////////////////////
    const altkategori_query = query_string.alt_kategori
    if (altkategori_query !== "0" && undefined) {
      const kategori_filter = { kategori: altkategori_query }
      filter_array.push(kategori_filter)
    }
    /// DATABASE serial  ///////////////////////////yesnonoyes38123123123///////////////////////////////////////
    const seri_nu_query = query_string.serial.toLowerCase()
    if (seri_nu_query.length > 0) {
      const seri_nu_filter = { serino: seri_nu_query }
      filter_array.push(seri_nu_filter)
    }

    if (filter_array.length > 0) {
      if(limit_sonuc === undefined) {var new_limit = 10}else {var new_limit = limit_sonuc}
      var urun_listele = await urunSchema
        .find(
          {
            $and: filter_array
          }
        )
        .sort(sirala)
        .limit(new_limit)
    } else {
      if(limit_sonuc === undefined) {var new_limit = 10}else {var new_limit = limit_sonuc}
      var urun_listele = await urunSchema
        .find()
        .sort(sirala)
        .limit(new_limit)
    }
  } else {
    if(limit_sonuc === undefined) {var new_limit = 10}else {var new_limit = limit_sonuc}
    var urun_listele = await urunSchema
      .find()
      .sort({ tiklanmaSayisi: -1 })
      .limit(new_limit)
  }

  res.render('urunlistele', {
    lang,
    lang_json_data: lang_json_parse,
    lang_telealankodu_json_parse,
    urun_listele_marquee,
    urun_listele,
    sektor,
    alt_sektor
  });
});

module.exports = router;