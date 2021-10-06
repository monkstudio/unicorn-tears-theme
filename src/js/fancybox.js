/*
-ˋˏ *.·:·.⟐.·:·.* ˎˊ-
━━━ ⋅𖥔⋅ ━━✶━━ ⋅𖥔⋅ ━━━
Add lightbox
━━━ ⋅𖥔⋅ ━━✶━━ ⋅𖥔⋅ ━━━
-ˋˏ *.·:·.⟐.·:·.* ˎˊ-
*/
import  './vendor/jquery.fancybox';


(function($) {

  var $lightbox = $('.lightbox');

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

})( jQuery );