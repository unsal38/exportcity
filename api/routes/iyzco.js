var express = require('express');
var router = express.Router();
const abonelikSchema = require("../db/model/abonelik_urun_planlariSchema");
const reklamSchema = require("../db/model/reklam_urun_planlariSchema");

/// IYZİPAY //////////////////////////////////////////////////////////////////

const Iyzipay = require('iyzipay');
require('dotenv').config();
var iyzpayConfig = {
  "apiKey": `${process.env.APIKEY}`,
  "secretKey": `${process.env.SECRETKEY}`,
  "uri": "https://sandbox-api.iyzipay.com"
}

/// IYZİPAY //////////////////////////////////////////////////////////////////


router.post("/abonelik-sorgu-kayit", async (req, res) => {
  /// DATABASE SORGU //////////////////////////////////////////////////////////////////
  var abonelikler = await abonelikSchema.find()
  var reklam_abonelik = await reklamSchema.find()
  /// DATABASE SORGU //////////////////////////////////////////////////////////////////
  /// İYZCO SORGU //////////////////////////////////////////////////////////////////

  var iyzipay = new Iyzipay(iyzpayConfig);

  var iyzcoabonelikcheckpromise = new Promise(function (resolve, reject) {
    try {
      var retrieveRequest = {
        locale: Iyzipay.LOCALE.TR,
        // conversationId: customerReferenceCode, // ZORUNLU DEĞİL KOMPLESİ İÇİN ANCAK FİLTRELEME İÇİN GEREK OLABİLİR
        page: 1,
        count: 10
      };
      iyzipay.subscriptionProduct.retrieveList(retrieveRequest, async function (err, result) {
        const abonelik_items = result.data.items
        const axios_post_data_name = req.body.name
        abonelik_items.forEach(v => {
          if (v.name === axios_post_data_name) {

            const uyelikler_referansocodes = { uyelikler_referansocodes: v.referenceCode }
            const uyelikler_pricingPlans = { uyelikler_pricingPlans: v.pricingPlans }
            resolve([uyelikler_referansocodes, uyelikler_pricingPlans.uyelikler_pricingPlans]);
          }
        });
      })
    } catch (error) {
      reject(error);
    }
  });

  async function create_abonelik(abonelik_referans, gumus_data, altin_data, plantinyum_data) {
    try {
      await abonelikSchema.create({
        abonelik_urun_referans_kodu: abonelik_referans,
        planlar: {
          gumus: {
            referenceCode: gumus_data[0].referenceCode,
            createdDate: gumus_data[0].createdDate,
            name: gumus_data[0].gümüş,
            price: gumus_data[0].price,
            paymentInterval: gumus_data[0].paymentInterval,
            paymentIntervalCount: gumus_data[0].paymentIntervalCount,
            trialPeriodDays: gumus_data[0].trialPeriodDays,
            currencyCode: gumus_data[0].currencyCode,
            productReferenceCode: gumus_data[0].productReferenceCode,
            planPaymentType: gumus_data[0].planPaymentType,
            status: gumus_data[0].status
          },
          altin: {
            createdDate: altin_data[0].createdDate,
            name: altin_data[0].gümüş,
            price: altin_data[0].price,
            paymentInterval: altin_data[0].paymentInterval,
            paymentIntervalCount: altin_data[0].paymentIntervalCount,
            trialPeriodDays: altin_data[0].trialPeriodDays,
            currencyCode: altin_data[0].currencyCode,
            productReferenceCode: altin_data[0].productReferenceCode,
            planPaymentType: altin_data[0].planPaymentType,
            status: altin_data[0].status
          },
          plantinyum: {
            createdDate: plantinyum_data[0].createdDate,
            name: plantinyum_data[0].gümüş,
            price: plantinyum_data[0].price,
            paymentInterval: plantinyum_data[0].paymentInterval,
            paymentIntervalCount: plantinyum_data[0].paymentIntervalCount,
            trialPeriodDays: plantinyum_data[0].trialPeriodDays,
            currencyCode: plantinyum_data[0].currencyCode,
            productReferenceCode: plantinyum_data[0].productReferenceCode,
            planPaymentType: plantinyum_data[0].planPaymentType,
            status: plantinyum_data[0].status
          }
        }
      })
      res.send({ kayit: true });
    } catch (error) {
      console.log(error, "iyzco js");
      res.send({ kayit: false, message: error });
    }
  }
  async function create_reklam(abonelik_referans, reklam_1_ay, reklam_3_ay, reklam_12_ay) {
    try {
      await reklamSchema.create({
        abonelik_urun_referans_kodu: abonelik_referans,
        planlar: {
          ay1: {
            referenceCode: reklam_1_ay[0].referenceCode,
            createdDate: reklam_1_ay[0].createdDate,
            name: reklam_1_ay[0].gümüş,
            price: reklam_1_ay[0].price,
            paymentInterval: reklam_1_ay[0].paymentInterval,
            paymentIntervalCount: reklam_1_ay[0].paymentIntervalCount,
            trialPeriodDays: reklam_1_ay[0].trialPeriodDays,
            currencyCode: reklam_1_ay[0].currencyCode,
            productReferenceCode: reklam_1_ay[0].productReferenceCode,
            planPaymentType: reklam_1_ay[0].planPaymentType,
            status: reklam_1_ay[0].status
          },
          ay3: {
            createdDate: reklam_3_ay[0].createdDate,
            name: reklam_3_ay[0].gümüş,
            price: reklam_3_ay[0].price,
            paymentInterval: reklam_3_ay[0].paymentInterval,
            paymentIntervalCount: reklam_3_ay[0].paymentIntervalCount,
            trialPeriodDays: reklam_3_ay[0].trialPeriodDays,
            currencyCode: reklam_3_ay[0].currencyCode,
            productReferenceCode: reklam_3_ay[0].productReferenceCode,
            planPaymentType: reklam_3_ay[0].planPaymentType,
            status: reklam_3_ay[0].status
          },
          ay12: {
            createdDate: reklam_12_ay[0].createdDate,
            name: reklam_12_ay[0].gümüş,
            price: reklam_12_ay[0].price,
            paymentInterval: reklam_12_ay[0].paymentInterval,
            paymentIntervalCount: reklam_12_ay[0].paymentIntervalCount,
            trialPeriodDays: reklam_12_ay[0].trialPeriodDays,
            currencyCode: reklam_12_ay[0].currencyCode,
            productReferenceCode: reklam_12_ay[0].productReferenceCode,
            planPaymentType: reklam_12_ay[0].planPaymentType,
            status: reklam_12_ay[0].status
          }
        }
      })
      res.send({ kayit: true });
    } catch (error) {
      console.log(error, "iyzco js");
      res.send({ kayit: false, message: error });
    }
  }

  iyzcoabonelikcheckpromise.then(async (data) => {
    var abonelik_urun_referans_kodu = data[0].uyelikler_referansocodes
    const abonelik_pilanlari = data[1]
    if (req.body.name === "uyelikler") {
      if (abonelikler.length <= 0) {
        if (abonelik_pilanlari.length === 3) {

          var gumus_abonelik_filter = abonelik_pilanlari.filter(data => data.name === "gumus")
          var altin_abonelik_filter = abonelik_pilanlari.filter(data => data.name === "altin")
          var platinyum_abonelik_filter = abonelik_pilanlari.filter(data => data.name === "platinyum")

          if (gumus_abonelik_filter.length && altin_abonelik_filter.length && platinyum_abonelik_filter.length > 0) {

            const gumus_abonelik = gumus_abonelik_filter
            const altin_abonelik = altin_abonelik_filter
            const platinyum_abonelik = platinyum_abonelik_filter

            await create_abonelik(abonelik_urun_referans_kodu, gumus_abonelik, altin_abonelik, platinyum_abonelik)
          } else {
            console.log(" kayıt hatalı iyzco.js")
            res.send({ kayit: false, message: " kayıt hatalı " })
          }

        } else {
          console.log("plan sayısı 3'den az iyzco js")
          res.send({ kayit: false, message: "plan sayısı 3'den az" })
        }
      } else if (abonelikler.length > 0) {
        const old_data_id = abonelikler[0]._id
        await abonelikSchema.findByIdAndDelete(old_data_id)
        if (abonelik_pilanlari.length === 3) {

          var gumus_abonelik_filter = abonelik_pilanlari.filter(data => data.name === "gumus")
          var altin_abonelik_filter = abonelik_pilanlari.filter(data => data.name === "altin")
          var platinyum_abonelik_filter = abonelik_pilanlari.filter(data => data.name === "platinyum")

          if (gumus_abonelik_filter.length && altin_abonelik_filter.length && platinyum_abonelik_filter.length > 0) {

            const gumus_abonelik = gumus_abonelik_filter
            const altin_abonelik = altin_abonelik_filter
            const platinyum_abonelik = platinyum_abonelik_filter

            await create_abonelik(abonelik_urun_referans_kodu, gumus_abonelik, altin_abonelik, platinyum_abonelik)
          } else {
            console.log("abonelik kayıt hatalı iyzco.js")
            res.send({ kayit: false, message: "abonelik kayıt hatalı " })
          }
        } else {
          console.log("plan sayısı 3'den az iyzco js")
          res.send({ kayit: false, message: "plan sayısı 3'den az" })
        }
      }
    }
    if (req.body.name === "reklam") {
      if (reklam_abonelik.length <= 0) {
        if (abonelik_pilanlari.length === 3) {

          var reklam_1_ay_filter = abonelik_pilanlari.filter(data => data.name === "reklam1")
          var reklam_3_ay_filter = abonelik_pilanlari.filter(data => data.name === "reklam3")
          var reklam_12_ay_filter = abonelik_pilanlari.filter(data => data.name === "reklam12")

          if (reklam_1_ay_filter.length && reklam_3_ay_filter.length && reklam_12_ay_filter.length > 0) {

            var reklam_1_ay = reklam_1_ay_filter
            var reklam_3_ay = reklam_3_ay_filter
            var reklam_12_ay = reklam_12_ay_filter

            await create_reklam(abonelik_urun_referans_kodu, reklam_1_ay, reklam_3_ay, reklam_12_ay)

          } else {
            console.log(" kayıt hatalı iyzco.js")
            res.send({ kayit: false, message: " kayıt hatalı " })
          }
        }
      } else if (reklam_abonelik.length > 0) {
        const old_data_id = reklam_abonelik[0]._id
        await reklamSchema.findByIdAndDelete(old_data_id)
        if (abonelik_pilanlari.length === 3) {

          var reklam_1_ay_filter = abonelik_pilanlari.filter(data => data.name === "reklam1")
          var reklam_3_ay_filter = abonelik_pilanlari.filter(data => data.name === "reklam3")
          var reklam_12_ay_filter = abonelik_pilanlari.filter(data => data.name === "reklam12")

          if (reklam_1_ay_filter.length && reklam_3_ay_filter.length && reklam_12_ay_filter.length > 0) {
            var reklam_1_ay = reklam_1_ay_filter
            var reklam_3_ay = reklam_3_ay_filter
            var reklam_12_ay = reklam_12_ay_filter

            await create_reklam(abonelik_urun_referans_kodu, reklam_1_ay, reklam_3_ay, reklam_12_ay)

          } else {
            console.log(" kayıt hatalı iyzco.js")
            res.send({ kayit: false, message: " kayıt hatalı " })
          }
        }
      }
    }



  }).catch((err) => console.log(err));
});
router.post("/abonelik-aciklama-ekle", async (req, res) => {
  const abonelik_plan_ayrinti = req.body.input_data_array
  const abonelik_plan = req.body.button_data_aciklama_ekle

  const mondgodb_name_gumus = { "planlar.gumus.ozellikler": abonelik_plan_ayrinti }
  const mondgodb_name_altin = { "planlar.altin.ozellikler": abonelik_plan_ayrinti }
  const mondgodb_name_plantinyum = { "planlar.plantinyum.ozellikler": abonelik_plan_ayrinti }
  if (abonelik_plan === "gumus") var mondgodb_name = mondgodb_name_gumus
  if (abonelik_plan === "altin") var mondgodb_name = mondgodb_name_altin
  if (abonelik_plan === "plantinyum") var mondgodb_name = mondgodb_name_plantinyum
  try {
    if (mondgodb_name) await abonelikSchema.find().updateMany(mondgodb_name)
    res.send({ message: "kayıt yapılmıştır." })
  } catch (error) {
    console.log(error)
  }
});
router.post("/reklam-aciklama-ekle", async (req, res) => {
  const abonelik_plan_ayrinti = req.body.input_data_array
  const abonelik_plan = req.body.button_data_aciklama_ekle
  const mondgodb_name_ay1 = { "planlar.ay1.ozellikler": abonelik_plan_ayrinti }
  const mondgodb_name_ay3 = { "planlar.ay3.ozellikler": abonelik_plan_ayrinti }
  const mondgodb_name_ay12 = { "planlar.ay12.ozellikler": abonelik_plan_ayrinti }
  if (abonelik_plan === "ay1") var mondgodb_name = mondgodb_name_ay1
  if (abonelik_plan === "ay3") var mondgodb_name = mondgodb_name_ay3
  if (abonelik_plan === "ay12") var mondgodb_name = mondgodb_name_ay12
  try {
    if (mondgodb_name) await reklamSchema.find().updateMany(mondgodb_name)
    res.send({ message: "kayıt yapılmıştır." })
  } catch (error) {
    console.log(error)
  }
});


module.exports = router;
