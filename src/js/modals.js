
/*!
♡♡♡♡♡♡♡♡♡♡♡
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
Modals
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
♡♡♡♡♡♡♡♡♡♡♡
*/
var focusableElems = document.querySelectorAll('#page a[href]:not([disabled]),#page button:not([disabled]),#page textarea:not([disabled]),#page input[type="text"]:not([disabled]),#page input[type="radio"]:not([disabled]),#page input[type="checkbox"]:not([disabled]),#page select:not([disabled])');
var modalTriggers = document.querySelectorAll('.modal-trigger');

function closeModal() {
  document.getElementsByTagName( 'html' )[0].classList.remove('modal-open');
  let modals = document.querySelectorAll('.modal.active');
  for (i = 0; i < modals.length; i++) {
    modals[i].classList.remove('active');
  }
  for (i = 0; i < focusableElems.length; i++) {
    focusableElems[i].setAttribute('tabindex','')
  }
}

for (i = 0; i < modalTriggers.length; i++) {
  let btn = modalTriggers[i];
  btn.addEventListener('click', e => {
    e.preventDefault();
    let target = '#'+btn.hash.substr(1);
    let modalfocusableElems = document.querySelector(target).querySelectorAll('a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])');
    let closeBtn = document.querySelector(target).querySelector('.close');
    document.querySelector(target).classList.add('active');
    document.getElementsByTagName( 'html' )[0].classList.add('modal-open')

    for (i = 0; i < focusableElems.length; i++) {
      focusableElems[i].setAttribute('tabindex',-1)
    }

    for (i = 0; i < modalfocusableElems.length; i++) {
      modalfocusableElems[i].setAttribute('tabindex','');
    }

    // console.log(closeBtn)
    closeBtn.addEventListener('click', e => {
      console.log(e)
      closeModal();
    });
  });
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