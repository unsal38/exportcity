var jwt = require('jsonwebtoken');
const aut_tokencheck = () => {
    return async (req, res, next) => {
        try {
            const access_token_check = req.headers.cookie
            if (access_token_check !== undefined) {
                const access_token = req.headers.cookie
                const access_token_split = access_token.split("accessToken=")[1]
                const userid = await jwt.verify(access_token_split, process.env.ACCESS_TOKEN_SECRET)
                req.user = userid.userid
            } else if (access_token_check === undefined) {
                req.user = "false"
            }
            next();
        } catch (error) {
            res.redirect("/login/tr")
            console.log(error)
            
        }
    }
}
module.exports = {
    aut_tokencheck
}