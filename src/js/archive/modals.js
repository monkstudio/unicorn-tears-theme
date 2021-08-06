/*
-ˋˏ *.·:·.⟐.·:·.* ˎˊ-
━━━ ⋅𖥔⋅ ━━✶━━ ⋅𖥔⋅ ━━━
Bare bones modal
━━━ ⋅𖥔⋅ ━━✶━━ ⋅𖥔⋅ ━━━
-ˋˏ *.·:·.⟐.·:·.* ˎˊ-
*/
var focusableElems = document.querySelectorAll('#page a[href]:not([disabled]),#page button:not([disabled]),#page textarea:not([disabled]),#page input[type="text"]:not([disabled]),#page input[type="radio"]:not([disabled]),#page input[type="checkbox"]:not([disabled]),#page select:not([disabled])');
var modalTriggers = document.querySelectorAll('.modal-trigger');
var i;

//close modals
function closeModal() {
  let modals = document.querySelectorAll('.modal.active');
  let close = document.getElementById('btn-close');

  document.getElementsByTagName( 'html' )[0].classList.remove('modal-open');
  if ( close ) {
    close.remove();
  }

  for (i = 0; i < modals.length; i++) {
    modals[i].classList.remove('active');
  }
  for (i = 0; i < focusableElems.length; i++) {
    focusableElems[i].setAttribute('tabindex','')
  }

}


if ( modalTriggers.length > 0 ) {
  for (i = 0; i < modalTriggers.length; i++) {
    let btn = modalTriggers[i];
    btn.addEventListener('click', e => {
      e.preventDefault();
      let target = '#'+btn.hash.substr(1);
      let modalfocusableElems = document.querySelector(target).querySelectorAll('a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])');

      //close button
      let closeBtn = document.createElement('button');
      closeBtn.classList.add('button','close');
      closeBtn.id = 'btn-close';
      document.querySelector(target).appendChild(closeBtn);
      //set active classes
      document.querySelector(target).classList.add('active');
      document.getElementsByTagName( 'html' )[0].classList.add('modal-open')

      //focus attributes
      for (i = 0; i < focusableElems.length; i++) {
        focusableElems[i].setAttribute('tabindex',-1)
      }
      for (i = 0; i < modalfocusableElems.length; i++) {
        modalfocusableElems[i].setAttribute('tabindex','');
      }

      //close modal with esc
      closeBtn.addEventListener('click', e => {
        closeModal();
      });
    });
  }
}

document.onkeydown = function(evt) {
  evt = evt || window.event;
  var isEscape = false;
  if ("key" in evt) {
      isEscape = (evt.key === "Escape" || evt.key === "Esc");
  } else {
      isEscape = (evt.keyCode === 27);
  }
  if (isEscape) {
    closeModal();
  }
};