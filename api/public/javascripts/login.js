$(() => {
    function alert_message(message) {
        $("div[role='alert'] p.alert-message").remove();
        $("div[role='alert']").removeClass("d-none");
        $("div[role='alert']").append("<p class='alert-message m-0 text-capitalize'>" + message + "</p>");
    }
    $("#login a[type=submit]").on("click", () => {
        const login_email = $("#login input[type=email]").val();
        const login_password = $("#login input[type=password]").val();
        axios.post('/login/login', {
            login_email,
            login_password
        }).then(function (res) {
            if (res.data.access === true) {
                localStorage.setItem("accessToken", res.data.accessToken)
                localStorage.setItem("refleshToken", res.data.refleshToken)
                localStorage.setItem("favoriUrun", res.data.favoriUrun)
                window.location.href = "/"
            } else if (res.data.access === false) {
                localStorage.removeItem("accessToken");
                $.removeCookie('accessToken', { path: '/' });
                alert_message(res.data.message)
            }
        }).catch(function (error) {
            console.log(error);
        });
    })
}) // BUTTON İŞLEVİ
$(() => {
    const access_token_check = localStorage.getItem("accessToken")
    if (access_token_check) {
        const reflesh_token = localStorage.getItem("refleshToken")
        if (reflesh_token) {
            const axios_data = { reflesh_token: reflesh_token }
            axios.post("/login/refleshToken", axios_data)
            .then((res)=>{
                localStorage.setItem("accessToken", res.data.access_token_data)
                localStorage.setItem("refleshToken", res.data.reflesh_token_data)
                $.removeCookie('accessToken', { path: '/' });
                $.cookie("accessToken", res.data.access_token_data)
               window.location.href = "/"
                if(res.data === "faild") {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refleshToken");
                    localStorage.removeItem("favoriurun");
                    $.removeCookie('accessToken', { path: '/' });
                }
            })
            .catch(function (error) {
                console.log(error);
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refleshToken");
                localStorage.removeItem("favoriurun");
                $.removeCookie('accessToken', { path: '/' });
            });
        }
    }
}) // TOKEN DOĞRULAMA