var express = require('express');
const urlCheck = () => {
  return async (req, res, next) => {
    const url = req.originalUrl
    const url_split = url.split("/")
    var hata_check = new Array()
    url_split.forEach(v => {
      if (v.length > 0) {
        const check_url_data = ["tr", "en", "ar", "fr", "ru", "es", "", "firma", "login", "panel", "payment", "register", "urunliste", "blog1", "blog2","blog3","blog4","blog5"]
        const url_check = check_url_data.filter(check_url_data => check_url_data === v)
        hata_check.push(url_check.length)
      }
    });
    // URAL İÇİ BAŞKA BİR KELİME GİRİLEMİYOR
    const check = hata_check.filter(hata_check => hata_check === 0)
    // URAL İÇİ BAŞKA BİR KELİME GİRİLEMİYOR
    if (check.length === 1)  return res.redirect("/");
    // URL DÖRDÜNCÜ SATIR GİRİLEMİYOR
    if (url_split[3] !== undefined)  return res.redirect("/");
    // URL DÖRDÜNCÜ SATIR GİRİLEMİYOR

    // FARKLI URL GİRİŞ ENGELLEME
    if(url_split[2] !== undefined){
      const check_url_data_lang = ["firma", "login", "panel", "payment", "register", "urunliste", "blog1", "blog2","blog3","blog4","blog5"]
      const check_url_data_lang_1 = ["tr", "en", "ar", "fr"]
      const url_lang_check = check_url_data_lang.filter(url_data => url_data === url_split[1])
      const url_lang_check_1 = check_url_data_lang_1.filter(url_data_1 => url_data_1 === url_split[2])
      if(url_lang_check.length === 0 || url_lang_check_1.length === 0)  return res.redirect("/");
      console.log("URL CHECK ERROR")
    }
    // FARKLI URL GİRİŞ ENGELLEME
    next()

  }
}

module.exports = { urlCheck }