const bcrypt = require('bcrypt');
// SCHEMA
const userSchema = require("../db/model/users");
// SCHEMA
// FONKSİYONLAR
function bcrypt_data(password) {
    const passForm = password
    const saltRounds = 10;
    const myPlaintextPassword = passForm;
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(myPlaintextPassword, salt);
}
// FONKSİYONLAR
async function register(req, res) {
    const user_data = req.body.form_data_array
    const fname = user_data[0].data
    const lname = user_data[1].data
    const email = user_data[2].data

    const pass_data = user_data[3].data
    const pass = bcrypt_data(pass_data)
    // const repeatpass = user_data[4].data
    const regRefcod = user_data[5].data
    const identityNumber = user_data[6].data
    const gsmNumber = user_data[7].data
    const billingAddressCity = user_data[8].data
    const billingAddressCountry = user_data[9].data
    const billingAddressAddress = user_data[10].data
    const sektor = user_data[11].data
    const firmaUnvani = user_data[12].data
    const firmaVergiNumarasi = user_data[13].data
    const markaismi = user_data[14].data

    const refcod = email
    const uyeRole = "user"
    const uyelikDate = new Date(Date.now())

    try {
        const refkod = regRefcod.toLowerCase()
        if (refkod !== "yoktur") {
            const dbUser = await userSchema.find({ refkod })
            if (dbUser.length === 0) res.send({ message: "girdiğiniz referans cod kullanıcılarda bulunamamıştır." })
            if (dbUser.length > 0) {
                const userCreate = await userSchema.create({
                    fname,
                    lname,
                    email,
                    pass,
                    regRefcod,
                    identityNumber,
                    gsmNumber,
                    billingAddressCity,
                    billingAddressCountry,
                    billingAddressAddress,
                    sektor,
                    firmaUnvani,
                    firmaVergiNumarasi,
                    markaismi,
                    refcod,
                    uyeRole,
                    uyelikDate,
                })
                userCreate.save()
                res.send({ message: "şifrenizle girebilirsiniz" })
            }
        } else if (refkod === "yoktur") {
            const userCreate = await userSchema.create({
                fname,
                lname,
                email,
                pass,
                regRefcod,
                identityNumber,
                gsmNumber,
                billingAddressCity,
                billingAddressCountry,
                billingAddressAddress,
                sektor,
                firmaUnvani,
                firmaVergiNumarasi,
                markaismi,
                refcod,
                uyeRole,
                uyelikDate,
            })
            userCreate.save()
            res.send({ message: "şifrenizle girebilirsiniz" })
        }
    } catch (error) {
        console.log(error, "controller register js")
    }
}
async function employee_register(req, res) {
    try {
        const employee_user = req.body
        const bcrypt_pass = bcrypt_data(employee_user[3][1])
        const new_data = {
            "fname": employee_user[0][1],
            'lname': employee_user[1][1],
            'email': employee_user[2][1],
            'pass': bcrypt_pass,
            'identityNumber': employee_user[4][1],
            'gsmNumber': employee_user[5][1],
            'uyeRole': employee_user[6][1]
        }
    
        await userSchema.create(new_data)
    
        res.send({message: "kayıt başarılı"})
    } catch (error) {
        console.log(error)
    }



}
module.exports = {
    register,
    employee_register
}