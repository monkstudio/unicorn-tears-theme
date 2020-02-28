console.log('🥑 %cMade by Monk', 'background: #616a2e; color: #f4e9e2; padding: 5px 17px; border-radius: 3px;');
console.log(' %chttp://monk.com.au ', 'padding: 5px 13px;');


jQuery(document).ready(function ($) {

        //page
    var $hamburger  = $(".hamburger"),
        $site       = $("html,body"),
        $content    = $('.site-content'),

        //menu
        $menu       = $(".main-navigation"),
        $submenu    = $(".main-navigation"),

        //media
        $lightbox   = $('.lightbox'),
        $slider     = $('.slider'),
        $variableslider = $('.variable-slider');

    //mobile menu
    $hamburger.on("click", function () {
        $hamburger.toggleClass("is-active");
        $site.toggleClass("menu-open");
        $("#primary > li").each(function(i) {
            let elem = $(this);
            setTimeout(function(){
                elem.delay(200).toggleClass('fadein');
            },150 * i);
        });
    });
    //close menu with an outside click (basically anywhere on .site-content)
    function closeMenu() {
        $site.removeClass("menu-open");
        $menu.removeClass("toggled");
        $submenu.removeClass('toggled-on');
        $hamburger.removeClass("is-active");
    }
    $content.on('click', closeMenu);
    $(document).bind('keydown', function(e) {
        if (e.which == 27) {
            closeMenu();
        }
    });
    //add lightbox to image links
    // $('a[href]').filter(function () {
    //     return this.href && this.href.match(/\.(?:jpe?g|gif|bmp|a?png)$/i);
    // }).addClass('lightbox');
    // // $lightbox.swipebox();

    // $lightbox.modaal({ type: 'image' });
    // $lightboxvideo.modaal({type: 'video'});

    $('.animate').on('inview', function(event, isInView) {
        if (isInView) {
            $(this).addClass('fadein');
        }
    });

    	/*!
	♡♡♡♡♡♡♡♡♡♡♡
	♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
	accordions
	♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
	♡♡♡♡♡♡♡♡♡♡♡
	*/
	$(".panel-header").click(function (e) {
		$(this).next().slideToggle();
		$(this).parent().toggleClass('active')
    });

    //feature slider
    $slider.slick({
        accessibility: true,
        autoplay: true,
        draggable: true,
        infinite: true,
        pauseOnHover: false,
        swipe: true,
        autoplaySpeed: 4000,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true
    });
    $variableslider.each( function() {
        $(this).slick({
            accessibility: true,
            autoplay: true,
            draggable: true,
            infinite: true,
            pauseOnHover: false,
            swipe: true,
            autoplaySpeed: 4000,
            speed: 1000,
            slidesToScroll: 1,
            slidesToShow: 1,
            centerMode: true,
            variableWidth: true,
            prevArrow: $(this).siblings('.prev'),
            nextArrow: $(this).siblings('.next'),
        });
    });

    $('.gform_wrapper').on('submit', 'form', function(){
        $('[type=submit]', this)        // Select the form's submit button
            .val('Sending...')         // Change the value of the submit button. Change text to whatever you like.
            .prop('disabled', true);    // Not really necessary but will prevent the user from clicking the button again while the form is submitting.
    });

    $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function (event) {
        // On-page links
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
            location.hostname == this.hostname
        ) {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll target exist?
            if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000, function () {
                    // Callback after animation
                    // Must change focus!
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) { // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    };
                });
            }
        }
    });


    //https://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript
	function is_touch_device() {

        var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');

        var mq = function (query) {
            return window.matchMedia(query).matches;
        }

        if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
            return true;
        }

        // include the 'heartz' as a way to have a non matching MQ to help terminate the join
        // https://git.io/vznFH
        var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
        return mq(query);
    }

    /*!
    ♡♡♡♡♡♡♡♡♡♡♡
    ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
    More accessible gravity forms - see forms/_fields.scss for the styles
    ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
    ♡♡♡♡♡♡♡♡♡♡♡
    */
//     var $fields = $( '.gform_body input[type="text"],.gform_body input[type="email"], .gform_body textarea' ),
//         $label = $( ".gfield_label" );

//     //wrap label with a span
//     $label.wrapInner( "<span class='label-content'></span>");

//     //Add an active class to a focused in input field
//     $fields.focusin(function() {
//         $(this).parents( ".gfield" ).addClass("active");
//     });

//     //Check if the field is filled - if it is the active class will stay, if not the active class will revert to its non active state
//     $fields.focusout(function() {
// //        console.log($(this).val().length);

//         if ($(this).val().length == 0 ) {
//             $(this).parents( ".gfield" ).removeClass("active");
//         }

//     });

//     //Pre-check fallback - checks if the field already has a value and adds an active class if it does
// //    $fields.each(function( index ) {
// //            console.log( index + ": " + $( this ).val() );
// //    });

//     $fields.each(function() {
//         if( $(this).val()) {
//             $(this).parents( ".gfield" ).addClass("active");
//         } else {
//             $(this).parents( ".gfield" ).removeClass("active");
//         };
//     });
// var ex1 = document.querySelectorAll(".blocks-gallery-item");
// var ex2 = document.getElementsByClassName("blocks-gallery-item");
// // console.log(ex1, ex2);

    // function video() {
    //     var video = $('.video-wrapper'),
    //         wrapperWidth = $(window).width(),
    //         videoWidth = video.outerWidth(),
    //         videoHeight = video.outerHeight();

    //     //this is to get around the elastic url bar on mobiles like ios...
    //     if ( $(window).width() < 768 ) {
    //         var wrapperHeight = $(window).height() + 100;
    //     } else {
    //         var wrapperHeight = $(window).height();
    //     }

    //     var scale = Math.max(
    //         wrapperWidth/videoWidth,
    //         wrapperHeight/videoHeight
    //     );
    //     // console.log(scale);
    //     video.css({
    //         transform: "translate(-50%, -50%) " + "scale(" + scale + ")"
    //     });
    // }
    // video();
    // $(window).on('resize', function() {
    //     video();
    // });
});