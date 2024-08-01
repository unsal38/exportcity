$(()=>{
    $("#logout").on("click",()=> {
        localStorage.clear();
        window.location.href = "/login"
    });
})// LOGOUT BUTTON GÖREV ATAMASI
$(()=>{
    const access_token_check = localStorage.getItem("accessToken")
    if(access_token_check){
        const access_token= localStorage.getItem("accessToken")
        const access_token_check = $.cookie('accessToken')
        if(access_token_check === undefined) $.cookie('accessToken', access_token, { expires: 2 });
    }else {
        $.removeCookie('accessToken');
    }
}) // ACCESS TOKEN COOKİE KAYIT YAPMA
$(()=>{
    $("#lang_select").on("change", ()=> {
        const lang_select = $("#lang_select option:selected").val()
        const url = window.location.pathname 
        const url_split = url.split("/")
        try {
            const url_original = window.location.origin
            const url_1 = url_split[1]
            const url_lang = lang_select
            if(url_1.length !== 0){
                window.location.href = `${url_original}/${url_1}/${url_lang}`
            }else {
                window.location.href =`${url_original}/${url_lang}`
            }
        } catch (error) {
           console.log(error, "site js") 
        }
    })
})// DİL SEÇ SONRASI URL YÖNLENDİRME
$(()=>{
    const access_token= localStorage.getItem("accessToken")
    if(access_token !== null) {
        $("#login").addClass("d-none").removeClass("d-block")
        $("#logout").removeClass("d-none").addClass("d-block")
    }
    if(access_token === null) {
        $("#login").addClass("d-block")
        $("#login").removeClass("d-none")
        $("#logout").addClass("d-none").removeClass("d-block")
    }
})// LOGİN LOGOUT BUTTON KAYBOLMA GETİRMES