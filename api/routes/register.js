var express = require('express');
var router = express.Router();
const multer = require('multer')
const fs = require('fs');
var path = require('path');
const dirPath = path.join(__dirname, '../public');
router.use(express.static(path.join(__dirname, 'public')));
// SCHEMA
const userSchema = require("../db/model/users");
// SCHEMA

const register = require("../controllers/register");
  /////// LOGO KAYDETME //////////////////////////////////
var storage_logo = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, dirPath + '/images/firma-img')
  },
  filename: async function (req, file, cb) {
    const uniqueSuffix = req.body.user_id + "logo" + "-" + Date.now()
    cb(null, file.fieldname + '-' + uniqueSuffix + ".jpg")
    var data_base_name = file.fieldname + '-' + uniqueSuffix + ".jpg"
    const user_id = req.body.user_id

    try {
      const user_data = await userSchema.findById(user_id)
      const user_data_logo = user_data.logo
      if (user_data_logo === undefined) await userSchema.findByIdAndUpdate({ _id: user_id }, { logo: data_base_name })
      if (user_data_logo !== undefined) {
        console.log(user_data.logo, data_base_name,user_id)
      await fs.unlinkSync(dirPath + `/images/firma-img/${user_data.logo}`)
      await userSchema.findByIdAndUpdate({ _id: user_id }, { logo: data_base_name }, {new: true})
      }
      
    } catch (error) {
      if (error) console.log(error)
    }
  },
  fileFilter: function (req, file, cb) {
    if (file.mimetype === 'image/jpeg') {
      cb(null, true)
    } else {
      cb(null, false)
    }
  },
  limit: { fileSize: 17036 },
})
const upload_logo = multer({
  storage: storage_logo
})
  /////// LOGO KAYDETME //////////////////////////////////


router.post("/", register.register)
router.post("/user-logo", upload_logo.single('logo'), register.user_logo)
router.post("/user-update", register.user_update)
router.post("/user-delete", register.user_delete)
router.post("/employee", register.employee_register)
router.post("/register-regrefcod-check", register.register_regrefcod_check)
router.get('/:lang', function (req, res) {
  const lang = req.params.lang
  const lang_json_name = `${lang}.json`

  const lang_json = fs.readFileSync(`./json_lang/${lang_json_name}`, "utf-8");
  const lang_json_parse = JSON.parse(lang_json)
  const lang_telealankodu_json = fs.readFileSync(`./json_lang/${lang}-telealankodu.json`, "utf-8");
  const lang_telealankodu_json_parse = JSON.parse(lang_telealankodu_json)
  res.render('register', {
    lang,
    lang_json_data: lang_json_parse,
    lang_telealankodu_json_parse
  });
});


module.exports = router;
