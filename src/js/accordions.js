/*
-ˋˏ *.·:·.⟐.·:·.* ˎˊ-
━━━ ⋅𖥔⋅ ━━✶━━ ⋅𖥔⋅ ━━━
Accordions
━━━ ⋅𖥔⋅ ━━✶━━ ⋅𖥔⋅ ━━━
-ˋˏ *.·:·.⟐.·:·.* ˎˊ-
*/
(function($) {
  $(".panel-header").click(function (e) {
    $(this).next().slideToggle();
    $(this).parent().toggleClass('active')
  });
})( jQuery );