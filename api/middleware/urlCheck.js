var express = require('express');
const urlCheck = () => {
  return async (req, res, next) => {
    const url = req.originalUrl
    const url_split = url.split("/")
    var hata_check = new Array()
    url_split.forEach(v => {
      if(v.length > 0) {
        const check_url_data = ["tr", "en", "ar", "fr", "ru", "es", "", "firma", "login", "panel", "payment", "register", "urunliste"]
        const url_check = check_url_data.filter(check_url_data => check_url_data === v)
        hata_check.push(url_check.length)
      }
    });
    const check = hata_check.filter(hata_check => hata_check === 0)
   if(check.length === 1) return res.redirect("/");
    next()
   
  }
}

module.exports = { urlCheck }