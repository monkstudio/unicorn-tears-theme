/*
-ˋˏ *.·:·.⟐.·:·.* ˎˊ-
━━━ ⋅𖥔⋅ ━━✶━━ ⋅𖥔⋅ ━━━
Store VH
━━━ ⋅𖥔⋅ ━━✶━━ ⋅𖥔⋅ ━━━
-ˋˏ *.·:·.⟐.·:·.* ˎˊ-
*/

var currentWidth = window.outerWidth,
    currentHeight = window.outerHeight;

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

window.addEventListener('resize', viewportHeight);