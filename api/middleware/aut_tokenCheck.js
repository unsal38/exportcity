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
const aut_post_tokencheck =()=>{
    async (req, res, next) => {
        try {
            const access_token_check = req.headers.cookie
            console.log("çalıştı autposttokencheck")
            if (access_token_check !== undefined) {
                const access_token = req.headers.cookie
                const access_token_split = access_token.split("accessToken=")[1]
                await jwt.verify(access_token_split, process.env.ACCESS_TOKEN_SECRET)
            } else if (access_token_check === undefined) {
                res.redirect("/login/tr")
            }
            next();
        } catch (error) {
            res.redirect("/login/tr")
            console.log(error)
            
        }
    }
}
module.exports = {
    aut_tokencheck,
    aut_post_tokencheck // EKLENECEK POST CHECK İŞİ
}