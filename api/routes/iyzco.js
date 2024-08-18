var express = require('express');
var router = express.Router();
const abonelikSchema = require("../db/model/abonelik_urun_planlariSchema");
const mongoose = require("mongoose");

/// IYZİPAY //////////////////////////////////////////////////////////////////

const Iyzipay = require('iyzipay');
const { resolve } = require('path');
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
        abonelik_items.forEach(v => {
          if (v.name === "uyelikler") {
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
        abonelik_urun_referans_kodu:abonelik_referans,
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
  iyzcoabonelikcheckpromise.then(async (data) => {
    var abonelik_urun_referans_kodu = data[0].uyelikler_referansocodes
    const abonelik_pilanlari = data[1]
    console.log(abonelikler.length)
    if (abonelikler.length <= 0) {
      if (abonelik_pilanlari.length === 3) {

        var gumus_abonelik_filter = abonelik_pilanlari.filter(data => data.name === "gumus")
        var altin_abonelik_filter = abonelik_pilanlari.filter(data => data.name === "altin")
        var platinyum_abonelik_filter = abonelik_pilanlari.filter(data => data.name === "platinyum")

        if (gumus_abonelik_filter.length && altin_abonelik_filter.length && platinyum_abonelik_filter.length > 0) {

          const gumus_abonelik = gumus_abonelik_filter
          const altin_abonelik = altin_abonelik_filter
          const platinyum_abonelik = platinyum_abonelik_filter

          await create_abonelik(abonelik_urun_referans_kodu, gumus_abonelik,altin_abonelik, platinyum_abonelik)
        } else {
          console.log("abonelik kayıt hatalı iyzco.js")
          res.send({ kayit: false , message:"abonelik kayıt hatalı "})
        }
      }
    }
  }).catch((err) => console.log(err));
});



module.exports = router;
