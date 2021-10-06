/*
-ˋˏ *.·:·.⟐.·:·.* ˎˊ-
━━━ ⋅𖥔⋅ ━━✶━━ ⋅𖥔⋅ ━━━
Gravity Forms
━━━ ⋅𖥔⋅ ━━✶━━ ⋅𖥔⋅ ━━━
-ˋˏ *.·:·.⟐.·:·.* ˎˊ-
*/
// make gravity forms more accessible
var $fields = $('.gform_body input[type="text"],.gform_body input[type="email"], .gform_body textarea'),
  $label = $(".gfield_label");

//wrap label with a span
$label.wrapInner("<span class='label-content'></span>");

//Add an active class to a focused in input field
$fields.focusin(function () {
  $(this).parents(".gfield").addClass("active");
});

//Check if the field is filled - if it is the active class will stay, if not the active class will revert to its non active state
$fields.focusout(function () {
  //        console.log($(this).val().length);

  if ($(this).val().length == 0) {
    $(this).parents(".gfield").removeClass("active");
  }

});

//Pre-check fallback - checks if the field already has a value and adds an active class if it does
//    $fields.each(function( index ) {
//            console.log( index + ": " + $( this ).val() );
//    });

$fields.each(function () {
  if ($(this).val()) {
    $(this).parents(".gfield").addClass("active");
  } else {
    $(this).parents(".gfield").removeClass("active");
  };
});
var ex1 = document.querySelectorAll(".blocks-gallery-item");
var ex2 = document.getElementsByClassName("blocks-gallery-item");
// console.log(ex1, ex2);