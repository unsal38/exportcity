
$(() => {
    $("#login button[type=submit]").on("click",()=>{
        const login_email = $("#login input[type=email]").val();
        const login_password = $("#login input[type=password]").val();
        function alert_message(message) {
            $("div[role='alert'] p.alert-message").remove();
            $("div[role='alert']").removeClass("d-none");
            $("div[role='alert']").append("<p class='alert-message m-0'>" + message + "</p>");
        }
        // yesnonoyes38@gmail.com  q<123456
        axios.post('/token-generate/login', {
            login_email,
            login_password
        }).then(function (res) {
            if (res.data.access === true) {
                localStorage.setItem("login", res.data.access)
                localStorage.setItem("uye-Role", res.data.uyeRole)
                localStorage.setItem("uye-Role-Preminyum", res.data.uyeRolePreminyum)
                localStorage.setItem("refleshToken", res.data.refleshToken)
                localStorage.setItem("accessToken", res.data.accessToken)
                window.location.href = "/"
            } else if (res.data.access === false) {
                localStorage.setItem("login", false);
                localStorage.removeItem("refleshToken");
                localStorage.removeItem("accessToken");
                $.removeCookie('accessToken');
                alert_message(res.data.message)
            }
        }).catch(function (error) {
            console.log(error);
        });
    })
}) // BUTTON İŞLEVİ
$(()=> {
    localStorage.clear();
    $.removeCookie('accessToken');
}) // localstore ve COOKİE TEMİZLENMESİ