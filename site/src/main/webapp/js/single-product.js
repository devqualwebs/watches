$(function() {

    $("#rateYo").rateYo({
        rating: 1.6
    });

});
// <!-- ImageZoomer -->

$('.zoom').zoom();
// <!-- ImageZoomer -->

function lightbox(idx) {
    //show the slider's wrapper: this is required when the transitionType has been set to "slide" in the ninja-slider.js
    var ninjaSldr = document.getElementById("ninja-slider");
    ninjaSldr.parentNode.style.display = "block";

    nslider.init(idx);

    var fsBtn = document.getElementById("fsBtn");
    fsBtn.click();
}

function fsIconClick(isFullscreen) { //fsIconClick is the default event handler of the fullscreen button
    if (isFullscreen) {
        var ninjaSldr = document.getElementById("ninja-slider");
        ninjaSldr.parentNode.style.display = "none";
    }
}


$(document).on('click', '.value-control', function() {
    var action = $(this).attr('data-action')
    var target = $(this).attr('data-target')
    var value = parseFloat($('[id="' + target + '"]').val());
    if (action == "plus") {
        value++;
    }
    if (action == "minus") {
        value--;
    }
    $('[id="' + target + '"]').val(value)
})

// <!-- Slider --> 
jQuery(document).ready(function($) {

    $('#myCarousel').carousel({
        interval: 5000
    });

    //Handles the carousel thumbnails
    $('[id^=carousel-selector-]').click(function() {
        var id_selector = $(this).attr("id");
        try {
            var id = /-(\d+)$/.exec(id_selector)[1];
            console.log(id_selector, id);
            jQuery('#myCarousel').carousel(parseInt(id));
        } catch (e) {
            console.log('Regex failed!', e);
        }
    });
    // When the carousel slides, auto update the text
    $('#myCarousel').on('slid.bs.carousel', function(e) {
        var id = $('.item.active').data('slide-number');
        var img = $('.item.active').find('img').attr('src');
        $('.jsZoomMouse').css('background-image', 'url(' + img + ')');
        $('#carousel-text').html($('#slide-content-' + id).html());
    });
});

// <!-- Slider Ends -->

// slick slider
$('.center').slick({
    centerMode: true,
    centerPadding: '80px',
    slidesToShow: 3,

    prevArrow: '<div class="slider-prev"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" style="fill: rgb(118, 118, 118); height: 24px; width: 24px; display: block;"><path fill-rule="evenodd" d="M13.703 16.293a1 1 0 1 1-1.415 1.414l-7.995-8a1 1 0 0 1 0-1.414l7.995-8a1 1 0 1 1 1.415 1.414L6.413 9l7.29 7.293z"/></svg></div>',
    nextArrow: '<div class="slider-next"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" style="fill: rgb(118, 118, 118); height: 24px; width: 24px; display: block;"><path  fill-rule="evenodd" d="M4.293 1.707A1 1 0 1 1 5.708.293l7.995 8a1 1 0 0 1 0 1.414l-7.995 8a1 1 0 1 1-1.415-1.414L11.583 9l-7.29-7.293z"/></svg></div>'
});