$(() => {
  $(".filter-form button[type='submit']").on("click", () => {
    const sirala_data = $(".filter-form select[name='sirala'] option:selected").val();
    const urun_hizmet_data = $(".filter-form select[name='urun_hizmet'] option:selected").val();
    const satis_talep_data = $(".filter-form select[name='satis-talep'] option:selected").val();
    const ulke_data = $(".filter-form select[name='ulke'] option:selected").val();
    const kategori_data = $(".filter-form select[name='kategori'] option:selected").val();
    const alt_kategori_data = $(".filter-form select[name='alt_kategori'] option:selected").val();

    const filter_select = new Array()
    filter_select.push(sirala_data, urun_hizmet_data, satis_talep_data, ulke_data, kategori_data, alt_kategori_data)

    localStorage.setItem("filters_data", filter_select)
  }) // LOCAL STORAGE KAYIT
  const filter_select_data = localStorage.getItem("filters_data")
  if (filter_select_data !== null) {
    const filter_select_data_split = filter_select_data.split(",")
    $(".filter-form select[name='sirala'] option")[0].selected = false
    $(".filter-form select[name='urun_hizmet'] option")[0].selected = false
    $(".filter-form select[name='satis-talep'] option")[0].selected = false
    $(".filter-form select[name='ulke'] option")[0].selected = false
    $(".filter-form select[name='kategori'] option")[0].selected = false
    $(".filter-form select[name='alt_kategori'] option")[0].selected = false

    $(`.filter-form select[name='sirala'] option[value='${filter_select_data_split[0]}']`)[0].selected = true
    $(`.filter-form select[name='urun_hizmet'] option[value='${filter_select_data_split[1]}']`)[0].selected = true
    $(`.filter-form select[name='satis-talep'] option[value='${filter_select_data_split[2]}']`)[0].selected = true
    $(`.filter-form select[name='ulke'] option[value='${filter_select_data_split[3]}']`)[0].selected = true
    $(`.filter-form select[name='kategori'] option[value='${filter_select_data_split[4]}']`)[0].selected = true
    $(`.filter-form select[name='alt_kategori'] option[value='${filter_select_data_split[5]}']`)[0].selected = true
  }
})// FİLTER SEÇİLENE GÖRE UYARLANMASI
function urun_hizmet() {
  const urun_hizmet = $("#urun-hizmet option:selected").val();
  if (Number(urun_hizmet) !== 0) {
    $("#talep-satis").removeAttr("disabled");
  } if (Number(urun_hizmet) === 0) {
    $("#talep-satis").attr("disabled", "true");
    $("#talep-satis")[0].selectedIndex = 0
  }
}
function kategori_filter() {
  const kategori = $("#kategori-filter option:selected").val();
  if (Number(kategori) !== 0) {
    $("#alt-kategori").removeAttr("disabled");
    const alt_kategori_all = $("[name='alt_kategori'] option[data-sektor-id]")
    $(alt_kategori_all).each(function (i, v) {
      const filter_element = $(v).attr("data-sektor-id")
      if (filter_element !== kategori) $(v).addClass("d-none")
      if (filter_element === kategori) $(v).removeClass("d-none")
    });


  } if (Number(kategori) === 0) {
    $("#alt-kategori").attr("disabled", "true");
    $("#alt-kategori")[0].selectedIndex = 0
  }
}
$(function () {
  urun_hizmet()
  kategori_filter()
  $("#urun-hizmet").on("change", function () { urun_hizmet() })
  $("#kategori-filter").on("change", function () { kategori_filter() })

})//ÜST FİLTRE
$(() => {
  const limit_page = $.cookie("limit")
  if (limit_page === undefined) {
    const new_limit = 10
    $.cookie("limit", new_limit)
  }
  $("#devami").on("click", () => {
    const limit_page = $.cookie("limit")
    if (limit_page !== undefined) {
      const new_limit = Number(limit_page) + 10
      $.cookie("limit", new_limit)
      window.location.reload()
    } else { $.cookie("limit", 10) }
  });
}) // SAYFA URUN LİMİTİ BELİRLEME