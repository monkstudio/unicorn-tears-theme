	/*
	-ˋˏ *.·:·.⟐.·:·.* ˎˊ-
	━━━ ⋅𖥔⋅ ━━✶━━ ⋅𖥔⋅ ━━━
	Slider functionality
	━━━ ⋅𖥔⋅ ━━✶━━ ⋅𖥔⋅ ━━━
	-ˋˏ *.·:·.⟐.·:·.* ˎˊ-
	*/

import  './vendor/flickity.min';

(function($) {
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
	    .on('dragStart.flickity', function (e) {
	      $(this).addClass('is-dragging');
	    })
	    .on('dragEnd.flickity', function () {
	      $(this).removeClass('is-dragging');
	    })
	});
})( jQuery );