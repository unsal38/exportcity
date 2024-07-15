// NAW BAYRAK GİZLE GÖSTER
$(function () {
    const lang = $("html")[0].lang
    $("div .flag-naw ." + lang).removeClass("d-none")
})
//SWİPER
$(function () {
    var swiper1 = new Swiper(".mySwiper-urun", {
        slidesPerView: 4,
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
})