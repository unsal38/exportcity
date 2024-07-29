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