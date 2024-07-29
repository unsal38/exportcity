// admin-pageadmin-user
//employeeReklamSchema - employeeurunControlSchema - employeeOdemeControlSchema
// employeeKullaniciUyeControlSchema - employeeBlogSchema - employeeSeoSchema 
const userSchema = require("../db/model/users")
const permissioncheck = (permission) => {

    return async (req, res, next) => {
        try {
            const userid = req.user
            // GELEN DEĞERLER YA İD YADA FALSE
            const user_data = await userSchema.findById(userid)
            const user_uye_rol = user_data.uyeRole
            const permission_check = permission.filter(permission => permission === user_uye_rol)
            if (permission_check.length > 0) next()
            if (permission_check.length === 0) {
                res.send(
                    '<div style="display:flex; position: relative; top: 50%; left: 50%; background-color: #2125295c; transform: translate(-50%, -50%);justify-content: center;color: red;" class="alert"><h1>Sayfaya Giriş Yetkiniz Yoktur</h1></div>'
                );
            }
        } catch (error) {
            console.log(error)
            if (error) res.redirect("/")
        }
    }
}
module.exports = {
    permissioncheck
}