console.log('🥑 %cMade by Monk', 'background: #616a2e; color: #f4e9e2; padding: 5px 17px; border-radius: 3px;');
console.log(' %chttps://monk.com.au ', 'padding: 5px 13px;');

import './skip-link-focus-fix';
import './smoothscroll';
import './navigation';
import './scrollyclasses';
import './viewport-height';
import './fw-video';
import './sliders';
import './accordions';
import './fancybox';
import './gsapanims';

jQuery(function ($) {

	//page
	var $hamburger = $(".hamburger"),
		$site = $("body"),
		$menu = $(".main-navigation"),
		$menuitems = $(".menu-item"),
		$screenOverlay = $(".screen-overlay");

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

	$(document).on('keydown', function (e) {
		if (e.which == 27) {
			closeMenu();
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




});