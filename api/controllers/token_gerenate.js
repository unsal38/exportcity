var jwt = require('jsonwebtoken');
async function reflesh_Token(req, res) {
   // DATABASE CHECK

   const userid = 2312121212212
   const language = 'en'

    // DATABASE CHECK
   const reflesh_token = refleshToken(userid)
   const access_token =  accessToken(userid)
   res.send({
      access: true,
      language: language,
      refleshToken: reflesh_token,
      accessToken: access_token
   })
}
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
          sebep: "oturum"
       }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "2h" })
 }

 module.exports =
{
   reflesh_Token
}