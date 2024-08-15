/*!
* Start Bootstrap - Resume v7.0.5 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

$(()=>{
    const data_h1 = $("div[data-h1]").attr("data-h1");
    const data_h1_split = data_h1.split(" ");
    var ilk_kelime = new Array();
    var span_kelime = new Array();
    $.each(data_h1_split,function (i, v) { 
        if(i > 4) span_kelime.push(v);
        if(i <= 4) ilk_kelime.push(v);
    });
    const new_ilk_kelime = ilk_kelime.toString().replace(/,/g, " ")
    const new_span_kelime = span_kelime.toString().replace(/,/g, " ")

    $("div[data-h1] h1")[0].textContent = new_ilk_kelime
    $("div[data-h1] h1").append(`<span class='text-primary ps-1'>${new_span_kelime}</span>`)
}) // HAKKIMIZDA H1 AYARLANMASI
