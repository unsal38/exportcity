var jwt = require("jsonwebtoken")
const userSchema = require("../db/model/users.js");

async function reflesh_token(req, res) {
    function refleshToken(userid) {

    }
    function accessToken(userid) {

    }

    try {
        const refleshToken = req.body.reflesh_token
        const token_data = await jwt.verify(refleshToken, process.env.REFLESH_TOKEN_SECRET)
        const userid = token_data.userid
        const reflesh_token_data = jwt.sign(
            {
                userid
            }, process.env.REFLESH_TOKEN_SECRET, { expiresIn: "365 days" })
        const access_token_data = jwt.sign(
            {
                userid,
            }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "2h" })
        await userSchema.findByIdAndUpdate(userid, {refleshToken: reflesh_token})
        const token_data_send = {
            access_token_data,
            reflesh_token_data
        }
        res.send(token_data_send)
    } catch (error) {
        console.log(error)
        res.send("faild")
    }

}
module.exports =
{
    reflesh_token
}