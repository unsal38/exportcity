$(() => {
    function alert_message(message) {
        $("div[role='alert'] p.alert-message").remove();
        $("div[role='alert']").removeClass("d-none");
        $("div[role='alert']").append("<p class='alert-message m-0 text-capitalize'>" + message + "</p>");
    }

    function isEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }

    function register_kayit_axios(form_data_array) {
        axios.post("/register", {
            form_data_array
        }).then((res) => {
            alert_message(res.data.message);
        }).catch(function (error) {
            console.log(error);
        });
    }



    $("#register button").on("click", (event) => {
        event.preventDefault();
        $("div[role='alert']").addClass("d-none");
        const form_data_input = $(".mySwiper-register-form form input")
        const form_data_array = Array()
        $(form_data_input).each(function (i, v) {
            const form_data_input_data = $(v).val();
            const form_data_input_name = $(v)[0].attributes[0].value
            form_data_array.push({ name: form_data_input_name, data: form_data_input_data });
        });
        const form_data_select_country = $(".mySwiper-register-form form select[name= 'billingAddressCountry'] option:selected").val();

        const form_data_input_password = $(".mySwiper-register-form form input[type='pass']").val();
        const form_data_input_repeatpassword = $(".mySwiper-register-form form input[type='repeatpass']").val();
        const form_data_input_email = $(".mySwiper-register-form form input[type='email']").val();

        const check_email = isEmail(form_data_input_email)

        const check_password_number = form_data_input_password.match(/[0-9]/);
        const check_password_uppercase = form_data_input_password.match(/[A-Z]/)

        const form_data_input_regRefcod = $(".mySwiper-register-form form input[type='regRefcod']").val();

        const check = new Array()

        if(form_data_select_country.length > 0) {
            form_data_array.push(form_data_select_country)
        }else if(form_data_select_country.length <= 0){
            return alert_message("ülke seçiniz")
        }

        if (form_data_input_regRefcod !== "yoktur") {
            const axios_data = { regRefcod: form_data_input_regRefcod }
            axios.post("/register/register-regrefcod-check", axios_data)
                .then(data => {
                    const check_data = data.data
                    if (check_data === false) {
                        alert_message("referans kod hatalı")
                    } else {
                        check.push("valid")
                    }
                });
        } else if (form_data_input_regRefcod !== "yoktur") {
            check.push("valid")
        }

        if (check_password_number === null || check_password_uppercase === null) {
            return alert_message("şifre bir büyük harf ve bir sayı ekleyiniz")
        } else {
            check.push("valid")
        }

        if (form_data_input_password !== form_data_input_repeatpassword) {
            return alert_message("şifreler uyuşmamaktadır.")
        } else {
            check.push("valid")
        }

        if (form_data_input_password.length < 8) {
            return alert_message("şifre uzunluğu 8 olmalıdır")
        } else {
            check.push("valid")
        }

        if (check_email === false) {
            return alert_message("email kontrol ediniz.")
        } else {
            check.push("valid")
        }
        if (form_data_array.length === "15") {
            return alert_message("form bilgilerini lütfen tam doldurunuz")
        } else {
            check.push("valid")
        }
        if (check.length === 5) {
            if (form_data_input_regRefcod !== "yoktur") {
                const axios_data = { regRefcod: form_data_input_regRefcod }
                axios.post("/register/register-regrefcod-check", axios_data)
                    .then(data => {
                        const check_data = data.data
                        if (check_data === false) {
                            alert_message("referans kod hatalı")
                        } else {
                            register_kayit_axios(form_data_array)
                        }
                    });
            } else if (form_data_input_regRefcod === "yoktur") {
                register_kayit_axios(form_data_array)
            }




        }
    });

}); // REGİSTER KAYIT BUTTON
