document.addEventListener("DOMContentLoaded", iniciar);
$(".main").hide(0);
$(".visible").show(0); 

function iniciar(){
    setInterval(slide, 4000);
};

function slide(){
    $(".visible").removeClass("visible").addClass("anteriormenteVisible")
    
    if($(".anteriormenteVisible").is(":last-child")){
        $(".main:first-child").addClass("visible");
    }else{
        $(".anteriormenteVisible").next().addClass("visible")
    }

    $(".anteriormenteVisible").removeClass("anteriormenteVisible");
    $(".main").fadeOut(2000);
    $(".visible").fadeIn(2000);
}