function urun_incele(urun_id) {
    return new Promise(function (resolve, reject) {
        const login_check = localStorage.getItem("accessToken")
        try {
            if (login_check === null || login_check.length <= 0) {
                resolve("giris_false");
            } else if (login_check !== null || login_check.length > 0) {
                const axios_data = {
                    urun_id
                }
                axios.post("/urunliste/incele", axios_data)
                    .then(response => {
                        if (response.data.message === false) resolve(false);
                        if (response.data.message === true) resolve([true, response.data.urun_data, response.data.firma_unvani, response.data.urun_alt_kategori.altsektor, response.data.urun_kategori.sektor]);
                    })
            }
        } catch (error) {
            console.log(error)
            if (error) reject("hata oluştu sayfayı yenileyiniz")
        }
    })
}
$(() => {
    $(".urun-bilgileri").on("click", function () {
        const urun_id = $(this).attr("data-urun-id")
        const site_lang = $("html").attr("lang")
        urun_incele(urun_id).then((cevap) => {
            if (cevap === "giris_false") {
                $(".urun-bilgi").addClass("d-none")
                $(".urun-alert").removeClass("d-none")
                alert_message("lütfen giriş yapınız")
            }
            if (cevap === false) {
                $(".urun-bilgi").addClass("d-none")
                $(".urun-alert").removeClass("d-none")
                alert_message("limitiniz bulunmamaktadır.")
            }
            if (cevap[0] === true) {
                const urun_adi = cevap[1].urunadi[site_lang]
                const urun_ulke = cevap[1].ulke
                const sector = cevap[4][site_lang]
                const kategori = cevap[3][site_lang]
                const miktar = cevap[1].miktar
                const aciklama = cevap[1].aciklama[site_lang]
                if (cevap[1].satisalis === true) $("span#alis").addClass("d-none")
                if (cevap[1].satisalis === false) $("span#satis").addClass("d-none")

                const seri_nu = cevap[1].serino
                if (cevap[1].urunhizmet === true) $("span#hizmet").addClass("d-none")
                if (cevap[1].urunhizmet === false) $("span#urun").addClass("d-none")
                const firma_unvani = cevap[2]
            const firma_link = cevap[5]

                $("span#urun-adi")[0].textContent = urun_adi
                $("span#urun-ulke")[0].textContent = urun_ulke
                $("span#sector")[0].textContent = sector
                $("span#kategori")[0].textContent = kategori
                $("span#miktar")[0].textContent = miktar
                $("span#aciklama")[0].textContent = aciklama
                $("span#seri-nu")[0].textContent = seri_nu
                $("span#firma-unvani")[0].textContent = firma_unvani

            }
        }).catch((message) => {
            $(".urun-bilgi").addClass("d-none")
            $(".urun-alert").removeClass("d-none")
            alert_message(message)
        });
    })
})// ÜRÜN İNCELEE
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
        window.location.href = "/login/tr"
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
$(() => {
    const access_token_check = localStorage.getItem("accessToken")
    if (access_token_check) {
        const access_token = localStorage.getItem("accessToken")
        axios.post("/login/accessToken", { access_token: access_token })
            .then(response => {
                if (response.data === "faild") {
                    localStorage.clear();
                    window.location.href = "/login/tr"
                }
            });
        const access_token_check = $.cookie('accessToken')
        if (access_token_check === undefined) $.cookie('accessToken', access_token, { expires: 2 });
    } else if (access_token_check === null) {
        $.removeCookie('accessToken', { path: '/' });
    }
}) // ACCESS TOKEN localstroge varsa aynısını COOKİE KAYIT YAPMA
$(() => {
    const data = $("small[data-index-urun-date]")
    const data1 = $("small[data-index-hizmet-date]")
    if (data) {
        $(data).each(function (i, v) {
            const date_server = $(v)[0].attributes[0].value;
            const date = new Date(date_server).getFullYear();
            $(v).children()[0].textContent = date
        });
    }
    if (data1) {
        $(data1).each(function (i, v) {
            const date_server = $(v)[0].attributes[0].value;
            const date = new Date(date_server).getFullYear();
            $(v).children()[0].textContent = date
        });
    }
})// ÖNE ÇIKAN ÜRÜN ve HİZMET SON YÜKLEME TARİHİNİ YAZDIRMA
$(() => {
    $("div.alert").on("click", (event) => {
        $("div.alert").addClass("d-none")
    });
})/// alert TIKLAYINCA KAPANAMASI
$(() => {
    const urun = $("span[data-urun-id-favori-check]")
    const favori_urun_local = localStorage.getItem("favoriUrun");
    if (favori_urun_local !== null) {
        const favori_urun_local_split = favori_urun_local.split(",");
        $(urun).each(function (i, v) {
            const urun_id = $(v).attr("data-urun-id-favori-check")
            const check = favori_urun_local_split.filter((data) => data === urun_id.toString())
            if (check !== null !== undefined && check.length > 0) {
                $(`span[data-urun-id-favori-check= ${check[0]}] i.fa-star`).removeClass("fa-regular");
                $(`span[data-urun-id-favori-check= ${check[0]}] i.fa-star`).addClass("fa-solid");
            } else if (check !== null !== undefined) {
                $(`span[data-urun-id-favori-check= ${check[0]}] i.fa-star`).addClass("fa-regular");
                $(`span[data-urun-id-favori-check= ${check[0]}] i.fa-star`).removeClass("fa-solid");
            }
        });
    }
    $("span[data-urun-id-favori-check]").parent().on("click", (event) => {
        const user_login_check = localStorage.getItem("accessToken");
        if (user_login_check === null) window.location.href = "/login/tr"
        const favori_urun_id = $(event.target).children("span").attr("data-urun-id-favori-check")
        if (favori_urun_id === undefined) {
            var favori_urun_id_data = $(event.target).parent("span").attr("data-urun-id-favori-check")
        } else {
            var favori_urun_id_data = $(event.target).children("span").attr("data-urun-id-favori-check")
        }
        const axios_data = { favori_urun_id_data }
        axios.post("/urunliste/urun-favori", axios_data)
            .then((response) => {
                const new_array = new Array(response.data.favori_list)
                localStorage.setItem("favoriUrun", new_array)
                const regular_fa = $(`span[data-urun-id-favori-check=${response.data.changed_urun}] i.fa-regular`)
                const solid_fa = $(`span[data-urun-id-favori-check=${response.data.changed_urun}] i.fa-solid`)
                if (solid_fa.length > 0 && regular_fa.length == 0) {
                    $(`span[data-urun-id-favori-check=${response.data.changed_urun}] i`).addClass("fa-regular");
                    $(`span[data-urun-id-favori-check=${response.data.changed_urun}] i`).removeClass("fa-solid");
                } else if (regular_fa.length > 0 && solid_fa.length == 0) {
                    $(`span[data-urun-id-favori-check=${response.data.changed_urun}] i`).removeClass("fa-regular");
                    $(`span[data-urun-id-favori-check=${response.data.changed_urun}] i`).addClass("fa-solid");
                }
            })


    })
}) // FAVORİYE EKLENMİŞ ÜRÜNLERİN İŞARETLENMESİ - FAVORİYE EKLE ÇIKAR









