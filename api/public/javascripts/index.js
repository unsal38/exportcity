function alert_message(message) {
  $("div[role='alert'] p.alert-message").remove();
  $("div[role='alert']").removeClass("d-none");
  $("div[role='alert']").append("<p class='alert-message m-0 text-capitalize'>" + message + "</p>");
}
// NAW PANEL BAYRAK GİZLE GÖSTER
$(function () {
  const lang = $("html")[0].lang
  const flag = $("div .flag-naw")
  const flag1 = $("#panel img." + lang)
  if (flag.length > 0) {
    $("div .flag-naw ." + lang).removeClass("d-none")
  } else if (flag1.length > 0) {
    $("#panel img." + lang).removeClass("d-none")
  }

})
//SWİPER
$(function () {
  var swiper1 = new Swiper(".mySwiper-urun", {
    slidesPerView: 2,
    centeredSlides: true,
    spaceBetween: 30,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  });

  var swiper = new Swiper(".mySwiper-ref", {
    spaceBetween: 10,
    slidesPerView: 5,
    freeMode: true,
    watchSlidesProgress: true,
  });
  var swiper2 = new Swiper(".mySwiper2-ref", {
    spaceBetween: 10,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    thumbs: {
      swiper: swiper,
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  });
  var swiper = new Swiper(".mySwiper-temsilci", {
    effect: "cards",
    grabCursor: true,
  });
  var swiper = new Swiper(".mySwiper-register-form", {
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
})
$(()=>{
$("button.abonelik_sorgula").on("click",()=>{
  const axios_data = {
    name:"uyelik"
  }
  axios.post("/iyzco/abonelik-sorgu-kayit", axios_data)
  .then((response)=>{
    console.log(response.data, "index js")
    
  });
 });
}) // PANEL ABONELİK SORGU
$(function () {
  $("#uyelik").on("change", function () {
    const uyelik_ucret = $("#uyelik option:selected").val()
    const reklam_ucret = $("#reklam option:selected").val()
    const urun_gorme = $("#urun-gorme option:selected").val()
    $("#sonuc-uyelik")[0].textContent = uyelik_ucret
    const sonuc_toplam = Number(uyelik_ucret) + Number(reklam_ucret) + Number(urun_gorme)
    $("#sonuc-toplam")[0].textContent = sonuc_toplam
    if (Number(uyelik_ucret) != 0) {
      $("#uyelik-taksit").removeAttr("disabled")
    } else if (Number(uyelik_ucret) === 0) {
      $("#uyelik-taksit").attr("disabled", true)
    }
  })
  $("#reklam").on("change", function () {
    const uyelik_ucret = $("#uyelik option:selected").val()
    const reklam_ucret = $("#reklam option:selected").val()
    const urun_gorme = $("#urun-gorme option:selected").val()
    $("#sonuc-reklam")[0].textContent = reklam_ucret
    const sonuc_toplam = Number(uyelik_ucret) + Number(reklam_ucret) + Number(urun_gorme)
    $("#sonuc-toplam")[0].textContent = sonuc_toplam
  })
  $("#urun-gorme").on("change", function () {
    const uyelik_ucret = $("#uyelik option:selected").val()
    const reklam_ucret = $("#reklam option:selected").val()
    const urun_gorme = $("#urun-gorme option:selected").val()
    $("#sonuc-urun-gorme")[0].textContent = urun_gorme
    const sonuc_toplam = Number(uyelik_ucret) + Number(reklam_ucret) + Number(urun_gorme)
    $("#sonuc-toplam")[0].textContent = sonuc_toplam
  })

}) // ÖDEME SAYFASI HESAPLAMA
$(() => {
  $("#lang_dil_sec_panel").on("change", () => {
    const lang_selected = $("#lang_dil_sec_panel option:selected").val()
    const url = window.location.pathname
    const url_split = url.split("/")
    try {
      const url_original = window.location.origin
      const url_2 = url_split[2]
      const lang_data = ["tr", "en", "ar", "es", "fr", "ru"]
      const find_lang = lang_data.filter(lang_data => lang_data === url_2)
      if(find_lang.length > 0) {
       window.location.href = `${url_original}/panel/${lang_selected}`
      }else if(find_lang.length === 0){
        window.location.href = `${url_original}/panel/${url_2}/${lang_selected}`
      }
    } catch (error) {
      console.log(error)
    }
  })
}) // PANEL DE DİL SEÇİMİ URL YÖNLENDİRME

