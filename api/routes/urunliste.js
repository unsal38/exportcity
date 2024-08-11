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

router.post("/urun-incele", async (req, res) => {
  const access_token_split = req.headers.cookie.split("accessToken=")
  try {
    const access_token = access_token_split[1]
    const user_data = await jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET)
    const user_server_data = await userSchema.findById(user_data.userid)
    const uyeUrunHizmetGirme_server = user_server_data.uyeUrunHizmetGirme
    const maxuyeUrunHizmetGirme_server = user_server_data.maxuyeUrunHizmetGirme
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

      console.log(urun_check.length, click_favori_urun)

      if (urun_check.length == 0) {
        if (click_favori_urun !== undefined) {
          user_favori_urun.forEach(v => {
            new_favori_array.push(v)
          });
        }else {return}
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

    // if (urun_check.length == 0) {
    //   console.log(user_favori_urun, click_favori_urun)
    //   // new_favori_array.push(click_favori_urun)
    //   // await userSchema.findByIdAndUpdate(user_id, { favoriurun: new_favori_array });
    //   // res.send({ favori_list: new_favori_array })
    // } else if (urun_check.length > 0) {
    //   console.log("urun kayıtlı")



    //   // user_favori_urun.forEach(async v => {
    //   //   if (v === click_favori_urun) {
    //   //     return
    //   //   } else if (v !== click_favori_urun) {
    //   //     new_favori_array.push(v)
    //   //   }
    //   //   await userSchema.findByIdAndUpdate(user_id, { favoriurun: new_favori_array });
    //   //   res.send({ favori_list: new_favori_array })
    //   // });

    // }
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
