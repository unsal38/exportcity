var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// SCHEMA
const userSchema = require("../db/model/users.js");
// SCHEMA
// FONKSİYONLAR
function refleshToken(userid) {
   return jwt.sign(
      {
         userid
      }, process.env.REFLESH_TOKEN_SECRET, { expiresIn: "365 days" })
}
function accessToken(userid) {
   return jwt.sign(
      {
         userid,
      }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "2h" })
}
// FONKSİYONLAR

async function reflesh_Token_login(req, res) {
   // DATABASE CHECK
   const login_password = req.body.login_password
   const login_email = req.body.login_email
   const dbUser = await userSchema.find({ email: login_email });
   if (dbUser.length <= 0) {
      res.send({
         access: false,
         message: "kullanıcı bulunamadı."
      })
   } else if (dbUser.length > 0) {
      const db_user_password = dbUser[0].pass
      const passwordCheck = bcrypt.compareSync(login_password, db_user_password)
      if (passwordCheck === true) {
         const userid = dbUser[0]._id
         const uyeRole = dbUser[0].uyeRole
         const uyeRolePreminyum = dbUser[0].uyeRolePreminyum
         const reflesh_token = refleshToken(userid)
         const access_token = accessToken(userid)
         res.send({
            access: true,
            uyeRole,
            uyeRolePreminyum,
            refleshToken: reflesh_token,
            accessToken: access_token
         })
         await userSchema.findByIdAndUpdate(userid, {refleshToken: reflesh_token})
      } else {
         res.send({
            access: false,
            message: "şifre hatalı"
         })
      }
   }
   // DATABASE CHECK
}


module.exports =
{
   reflesh_Token_login
}