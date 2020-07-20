console.log('🥑 %cMade by Monk', 'background: #616a2e; color: #f4e9e2; padding: 5px 17px; border-radius: 3px;');
console.log(' %chttp://monk.com.au ', 'padding: 5px 13px;');


jQuery(document).ready(function ($) {

	//page
	var $hamburger = $(".hamburger"),
		$site = $("html,body"),
		$content = $('.site-content'),

		//menu
		$menu = $(".main-navigation"),
		$menuitems = $(".menu-item"),
		$screenOverlay = $(".screen-overlay"),

		//media
		$lightbox = $('.lightbox'),
		currentWidth = $(window).width();

	/*
	-ˋˏ *.·:·.⟐.·:·.* ˎˊ-
	━━━ ⋅𖥔⋅ ━━✶━━ ⋅𖥔⋅ ━━━
	Mobile Menu
	━━━ ⋅𖥔⋅ ━━✶━━ ⋅𖥔⋅ ━━━
	-ˋˏ *.·:·.⟐.·:·.* ˎˊ-
	*/
	$hamburger.on("click", function () {
		$hamburger.toggleClass("is-active");
		$site.toggleClass("menu-open");
	});
	//close menu with an outside click (basically anywhere on .site-content)
	function closeMenu() {
		$site.removeClass("menu-open");
		$menu.removeClass("toggled");
		$menuitems.removeClass('toggled-on');
		$hamburger.removeClass("is-active");
	}
	$screenOverlay.on('click', closeMenu);

	$(document).bind('keydown', function (e) {
		if (e.which == 27) {
			closeMenu();
		}
	});


	/*
	-ˋˏ *.·:·.⟐.·:·.* ˎˊ-
	━━━ ⋅𖥔⋅ ━━✶━━ ⋅𖥔⋅ ━━━
	Store VH
	━━━ ⋅𖥔⋅ ━━✶━━ ⋅𖥔⋅ ━━━
	-ˋˏ *.·:·.⟐.·:·.* ˎˊ-
	*/
	function viewportHeight() {
		if ($(window).width() !== currentWidth) {
			let viewportHeight = window.innerHeight;
			document.documentElement.style.setProperty('--header', viewportHeight + 'px');
		}
	}
	viewportHeight();

	/*
	-ˋˏ *.·:·.⟐.·:·.* ˎˊ-
	━━━ ⋅𖥔⋅ ━━✶━━ ⋅𖥔⋅ ━━━
	Add lightbox
	━━━ ⋅𖥔⋅ ━━✶━━ ⋅𖥔⋅ ━━━
	-ˋˏ *.·:·.⟐.·:·.* ˎˊ-
	*/
	$('a[href]').filter(function () {
		return this.href && this.href.match(/\.(?:jpe?g|gif|bmp|a?png)$/i);
	}).addClass('lightbox');
	$lightbox.fancybox({
		touch: {
			vertical: true, // Allow to drag content vertically
			momentum: true // Continue movement after releasing mouse/touch when panning
		},
	});
	$('[data-fancybox]').fancybox({
		youtube: {
			controls: 0,
			showinfo: 0
		},
		vimeo: {
			color: '000'
		}
	});

	/*
	-ˋˏ *.·:·.⟐.·:·.* ˎˊ-
	━━━ ⋅𖥔⋅ ━━✶━━ ⋅𖥔⋅ ━━━
	Animate elements in on scroll
	━━━ ⋅𖥔⋅ ━━✶━━ ⋅𖥔⋅ ━━━
	-ˋˏ *.·:·.⟐.·:·.* ˎˊ-
	*/
	$('.animate').on('inview', function (event, isInView) {
		if (isInView) {
			$(this).addClass('fadein');
		}
	});

	/*
	-ˋˏ *.·:·.⟐.·:·.* ˎˊ-
	━━━ ⋅𖥔⋅ ━━✶━━ ⋅𖥔⋅ ━━━
	Accordions
	━━━ ⋅𖥔⋅ ━━✶━━ ⋅𖥔⋅ ━━━
	-ˋˏ *.·:·.⟐.·:·.* ˎˊ-
	*/
	$(".panel-header").click(function (e) {
		$(this).next().slideToggle();
		$(this).parent().toggleClass('active')
	});

	/*
	-ˋˏ *.·:·.⟐.·:·.* ˎˊ-
	━━━ ⋅𖥔⋅ ━━✶━━ ⋅𖥔⋅ ━━━
	Slider functionality
	━━━ ⋅𖥔⋅ ━━✶━━ ⋅𖥔⋅ ━━━
	-ˋˏ *.·:·.⟐.·:·.* ˎˊ-
	*/
	$('.slider').each(function () {
		let _this = $(this);
		var args = {
			pageDots: false,
			wrapAround: false,
			cellSelector: 'img',
			percentPosition: false,
			contain: true,
			setGallerySize: false,
			resize: true,
			imagesLoaded: true,
			cellAlign: 'left',
			freeScroll: true,
		};

		var $carousel = _this.flickity(args);
		//Destroy
		$carousel.flickity('destroy');
		//Re-init
		$carousel.flickity(args);
		$carousel.flickity('reloadCells')

		$(this).find('.next').on('click', function () {
			$(this).hide();
		});
	});

	$('.info-slider').each(function () {
		let _this = $(this);
		var args = {
			pageDots: false,
			wrapAround: true,
			cellSelector: '.slide',
			// percentPosition: false,
			// contain: true,
			// setGallerySize: false,
			resize: true,
			imagesLoaded: true,
			freeScroll: true,
		};

		var $carousel = _this.flickity(args);
		//Destroy
		$carousel.flickity('destroy');
		//Re-init
		$carousel.flickity(args);
		$carousel.flickity('reloadCells');
	});
	//recalculates slider on load to get around some annoying center mode bugs
	$(window).resize();

	/*
	-ˋˏ *.·:·.⟐.·:·.* ˎˊ-
	━━━ ⋅𖥔⋅ ━━✶━━ ⋅𖥔⋅ ━━━
	Smooth scroll
	━━━ ⋅𖥔⋅ ━━✶━━ ⋅𖥔⋅ ━━━
	-ˋˏ *.·:·.⟐.·:·.* ˎˊ-
	*/
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

	/*
	-ˋˏ *.·:·.⟐.·:·.* ˎˊ-
	━━━ ⋅𖥔⋅ ━━✶━━ ⋅𖥔⋅ ━━━
	Make feature videos act as background: cover
	━━━ ⋅𖥔⋅ ━━✶━━ ⋅𖥔⋅ ━━━
	-ˋˏ *.·:·.⟐.·:·.* ˎˊ-
	*/
	function video() {
		var video = document.querySelector('.video-wrapper');

		if (video !== null) {
			var wrapperWidth = window.outerWidth,
				videoWidth = video.offsetWidth,
				videoHeight = video.offsetHeight; //this is to get around the elastic url bar on mobiles like ios...

			if (wrapperWidth < 1024) {
				var wrapperHeight = window.innerHeight + 100;
			} else {
				var wrapperHeight = window.innerHeight;
			}

			var scale = Math.max(wrapperWidth / videoWidth, wrapperHeight / videoHeight);
			document.querySelector('.video-wrapper').style.transform = "translate(-50%, -50%) " + "scale(" + scale + ")";
		}
	}
	video();

	//update the video's scale as the browser resizes
	$(window).on('resize', function () {
		video();
		viewportHeight();
	});




	/*
	-ˋˏ *.·:·.⟐.·:·.* ˎˊ-
	━━━ ⋅𖥔⋅ ━━✶━━ ⋅𖥔⋅ ━━━
	Gravity Forms
	━━━ ⋅𖥔⋅ ━━✶━━ ⋅𖥔⋅ ━━━
	-ˋˏ *.·:·.⟐.·:·.* ˎˊ-
	*/
	// $('.gform_wrapper').on('submit', 'form', function () {
	// 	$('[type=submit]', this) // Select the form's submit button
	// 		.val('Sending...') // Change the value of the submit button. Change text to whatever you like.
	// 		.prop('disabled', true); // Not really necessary but will prevent the user from clicking the button again while the form is submitting.
	// });

	//make gravity forms more accessible
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

});
