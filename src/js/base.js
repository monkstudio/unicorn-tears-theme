console.log('🥑 %cMade by Monk', 'background: #616a2e; color: #f4e9e2; padding: 5px 17px; border-radius: 3px;');
console.log(' %chttp://monk.com.au ', 'padding: 5px 13px;');

import  './vendor/flickity.min.js';
import  './vendor/jquery.fancybox.js';

import  './navigation.js';
import  './skip-link-focus-fix.js';

jQuery(function ($) {

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
			currentWidth = $(window).width(),
			currentHeight = $(window).height();

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
		// if ( $('body').hasClass('menu-open') ) {
		// 	$('#mobile-menu .label').text('Close')
		// } else {
		// 	$('#mobile-menu .label').text('Menu')
		// }
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
		var headerHeight = document.querySelector('#masthead').clientHeight;
		if (window.innerWidth !== currentWidth) {
			let viewportHeight = window.innerHeight;
			document.documentElement.style.setProperty('--vh', viewportHeight + 'px');
			document.documentElement.style.setProperty('--header', headerHeight + 'px');
		} else {
			document.documentElement.style.setProperty('--vh', currentHeight + 'px');
			document.documentElement.style.setProperty('--header', headerHeight + 'px');
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
	// $('.animate').on('inview', function (event, isInView) {
	// 	if (isInView) {
	// 		$(this).addClass('fadein');
	// 	}
	// });
  // AOS.init();
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
			wrapAround: true,
			cellSelector: '.slide',
			percentPosition: true,
			contain: true,
			setGallerySize: false,
			resize: true,
			imagesLoaded: true,
			cellAlign: 'left',
			freeScroll: false,
			prevNextButtons: false,
			// autoPlay: 4000,
			// selectedAttraction: 0.008,
			// friction: 0.16
		};

		var $carousel = _this.flickity(args);
		//Destroy
		// $carousel.flickity('destroy');
		//Re-init
		$carousel.flickity(args);
		// $carousel.flickity('reloadCells')

		// $(this).on('click', function () {
		// 	$carousel.flickity('next')
		// });

		// $carousel.on('dragStart.flickity', () => $carousel.find('.slide').css('pointer-events', 'none'));
		// $carousel.on('dragEnd.flickity', () => $carousel.find('.slide').css('pointer-events', 'all'));
	});

	$('.info-slider').each(function () {
		let _this = $(this);
		var args = {
			pageDots: false,
			wrapAround: true,
			cellSelector: '.slide',
			percentPosition: true,
			contain: true,
			setGallerySize: false,
			resize: true,
			imagesLoaded: true,
			cellAlign: 'left',
			freeScroll: false,
			prevNextButtons: false,
			autoPlay: 4000,
			selectedAttraction: 0.008,
			friction: 0.16
		};

		var $carousel = _this.flickity(args);
		//Destroy
		// $carousel.flickity('destroy');
		//Re-init
		$carousel.flickity(args);
		// $carousel.flickity('reloadCells');
	});

	$('.gallery-slider').each(function () {
		let _this = $(this);
		var args = {
			pageDots: false,
			wrapAround: true,
			cellSelector: '.slide',
			percentPosition: true,
			contain: true,
			setGallerySize: true,
			resize: true,
			imagesLoaded: true,
			cellAlign: 'left',
			freeScroll: false,
			prevNextButtons: false,
			autoPlay: 4000,
			selectedAttraction: 0.008,
			friction: 0.16
		};

		var $carousel = _this.flickity(args);
		//Destroy
		// $carousel.flickity('destroy');
		//Re-init
		$carousel.flickity(args);
		// $carousel.flickity('reloadCells');
		
		$(this).parent().find('.next').on('click', function () {
			$carousel.flickity('next')
		});
		$(this).parent().find('.prev').on('click', function () {
			$carousel.flickity('previous')
		});
		$carousel
		.on('dragStart.flickity', function(e) {
			$(this).addClass('is-dragging');
		})
		.on('dragEnd.flickity', function() {
			$(this).removeClass('is-dragging');
		})
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
		.not('.modal-trigger')
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

			if (wrapperWidth < 768) {
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
	Scrolly classes
	━━━ ⋅𖥔⋅ ━━✶━━ ⋅𖥔⋅ ━━━
	-ˋˏ *.·:·.⟐.·:·.* ˎˊ-
	*/
	var scrollDistance = function (callback, refresh) {

		// Make sure a valid callback was provided
		if (!callback || typeof callback !== 'function') return;

		// Variables
		var isScrolling, start, end, distance, docHeight, height;

		// Listen for scroll events
		window.addEventListener('scroll', function (event) {

			// Set starting position
			if (!start) {
				start = window.pageYOffset;
			}

			// Clear our timeout throughout the scroll
			window.clearTimeout(isScrolling);

			// Set a timeout to run after scrolling ends
			isScrolling = setTimeout(function () {

				// Calculate distance
				end = window.pageYOffset;
				distance = end - start;
				docHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
				height = docHeight - window.innerHeight;

				// Run the callback
				callback(distance, start, end, height);

				// Reset calculations
				start = null;
				end = null;
				distance = null;

			}, refresh || 20);

		}, false);
	};

	scrollDistance(function (distance, start, end, height) {
		// detect top and bottom scroll positions
		if (end >= height) {
			document.body.classList.add('scroll-bottom')
			document.body.classList.remove('scroll-top', 'scrolling-up', 'scrolling-down')
		} else if (end <= 1) {
			document.body.classList.add('scroll-top')
			document.body.classList.remove('scroll-bottom', 'scrolling-up', 'scrolling-down')
		} else if (distance > 0 && start !== 0 && end !== height) {
			document.body.classList.add('scrolling-down')
			document.body.classList.remove('scrolling-up', 'scroll-top', 'scroll-bottom')
		} else if (distance < 0 && start !== 0 && end !== height) {
			document.body.classList.add('scrolling-up')
			document.body.classList.remove('scrolling-down', 'scroll-top', 'scroll-bottom')
		}

		// console.log(distance, start,end,height)
	});
	window.scrollTo(window.scrollX, window.scrollY - 1);
	window.scrollTo(window.scrollX, window.scrollY + 1);



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
