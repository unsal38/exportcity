$(() => {
    const access_token = localStorage.getItem("accessToken")
    if (access_token !== null) {
        $("#login").addClass("d-none").removeClass("d-block")
        $("#register").addClass("d-none").removeClass("d-block")
        $("#logout").removeClass("d-none").addClass("d-block")
        $("#panel").addClass("d-block").removeClass("d-none")

    }
    if (access_token === null) {
        $("#login").addClass("d-block").removeClass("d-none")
        $("#register").addClass("d-block").removeClass("d-none")
        $("#logout").addClass("d-none").removeClass("d-block")
        $("#panel").addClass("d-none").removeClass("d-block")

    }
})// REGİSTER LOGİN LOGOUT BUTTON KAYBOLMA GETİRMES
$(() => {
    $("#logout").on("click", () => {
        localStorage.clear();
        $.removeCookie("accessToken");
        window.location.href = "/login"
    });
})// LOGOUT BUTTON GÖREV ATAMASI
$(() => {
    $("#lang_select").on("click", (event) => {
        const lang_select = $(event.target).attr("id");
        const url = window.location.pathname
        const url_split = url.split("/")
        try {
            const url_original = window.location.origin
            const url_1 = url_split[1]
            const url_lang = lang_select
            const lang_data = ["tr", "en", "ar", "es", "fr", "ru"]
            const find_lang = lang_data.filter(lang_data => lang_data === url_1)
            if (url_1.length !== 0 && find_lang.length === 0) {
                window.location.href = `${url_original}/${url_1}/${url_lang}`
            } else {
                window.location.href = `${url_original}/${url_lang}`
            }
        } catch (error) {
            console.log(error, "site js")
        }
    })
})// DİL SEÇ SONRASI URL YÖNLENDİRME
$(()=>{
    const access_token_check = localStorage.getItem("accessToken")
    if(access_token_check){
        const access_token= localStorage.getItem("accessToken")
        const access_token_check = $.cookie('accessToken')
        if(access_token_check === undefined) $.cookie('accessToken', access_token, { expires: 2 });
    }else if(access_token_check === null) {
        $.removeCookie('accessToken',{ path: '/' });
    }
}) // ACCESS TOKEN localstroge varsa aynısını COOKİE KAYIT YAPMA

