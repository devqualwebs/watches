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
                $('#carousel-text').html($('#slide-content-' + id).html());
                 var img = $('.item.active').find('img').attr('src');
                 $('.jsZoomMouse').css('background-image', 'url('+img+')');
            });
        });
    // <!-- Slider Ends -->

    // <!-- ImageZoomer -->
        $('.zoom').zoom();
    // <!-- ImageZoomer -->