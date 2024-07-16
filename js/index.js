// NAW BAYRAK GİZLE GÖSTER
$(function () {
  const lang = $("html")[0].lang
  $("div .flag-naw ." + lang).removeClass("d-none")
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
    // autoplay: {
    //     delay: 2500,
    //     disableOnInteraction: false,
    //   },
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
//ÜST FİLTRE
$(function () {
  $("#urun-hizmet").on("change", function () {
    const urun_hizmet = $("#urun-hizmet option:selected").val();
    if (Number(urun_hizmet) > 1) {
      $("#talep-satis").removeAttr("disabled");
    } if (Number(urun_hizmet) === 1) {
      $("#talep-satis").attr("disabled", "true");
      $("#talep-satis")[0].selectedIndex = 0
    }
  })
  $("#kategori").on("change", function () {
    const kategori = $("#kategori option:selected").val();
    if (Number(kategori) != 0) {
      $("#alt-kategori").removeAttr("disabled");
    } if (Number(kategori) === 0) {
      $("#alt-kategori").attr("disabled", "true");
      $("#alt-kategori")[0].selectedIndex = 0
    }
  })

})