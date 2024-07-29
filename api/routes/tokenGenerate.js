var express = require('express');
var router = express.Router();
const urlCheck = require('../middleware/urlCheck');
const tokenGenerate = require('../controllers/token_gerenate');


router.post('/login', tokenGenerate.reflesh_Token_login);

module.exports = router;
