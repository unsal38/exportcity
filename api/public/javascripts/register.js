$(()=>{
    $("#register button").on("click",(event)=>{
        event.preventDefault();
        const form_data_input = $(".mySwiper-register-form input")
        form_data_input.forEach(v => {
            console.log(v);
        });
        
    })
});
// yesnonoyes38@gmail.com  q<123456
