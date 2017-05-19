// all pages
function openNav() {
    document.getElementById("mySidenav").style.right = "0px";
    $("#myCanvasNav").css('width','100%');
}

function closeNav() {
    document.getElementById("mySidenav").style.right = "-580px";
    $("#myCanvasNav").css('width','0px');
}

$(document).ready(function() {
    
    // Scroll top code : browser window scroll (in pixels) after which the "back to top" link is shown
    var offset = 300,
        //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
        offset_opacity = 1200,
        //duration of the top scrolling animation (in ms)
        scroll_top_duration = 700,
        //grab the "back to top" link
        $back_to_top = $('.cd-top');

    //hide or show the "back to top" link
    $(window).scroll(function(){
        ( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
        if( $(this).scrollTop() > offset_opacity ) { 
                $back_to_top.addClass('cd-fade-out');
        }
    });

    //smooth scroll to top
    $back_to_top.on('click', function(event){
        event.preventDefault();
        $('body,html').animate({
                scrollTop: 0 ,
                }, scroll_top_duration
        );
    });
        
    
    // index page
    var time = 7; // time in seconds

    var $progressBar,
    $bar,
    $elem,
    isPause,
    tick,
    percentTime;

    //Init the carousel
    $("#owl-demo1").owlCarousel({
        slideSpeed: 500,
        paginationSpeed: 500,
        singleItem: true,
        afterInit: progressBar,
        afterMove: moved,
        startDragging: pauseOnDragging
    });

    //Init progressBar where elem is $("#owl-demo")
    function progressBar(elem) {
        $elem = elem;
        //build progress bar elements
        buildProgressBar();
        //start counting
        start();
    }

    //create div#progressBar and div#bar then prepend to $("#owl-demo")
    function buildProgressBar() {
        $progressBar = $("<div>", {
            id: "progressBar"
        });
        $bar = $("<div>", {
            id: "bar"
        });
        $progressBar.append($bar).prependTo($elem);
    }

    function start() {
        //reset timer
        percentTime = 0;
        isPause = false;
        //run interval every 0.01 second
        tick = setInterval(interval, 10);
    };

    function interval() {
        if (isPause === false) {
            percentTime += 1 / time;
            $bar.css({
                width: percentTime + "%"
            });
            //if percentTime is equal or greater than 100
            if (percentTime >= 100) {
                //slide to next item 
                $elem.trigger('owl.next');
            }
        }
    }

    //pause while dragging 
    function pauseOnDragging() {
        isPause = true;
    }

    //moved callback
    function moved() {
        //clear interval
        clearTimeout(tick);
        //start again
        start();
    }

    //Sort random function
    function random(owlSelector) {
        owlSelector.children().sort(function() {
            return Math.round(Math.random()) - 0.5;
        }).each(function() {
            $(this).appendTo(owlSelector);
        });
    }

    $("#owl-demo").owlCarousel({
            navigation: true,
            navigationText: [
            "<i class='glyphicon glyphicon-chevron-left'></i>",
            "<i class='glyphicon glyphicon-chevron-right'></i>"
        ],
        beforeInit: function(elem) {
            //Parameter elem pointing to $("#owl-demo")
            random(elem);
        }

    });
    
    // for login page - start
    $('.field-input').focus(function() {
        $(this).parent().addClass('is-focused has-label');
    });
    $('.field-input').blur(function() {
        $parent = $(this).parent();
        if ($(this).val() == '') {
            $parent.removeClass('has-label');
        }
        $parent.removeClass('is-focused');
    });
    var concent = false;
    var passValid = false;
    $('#cb1').change(function(){
        concent = concent ? false : true;
        toggleSubmit();
//        $('#create-acc').prop('disabled', function(i, v) { return !v; });
    });
    $("#password").keyup(function(){
        var passVal = $("#password").val();
        if(passVal.length >= 6 && passVal.search(/[a-z]/i) >= 0 && passVal.search(/[0-9]/) >= 0)
            passValid = true;
        else
            passValid = false;
        toggleSubmit();
    });
    function toggleSubmit()
    {
        if(concent && passValid)
            $("#create-acc").removeAttr("disabled"); 
        else
            $("#create-acc").attr("disabled","");
    }
    
    // For single product page slider
    $('.center').slick({
        centerMode: true,
        centerPadding: '0px',
        slidesToShow: 3,
        prevArrow: '<a class="my-left" href="#" data-slide="prev"><img src="/img/left.png"> </a>',
        nextArrow: '<a class="my-right" href="#" data-slide="prev"><img src="/img/right.png"> </a>'
    });
    
    $("#plus-value").click(function(){
        var currValue = parseInt($("#increment-value").html());
        currValue++;
        $("#increment-value").html(currValue);
    });
    $("#minus-value").click(function(){
        var currValue = parseInt($("#increment-value").html());
        currValue--;
        if(currValue >= 1)
            $("#increment-value").html(currValue);
    });
});