$(() => {
    // localStorage.setItem("login", false); // bunu login işlemlerinden sonra sil
    const login_check = localStorage.login
    if (login_check !== "true") {
        axios.post('/token-generate', {
            user: 'Fred',

        }).then(function (res) {
            // LOGİN İŞLERMLERİ


            // LOGİN İŞLERMLERİ


            if (res.data.access === true) {
                localStorage.setItem("login", res.data.access);
                localStorage.setItem("language", res.data.language);
                localStorage.setItem("refleshToken", res.data.refleshToken);
                localStorage.setItem("accessToken", res.data.accessToken);
            } else if (res.data.access === false) {
                localStorage.setItem("login", false);
                localStorage.removeItem("refleshToken");
                localStorage.removeItem("accessToken");
                // ALERT İŞLEMLERİ
            }

        }).catch(function (error) {
            console.log(error);
            window.location.href = "/"
        });
    }


})