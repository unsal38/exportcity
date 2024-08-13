var jwt = require("jsonwebtoken")
const userSchema = require("../db/model/users.js");

async function access_token(req, res) {
    try {
        const accessToken = req.body.access_token
        const token_data = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    } catch (error) {
        console.log(error)
        res.send("faild")
    }

}

module.exports =
{
    access_token
}