function alert_message(message) {
  $("div[role='alert'] p.alert-message").remove();
  $("div[role='alert']").removeClass("d-none");
  $("div[role='alert']").append("<p class='alert-message m-0 text-capitalize'>" + message + "</p>");
}
function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}
function isPass(password) {
  const check_password_number = password.match(/[0-9]/);
  const check_password_uppercase = password.match(/[A-Z]/)
  const check_password_lowercase = password.match(/[a-z]/)
  if (password.lenght > 7) {
    if (check_password_number &&
      check_password_uppercase &&
      check_password_lowercase) {
      if (check_password_number.length &&
        check_password_uppercase.length &&
        check_password_lowercase.length > 0) return true
    } else {
      return false
    }
  } else {
    return false
  }

}



async function all_data_post(form_data_array_input, form_data_array_select, form_data_array_text_area) {
  function input_data(axios_data) {
    return axios.post('/register/user-update', axios_data);
  }

  function select_data(axios_data) {
    return axios.post('/register/user-update', axios_data);
  }

  function text_area_data(axios_data) {
    return axios.post('/register/user-update', axios_data);
  }

  const [input_data_rec, select_data_rec, text_area_data_rec] = await Promise.all([
    input_data(form_data_array_input),
    select_data(form_data_array_select),
    text_area_data(form_data_array_text_area)
  ]);
  //console.log(input_data_rec, select_data_rec, text_area_data_rec)
}


$(() => {
  $('input[name="logo"]').on('change',(e)=> {
    const user_id = $(e.target).attr("data-user-id");
    const user_logo_data = $(e.target)

    const form_logo_input_file = $(`form#form-${user_id} input[name='logo']`)[0].files[0] // 66c85235208fb879aaa7e814

    const file_log = new FormData()
    file_log.append("user_id", user_id)
    file_log.append( "logo", form_logo_input_file)
    
    axios.post("/register/user-logo", file_log)
    .then(data => {
      if(data.data.message ) alert_message(data.data.message)
    });
  })
  $("form.kullanici-bilgi-degistir-form a[type='submit']").on("click", async (e) => {
    e.preventDefault();

    var form_id = $(e.target).attr("data-form-id")

    const form_input_data = $(`form#${form_id} input`)
    const form_text_area_data = $(`form#${form_id} textarea`)

    const form_select_name = $(`form#${form_id} select`).attr("name")
    const form_select_data = $(`form#${form_id} select option:selected`).val()
    /////////İNPUT////////////////////////////////
    const form_data_array_input = new Array()

    form_input_data.each(function (i, v) {
      const input_value_check = $(v).val()
      const input_name = $(v).attr("name")
      if (input_value_check.length > 0) form_data_array_input.push([form_id, input_name, input_value_check])


    });
    /////////TEXT AREA ////////////////////////////////
    const form_data_array_text_area = new Array()
    form_text_area_data.each(function (i, v) {
      const textarea_value_check = $(v).val()
      const textarea_name = $(v).attr("name")
      if (textarea_value_check.length > 0) form_data_array_text_area.push([form_id, textarea_name, textarea_value_check])
    });

    all_data_post(form_data_array_input, [[form_id, form_select_name, form_select_data]], form_data_array_text_area)
    window.location.reload();
  });

})/// user UPDATE
$(() => {
  $("form.kullanici-ekle-form a[type='submit']").on("click", () => {
    const form_input = $("form.kullanici-ekle-form input")
    const form_select_name = $("form.kullanici-ekle-form select").attr("name");
    const form_select_value = $("form.kullanici-ekle-form select option:selected").val();
    const employee_register_array = new Array()
    const email = $("form.kullanici-ekle-form input[name='email']").val()
    const password = $("form.kullanici-ekle-form input[name='pass']").val()
    const selected_data = $("form.kullanici-ekle-form select option:selected").val()
    const check_email = isEmail(email)
    const check_pass = isPass(password)
    //// EMAİL İNPUT CHECK //////////////////////////////////
    if (check_email === false) {
      alert_message("email hatalı")
      $("form.kullanici-ekle-form input[name='email']").removeClass("valid")
    } else {
      $("form.kullanici-ekle-form input[name='email']").addClass("valid")
    }
    //// PASSWORD İNPUT CHECK //////////////////////////////////
    if (check_pass === false) {
      alert_message("şifre hatalı")
      $("form.kullanici-ekle-form input[name='pass']").removeClass("valid")
    } else {
      $("form.kullanici-ekle-form input[name='pass']").addClass("valid")
    }
    //// OTHER SELECKT CHECK //////////////////////////////////
    if (selected_data.length > 0) {
      $("form.kullanici-ekle-form select").addClass("valid")
    } else {
      $("form.kullanici-ekle-form select").removeClass("valid")
    }
    //// OTHER İNPUT CHECK //////////////////////////////////
    $.each(form_input, function (i, v) {
      const input_data = $(v).val().length
      if (input_data > 0) {
        $(v).addClass("valid")
      } else if (input_data == 0) {
        $(v).removeClass("valid")
      }
    });
    //// OTHER İNPUT CHECK //////////////////////////////////
    const check_input_data = $("form.kullanici-ekle-form .valid")

    if (check_input_data.length === 7) {
      $.each(form_input, function (i, v) {
        employee_register_array.push([$(v).attr("name"), $(v).val()])
      });
      employee_register_array.push([form_select_name, form_select_value])
      const axios_data = employee_register_array
      alert_message("işlem başarılı")
      axios.post("/register/employee", axios_data)
        .then(data => { })
    }
  });
  $("#user-employee .sil").on("click", (e) => {
    e.preventDefault();
    const axios_data = { user_id: $(e.target).attr("data-user-id") }
    axios_user_delete(axios_data)

  });
}) // ÇALIŞAN KAYIT

$(() => {
  const input_data = '<input type="text" class="form-control" placeholder="açıklama giriniz" aria-label="açıklama ekle input"></input>'
  const input_data2 = '<button class="sil btn btn-outline-danger" type="button">sil</button>'
  /////// //////////////////////////////////
  ////////ABONELİK BÖLÜMÜ ///////
  ////////////////////////////////

  $("div#aciklama-ekle .modal-footer button[data-aciklama-ekle]").on("click", () => {
    const input_data = $("#aciklama-ekle .modal-body .input-group")
    const input_data_array = new Array()
    $(input_data).each(function (i, v) {
      const input_data = $(v).children("input").val()
      if (input_data.length > 0) {
        input_data_array.push(input_data)
      }
    });
    const button_data_aciklama_ekle = $("div#aciklama-ekle .modal-footer button[data-aciklama-ekle]").attr("data-aciklama-ekle")
    const axios_data = { button_data_aciklama_ekle, input_data_array }
    axios.post("/iyzco/abonelik-aciklama-ekle", axios_data)
      .then(data => {
        alert_message(data.data.message)
      })
  }); // AÇIKLAMA EKLEME REKLAM
  $("div#aciklama-ekle").on("click", (e) => {
    const sil_button = $(e.target)[0].localName
    if (sil_button === "input") {
      $("#aciklama-ekle .modal-body ").append(`<div class="input-group">${input_data}${input_data2}</div>`);
    } else if (sil_button === "button") {
      const input_sayisi = $(e.target).parent(".input-group").parent(".modal-body").children()
      if (input_sayisi.length !== 1) $(e.target).parent(".input-group").remove();
    }
  })// ABONELİK İNPUT EKLEME VE SİLME
  $("a[data-aciklama-ekle]").on("click", (e) => {
    e.preventDefault();
    const click_cins_aciklama = $(e.target).attr("data-aciklama-ekle");
    $("div#aciklama-ekle div.modal-footer button[data-aciklama-ekle]").attr("data-aciklama-ekle", click_cins_aciklama)
  }); // MODAL BUTTON ATTR EKLEME (GÜMÜŞ, ALTIN , PİLANTİNYUM)
  $("button.abonelik_sorgula").on("click", () => {
    const axios_data = {
      name: "uyelikler"
    }
    axios.post("/iyzco/abonelik-sorgu-kayit", axios_data)
      .then((response) => {
        if (response.data.kayit === true) alert_message("Kayıt Başarılı açıklama eklemek için 'açıklama ekleye' tıklayınız");
      });
  }); // ABONELİK SORGUSU SONRA DATA BASE YAZILMASI

  /////// //////////////////////////////////
  ////////REKLAM BÖLÜMÜ ///////
  ////////////////////////////////

  $("div#reklam-aciklama-ekle .modal-footer button[data-aciklama-ekle]").on("click", () => {
    const input_data = $("#reklam-aciklama-ekle .modal-body .input-group")
    const input_data_array = new Array()
    $(input_data).each(function (i, v) {
      const input_data = $(v).children("input").val()
      if (input_data.length > 0) {
        input_data_array.push(input_data)
      }
    });
    const button_data_aciklama_ekle = $("div#reklam-aciklama-ekle .modal-footer button[data-aciklama-ekle]").attr("data-aciklama-ekle")
    const axios_data = { button_data_aciklama_ekle, input_data_array }
    axios.post("/iyzco/reklam-aciklama-ekle", axios_data)
      .then(data => {
        alert_message(data.data.message)
      })
  }); // AÇIKLAMA EKLEME REKLAM
  $("div#reklam-aciklama-ekle").on("click", (e) => {
    const sil_button = $(e.target)[0].localName
    if (sil_button === "input") {
      $("#reklam-aciklama-ekle .modal-body ").append(`<div class="input-group">${input_data}${input_data2}</div>`);
    } else if (sil_button === "button") {
      const input_sayisi = $(e.target).parent(".input-group").parent(".modal-body").children()
      if (input_sayisi.length !== 1) $(e.target).parent(".input-group").remove();
    }
  })// REKLAM İNPUT EKLEME VE SİLME
  $("button.reklam_sorgula").on("click", () => {
    const axios_data = {
      name: "reklam"
    }
    axios.post("/iyzco/abonelik-sorgu-kayit", axios_data)
      .then((response) => {
        if (response.data.kayit === true) alert_message("Kayıt Başarılı açıklama eklemek için 'açıklama ekleye' tıklayınız");
      });
  }); // REKLAM SORGU SONRA DATA BASE YAZILMASI
  $("a[data-aciklama-ekle]").on("click", (e) => {
    e.preventDefault();
    const click_cins_aciklama = $(e.target).attr("data-aciklama-ekle");
    $("div#reklam-aciklama-ekle div.modal-footer button[data-aciklama-ekle]").attr("data-aciklama-ekle", click_cins_aciklama)
  }); // MODAL BUTTON ATTR EKLEME (1AY ,3AY, 12 AY)

  /////// //////////////////////////////////
  ////////EK ALINABİLECEKLER BÖLÜMÜ ///////
  ////////////////////////////////

  $("div#ek-aciklama-ekle .modal-footer button[data-aciklama-ekle]").on("click", () => {
    const input_data = $("#ek-aciklama-ekle .modal-body .input-group")
    const input_data_array = new Array()
    $(input_data).each(function (i, v) {
      const input_data = $(v).children("input").val()
      if (input_data.length > 0) {
        input_data_array.push(input_data)
      }
    });
    const button_data_aciklama_ekle = $("div#ek-aciklama-ekle .modal-footer button[data-aciklama-ekle]").attr("data-aciklama-ekle")
    const axios_data = { button_data_aciklama_ekle, input_data_array }

    axios.post("/iyzco/ek-aciklama-ekle", axios_data)
      .then(data => {
        alert_message(data.data.message)
      })
  }); // AÇIKLAMA EKLEME EK BÖLÜM
  $("div#ek-aciklama-ekle").on("click", (e) => {
    const sil_button = $(e.target)[0].localName
    if (sil_button === "input") {
      $("#ek-aciklama-ekle .modal-body ").append(`<div class="input-group">${input_data}${input_data2}</div>`);
    } else if (sil_button === "button") {
      const input_sayisi = $(e.target).parent(".input-group").parent(".modal-body").children()
      if (input_sayisi.length !== 1) $(e.target).parent(".input-group").remove();
    }
  })// ek İNPUT EKLEME VE SİLME
  $("button.ek_sorgula").on("click", () => {
    const axios_data = {
      name: "ek-urunler"
    }
    axios.post("/iyzco/abonelik-sorgu-kayit", axios_data)
      .then((response) => {
        if (response.data.kayit === true) alert_message("Kayıt Başarılı açıklama eklemek için 'açıklama ekleye' tıklayınız");
      });
  }); // EK SORGU SONRA DATA BASE YAZILMASI
  $("a[data-aciklama-ekle]").on("click", (e) => {
    e.preventDefault();
    const click_cins_aciklama = $(e.target).attr("data-aciklama-ekle");
    $("div#ek-aciklama-ekle div.modal-footer button[data-aciklama-ekle]").attr("data-aciklama-ekle", click_cins_aciklama)
  }); // MODAL BUTTON ATTR EKLEME (ay50 ,ay100, ay1000)

}) // PANEL ABONELİK SORGU AÇIKLAMA EKLEMESi

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
      if (find_lang.length > 0) {
        window.location.href = `${url_original}/panel/${lang_selected}`
      } else if (find_lang.length === 0) {
        window.location.href = `${url_original}/panel/${url_2}/${lang_selected}`
      }
    } catch (error) {
      console.log(error)
    }
  })
}) // PANEL DE DİL SEÇİMİ URL YÖNLENDİRME

$(function () {
  const lang = $("html")[0].lang
  const flag = $("div .flag-naw")
  const flag1 = $("#panel img." + lang)
  if (flag.length > 0) {
    $("div .flag-naw ." + lang).removeClass("d-none")
  } else if (flag1.length > 0) {
    $("#panel img." + lang).removeClass("d-none")
  }

})// NAW PANEL BAYRAK GİZLE GÖSTER

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
})//SWİPER

$(() => {
  $("form.kullanici-bilgi-degistir-form a[type='submit']").on("click", () => {

  });
  $("#uye-sil-degistir button.sil").on("click", (e) => {
    e.preventDefault();
    const delete_user_id = $(e.target).attr("data-user-id")
    if (delete_user_id) {
      const axios_data = { user_id: delete_user_id }
      axios_user_delete(axios_data)
    }
  });
}) // PANELDE KULLANICI VERİLERİNİ TEKRAR GİRİŞ (DÜZELTME YAPMA) - KULLANICI SİLME
$(() => {
  $("input[name='uye-search']").on("change", (e) => {
    const filter_data = $(e.target)[0].value.trim().toLowerCase()
    const filter_target = $("#uye-sil-degistir .accordion-item")
    $(filter_target).each(function (i, v) {
      const filter_target = $(v).attr("data-filter-search")
      const filter_array = new Array(filter_target)
      if (filter_data.length > 0) {
        filter_array.filter(data => {
          if (data.indexOf(filter_data) <= -1) $(v).addClass("d-none")
          if (data.indexOf(filter_data) > -1) $(v).removeClass("d-none")
        })
      } else if (filter_data.length <= 0) {
        $(v).removeClass("d-none");
      }



      // console.log(this)
    });
  });
}) //PANEL UYELER BÖLÜMÜ SEARCH
