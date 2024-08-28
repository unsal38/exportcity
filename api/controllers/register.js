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
async function user_logo(req ,res) {
  res.send({message: "kayıt başarılı sayfayı yenileyiniz"})
}
async function user_update(req, res) {
    try {
        const user_data = req.body
        user_data.forEach(async v => {
            const new_data = v[1].split('-')
            if (new_data[1] === undefined) {
                if (v[1] === "fname") var data = { fname: v[2] }
                if (v[1] === "lname") var data = { lname: v[2] }
                if (v[1] === "email") var data = { email: v[2] }
                if (v[1] === "pass") var data = { pass: v[2] }
                if (v[1] === "identityNumber") var data = { identityNumber: v[2] }
                if (v[1] === "gsmNumber") var data = { gsmNumber: v[2] }
                if (v[1] === "billingAddressCity") var data = { billingAddressCity: v[2] }
                if (v[1] === "billingAddressCountry") var data = { billingAddressCountry: v[2] }
                if (v[1] === "billingAddressAddress") var data = { billingAddressAddress: v[2] }
                if (v[1] === "billingAddressDistrict") var data = { billingAddressDistrict: v[2] }
                if (v[1] === "ekatalog_iframe") var data = { ekatalog_iframe: v[2] }
                if (v[1] === "diger_bilgiler") var data = { diger_bilgiler: v[2] }
                if (v[1] === "sektor") var data = { sektor: v[2] }
                if (v[1] === "firmaUnvani") var data = { firmaUnvani: v[2] }
                if (v[1] === "firmaVergiNumarasi") var data = { firmaVergiNumarasi: v[2] }
                if (v[1] === "markaismi") var data = { markaismi: v[2] }
                const userid = v[0].split("-")[1]
                await userSchema.findByIdAndUpdate(userid,data);
            }
            if (new_data[1] !== undefined) {
                if (new_data[0] === "bilgi_bolum") {
                    if (new_data[1] === "tr") var data = {"bilgi_bolum.tr": v[2]}
                    if (new_data[1] === "en") var data = {"bilgi_bolum.en": v[2]}
                    if (new_data[1] === "ar") var data = {"bilgi_bolum.ar": v[2]}
                    if (new_data[1] === "es") var data = {"bilgi_bolum.es": v[2]}
                    if (new_data[1] === "ru") var data = {"bilgi_bolum.ru": v[2]}
                    if (new_data[1] === "fr") var data = {"bilgi_bolum.fr": v[2]}
                }
                if (new_data[0] === "hakkimizda") {
                    if (new_data[1] === "tr") var data = {"hakkimizda.tr": v[2]}
                    if (new_data[1] === "en") var data = {"hakkimizda.en": v[2]}
                    if (new_data[1] === "ar") var data = {"hakkimizda.ar": v[2]}
                    if (new_data[1] === "es") var data = {"hakkimizda.es": v[2]}
                    if (new_data[1] === "ru") var data = {"hakkimizda.ru": v[2]}
                    if (new_data[1] === "fr") var data = {"hakkimizda.fr": v[2]}
                }
                const userid = v[0].split("-")[1]
                await userSchema.findByIdAndUpdate(userid,data);
            }



        });

    } catch (error) {
        console.log(error, "controller register js")
    }
}
async function register(req, res) {
    const user_data = req.body.form_data_array
    const fname = user_data[0].data
    const lname = user_data[1].data

    const email = user_data[2].data
    const email_check = await userSchema.find({ email: email })

    const pass_data = user_data[3].data
    const pass = bcrypt_data(pass_data)

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
            if (email_check.length <= 0) {
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
            } else if (email_check.length > 0) {
                res.send({ message: "email kullanımdadır." })
            }

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

        res.send({ message: "kayıt başarılı" })
    } catch (error) {
        console.log(error)
    }



}
async function user_delete(req, res) {
    const user_id = req.body.user_id
    try {
        await userSchema.findByIdAndDelete(user_id)
        res.send("işlem başarılı")
    } catch (error) {
        if (error) res.send(error)
    }
}
async function register_regrefcod_check(req, res) {
    const check_data = req.body.regRefcod
    const regRefcod_check = await userSchema.find({ refkod: check_data })
    if (regRefcod_check.length > 0) res.send(true)
    if (regRefcod_check.length <= 0) res.send(false)
}
module.exports = {
    register,
    employee_register,
    user_delete,
    register_regrefcod_check,
    user_update,
    user_logo
}