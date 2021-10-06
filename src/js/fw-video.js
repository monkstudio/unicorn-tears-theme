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
window.addEventListener('resize', video);