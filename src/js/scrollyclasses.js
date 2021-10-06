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