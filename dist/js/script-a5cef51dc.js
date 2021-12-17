/**
 * File skip-link-focus-fix.js.
 *
 * Helps with accessibility for keyboard only users.
 *
 * Learn more: https://git.io/vWdr2
 */
(function () {
  var isWebkit = navigator.userAgent.toLowerCase().indexOf('webkit') > -1,
      isOpera = navigator.userAgent.toLowerCase().indexOf('opera') > -1,
      isIe = navigator.userAgent.toLowerCase().indexOf('msie') > -1;

  if ((isWebkit || isOpera || isIe) && document.getElementById && window.addEventListener) {
    window.addEventListener('hashchange', function () {
      var id = location.hash.substring(1),
          element;

      if (!/^[A-z0-9_-]+$/.test(id)) {
        return;
      }

      element = document.getElementById(id);

      if (element) {
        if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
          element.tabIndex = -1;
        }

        element.focus();
      }
    }, false);
  }
})();

/*
-ˋˏ *.·:·.⟐.·:·.* ˎˊ-
━━━ ⋅𖥔⋅ ━━✶━━ ⋅𖥔⋅ ━━━
Smooth scroll
━━━ ⋅𖥔⋅ ━━✶━━ ⋅𖥔⋅ ━━━
-ˋˏ *.·:·.⟐.·:·.* ˎˊ-
*/
(function ($) {
  $('a[href*="#"]') // Remove links that don't actually link to anything
  .not('[href="#"]').not('[href="#0"]').not('.modal-trigger').click(function (event) {
    // On-page links
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']'); // Does a scroll target exist?

      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function () {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();

          if ($target.is(":focus")) {
            // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable

            $target.focus(); // Set focus again
          }
        });
      }
    }
  });
})(jQuery);

/**
 * File navigation.js.
 *
 * Handles toggling the navigation menu for small screens and enables TAB key
 * navigation support for dropdown menus.
 */
(function () {
  var container, button, menu, links, i, len;
  container = document.getElementById('site-navigation');

  if (!container) {
    return;
  }

  button = container.getElementsByTagName('button')[0];

  if ('undefined' === typeof button) {
    return;
  }

  menu = container.getElementsByTagName('ul')[0]; // Hide menu toggle button if menu is empty and return early.

  if ('undefined' === typeof menu) {
    button.style.display = 'none';
    return;
  }

  menu.setAttribute('aria-expanded', 'false');

  if (-1 === menu.className.indexOf('nav-menu')) {
    menu.className += ' nav-menu';
  }

  button.onclick = function () {
    if (-1 !== container.className.indexOf('toggled')) {
      container.className = container.className.replace(' toggled', '');
      button.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-expanded', 'false');
    } else {
      container.className += ' toggled';
      button.setAttribute('aria-expanded', 'true');
      menu.setAttribute('aria-expanded', 'true');
    }
  }; // Get all the link elements within the menu.


  links = menu.getElementsByTagName('a'); // Each time a menu link is focused or blurred, toggle focus.

  for (i = 0, len = links.length; i < len; i++) {
    links[i].addEventListener('focus', toggleFocus, true);
    links[i].addEventListener('blur', toggleFocus, true);
  }
  /**
   * Sets or removes .focus class on an element.
   */


  function toggleFocus() {
    var self = this; // Move up through the ancestors of the current link until we hit .nav-menu.

    while (-1 === self.className.indexOf('nav-menu')) {
      // On li elements toggle the class .focus.
      if ('li' === self.tagName.toLowerCase()) {
        // console.log(self.className.indexOf( 'focus' ))
        if (-1 !== self.className.indexOf('focus')) {
          self.className = self.className.replace(' focus', '');
        } else {
          self.className += ' focus';
        }
      }

      self = self.parentElement;
    }
  }
  /**
   * Toggles `focus` class to allow submenu access on tablets.
   */


  (function (container) {
    var touchStartFn,
        i,
        parentLink = container.querySelectorAll('.menu-item-has-children > a, .page_item_has_children > a');

    if ('ontouchstart' in window) {
      touchStartFn = function (e) {
        var menuItem = this.parentNode,
            i;

        if (!menuItem.classList.contains('focus')) {
          // e.preventDefault();
          for (i = 0; i < menuItem.parentNode.children.length; ++i) {
            if (menuItem === menuItem.parentNode.children[i]) {
              continue;
            }

            menuItem.parentNode.children[i].classList.remove('focus');
          }

          menuItem.classList.add('focus');
        } else {
          menuItem.classList.remove('focus');
        }
      };

      for (i = 0; i < parentLink.length; ++i) {
        parentLink[i].addEventListener('touchstart', touchStartFn, false);
      }
    }
  })(container);
})();

(function ($) {

  function initMainNavigation(container) {
    //check if $navcontent in functions.php is false
    // 	if ( navcontent.has_navigation == 'true') {
    // 		// Add dropdown toggle that displays child menu items.
    // 		var dropdownToggle = '<div class="dropdown-toggle" aria-expanded="false" aria-label="Toggle Menu">'+navcontent.iconOpen+'<span class="screen-reader-text">Expand</span></div>'
    // }
    // 	// container.find( '.menu-item-has-children > .sub-menu, .page_item_has_children > .sub-menu' ).before( dropdownToggle );
    // 	container.find( '.menu-item-has-children > a, .page_item_has_children > a' ).after( dropdownToggle );
    // Toggle buttons and submenu items with active children menu items.
    // container.find( '.current-menu-ancestor > button' ).addClass( 'toggled-on' );
    // container.find( '.current-menu-ancestor > .sub-menu' ).addClass( 'toggled-on' );
    // Add menu items with submenus to aria-haspopup="true".
    container.find('.menu-item-has-children, .page_item_has_children').attr('aria-haspopup', 'true');
    container.find('.dropdown-toggle').click(function (e) {
      // if ( 	$('body').hasClass('menu-open')) {
      // 	$('body').removeClass('menu-open');
      // } else {
      // 	$('body').addClass('menu-open');
      // }
      var _this = $(this),
          screenReaderSpan = _this.find('.screen-reader-text'); // if ( document.body.clientWidth < 1024 || 'ontouchstart' in window   ) {
      //     e.preventDefault();
      //     // $(this).unbind(e);
      // }


      _this.parent().parent().toggleClass('toggled-on');

      _this.prev('.children, .sub-menu').toggleClass('toggled-on'); // jscs:disable


      _this.attr('aria-expanded', _this.attr('aria-expanded') === 'false' ? 'true' : 'false'); // jscs:enable


      screenReaderSpan.text(screenReaderSpan.text() === navcontent.expand ? navcontent.collapse : navcontent.expand); // if (_this.parent().hasClass('toggled-on') ) {
      // 	_this.find('.svg-wrapper').html(navcontent.iconClose);
      // } else {
      // 	_this.find('.svg-wrapper').html(navcontent.iconOpen);
      // }
    });
  }

  initMainNavigation($('.main-navigation'));
})(jQuery);

/*
-ˋˏ *.·:·.⟐.·:·.* ˎˊ-
━━━ ⋅𖥔⋅ ━━✶━━ ⋅𖥔⋅ ━━━
Scrolly classes
━━━ ⋅𖥔⋅ ━━✶━━ ⋅𖥔⋅ ━━━
-ˋˏ *.·:·.⟐.·:·.* ˎˊ-
*/
var scrollDistance = function (callback, refresh) {
  // Make sure a valid callback was provided
  if (!callback || typeof callback !== 'function') return; // Variables

  var isScrolling, start, end, distance, docHeight, height; // Listen for scroll events

  window.addEventListener('scroll', function (event) {
    // Set starting position
    if (!start) {
      start = window.pageYOffset;
    } // Clear our timeout throughout the scroll


    window.clearTimeout(isScrolling); // Set a timeout to run after scrolling ends

    isScrolling = setTimeout(function () {
      // Calculate distance
      end = window.pageYOffset;
      distance = end - start;
      docHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
      height = docHeight - window.innerHeight; // Run the callback

      callback(distance, start, end, height); // Reset calculations

      start = null;
      end = null;
      distance = null;
    }, refresh || 20);
  }, false);
};

scrollDistance(function (distance, start, end, height) {
  // detect top and bottom scroll positions
  if (end >= height) {
    document.body.classList.add('scroll-bottom');
    document.body.classList.remove('scroll-top', 'scrolling-up', 'scrolling-down');
  } else if (end <= 1) {
    document.body.classList.add('scroll-top');
    document.body.classList.remove('scroll-bottom', 'scrolling-up', 'scrolling-down');
  } else if (distance > 0 && start !== 0 && end !== height) {
    document.body.classList.add('scrolling-down');
    document.body.classList.remove('scrolling-up', 'scroll-top', 'scroll-bottom');
  } else if (distance < 0 && start !== 0 && end !== height) {
    document.body.classList.add('scrolling-up');
    document.body.classList.remove('scrolling-down', 'scroll-top', 'scroll-bottom');
  } // console.log(distance, start,end,height)

});
window.scrollTo(window.scrollX, window.scrollY - 1);
window.scrollTo(window.scrollX, window.scrollY + 1);

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
    var wrapper = video.parentElement,
        wrapperWidth = wrapper.clientWidth,
        videoWidth = video.offsetWidth,
        videoHeight = video.offsetHeight; //this is to get around the elastic url bar on mobiles like ios...

    if (wrapperWidth < 768) {
      var wrapperHeight = wrapper.clientHeight + 200;
    } else {
      var wrapperHeight = wrapper.clientHeight;
    }

    var scale = Math.max(wrapperWidth / videoWidth, wrapperHeight / videoHeight);
    document.querySelector('.video-wrapper').style.transform = "translate(-50%, -50%) " + "scale(" + scale + ")";
  }
}

video(); //update the video's scale as the browser resizes

window.addEventListener('resize', video);

/*!
 * Flickity PACKAGED v2.2.1
 * Touch, responsive, flickable carousels
 *
 * Licensed GPLv3 for open source use
 * or Flickity Commercial License for commercial use
 *
 * https://flickity.metafizzy.co
 * Copyright 2015-2019 Metafizzy
 */
!function (e, i) {
  "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function (t) {
    return i(e, t);
  }) : "object" == typeof module && module.exports ? module.exports = i(e, require("jquery")) : e.jQueryBridget = i(e, e.jQuery);
}(window, function (t, e) {

  var i = Array.prototype.slice,
      n = t.console,
      d = void 0 === n ? function () {} : function (t) {
    n.error(t);
  };

  function s(h, s, c) {
    (c = c || e || t.jQuery) && (s.prototype.option || (s.prototype.option = function (t) {
      c.isPlainObject(t) && (this.options = c.extend(!0, this.options, t));
    }), c.fn[h] = function (t) {
      return "string" == typeof t ? function (t, o, r) {
        var a,
            l = "$()." + h + '("' + o + '")';
        return t.each(function (t, e) {
          var i = c.data(e, h);

          if (i) {
            var n = i[o];

            if (n && "_" != o.charAt(0)) {
              var s = n.apply(i, r);
              a = void 0 === a ? s : a;
            } else d(l + " is not a valid method");
          } else d(h + " not initialized. Cannot call methods, i.e. " + l);
        }), void 0 !== a ? a : t;
      }(this, t, i.call(arguments, 1)) : (function (t, n) {
        t.each(function (t, e) {
          var i = c.data(e, h);
          i ? (i.option(n), i._init()) : (i = new s(e, n), c.data(e, h, i));
        });
      }(this, t), this);
    }, o(c));
  }

  function o(t) {
    !t || t && t.bridget || (t.bridget = s);
  }

  return o(e || t.jQuery), s;
}), function (t, e) {
  "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e();
}("undefined" != typeof window ? window : undefined, function () {
  function t() {}

  var e = t.prototype;
  return e.on = function (t, e) {
    if (t && e) {
      var i = this._events = this._events || {},
          n = i[t] = i[t] || [];
      return -1 == n.indexOf(e) && n.push(e), this;
    }
  }, e.once = function (t, e) {
    if (t && e) {
      this.on(t, e);
      var i = this._onceEvents = this._onceEvents || {};
      return (i[t] = i[t] || {})[e] = !0, this;
    }
  }, e.off = function (t, e) {
    var i = this._events && this._events[t];

    if (i && i.length) {
      var n = i.indexOf(e);
      return -1 != n && i.splice(n, 1), this;
    }
  }, e.emitEvent = function (t, e) {
    var i = this._events && this._events[t];

    if (i && i.length) {
      i = i.slice(0), e = e || [];

      for (var n = this._onceEvents && this._onceEvents[t], s = 0; s < i.length; s++) {
        var o = i[s];
        n && n[o] && (this.off(t, o), delete n[o]), o.apply(this, e);
      }

      return this;
    }
  }, e.allOff = function () {
    delete this._events, delete this._onceEvents;
  }, t;
}), function (t, e) {
  "function" == typeof define && define.amd ? define("get-size/get-size", e) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e();
}(window, function () {

  function m(t) {
    var e = parseFloat(t);
    return -1 == t.indexOf("%") && !isNaN(e) && e;
  }

  var i = "undefined" == typeof console ? function () {} : function (t) {
    console.error(t);
  },
      y = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
      b = y.length;

  function E(t) {
    var e = getComputedStyle(t);
    return e || i("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"), e;
  }

  var S,
      C = !1;

  function x(t) {
    if (function () {
      if (!C) {
        C = !0;
        var t = document.createElement("div");
        t.style.width = "200px", t.style.padding = "1px 2px 3px 4px", t.style.borderStyle = "solid", t.style.borderWidth = "1px 2px 3px 4px", t.style.boxSizing = "border-box";
        var e = document.body || document.documentElement;
        e.appendChild(t);
        var i = E(t);
        S = 200 == Math.round(m(i.width)), x.isBoxSizeOuter = S, e.removeChild(t);
      }
    }(), "string" == typeof t && (t = document.querySelector(t)), t && "object" == typeof t && t.nodeType) {
      var e = E(t);
      if ("none" == e.display) return function () {
        for (var t = {
          width: 0,
          height: 0,
          innerWidth: 0,
          innerHeight: 0,
          outerWidth: 0,
          outerHeight: 0
        }, e = 0; e < b; e++) {
          t[y[e]] = 0;
        }

        return t;
      }();
      var i = {};
      i.width = t.offsetWidth, i.height = t.offsetHeight;

      for (var n = i.isBorderBox = "border-box" == e.boxSizing, s = 0; s < b; s++) {
        var o = y[s],
            r = e[o],
            a = parseFloat(r);
        i[o] = isNaN(a) ? 0 : a;
      }

      var l = i.paddingLeft + i.paddingRight,
          h = i.paddingTop + i.paddingBottom,
          c = i.marginLeft + i.marginRight,
          d = i.marginTop + i.marginBottom,
          u = i.borderLeftWidth + i.borderRightWidth,
          f = i.borderTopWidth + i.borderBottomWidth,
          p = n && S,
          g = m(e.width);
      !1 !== g && (i.width = g + (p ? 0 : l + u));
      var v = m(e.height);
      return !1 !== v && (i.height = v + (p ? 0 : h + f)), i.innerWidth = i.width - (l + u), i.innerHeight = i.height - (h + f), i.outerWidth = i.width + c, i.outerHeight = i.height + d, i;
    }
  }

  return x;
}), function (t, e) {

  "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e();
}(window, function () {

  var i = function () {
    var t = window.Element.prototype;
    if (t.matches) return "matches";
    if (t.matchesSelector) return "matchesSelector";

    for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
      var n = e[i] + "MatchesSelector";
      if (t[n]) return n;
    }
  }();

  return function (t, e) {
    return t[i](e);
  };
}), function (e, i) {
  "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function (t) {
    return i(e, t);
  }) : "object" == typeof module && module.exports ? module.exports = i(e, require("desandro-matches-selector")) : e.fizzyUIUtils = i(e, e.matchesSelector);
}(window, function (h, o) {
  var c = {
    extend: function (t, e) {
      for (var i in e) t[i] = e[i];

      return t;
    },
    modulo: function (t, e) {
      return (t % e + e) % e;
    }
  },
      e = Array.prototype.slice;
  c.makeArray = function (t) {
    return Array.isArray(t) ? t : null == t ? [] : "object" == typeof t && "number" == typeof t.length ? e.call(t) : [t];
  }, c.removeFrom = function (t, e) {
    var i = t.indexOf(e);
    -1 != i && t.splice(i, 1);
  }, c.getParent = function (t, e) {
    for (; t.parentNode && t != document.body;) if (t = t.parentNode, o(t, e)) return t;
  }, c.getQueryElement = function (t) {
    return "string" == typeof t ? document.querySelector(t) : t;
  }, c.handleEvent = function (t) {
    var e = "on" + t.type;
    this[e] && this[e](t);
  }, c.filterFindElements = function (t, n) {
    t = c.makeArray(t);
    var s = [];
    return t.forEach(function (t) {
      if (t instanceof HTMLElement) if (n) {
        o(t, n) && s.push(t);

        for (var e = t.querySelectorAll(n), i = 0; i < e.length; i++) s.push(e[i]);
      } else s.push(t);
    }), s;
  }, c.debounceMethod = function (t, e, n) {
    n = n || 100;
    var s = t.prototype[e],
        o = e + "Timeout";

    t.prototype[e] = function () {
      var t = this[o];
      clearTimeout(t);
      var e = arguments,
          i = this;
      this[o] = setTimeout(function () {
        s.apply(i, e), delete i[o];
      }, n);
    };
  }, c.docReady = function (t) {
    var e = document.readyState;
    "complete" == e || "interactive" == e ? setTimeout(t) : document.addEventListener("DOMContentLoaded", t);
  }, c.toDashed = function (t) {
    return t.replace(/(.)([A-Z])/g, function (t, e, i) {
      return e + "-" + i;
    }).toLowerCase();
  };
  var d = h.console;
  return c.htmlInit = function (a, l) {
    c.docReady(function () {
      var t = c.toDashed(l),
          s = "data-" + t,
          e = document.querySelectorAll("[" + s + "]"),
          i = document.querySelectorAll(".js-" + t),
          n = c.makeArray(e).concat(c.makeArray(i)),
          o = s + "-options",
          r = h.jQuery;
      n.forEach(function (e) {
        var t,
            i = e.getAttribute(s) || e.getAttribute(o);

        try {
          t = i && JSON.parse(i);
        } catch (t) {
          return void (d && d.error("Error parsing " + s + " on " + e.className + ": " + t));
        }

        var n = new a(e, t);
        r && r.data(e, l, n);
      });
    });
  }, c;
}), function (e, i) {
  "function" == typeof define && define.amd ? define("flickity/js/cell", ["get-size/get-size"], function (t) {
    return i(e, t);
  }) : "object" == typeof module && module.exports ? module.exports = i(e, require("get-size")) : (e.Flickity = e.Flickity || {}, e.Flickity.Cell = i(e, e.getSize));
}(window, function (t, e) {
  function i(t, e) {
    this.element = t, this.parent = e, this.create();
  }

  var n = i.prototype;
  return n.create = function () {
    this.element.style.position = "absolute", this.element.setAttribute("aria-hidden", "true"), this.x = 0, this.shift = 0;
  }, n.destroy = function () {
    this.unselect(), this.element.style.position = "";
    var t = this.parent.originSide;
    this.element.style[t] = "";
  }, n.getSize = function () {
    this.size = e(this.element);
  }, n.setPosition = function (t) {
    this.x = t, this.updateTarget(), this.renderPosition(t);
  }, n.updateTarget = n.setDefaultTarget = function () {
    var t = "left" == this.parent.originSide ? "marginLeft" : "marginRight";
    this.target = this.x + this.size[t] + this.size.width * this.parent.cellAlign;
  }, n.renderPosition = function (t) {
    var e = this.parent.originSide;
    this.element.style[e] = this.parent.getPositionValue(t);
  }, n.select = function () {
    this.element.classList.add("is-selected"), this.element.removeAttribute("aria-hidden");
  }, n.unselect = function () {
    this.element.classList.remove("is-selected"), this.element.setAttribute("aria-hidden", "true");
  }, n.wrapShift = function (t) {
    this.shift = t, this.renderPosition(this.x + this.parent.slideableWidth * t);
  }, n.remove = function () {
    this.element.parentNode.removeChild(this.element);
  }, i;
}), function (t, e) {
  "function" == typeof define && define.amd ? define("flickity/js/slide", e) : "object" == typeof module && module.exports ? module.exports = e() : (t.Flickity = t.Flickity || {}, t.Flickity.Slide = e());
}(window, function () {

  function t(t) {
    this.parent = t, this.isOriginLeft = "left" == t.originSide, this.cells = [], this.outerWidth = 0, this.height = 0;
  }

  var e = t.prototype;
  return e.addCell = function (t) {
    if (this.cells.push(t), this.outerWidth += t.size.outerWidth, this.height = Math.max(t.size.outerHeight, this.height), 1 == this.cells.length) {
      this.x = t.x;
      var e = this.isOriginLeft ? "marginLeft" : "marginRight";
      this.firstMargin = t.size[e];
    }
  }, e.updateTarget = function () {
    var t = this.isOriginLeft ? "marginRight" : "marginLeft",
        e = this.getLastCell(),
        i = e ? e.size[t] : 0,
        n = this.outerWidth - (this.firstMargin + i);
    this.target = this.x + this.firstMargin + n * this.parent.cellAlign;
  }, e.getLastCell = function () {
    return this.cells[this.cells.length - 1];
  }, e.select = function () {
    this.cells.forEach(function (t) {
      t.select();
    });
  }, e.unselect = function () {
    this.cells.forEach(function (t) {
      t.unselect();
    });
  }, e.getCellElements = function () {
    return this.cells.map(function (t) {
      return t.element;
    });
  }, t;
}), function (e, i) {
  "function" == typeof define && define.amd ? define("flickity/js/animate", ["fizzy-ui-utils/utils"], function (t) {
    return i(e, t);
  }) : "object" == typeof module && module.exports ? module.exports = i(e, require("fizzy-ui-utils")) : (e.Flickity = e.Flickity || {}, e.Flickity.animatePrototype = i(e, e.fizzyUIUtils));
}(window, function (t, e) {
  var i = {
    startAnimation: function () {
      this.isAnimating || (this.isAnimating = !0, this.restingFrames = 0, this.animate());
    },
    animate: function () {
      this.applyDragForce(), this.applySelectedAttraction();
      var t = this.x;

      if (this.integratePhysics(), this.positionSlider(), this.settle(t), this.isAnimating) {
        var e = this;
        requestAnimationFrame(function () {
          e.animate();
        });
      }
    },
    positionSlider: function () {
      var t = this.x;
      this.options.wrapAround && 1 < this.cells.length && (t = e.modulo(t, this.slideableWidth), t -= this.slideableWidth, this.shiftWrapCells(t)), this.setTranslateX(t, this.isAnimating), this.dispatchScrollEvent();
    },
    setTranslateX: function (t, e) {
      t += this.cursorPosition, t = this.options.rightToLeft ? -t : t;
      var i = this.getPositionValue(t);
      this.slider.style.transform = e ? "translate3d(" + i + ",0,0)" : "translateX(" + i + ")";
    },
    dispatchScrollEvent: function () {
      var t = this.slides[0];

      if (t) {
        var e = -this.x - t.target,
            i = e / this.slidesWidth;
        this.dispatchEvent("scroll", null, [i, e]);
      }
    },
    positionSliderAtSelected: function () {
      this.cells.length && (this.x = -this.selectedSlide.target, this.velocity = 0, this.positionSlider());
    },
    getPositionValue: function (t) {
      return this.options.percentPosition ? .01 * Math.round(t / this.size.innerWidth * 1e4) + "%" : Math.round(t) + "px";
    },
    settle: function (t) {
      this.isPointerDown || Math.round(100 * this.x) != Math.round(100 * t) || this.restingFrames++, 2 < this.restingFrames && (this.isAnimating = !1, delete this.isFreeScrolling, this.positionSlider(), this.dispatchEvent("settle", null, [this.selectedIndex]));
    },
    shiftWrapCells: function (t) {
      var e = this.cursorPosition + t;

      this._shiftCells(this.beforeShiftCells, e, -1);

      var i = this.size.innerWidth - (t + this.slideableWidth + this.cursorPosition);

      this._shiftCells(this.afterShiftCells, i, 1);
    },
    _shiftCells: function (t, e, i) {
      for (var n = 0; n < t.length; n++) {
        var s = t[n],
            o = 0 < e ? i : 0;
        s.wrapShift(o), e -= s.size.outerWidth;
      }
    },
    _unshiftCells: function (t) {
      if (t && t.length) for (var e = 0; e < t.length; e++) t[e].wrapShift(0);
    },
    integratePhysics: function () {
      this.x += this.velocity, this.velocity *= this.getFrictionFactor();
    },
    applyForce: function (t) {
      this.velocity += t;
    },
    getFrictionFactor: function () {
      return 1 - this.options[this.isFreeScrolling ? "freeScrollFriction" : "friction"];
    },
    getRestingPosition: function () {
      return this.x + this.velocity / (1 - this.getFrictionFactor());
    },
    applyDragForce: function () {
      if (this.isDraggable && this.isPointerDown) {
        var t = this.dragX - this.x - this.velocity;
        this.applyForce(t);
      }
    },
    applySelectedAttraction: function () {
      if (!(this.isDraggable && this.isPointerDown) && !this.isFreeScrolling && this.slides.length) {
        var t = (-1 * this.selectedSlide.target - this.x) * this.options.selectedAttraction;
        this.applyForce(t);
      }
    }
  };
  return i;
}), function (r, a) {
  if ("function" == typeof define && define.amd) define("flickity/js/flickity", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./cell", "./slide", "./animate"], function (t, e, i, n, s, o) {
    return a(r, t, e, i, n, s, o);
  });else if ("object" == typeof module && module.exports) module.exports = a(r, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./cell"), require("./slide"), require("./animate"));else {
    var t = r.Flickity;
    r.Flickity = a(r, r.EvEmitter, r.getSize, r.fizzyUIUtils, t.Cell, t.Slide, t.animatePrototype);
  }
}(window, function (n, t, e, a, i, r, s) {
  var l = n.jQuery,
      o = n.getComputedStyle,
      h = n.console;

  function c(t, e) {
    for (t = a.makeArray(t); t.length;) e.appendChild(t.shift());
  }

  var d = 0,
      u = {};

  function f(t, e) {
    var i = a.getQueryElement(t);

    if (i) {
      if (this.element = i, this.element.flickityGUID) {
        var n = u[this.element.flickityGUID];
        return n.option(e), n;
      }

      l && (this.$element = l(this.element)), this.options = a.extend({}, this.constructor.defaults), this.option(e), this._create();
    } else h && h.error("Bad element for Flickity: " + (i || t));
  }

  f.defaults = {
    accessibility: !0,
    cellAlign: "center",
    freeScrollFriction: .075,
    friction: .28,
    namespaceJQueryEvents: !0,
    percentPosition: !0,
    resize: !0,
    selectedAttraction: .025,
    setGallerySize: !0
  }, f.createMethods = [];
  var p = f.prototype;
  a.extend(p, t.prototype), p._create = function () {
    var t = this.guid = ++d;

    for (var e in this.element.flickityGUID = t, (u[t] = this).selectedIndex = 0, this.restingFrames = 0, this.x = 0, this.velocity = 0, this.originSide = this.options.rightToLeft ? "right" : "left", this.viewport = document.createElement("div"), this.viewport.className = "flickity-viewport", this._createSlider(), (this.options.resize || this.options.watchCSS) && n.addEventListener("resize", this), this.options.on) {
      var i = this.options.on[e];
      this.on(e, i);
    }

    f.createMethods.forEach(function (t) {
      this[t]();
    }, this), this.options.watchCSS ? this.watchCSS() : this.activate();
  }, p.option = function (t) {
    a.extend(this.options, t);
  }, p.activate = function () {
    this.isActive || (this.isActive = !0, this.element.classList.add("flickity-enabled"), this.options.rightToLeft && this.element.classList.add("flickity-rtl"), this.getSize(), c(this._filterFindCellElements(this.element.children), this.slider), this.viewport.appendChild(this.slider), this.element.appendChild(this.viewport), this.reloadCells(), this.options.accessibility && (this.element.tabIndex = 0, this.element.addEventListener("keydown", this)), this.emitEvent("activate"), this.selectInitialIndex(), this.isInitActivated = !0, this.dispatchEvent("ready"));
  }, p._createSlider = function () {
    var t = document.createElement("div");
    t.className = "flickity-slider", t.style[this.originSide] = 0, this.slider = t;
  }, p._filterFindCellElements = function (t) {
    return a.filterFindElements(t, this.options.cellSelector);
  }, p.reloadCells = function () {
    this.cells = this._makeCells(this.slider.children), this.positionCells(), this._getWrapShiftCells(), this.setGallerySize();
  }, p._makeCells = function (t) {
    return this._filterFindCellElements(t).map(function (t) {
      return new i(t, this);
    }, this);
  }, p.getLastCell = function () {
    return this.cells[this.cells.length - 1];
  }, p.getLastSlide = function () {
    return this.slides[this.slides.length - 1];
  }, p.positionCells = function () {
    this._sizeCells(this.cells), this._positionCells(0);
  }, p._positionCells = function (t) {
    t = t || 0, this.maxCellHeight = t && this.maxCellHeight || 0;
    var e = 0;

    if (0 < t) {
      var i = this.cells[t - 1];
      e = i.x + i.size.outerWidth;
    }

    for (var n = this.cells.length, s = t; s < n; s++) {
      var o = this.cells[s];
      o.setPosition(e), e += o.size.outerWidth, this.maxCellHeight = Math.max(o.size.outerHeight, this.maxCellHeight);
    }

    this.slideableWidth = e, this.updateSlides(), this._containSlides(), this.slidesWidth = n ? this.getLastSlide().target - this.slides[0].target : 0;
  }, p._sizeCells = function (t) {
    t.forEach(function (t) {
      t.getSize();
    });
  }, p.updateSlides = function () {
    if (this.slides = [], this.cells.length) {
      var n = new r(this);
      this.slides.push(n);

      var s = "left" == this.originSide ? "marginRight" : "marginLeft",
          o = this._getCanCellFit();

      this.cells.forEach(function (t, e) {
        if (n.cells.length) {
          var i = n.outerWidth - n.firstMargin + (t.size.outerWidth - t.size[s]);
          o.call(this, e, i) || (n.updateTarget(), n = new r(this), this.slides.push(n)), n.addCell(t);
        } else n.addCell(t);
      }, this), n.updateTarget(), this.updateSelectedSlide();
    }
  }, p._getCanCellFit = function () {
    var t = this.options.groupCells;
    if (!t) return function () {
      return !1;
    };

    if ("number" == typeof t) {
      var e = parseInt(t, 10);
      return function (t) {
        return t % e != 0;
      };
    }

    var i = "string" == typeof t && t.match(/^(\d+)%$/),
        n = i ? parseInt(i[1], 10) / 100 : 1;
    return function (t, e) {
      return e <= (this.size.innerWidth + 1) * n;
    };
  }, p._init = p.reposition = function () {
    this.positionCells(), this.positionSliderAtSelected();
  }, p.getSize = function () {
    this.size = e(this.element), this.setCellAlign(), this.cursorPosition = this.size.innerWidth * this.cellAlign;
  };
  var g = {
    center: {
      left: .5,
      right: .5
    },
    left: {
      left: 0,
      right: 1
    },
    right: {
      right: 0,
      left: 1
    }
  };
  return p.setCellAlign = function () {
    var t = g[this.options.cellAlign];
    this.cellAlign = t ? t[this.originSide] : this.options.cellAlign;
  }, p.setGallerySize = function () {
    if (this.options.setGallerySize) {
      var t = this.options.adaptiveHeight && this.selectedSlide ? this.selectedSlide.height : this.maxCellHeight;
      this.viewport.style.height = t + "px";
    }
  }, p._getWrapShiftCells = function () {
    if (this.options.wrapAround) {
      this._unshiftCells(this.beforeShiftCells), this._unshiftCells(this.afterShiftCells);
      var t = this.cursorPosition,
          e = this.cells.length - 1;
      this.beforeShiftCells = this._getGapCells(t, e, -1), t = this.size.innerWidth - this.cursorPosition, this.afterShiftCells = this._getGapCells(t, 0, 1);
    }
  }, p._getGapCells = function (t, e, i) {
    for (var n = []; 0 < t;) {
      var s = this.cells[e];
      if (!s) break;
      n.push(s), e += i, t -= s.size.outerWidth;
    }

    return n;
  }, p._containSlides = function () {
    if (this.options.contain && !this.options.wrapAround && this.cells.length) {
      var t = this.options.rightToLeft,
          e = t ? "marginRight" : "marginLeft",
          i = t ? "marginLeft" : "marginRight",
          n = this.slideableWidth - this.getLastCell().size[i],
          s = n < this.size.innerWidth,
          o = this.cursorPosition + this.cells[0].size[e],
          r = n - this.size.innerWidth * (1 - this.cellAlign);
      this.slides.forEach(function (t) {
        s ? t.target = n * this.cellAlign : (t.target = Math.max(t.target, o), t.target = Math.min(t.target, r));
      }, this);
    }
  }, p.dispatchEvent = function (t, e, i) {
    var n = e ? [e].concat(i) : i;

    if (this.emitEvent(t, n), l && this.$element) {
      var s = t += this.options.namespaceJQueryEvents ? ".flickity" : "";

      if (e) {
        var o = l.Event(e);
        o.type = t, s = o;
      }

      this.$element.trigger(s, i);
    }
  }, p.select = function (t, e, i) {
    if (this.isActive && (t = parseInt(t, 10), this._wrapSelect(t), (this.options.wrapAround || e) && (t = a.modulo(t, this.slides.length)), this.slides[t])) {
      var n = this.selectedIndex;
      this.selectedIndex = t, this.updateSelectedSlide(), i ? this.positionSliderAtSelected() : this.startAnimation(), this.options.adaptiveHeight && this.setGallerySize(), this.dispatchEvent("select", null, [t]), t != n && this.dispatchEvent("change", null, [t]), this.dispatchEvent("cellSelect");
    }
  }, p._wrapSelect = function (t) {
    var e = this.slides.length;
    if (!(this.options.wrapAround && 1 < e)) return t;
    var i = a.modulo(t, e),
        n = Math.abs(i - this.selectedIndex),
        s = Math.abs(i + e - this.selectedIndex),
        o = Math.abs(i - e - this.selectedIndex);
    !this.isDragSelect && s < n ? t += e : !this.isDragSelect && o < n && (t -= e), t < 0 ? this.x -= this.slideableWidth : e <= t && (this.x += this.slideableWidth);
  }, p.previous = function (t, e) {
    this.select(this.selectedIndex - 1, t, e);
  }, p.next = function (t, e) {
    this.select(this.selectedIndex + 1, t, e);
  }, p.updateSelectedSlide = function () {
    var t = this.slides[this.selectedIndex];
    t && (this.unselectSelectedSlide(), (this.selectedSlide = t).select(), this.selectedCells = t.cells, this.selectedElements = t.getCellElements(), this.selectedCell = t.cells[0], this.selectedElement = this.selectedElements[0]);
  }, p.unselectSelectedSlide = function () {
    this.selectedSlide && this.selectedSlide.unselect();
  }, p.selectInitialIndex = function () {
    var t = this.options.initialIndex;
    if (this.isInitActivated) this.select(this.selectedIndex, !1, !0);else {
      if (t && "string" == typeof t) if (this.queryCell(t)) return void this.selectCell(t, !1, !0);
      var e = 0;
      t && this.slides[t] && (e = t), this.select(e, !1, !0);
    }
  }, p.selectCell = function (t, e, i) {
    var n = this.queryCell(t);

    if (n) {
      var s = this.getCellSlideIndex(n);
      this.select(s, e, i);
    }
  }, p.getCellSlideIndex = function (t) {
    for (var e = 0; e < this.slides.length; e++) {
      if (-1 != this.slides[e].cells.indexOf(t)) return e;
    }
  }, p.getCell = function (t) {
    for (var e = 0; e < this.cells.length; e++) {
      var i = this.cells[e];
      if (i.element == t) return i;
    }
  }, p.getCells = function (t) {
    t = a.makeArray(t);
    var i = [];
    return t.forEach(function (t) {
      var e = this.getCell(t);
      e && i.push(e);
    }, this), i;
  }, p.getCellElements = function () {
    return this.cells.map(function (t) {
      return t.element;
    });
  }, p.getParentCell = function (t) {
    var e = this.getCell(t);
    return e || (t = a.getParent(t, ".flickity-slider > *"), this.getCell(t));
  }, p.getAdjacentCellElements = function (t, e) {
    if (!t) return this.selectedSlide.getCellElements();
    e = void 0 === e ? this.selectedIndex : e;
    var i = this.slides.length;
    if (i <= 1 + 2 * t) return this.getCellElements();

    for (var n = [], s = e - t; s <= e + t; s++) {
      var o = this.options.wrapAround ? a.modulo(s, i) : s,
          r = this.slides[o];
      r && (n = n.concat(r.getCellElements()));
    }

    return n;
  }, p.queryCell = function (t) {
    if ("number" == typeof t) return this.cells[t];

    if ("string" == typeof t) {
      if (t.match(/^[#\.]?[\d\/]/)) return;
      t = this.element.querySelector(t);
    }

    return this.getCell(t);
  }, p.uiChange = function () {
    this.emitEvent("uiChange");
  }, p.childUIPointerDown = function (t) {
    "touchstart" != t.type && t.preventDefault(), this.focus();
  }, p.onresize = function () {
    this.watchCSS(), this.resize();
  }, a.debounceMethod(f, "onresize", 150), p.resize = function () {
    if (this.isActive) {
      this.getSize(), this.options.wrapAround && (this.x = a.modulo(this.x, this.slideableWidth)), this.positionCells(), this._getWrapShiftCells(), this.setGallerySize(), this.emitEvent("resize");
      var t = this.selectedElements && this.selectedElements[0];
      this.selectCell(t, !1, !0);
    }
  }, p.watchCSS = function () {
    this.options.watchCSS && (-1 != o(this.element, ":after").content.indexOf("flickity") ? this.activate() : this.deactivate());
  }, p.onkeydown = function (t) {
    var e = document.activeElement && document.activeElement != this.element;

    if (this.options.accessibility && !e) {
      var i = f.keyboardHandlers[t.keyCode];
      i && i.call(this);
    }
  }, f.keyboardHandlers = {
    37: function () {
      var t = this.options.rightToLeft ? "next" : "previous";
      this.uiChange(), this[t]();
    },
    39: function () {
      var t = this.options.rightToLeft ? "previous" : "next";
      this.uiChange(), this[t]();
    }
  }, p.focus = function () {
    var t = n.pageYOffset;
    this.element.focus({
      preventScroll: !0
    }), n.pageYOffset != t && n.scrollTo(n.pageXOffset, t);
  }, p.deactivate = function () {
    this.isActive && (this.element.classList.remove("flickity-enabled"), this.element.classList.remove("flickity-rtl"), this.unselectSelectedSlide(), this.cells.forEach(function (t) {
      t.destroy();
    }), this.element.removeChild(this.viewport), c(this.slider.children, this.element), this.options.accessibility && (this.element.removeAttribute("tabIndex"), this.element.removeEventListener("keydown", this)), this.isActive = !1, this.emitEvent("deactivate"));
  }, p.destroy = function () {
    this.deactivate(), n.removeEventListener("resize", this), this.allOff(), this.emitEvent("destroy"), l && this.$element && l.removeData(this.element, "flickity"), delete this.element.flickityGUID, delete u[this.guid];
  }, a.extend(p, s), f.data = function (t) {
    var e = (t = a.getQueryElement(t)) && t.flickityGUID;
    return e && u[e];
  }, a.htmlInit(f, "flickity"), l && l.bridget && l.bridget("flickity", f), f.setJQuery = function (t) {
    l = t;
  }, f.Cell = i, f.Slide = r, f;
}), function (e, i) {
  "function" == typeof define && define.amd ? define("unipointer/unipointer", ["ev-emitter/ev-emitter"], function (t) {
    return i(e, t);
  }) : "object" == typeof module && module.exports ? module.exports = i(e, require("ev-emitter")) : e.Unipointer = i(e, e.EvEmitter);
}(window, function (s, t) {
  function e() {}

  var i = e.prototype = Object.create(t.prototype);
  i.bindStartEvent = function (t) {
    this._bindStartEvent(t, !0);
  }, i.unbindStartEvent = function (t) {
    this._bindStartEvent(t, !1);
  }, i._bindStartEvent = function (t, e) {
    var i = (e = void 0 === e || e) ? "addEventListener" : "removeEventListener",
        n = "mousedown";
    s.PointerEvent ? n = "pointerdown" : "ontouchstart" in s && (n = "touchstart"), t[i](n, this);
  }, i.handleEvent = function (t) {
    var e = "on" + t.type;
    this[e] && this[e](t);
  }, i.getTouch = function (t) {
    for (var e = 0; e < t.length; e++) {
      var i = t[e];
      if (i.identifier == this.pointerIdentifier) return i;
    }
  }, i.onmousedown = function (t) {
    var e = t.button;
    e && 0 !== e && 1 !== e || this._pointerDown(t, t);
  }, i.ontouchstart = function (t) {
    this._pointerDown(t, t.changedTouches[0]);
  }, i.onpointerdown = function (t) {
    this._pointerDown(t, t);
  }, i._pointerDown = function (t, e) {
    t.button || this.isPointerDown || (this.isPointerDown = !0, this.pointerIdentifier = void 0 !== e.pointerId ? e.pointerId : e.identifier, this.pointerDown(t, e));
  }, i.pointerDown = function (t, e) {
    this._bindPostStartEvents(t), this.emitEvent("pointerDown", [t, e]);
  };
  var n = {
    mousedown: ["mousemove", "mouseup"],
    touchstart: ["touchmove", "touchend", "touchcancel"],
    pointerdown: ["pointermove", "pointerup", "pointercancel"]
  };
  return i._bindPostStartEvents = function (t) {
    if (t) {
      var e = n[t.type];
      e.forEach(function (t) {
        s.addEventListener(t, this);
      }, this), this._boundPointerEvents = e;
    }
  }, i._unbindPostStartEvents = function () {
    this._boundPointerEvents && (this._boundPointerEvents.forEach(function (t) {
      s.removeEventListener(t, this);
    }, this), delete this._boundPointerEvents);
  }, i.onmousemove = function (t) {
    this._pointerMove(t, t);
  }, i.onpointermove = function (t) {
    t.pointerId == this.pointerIdentifier && this._pointerMove(t, t);
  }, i.ontouchmove = function (t) {
    var e = this.getTouch(t.changedTouches);
    e && this._pointerMove(t, e);
  }, i._pointerMove = function (t, e) {
    this.pointerMove(t, e);
  }, i.pointerMove = function (t, e) {
    this.emitEvent("pointerMove", [t, e]);
  }, i.onmouseup = function (t) {
    this._pointerUp(t, t);
  }, i.onpointerup = function (t) {
    t.pointerId == this.pointerIdentifier && this._pointerUp(t, t);
  }, i.ontouchend = function (t) {
    var e = this.getTouch(t.changedTouches);
    e && this._pointerUp(t, e);
  }, i._pointerUp = function (t, e) {
    this._pointerDone(), this.pointerUp(t, e);
  }, i.pointerUp = function (t, e) {
    this.emitEvent("pointerUp", [t, e]);
  }, i._pointerDone = function () {
    this._pointerReset(), this._unbindPostStartEvents(), this.pointerDone();
  }, i._pointerReset = function () {
    this.isPointerDown = !1, delete this.pointerIdentifier;
  }, i.pointerDone = function () {}, i.onpointercancel = function (t) {
    t.pointerId == this.pointerIdentifier && this._pointerCancel(t, t);
  }, i.ontouchcancel = function (t) {
    var e = this.getTouch(t.changedTouches);
    e && this._pointerCancel(t, e);
  }, i._pointerCancel = function (t, e) {
    this._pointerDone(), this.pointerCancel(t, e);
  }, i.pointerCancel = function (t, e) {
    this.emitEvent("pointerCancel", [t, e]);
  }, e.getPointerPoint = function (t) {
    return {
      x: t.pageX,
      y: t.pageY
    };
  }, e;
}), function (e, i) {
  "function" == typeof define && define.amd ? define("unidragger/unidragger", ["unipointer/unipointer"], function (t) {
    return i(e, t);
  }) : "object" == typeof module && module.exports ? module.exports = i(e, require("unipointer")) : e.Unidragger = i(e, e.Unipointer);
}(window, function (o, t) {
  function e() {}

  var i = e.prototype = Object.create(t.prototype);
  i.bindHandles = function () {
    this._bindHandles(!0);
  }, i.unbindHandles = function () {
    this._bindHandles(!1);
  }, i._bindHandles = function (t) {
    for (var e = (t = void 0 === t || t) ? "addEventListener" : "removeEventListener", i = t ? this._touchActionValue : "", n = 0; n < this.handles.length; n++) {
      var s = this.handles[n];
      this._bindStartEvent(s, t), s[e]("click", this), o.PointerEvent && (s.style.touchAction = i);
    }
  }, i._touchActionValue = "none", i.pointerDown = function (t, e) {
    this.okayPointerDown(t) && (this.pointerDownPointer = e, t.preventDefault(), this.pointerDownBlur(), this._bindPostStartEvents(t), this.emitEvent("pointerDown", [t, e]));
  };
  var s = {
    TEXTAREA: !0,
    INPUT: !0,
    SELECT: !0,
    OPTION: !0
  },
      r = {
    radio: !0,
    checkbox: !0,
    button: !0,
    submit: !0,
    image: !0,
    file: !0
  };
  return i.okayPointerDown = function (t) {
    var e = s[t.target.nodeName],
        i = r[t.target.type],
        n = !e || i;
    return n || this._pointerReset(), n;
  }, i.pointerDownBlur = function () {
    var t = document.activeElement;
    t && t.blur && t != document.body && t.blur();
  }, i.pointerMove = function (t, e) {
    var i = this._dragPointerMove(t, e);

    this.emitEvent("pointerMove", [t, e, i]), this._dragMove(t, e, i);
  }, i._dragPointerMove = function (t, e) {
    var i = {
      x: e.pageX - this.pointerDownPointer.pageX,
      y: e.pageY - this.pointerDownPointer.pageY
    };
    return !this.isDragging && this.hasDragStarted(i) && this._dragStart(t, e), i;
  }, i.hasDragStarted = function (t) {
    return 3 < Math.abs(t.x) || 3 < Math.abs(t.y);
  }, i.pointerUp = function (t, e) {
    this.emitEvent("pointerUp", [t, e]), this._dragPointerUp(t, e);
  }, i._dragPointerUp = function (t, e) {
    this.isDragging ? this._dragEnd(t, e) : this._staticClick(t, e);
  }, i._dragStart = function (t, e) {
    this.isDragging = !0, this.isPreventingClicks = !0, this.dragStart(t, e);
  }, i.dragStart = function (t, e) {
    this.emitEvent("dragStart", [t, e]);
  }, i._dragMove = function (t, e, i) {
    this.isDragging && this.dragMove(t, e, i);
  }, i.dragMove = function (t, e, i) {
    t.preventDefault(), this.emitEvent("dragMove", [t, e, i]);
  }, i._dragEnd = function (t, e) {
    this.isDragging = !1, setTimeout(function () {
      delete this.isPreventingClicks;
    }.bind(this)), this.dragEnd(t, e);
  }, i.dragEnd = function (t, e) {
    this.emitEvent("dragEnd", [t, e]);
  }, i.onclick = function (t) {
    this.isPreventingClicks && t.preventDefault();
  }, i._staticClick = function (t, e) {
    this.isIgnoringMouseUp && "mouseup" == t.type || (this.staticClick(t, e), "mouseup" != t.type && (this.isIgnoringMouseUp = !0, setTimeout(function () {
      delete this.isIgnoringMouseUp;
    }.bind(this), 400)));
  }, i.staticClick = function (t, e) {
    this.emitEvent("staticClick", [t, e]);
  }, e.getPointerPoint = t.getPointerPoint, e;
}), function (n, s) {
  "function" == typeof define && define.amd ? define("flickity/js/drag", ["./flickity", "unidragger/unidragger", "fizzy-ui-utils/utils"], function (t, e, i) {
    return s(n, t, e, i);
  }) : "object" == typeof module && module.exports ? module.exports = s(n, require("./flickity"), require("unidragger"), require("fizzy-ui-utils")) : n.Flickity = s(n, n.Flickity, n.Unidragger, n.fizzyUIUtils);
}(window, function (i, t, e, a) {
  a.extend(t.defaults, {
    draggable: ">1",
    dragThreshold: 3
  }), t.createMethods.push("_createDrag");
  var n = t.prototype;
  a.extend(n, e.prototype), n._touchActionValue = "pan-y";
  var s = ("createTouch" in document),
      o = !1;
  n._createDrag = function () {
    this.on("activate", this.onActivateDrag), this.on("uiChange", this._uiChangeDrag), this.on("deactivate", this.onDeactivateDrag), this.on("cellChange", this.updateDraggable), s && !o && (i.addEventListener("touchmove", function () {}), o = !0);
  }, n.onActivateDrag = function () {
    this.handles = [this.viewport], this.bindHandles(), this.updateDraggable();
  }, n.onDeactivateDrag = function () {
    this.unbindHandles(), this.element.classList.remove("is-draggable");
  }, n.updateDraggable = function () {
    ">1" == this.options.draggable ? this.isDraggable = 1 < this.slides.length : this.isDraggable = this.options.draggable, this.isDraggable ? this.element.classList.add("is-draggable") : this.element.classList.remove("is-draggable");
  }, n.bindDrag = function () {
    this.options.draggable = !0, this.updateDraggable();
  }, n.unbindDrag = function () {
    this.options.draggable = !1, this.updateDraggable();
  }, n._uiChangeDrag = function () {
    delete this.isFreeScrolling;
  }, n.pointerDown = function (t, e) {
    this.isDraggable ? this.okayPointerDown(t) && (this._pointerDownPreventDefault(t), this.pointerDownFocus(t), document.activeElement != this.element && this.pointerDownBlur(), this.dragX = this.x, this.viewport.classList.add("is-pointer-down"), this.pointerDownScroll = l(), i.addEventListener("scroll", this), this._pointerDownDefault(t, e)) : this._pointerDownDefault(t, e);
  }, n._pointerDownDefault = function (t, e) {
    this.pointerDownPointer = {
      pageX: e.pageX,
      pageY: e.pageY
    }, this._bindPostStartEvents(t), this.dispatchEvent("pointerDown", t, [e]);
  };
  var r = {
    INPUT: !0,
    TEXTAREA: !0,
    SELECT: !0
  };

  function l() {
    return {
      x: i.pageXOffset,
      y: i.pageYOffset
    };
  }

  return n.pointerDownFocus = function (t) {
    r[t.target.nodeName] || this.focus();
  }, n._pointerDownPreventDefault = function (t) {
    var e = "touchstart" == t.type,
        i = "touch" == t.pointerType,
        n = r[t.target.nodeName];
    e || i || n || t.preventDefault();
  }, n.hasDragStarted = function (t) {
    return Math.abs(t.x) > this.options.dragThreshold;
  }, n.pointerUp = function (t, e) {
    delete this.isTouchScrolling, this.viewport.classList.remove("is-pointer-down"), this.dispatchEvent("pointerUp", t, [e]), this._dragPointerUp(t, e);
  }, n.pointerDone = function () {
    i.removeEventListener("scroll", this), delete this.pointerDownScroll;
  }, n.dragStart = function (t, e) {
    this.isDraggable && (this.dragStartPosition = this.x, this.startAnimation(), i.removeEventListener("scroll", this), this.dispatchEvent("dragStart", t, [e]));
  }, n.pointerMove = function (t, e) {
    var i = this._dragPointerMove(t, e);

    this.dispatchEvent("pointerMove", t, [e, i]), this._dragMove(t, e, i);
  }, n.dragMove = function (t, e, i) {
    if (this.isDraggable) {
      t.preventDefault(), this.previousDragX = this.dragX;
      var n = this.options.rightToLeft ? -1 : 1;
      this.options.wrapAround && (i.x = i.x % this.slideableWidth);
      var s = this.dragStartPosition + i.x * n;

      if (!this.options.wrapAround && this.slides.length) {
        var o = Math.max(-this.slides[0].target, this.dragStartPosition);
        s = o < s ? .5 * (s + o) : s;
        var r = Math.min(-this.getLastSlide().target, this.dragStartPosition);
        s = s < r ? .5 * (s + r) : s;
      }

      this.dragX = s, this.dragMoveTime = new Date(), this.dispatchEvent("dragMove", t, [e, i]);
    }
  }, n.dragEnd = function (t, e) {
    if (this.isDraggable) {
      this.options.freeScroll && (this.isFreeScrolling = !0);
      var i = this.dragEndRestingSelect();

      if (this.options.freeScroll && !this.options.wrapAround) {
        var n = this.getRestingPosition();
        this.isFreeScrolling = -n > this.slides[0].target && -n < this.getLastSlide().target;
      } else this.options.freeScroll || i != this.selectedIndex || (i += this.dragEndBoostSelect());

      delete this.previousDragX, this.isDragSelect = this.options.wrapAround, this.select(i), delete this.isDragSelect, this.dispatchEvent("dragEnd", t, [e]);
    }
  }, n.dragEndRestingSelect = function () {
    var t = this.getRestingPosition(),
        e = Math.abs(this.getSlideDistance(-t, this.selectedIndex)),
        i = this._getClosestResting(t, e, 1),
        n = this._getClosestResting(t, e, -1);

    return i.distance < n.distance ? i.index : n.index;
  }, n._getClosestResting = function (t, e, i) {
    for (var n = this.selectedIndex, s = 1 / 0, o = this.options.contain && !this.options.wrapAround ? function (t, e) {
      return t <= e;
    } : function (t, e) {
      return t < e;
    }; o(e, s) && (n += i, s = e, null !== (e = this.getSlideDistance(-t, n)));) e = Math.abs(e);

    return {
      distance: s,
      index: n - i
    };
  }, n.getSlideDistance = function (t, e) {
    var i = this.slides.length,
        n = this.options.wrapAround && 1 < i,
        s = n ? a.modulo(e, i) : e,
        o = this.slides[s];
    if (!o) return null;
    var r = n ? this.slideableWidth * Math.floor(e / i) : 0;
    return t - (o.target + r);
  }, n.dragEndBoostSelect = function () {
    if (void 0 === this.previousDragX || !this.dragMoveTime || 100 < new Date() - this.dragMoveTime) return 0;
    var t = this.getSlideDistance(-this.dragX, this.selectedIndex),
        e = this.previousDragX - this.dragX;
    return 0 < t && 0 < e ? 1 : t < 0 && e < 0 ? -1 : 0;
  }, n.staticClick = function (t, e) {
    var i = this.getParentCell(t.target),
        n = i && i.element,
        s = i && this.cells.indexOf(i);
    this.dispatchEvent("staticClick", t, [e, n, s]);
  }, n.onscroll = function () {
    var t = l(),
        e = this.pointerDownScroll.x - t.x,
        i = this.pointerDownScroll.y - t.y;
    (3 < Math.abs(e) || 3 < Math.abs(i)) && this._pointerDone();
  }, t;
}), function (n, s) {
  "function" == typeof define && define.amd ? define("flickity/js/prev-next-button", ["./flickity", "unipointer/unipointer", "fizzy-ui-utils/utils"], function (t, e, i) {
    return s(n, t, e, i);
  }) : "object" == typeof module && module.exports ? module.exports = s(n, require("./flickity"), require("unipointer"), require("fizzy-ui-utils")) : s(n, n.Flickity, n.Unipointer, n.fizzyUIUtils);
}(window, function (t, e, i, n) {

  var s = "http://www.w3.org/2000/svg";

  function o(t, e) {
    this.direction = t, this.parent = e, this._create();
  }

  (o.prototype = Object.create(i.prototype))._create = function () {
    this.isEnabled = !0, this.isPrevious = -1 == this.direction;
    var t = this.parent.options.rightToLeft ? 1 : -1;
    this.isLeft = this.direction == t;
    var e = this.element = document.createElement("button");
    e.className = "flickity-button flickity-prev-next-button", e.className += this.isPrevious ? " previous" : " next", e.setAttribute("type", "button"), this.disable(), e.setAttribute("aria-label", this.isPrevious ? "Previous" : "Next");
    var i = this.createSVG();
    e.appendChild(i), this.parent.on("select", this.update.bind(this)), this.on("pointerDown", this.parent.childUIPointerDown.bind(this.parent));
  }, o.prototype.activate = function () {
    this.bindStartEvent(this.element), this.element.addEventListener("click", this), this.parent.element.appendChild(this.element);
  }, o.prototype.deactivate = function () {
    this.parent.element.removeChild(this.element), this.unbindStartEvent(this.element), this.element.removeEventListener("click", this);
  }, o.prototype.createSVG = function () {
    var t = document.createElementNS(s, "svg");
    t.setAttribute("class", "flickity-button-icon"), t.setAttribute("viewBox", "0 0 100 100");

    var e = document.createElementNS(s, "path"),
        i = function (t) {
      return "string" != typeof t ? "M " + t.x0 + ",50 L " + t.x1 + "," + (t.y1 + 50) + " L " + t.x2 + "," + (t.y2 + 50) + " L " + t.x3 + ",50  L " + t.x2 + "," + (50 - t.y2) + " L " + t.x1 + "," + (50 - t.y1) + " Z" : t;
    }(this.parent.options.arrowShape);

    return e.setAttribute("d", i), e.setAttribute("class", "arrow"), this.isLeft || e.setAttribute("transform", "translate(100, 100) rotate(180) "), t.appendChild(e), t;
  }, o.prototype.handleEvent = n.handleEvent, o.prototype.onclick = function () {
    if (this.isEnabled) {
      this.parent.uiChange();
      var t = this.isPrevious ? "previous" : "next";
      this.parent[t]();
    }
  }, o.prototype.enable = function () {
    this.isEnabled || (this.element.disabled = !1, this.isEnabled = !0);
  }, o.prototype.disable = function () {
    this.isEnabled && (this.element.disabled = !0, this.isEnabled = !1);
  }, o.prototype.update = function () {
    var t = this.parent.slides;
    if (this.parent.options.wrapAround && 1 < t.length) this.enable();else {
      var e = t.length ? t.length - 1 : 0,
          i = this.isPrevious ? 0 : e;
      this[this.parent.selectedIndex == i ? "disable" : "enable"]();
    }
  }, o.prototype.destroy = function () {
    this.deactivate(), this.allOff();
  }, n.extend(e.defaults, {
    prevNextButtons: !0,
    arrowShape: {
      x0: 10,
      x1: 60,
      y1: 50,
      x2: 70,
      y2: 40,
      x3: 30
    }
  }), e.createMethods.push("_createPrevNextButtons");
  var r = e.prototype;
  return r._createPrevNextButtons = function () {
    this.options.prevNextButtons && (this.prevButton = new o(-1, this), this.nextButton = new o(1, this), this.on("activate", this.activatePrevNextButtons));
  }, r.activatePrevNextButtons = function () {
    this.prevButton.activate(), this.nextButton.activate(), this.on("deactivate", this.deactivatePrevNextButtons);
  }, r.deactivatePrevNextButtons = function () {
    this.prevButton.deactivate(), this.nextButton.deactivate(), this.off("deactivate", this.deactivatePrevNextButtons);
  }, e.PrevNextButton = o, e;
}), function (n, s) {
  "function" == typeof define && define.amd ? define("flickity/js/page-dots", ["./flickity", "unipointer/unipointer", "fizzy-ui-utils/utils"], function (t, e, i) {
    return s(n, t, e, i);
  }) : "object" == typeof module && module.exports ? module.exports = s(n, require("./flickity"), require("unipointer"), require("fizzy-ui-utils")) : s(n, n.Flickity, n.Unipointer, n.fizzyUIUtils);
}(window, function (t, e, i, n) {
  function s(t) {
    this.parent = t, this._create();
  }

  (s.prototype = Object.create(i.prototype))._create = function () {
    this.holder = document.createElement("ol"), this.holder.className = "flickity-page-dots", this.dots = [], this.handleClick = this.onClick.bind(this), this.on("pointerDown", this.parent.childUIPointerDown.bind(this.parent));
  }, s.prototype.activate = function () {
    this.setDots(), this.holder.addEventListener("click", this.handleClick), this.bindStartEvent(this.holder), this.parent.element.appendChild(this.holder);
  }, s.prototype.deactivate = function () {
    this.holder.removeEventListener("click", this.handleClick), this.unbindStartEvent(this.holder), this.parent.element.removeChild(this.holder);
  }, s.prototype.setDots = function () {
    var t = this.parent.slides.length - this.dots.length;
    0 < t ? this.addDots(t) : t < 0 && this.removeDots(-t);
  }, s.prototype.addDots = function (t) {
    for (var e = document.createDocumentFragment(), i = [], n = this.dots.length, s = n + t, o = n; o < s; o++) {
      var r = document.createElement("li");
      r.className = "dot", r.setAttribute("aria-label", "Page dot " + (o + 1)), e.appendChild(r), i.push(r);
    }

    this.holder.appendChild(e), this.dots = this.dots.concat(i);
  }, s.prototype.removeDots = function (t) {
    this.dots.splice(this.dots.length - t, t).forEach(function (t) {
      this.holder.removeChild(t);
    }, this);
  }, s.prototype.updateSelected = function () {
    this.selectedDot && (this.selectedDot.className = "dot", this.selectedDot.removeAttribute("aria-current")), this.dots.length && (this.selectedDot = this.dots[this.parent.selectedIndex], this.selectedDot.className = "dot is-selected", this.selectedDot.setAttribute("aria-current", "step"));
  }, s.prototype.onTap = s.prototype.onClick = function (t) {
    var e = t.target;

    if ("LI" == e.nodeName) {
      this.parent.uiChange();
      var i = this.dots.indexOf(e);
      this.parent.select(i);
    }
  }, s.prototype.destroy = function () {
    this.deactivate(), this.allOff();
  }, e.PageDots = s, n.extend(e.defaults, {
    pageDots: !0
  }), e.createMethods.push("_createPageDots");
  var o = e.prototype;
  return o._createPageDots = function () {
    this.options.pageDots && (this.pageDots = new s(this), this.on("activate", this.activatePageDots), this.on("select", this.updateSelectedPageDots), this.on("cellChange", this.updatePageDots), this.on("resize", this.updatePageDots), this.on("deactivate", this.deactivatePageDots));
  }, o.activatePageDots = function () {
    this.pageDots.activate();
  }, o.updateSelectedPageDots = function () {
    this.pageDots.updateSelected();
  }, o.updatePageDots = function () {
    this.pageDots.setDots();
  }, o.deactivatePageDots = function () {
    this.pageDots.deactivate();
  }, e.PageDots = s, e;
}), function (t, n) {
  "function" == typeof define && define.amd ? define("flickity/js/player", ["ev-emitter/ev-emitter", "fizzy-ui-utils/utils", "./flickity"], function (t, e, i) {
    return n(t, e, i);
  }) : "object" == typeof module && module.exports ? module.exports = n(require("ev-emitter"), require("fizzy-ui-utils"), require("./flickity")) : n(t.EvEmitter, t.fizzyUIUtils, t.Flickity);
}(window, function (t, e, i) {
  function n(t) {
    this.parent = t, this.state = "stopped", this.onVisibilityChange = this.visibilityChange.bind(this), this.onVisibilityPlay = this.visibilityPlay.bind(this);
  }

  (n.prototype = Object.create(t.prototype)).play = function () {
    "playing" != this.state && (document.hidden ? document.addEventListener("visibilitychange", this.onVisibilityPlay) : (this.state = "playing", document.addEventListener("visibilitychange", this.onVisibilityChange), this.tick()));
  }, n.prototype.tick = function () {
    if ("playing" == this.state) {
      var t = this.parent.options.autoPlay;
      t = "number" == typeof t ? t : 3e3;
      var e = this;
      this.clear(), this.timeout = setTimeout(function () {
        e.parent.next(!0), e.tick();
      }, t);
    }
  }, n.prototype.stop = function () {
    this.state = "stopped", this.clear(), document.removeEventListener("visibilitychange", this.onVisibilityChange);
  }, n.prototype.clear = function () {
    clearTimeout(this.timeout);
  }, n.prototype.pause = function () {
    "playing" == this.state && (this.state = "paused", this.clear());
  }, n.prototype.unpause = function () {
    "paused" == this.state && this.play();
  }, n.prototype.visibilityChange = function () {
    this[document.hidden ? "pause" : "unpause"]();
  }, n.prototype.visibilityPlay = function () {
    this.play(), document.removeEventListener("visibilitychange", this.onVisibilityPlay);
  }, e.extend(i.defaults, {
    pauseAutoPlayOnHover: !0
  }), i.createMethods.push("_createPlayer");
  var s = i.prototype;
  return s._createPlayer = function () {
    this.player = new n(this), this.on("activate", this.activatePlayer), this.on("uiChange", this.stopPlayer), this.on("pointerDown", this.stopPlayer), this.on("deactivate", this.deactivatePlayer);
  }, s.activatePlayer = function () {
    this.options.autoPlay && (this.player.play(), this.element.addEventListener("mouseenter", this));
  }, s.playPlayer = function () {
    this.player.play();
  }, s.stopPlayer = function () {
    this.player.stop();
  }, s.pausePlayer = function () {
    this.player.pause();
  }, s.unpausePlayer = function () {
    this.player.unpause();
  }, s.deactivatePlayer = function () {
    this.player.stop(), this.element.removeEventListener("mouseenter", this);
  }, s.onmouseenter = function () {
    this.options.pauseAutoPlayOnHover && (this.player.pause(), this.element.addEventListener("mouseleave", this));
  }, s.onmouseleave = function () {
    this.player.unpause(), this.element.removeEventListener("mouseleave", this);
  }, i.Player = n, i;
}), function (i, n) {
  "function" == typeof define && define.amd ? define("flickity/js/add-remove-cell", ["./flickity", "fizzy-ui-utils/utils"], function (t, e) {
    return n(i, t, e);
  }) : "object" == typeof module && module.exports ? module.exports = n(i, require("./flickity"), require("fizzy-ui-utils")) : n(i, i.Flickity, i.fizzyUIUtils);
}(window, function (t, e, n) {
  var i = e.prototype;
  return i.insert = function (t, e) {
    var i = this._makeCells(t);

    if (i && i.length) {
      var n = this.cells.length;
      e = void 0 === e ? n : e;

      var s = function (t) {
        var e = document.createDocumentFragment();
        return t.forEach(function (t) {
          e.appendChild(t.element);
        }), e;
      }(i),
          o = e == n;

      if (o) this.slider.appendChild(s);else {
        var r = this.cells[e].element;
        this.slider.insertBefore(s, r);
      }
      if (0 === e) this.cells = i.concat(this.cells);else if (o) this.cells = this.cells.concat(i);else {
        var a = this.cells.splice(e, n - e);
        this.cells = this.cells.concat(i).concat(a);
      }
      this._sizeCells(i), this.cellChange(e, !0);
    }
  }, i.append = function (t) {
    this.insert(t, this.cells.length);
  }, i.prepend = function (t) {
    this.insert(t, 0);
  }, i.remove = function (t) {
    var e = this.getCells(t);

    if (e && e.length) {
      var i = this.cells.length - 1;
      e.forEach(function (t) {
        t.remove();
        var e = this.cells.indexOf(t);
        i = Math.min(e, i), n.removeFrom(this.cells, t);
      }, this), this.cellChange(i, !0);
    }
  }, i.cellSizeChange = function (t) {
    var e = this.getCell(t);

    if (e) {
      e.getSize();
      var i = this.cells.indexOf(e);
      this.cellChange(i);
    }
  }, i.cellChange = function (t, e) {
    var i = this.selectedElement;
    this._positionCells(t), this._getWrapShiftCells(), this.setGallerySize();
    var n = this.getCell(i);
    n && (this.selectedIndex = this.getCellSlideIndex(n)), this.selectedIndex = Math.min(this.slides.length - 1, this.selectedIndex), this.emitEvent("cellChange", [t]), this.select(this.selectedIndex), e && this.positionSliderAtSelected();
  }, e;
}), function (i, n) {
  "function" == typeof define && define.amd ? define("flickity/js/lazyload", ["./flickity", "fizzy-ui-utils/utils"], function (t, e) {
    return n(i, t, e);
  }) : "object" == typeof module && module.exports ? module.exports = n(i, require("./flickity"), require("fizzy-ui-utils")) : n(i, i.Flickity, i.fizzyUIUtils);
}(window, function (t, e, o) {

  e.createMethods.push("_createLazyload");
  var i = e.prototype;

  function s(t, e) {
    this.img = t, this.flickity = e, this.load();
  }

  return i._createLazyload = function () {
    this.on("select", this.lazyLoad);
  }, i.lazyLoad = function () {
    var t = this.options.lazyLoad;

    if (t) {
      var e = "number" == typeof t ? t : 0,
          i = this.getAdjacentCellElements(e),
          n = [];
      i.forEach(function (t) {
        var e = function (t) {
          if ("IMG" == t.nodeName) {
            var e = t.getAttribute("data-flickity-lazyload"),
                i = t.getAttribute("data-flickity-lazyload-src"),
                n = t.getAttribute("data-flickity-lazyload-srcset");
            if (e || i || n) return [t];
          }

          var s = t.querySelectorAll("img[data-flickity-lazyload], img[data-flickity-lazyload-src], img[data-flickity-lazyload-srcset]");
          return o.makeArray(s);
        }(t);

        n = n.concat(e);
      }), n.forEach(function (t) {
        new s(t, this);
      }, this);
    }
  }, s.prototype.handleEvent = o.handleEvent, s.prototype.load = function () {
    this.img.addEventListener("load", this), this.img.addEventListener("error", this);
    var t = this.img.getAttribute("data-flickity-lazyload") || this.img.getAttribute("data-flickity-lazyload-src"),
        e = this.img.getAttribute("data-flickity-lazyload-srcset");
    this.img.src = t, e && this.img.setAttribute("srcset", e), this.img.removeAttribute("data-flickity-lazyload"), this.img.removeAttribute("data-flickity-lazyload-src"), this.img.removeAttribute("data-flickity-lazyload-srcset");
  }, s.prototype.onload = function (t) {
    this.complete(t, "flickity-lazyloaded");
  }, s.prototype.onerror = function (t) {
    this.complete(t, "flickity-lazyerror");
  }, s.prototype.complete = function (t, e) {
    this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
    var i = this.flickity.getParentCell(this.img),
        n = i && i.element;
    this.flickity.cellSizeChange(n), this.img.classList.add(e), this.flickity.dispatchEvent("lazyLoad", t, n);
  }, e.LazyLoader = s, e;
}), function (t, e) {
  "function" == typeof define && define.amd ? define("flickity/js/index", ["./flickity", "./drag", "./prev-next-button", "./page-dots", "./player", "./add-remove-cell", "./lazyload"], e) : "object" == typeof module && module.exports && (module.exports = e(require("./flickity"), require("./drag"), require("./prev-next-button"), require("./page-dots"), require("./player"), require("./add-remove-cell"), require("./lazyload")));
}(window, function (t) {
  return t;
}), function (t, e) {
  "function" == typeof define && define.amd ? define("flickity-as-nav-for/as-nav-for", ["flickity/js/index", "fizzy-ui-utils/utils"], e) : "object" == typeof module && module.exports ? module.exports = e(require("flickity"), require("fizzy-ui-utils")) : t.Flickity = e(t.Flickity, t.fizzyUIUtils);
}(window, function (n, s) {
  n.createMethods.push("_createAsNavFor");
  var t = n.prototype;
  return t._createAsNavFor = function () {
    this.on("activate", this.activateAsNavFor), this.on("deactivate", this.deactivateAsNavFor), this.on("destroy", this.destroyAsNavFor);
    var t = this.options.asNavFor;

    if (t) {
      var e = this;
      setTimeout(function () {
        e.setNavCompanion(t);
      });
    }
  }, t.setNavCompanion = function (t) {
    t = s.getQueryElement(t);
    var e = n.data(t);

    if (e && e != this) {
      this.navCompanion = e;
      var i = this;
      this.onNavCompanionSelect = function () {
        i.navCompanionSelect();
      }, e.on("select", this.onNavCompanionSelect), this.on("staticClick", this.onNavStaticClick), this.navCompanionSelect(!0);
    }
  }, t.navCompanionSelect = function (t) {
    var e = this.navCompanion && this.navCompanion.selectedCells;

    if (e) {
      var i = e[0],
          n = this.navCompanion.cells.indexOf(i),
          s = n + e.length - 1,
          o = Math.floor(function (t, e, i) {
        return (e - t) * i + t;
      }(n, s, this.navCompanion.cellAlign));

      if (this.selectCell(o, !1, t), this.removeNavSelectedElements(), !(o >= this.cells.length)) {
        var r = this.cells.slice(n, 1 + s);
        this.navSelectedElements = r.map(function (t) {
          return t.element;
        }), this.changeNavSelectedClass("add");
      }
    }
  }, t.changeNavSelectedClass = function (e) {
    this.navSelectedElements.forEach(function (t) {
      t.classList[e]("is-nav-selected");
    });
  }, t.activateAsNavFor = function () {
    this.navCompanionSelect(!0);
  }, t.removeNavSelectedElements = function () {
    this.navSelectedElements && (this.changeNavSelectedClass("remove"), delete this.navSelectedElements);
  }, t.onNavStaticClick = function (t, e, i, n) {
    "number" == typeof n && this.navCompanion.selectCell(n);
  }, t.deactivateAsNavFor = function () {
    this.removeNavSelectedElements();
  }, t.destroyAsNavFor = function () {
    this.navCompanion && (this.navCompanion.off("select", this.onNavCompanionSelect), this.off("staticClick", this.onNavStaticClick), delete this.navCompanion);
  }, n;
}), function (e, i) {

  "function" == typeof define && define.amd ? define("imagesloaded/imagesloaded", ["ev-emitter/ev-emitter"], function (t) {
    return i(e, t);
  }) : "object" == typeof module && module.exports ? module.exports = i(e, require("ev-emitter")) : e.imagesLoaded = i(e, e.EvEmitter);
}("undefined" != typeof window ? window : undefined, function (e, t) {
  var s = e.jQuery,
      o = e.console;

  function r(t, e) {
    for (var i in e) t[i] = e[i];

    return t;
  }

  var a = Array.prototype.slice;

  function l(t, e, i) {
    if (!(this instanceof l)) return new l(t, e, i);
    var n = t;
    "string" == typeof t && (n = document.querySelectorAll(t)), n ? (this.elements = function (t) {
      return Array.isArray(t) ? t : "object" == typeof t && "number" == typeof t.length ? a.call(t) : [t];
    }(n), this.options = r({}, this.options), "function" == typeof e ? i = e : r(this.options, e), i && this.on("always", i), this.getImages(), s && (this.jqDeferred = new s.Deferred()), setTimeout(this.check.bind(this))) : o.error("Bad element for imagesLoaded " + (n || t));
  }

  (l.prototype = Object.create(t.prototype)).options = {}, l.prototype.getImages = function () {
    this.images = [], this.elements.forEach(this.addElementImages, this);
  }, l.prototype.addElementImages = function (t) {
    "IMG" == t.nodeName && this.addImage(t), !0 === this.options.background && this.addElementBackgroundImages(t);
    var e = t.nodeType;

    if (e && h[e]) {
      for (var i = t.querySelectorAll("img"), n = 0; n < i.length; n++) {
        var s = i[n];
        this.addImage(s);
      }

      if ("string" == typeof this.options.background) {
        var o = t.querySelectorAll(this.options.background);

        for (n = 0; n < o.length; n++) {
          var r = o[n];
          this.addElementBackgroundImages(r);
        }
      }
    }
  };
  var h = {
    1: !0,
    9: !0,
    11: !0
  };

  function i(t) {
    this.img = t;
  }

  function n(t, e) {
    this.url = t, this.element = e, this.img = new Image();
  }

  return l.prototype.addElementBackgroundImages = function (t) {
    var e = getComputedStyle(t);
    if (e) for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(e.backgroundImage); null !== n;) {
      var s = n && n[2];
      s && this.addBackground(s, t), n = i.exec(e.backgroundImage);
    }
  }, l.prototype.addImage = function (t) {
    var e = new i(t);
    this.images.push(e);
  }, l.prototype.addBackground = function (t, e) {
    var i = new n(t, e);
    this.images.push(i);
  }, l.prototype.check = function () {
    var n = this;

    function e(t, e, i) {
      setTimeout(function () {
        n.progress(t, e, i);
      });
    }

    this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? this.images.forEach(function (t) {
      t.once("progress", e), t.check();
    }) : this.complete();
  }, l.prototype.progress = function (t, e, i) {
    this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded, this.emitEvent("progress", [this, t, e]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, t), this.progressedCount == this.images.length && this.complete(), this.options.debug && o && o.log("progress: " + i, t, e);
  }, l.prototype.complete = function () {
    var t = this.hasAnyBroken ? "fail" : "done";

    if (this.isComplete = !0, this.emitEvent(t, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
      var e = this.hasAnyBroken ? "reject" : "resolve";
      this.jqDeferred[e](this);
    }
  }, (i.prototype = Object.create(t.prototype)).check = function () {
    this.getIsImageComplete() ? this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image(), this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.proxyImage.src = this.img.src);
  }, i.prototype.getIsImageComplete = function () {
    return this.img.complete && this.img.naturalWidth;
  }, i.prototype.confirm = function (t, e) {
    this.isLoaded = t, this.emitEvent("progress", [this, this.img, e]);
  }, i.prototype.handleEvent = function (t) {
    var e = "on" + t.type;
    this[e] && this[e](t);
  }, i.prototype.onload = function () {
    this.confirm(!0, "onload"), this.unbindEvents();
  }, i.prototype.onerror = function () {
    this.confirm(!1, "onerror"), this.unbindEvents();
  }, i.prototype.unbindEvents = function () {
    this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
  }, (n.prototype = Object.create(i.prototype)).check = function () {
    this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url, this.getIsImageComplete() && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents());
  }, n.prototype.unbindEvents = function () {
    this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
  }, n.prototype.confirm = function (t, e) {
    this.isLoaded = t, this.emitEvent("progress", [this, this.element, e]);
  }, l.makeJQueryPlugin = function (t) {
    (t = t || e.jQuery) && ((s = t).fn.imagesLoaded = function (t, e) {
      return new l(this, t, e).jqDeferred.promise(s(this));
    });
  }, l.makeJQueryPlugin(), l;
}), function (i, n) {
  "function" == typeof define && define.amd ? define(["flickity/js/index", "imagesloaded/imagesloaded"], function (t, e) {
    return n(i, t, e);
  }) : "object" == typeof module && module.exports ? module.exports = n(i, require("flickity"), require("imagesloaded")) : i.Flickity = n(i, i.Flickity, i.imagesLoaded);
}(window, function (t, e, i) {

  e.createMethods.push("_createImagesLoaded");
  var n = e.prototype;
  return n._createImagesLoaded = function () {
    this.on("activate", this.imagesLoaded);
  }, n.imagesLoaded = function () {
    if (this.options.imagesLoaded) {
      var n = this;
      i(this.slider).on("progress", function (t, e) {
        var i = n.getParentCell(e.img);
        n.cellSizeChange(i && i.element), n.options.freeScroll || n.positionSliderAtSelected();
      });
    }
  }, e;
});

/*
-ˋˏ *.·:·.⟐.·:·.* ˎˊ-
━━━ ⋅𖥔⋅ ━━✶━━ ⋅𖥔⋅ ━━━
Slider functionality
━━━ ⋅𖥔⋅ ━━✶━━ ⋅𖥔⋅ ━━━
-ˋˏ *.·:·.⟐.·:·.* ˎˊ-
*/

(function ($) {
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
      prevNextButtons: false // autoPlay: 4000,
      // selectedAttraction: 0.008,
      // friction: 0.16

    };

    var $carousel = _this.flickity(args); //Destroy
    // $carousel.flickity('destroy');
    //Re-init


    $carousel.flickity(args); // $carousel.flickity('reloadCells')
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

    var $carousel = _this.flickity(args); //Destroy
    // $carousel.flickity('destroy');
    //Re-init


    $carousel.flickity(args); // $carousel.flickity('reloadCells');
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

    var $carousel = _this.flickity(args); //Destroy
    // $carousel.flickity('destroy');
    //Re-init


    $carousel.flickity(args); // $carousel.flickity('reloadCells');

    $(this).parent().find('.next').on('click', function () {
      $carousel.flickity('next');
    });
    $(this).parent().find('.prev').on('click', function () {
      $carousel.flickity('previous');
    });
    $carousel.on('dragStart.flickity', function (e) {
      $(this).addClass('is-dragging');
    }).on('dragEnd.flickity', function () {
      $(this).removeClass('is-dragging');
    });
  });
})(jQuery);

/*
-ˋˏ *.·:·.⟐.·:·.* ˎˊ-
━━━ ⋅𖥔⋅ ━━✶━━ ⋅𖥔⋅ ━━━
Accordions
━━━ ⋅𖥔⋅ ━━✶━━ ⋅𖥔⋅ ━━━
-ˋˏ *.·:·.⟐.·:·.* ˎˊ-
*/
(function ($) {
  $(".panel-header").click(function (e) {
    $(this).next().slideToggle();
    $(this).parent().toggleClass('active');
  });
})(jQuery);

// ==================================================
// fancyBox v3.5.7
//
// Licensed GPLv3 for open source use
// or fancyBox Commercial License for commercial use
//
// http://fancyapps.com/fancybox/
// Copyright 2019 fancyApps
//
// ==================================================
(function (window, document, $, undefined$1) {

  window.console = window.console || {
    info: function (stuff) {}
  }; // If there's no jQuery, fancyBox can't work
  // =========================================

  if (!$) {
    return;
  } // Check if fancyBox is already initialized
  // ========================================


  if ($.fn.fancybox) {
    console.info("fancyBox already initialized");
    return;
  } // Private default settings
  // ========================


  var defaults = {
    // Close existing modals
    // Set this to false if you do not need to stack multiple instances
    closeExisting: false,
    // Enable infinite gallery navigation
    loop: false,
    // Horizontal space between slides
    gutter: 50,
    // Enable keyboard navigation
    keyboard: true,
    // Should allow caption to overlap the content
    preventCaptionOverlap: true,
    // Should display navigation arrows at the screen edges
    arrows: true,
    // Should display counter at the top left corner
    infobar: true,
    // Should display close button (using `btnTpl.smallBtn` template) over the content
    // Can be true, false, "auto"
    // If "auto" - will be automatically enabled for "html", "inline" or "ajax" items
    smallBtn: "auto",
    // Should display toolbar (buttons at the top)
    // Can be true, false, "auto"
    // If "auto" - will be automatically hidden if "smallBtn" is enabled
    toolbar: "auto",
    // What buttons should appear in the top right corner.
    // Buttons will be created using templates from `btnTpl` option
    // and they will be placed into toolbar (class="fancybox-toolbar"` element)
    buttons: ["zoom", //"share",
    "slideShow", //"fullScreen",
    //"download",
    "thumbs", "close"],
    // Detect "idle" time in seconds
    idleTime: 3,
    // Disable right-click and use simple image protection for images
    protect: false,
    // Shortcut to make content "modal" - disable keyboard navigtion, hide buttons, etc
    modal: false,
    image: {
      // Wait for images to load before displaying
      //   true  - wait for image to load and then display;
      //   false - display thumbnail and load the full-sized image over top,
      //           requires predefined image dimensions (`data-width` and `data-height` attributes)
      preload: false
    },
    ajax: {
      // Object containing settings for ajax request
      settings: {
        // This helps to indicate that request comes from the modal
        // Feel free to change naming
        data: {
          fancybox: true
        }
      }
    },
    iframe: {
      // Iframe template
      tpl: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" allowfullscreen="allowfullscreen" allow="autoplay; fullscreen" src=""></iframe>',
      // Preload iframe before displaying it
      // This allows to calculate iframe content width and height
      // (note: Due to "Same Origin Policy", you can't get cross domain data).
      preload: true,
      // Custom CSS styling for iframe wrapping element
      // You can use this to set custom iframe dimensions
      css: {},
      // Iframe tag attributes
      attr: {
        scrolling: "auto"
      }
    },
    // For HTML5 video only
    video: {
      tpl: '<video class="fancybox-video" controls controlsList="nodownload" poster="{{poster}}">' + '<source src="{{src}}" type="{{format}}" />' + 'Sorry, your browser doesn\'t support embedded videos, <a href="{{src}}">download</a> and watch with your favorite video player!' + "</video>",
      format: "",
      // custom video format
      autoStart: true
    },
    // Default content type if cannot be detected automatically
    defaultType: "image",
    // Open/close animation type
    // Possible values:
    //   false            - disable
    //   "zoom"           - zoom images from/to thumbnail
    //   "fade"
    //   "zoom-in-out"
    //
    animationEffect: "zoom",
    // Duration in ms for open/close animation
    animationDuration: 366,
    // Should image change opacity while zooming
    // If opacity is "auto", then opacity will be changed if image and thumbnail have different aspect ratios
    zoomOpacity: "auto",
    // Transition effect between slides
    //
    // Possible values:
    //   false            - disable
    //   "fade'
    //   "slide'
    //   "circular'
    //   "tube'
    //   "zoom-in-out'
    //   "rotate'
    //
    transitionEffect: "fade",
    // Duration in ms for transition animation
    transitionDuration: 366,
    // Custom CSS class for slide element
    slideClass: "",
    // Custom CSS class for layout
    baseClass: "",
    // Base template for layout
    baseTpl: '<div class="fancybox-container" role="dialog" tabindex="-1">' + '<div class="fancybox-bg"></div>' + '<div class="fancybox-inner">' + '<div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div>' + '<div class="fancybox-toolbar">{{buttons}}</div>' + '<div class="fancybox-navigation">{{arrows}}</div>' + '<div class="fancybox-stage"></div>' + '<div class="fancybox-caption"><div class="fancybox-caption__body"></div></div>' + "</div>" + "</div>",
    // Loading indicator template
    spinnerTpl: '<div class="fancybox-loading"></div>',
    // Error message template
    errorTpl: '<div class="fancybox-error"><p>{{ERROR}}</p></div>',
    btnTpl: {
      download: '<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}" href="javascript:;">' + '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.62 17.09V19H5.38v-1.91zm-2.97-6.96L17 11.45l-5 4.87-5-4.87 1.36-1.32 2.68 2.64V5h1.92v7.77z"/></svg>' + "</a>",
      zoom: '<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}">' + '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.7 17.3l-3-3a5.9 5.9 0 0 0-.6-7.6 5.9 5.9 0 0 0-8.4 0 5.9 5.9 0 0 0 0 8.4 5.9 5.9 0 0 0 7.7.7l3 3a1 1 0 0 0 1.3 0c.4-.5.4-1 0-1.5zM8.1 13.8a4 4 0 0 1 0-5.7 4 4 0 0 1 5.7 0 4 4 0 0 1 0 5.7 4 4 0 0 1-5.7 0z"/></svg>' + "</button>",
      close: '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}">' + '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z"/></svg>' + "</button>",
      // Arrows
      arrowLeft: '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}">' + '<div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.28 15.7l-1.34 1.37L5 12l4.94-5.07 1.34 1.38-2.68 2.72H19v1.94H8.6z"/></svg></div>' + "</button>",
      arrowRight: '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}">' + '<div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.4 12.97l-2.68 2.72 1.34 1.38L19 12l-4.94-5.07-1.34 1.38 2.68 2.72H5v1.94z"/></svg></div>' + "</button>",
      // This small close button will be appended to your html/inline/ajax content by default,
      // if "smallBtn" option is not set to false
      smallBtn: '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}">' + '<svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24"><path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"/></svg>' + "</button>"
    },
    // Container is injected into this element
    parentEl: "body",
    // Hide browser vertical scrollbars; use at your own risk
    hideScrollbar: true,
    // Focus handling
    // ==============
    // Try to focus on the first focusable element after opening
    autoFocus: true,
    // Put focus back to active element after closing
    backFocus: true,
    // Do not let user to focus on element outside modal content
    trapFocus: true,
    // Module specific options
    // =======================
    fullScreen: {
      autoStart: false
    },
    // Set `touch: false` to disable panning/swiping
    touch: {
      vertical: true,
      // Allow to drag content vertically
      momentum: true // Continue movement after releasing mouse/touch when panning

    },
    // Hash value when initializing manually,
    // set `false` to disable hash change
    hash: null,
    // Customize or add new media types
    // Example:

    /*
      media : {
        youtube : {
          params : {
            autoplay : 0
          }
        }
      }
    */
    media: {},
    slideShow: {
      autoStart: false,
      speed: 3000
    },
    thumbs: {
      autoStart: false,
      // Display thumbnails on opening
      hideOnClose: true,
      // Hide thumbnail grid when closing animation starts
      parentEl: ".fancybox-container",
      // Container is injected into this element
      axis: "y" // Vertical (y) or horizontal (x) scrolling

    },
    // Use mousewheel to navigate gallery
    // If 'auto' - enabled for images only
    wheel: "auto",
    // Callbacks
    //==========
    // See Documentation/API/Events for more information
    // Example:

    /*
      afterShow: function( instance, current ) {
        console.info( 'Clicked element:' );
        console.info( current.opts.$orig );
      }
    */
    onInit: $.noop,
    // When instance has been initialized
    beforeLoad: $.noop,
    // Before the content of a slide is being loaded
    afterLoad: $.noop,
    // When the content of a slide is done loading
    beforeShow: $.noop,
    // Before open animation starts
    afterShow: $.noop,
    // When content is done loading and animating
    beforeClose: $.noop,
    // Before the instance attempts to close. Return false to cancel the close.
    afterClose: $.noop,
    // After instance has been closed
    onActivate: $.noop,
    // When instance is brought to front
    onDeactivate: $.noop,
    // When other instance has been activated
    // Interaction
    // ===========
    // Use options below to customize taken action when user clicks or double clicks on the fancyBox area,
    // each option can be string or method that returns value.
    //
    // Possible values:
    //   "close"           - close instance
    //   "next"            - move to next gallery item
    //   "nextOrClose"     - move to next gallery item or close if gallery has only one item
    //   "toggleControls"  - show/hide controls
    //   "zoom"            - zoom image (if loaded)
    //   false             - do nothing
    // Clicked on the content
    clickContent: function (current, event) {
      return current.type === "image" ? "zoom" : false;
    },
    // Clicked on the slide
    clickSlide: "close",
    // Clicked on the background (backdrop) element;
    // if you have not changed the layout, then most likely you need to use `clickSlide` option
    clickOutside: "close",
    // Same as previous two, but for double click
    dblclickContent: false,
    dblclickSlide: false,
    dblclickOutside: false,
    // Custom options when mobile device is detected
    // =============================================
    mobile: {
      preventCaptionOverlap: false,
      idleTime: false,
      clickContent: function (current, event) {
        return current.type === "image" ? "toggleControls" : false;
      },
      clickSlide: function (current, event) {
        return current.type === "image" ? "toggleControls" : "close";
      },
      dblclickContent: function (current, event) {
        return current.type === "image" ? "zoom" : false;
      },
      dblclickSlide: function (current, event) {
        return current.type === "image" ? "zoom" : false;
      }
    },
    // Internationalization
    // ====================
    lang: "en",
    i18n: {
      en: {
        CLOSE: "Close",
        NEXT: "Next",
        PREV: "Previous",
        ERROR: "The requested content cannot be loaded. <br/> Please try again later.",
        PLAY_START: "Start slideshow",
        PLAY_STOP: "Pause slideshow",
        FULL_SCREEN: "Full screen",
        THUMBS: "Thumbnails",
        DOWNLOAD: "Download",
        SHARE: "Share",
        ZOOM: "Zoom"
      },
      de: {
        CLOSE: "Schlie&szlig;en",
        NEXT: "Weiter",
        PREV: "Zur&uuml;ck",
        ERROR: "Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es sp&auml;ter nochmal.",
        PLAY_START: "Diaschau starten",
        PLAY_STOP: "Diaschau beenden",
        FULL_SCREEN: "Vollbild",
        THUMBS: "Vorschaubilder",
        DOWNLOAD: "Herunterladen",
        SHARE: "Teilen",
        ZOOM: "Vergr&ouml;&szlig;ern"
      }
    }
  }; // Few useful variables and methods
  // ================================

  var $W = $(window);
  var $D = $(document);
  var called = 0; // Check if an object is a jQuery object and not a native JavaScript object
  // ========================================================================

  var isQuery = function (obj) {
    return obj && obj.hasOwnProperty && obj instanceof $;
  }; // Handle multiple browsers for "requestAnimationFrame" and "cancelAnimationFrame"
  // ===============================================================================


  var requestAFrame = function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || // if all else fails, use setTimeout
    function (callback) {
      return window.setTimeout(callback, 1000 / 60);
    };
  }();

  var cancelAFrame = function () {
    return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || function (id) {
      window.clearTimeout(id);
    };
  }(); // Detect the supported transition-end event property name
  // =======================================================


  var transitionEnd = function () {
    var el = document.createElement("fakeelement"),
        t;
    var transitions = {
      transition: "transitionend",
      OTransition: "oTransitionEnd",
      MozTransition: "transitionend",
      WebkitTransition: "webkitTransitionEnd"
    };

    for (t in transitions) {
      if (el.style[t] !== undefined$1) {
        return transitions[t];
      }
    }

    return "transitionend";
  }(); // Force redraw on an element.
  // This helps in cases where the browser doesn't redraw an updated element properly
  // ================================================================================


  var forceRedraw = function ($el) {
    return $el && $el.length && $el[0].offsetHeight;
  }; // Exclude array (`buttons`) options from deep merging
  // ===================================================


  var mergeOpts = function (opts1, opts2) {
    var rez = $.extend(true, {}, opts1, opts2);
    $.each(opts2, function (key, value) {
      if ($.isArray(value)) {
        rez[key] = value;
      }
    });
    return rez;
  }; // How much of an element is visible in viewport
  // =============================================


  var inViewport = function (elem) {
    var elemCenter, rez;

    if (!elem || elem.ownerDocument !== document) {
      return false;
    }

    $(".fancybox-container").css("pointer-events", "none");
    elemCenter = {
      x: elem.getBoundingClientRect().left + elem.offsetWidth / 2,
      y: elem.getBoundingClientRect().top + elem.offsetHeight / 2
    };
    rez = document.elementFromPoint(elemCenter.x, elemCenter.y) === elem;
    $(".fancybox-container").css("pointer-events", "");
    return rez;
  }; // Class definition
  // ================


  var FancyBox = function (content, opts, index) {
    var self = this;
    self.opts = mergeOpts({
      index: index
    }, $.fancybox.defaults);

    if ($.isPlainObject(opts)) {
      self.opts = mergeOpts(self.opts, opts);
    }

    if ($.fancybox.isMobile) {
      self.opts = mergeOpts(self.opts, self.opts.mobile);
    }

    self.id = self.opts.id || ++called;
    self.currIndex = parseInt(self.opts.index, 10) || 0;
    self.prevIndex = null;
    self.prevPos = null;
    self.currPos = 0;
    self.firstRun = true; // All group items

    self.group = []; // Existing slides (for current, next and previous gallery items)

    self.slides = {}; // Create group elements

    self.addContent(content);

    if (!self.group.length) {
      return;
    }

    self.init();
  };

  $.extend(FancyBox.prototype, {
    // Create DOM structure
    // ====================
    init: function () {
      var self = this,
          firstItem = self.group[self.currIndex],
          firstItemOpts = firstItem.opts,
          $container,
          buttonStr;

      if (firstItemOpts.closeExisting) {
        $.fancybox.close(true);
      } // Hide scrollbars
      // ===============


      $("body").addClass("fancybox-active");

      if (!$.fancybox.getInstance() && firstItemOpts.hideScrollbar !== false && !$.fancybox.isMobile && document.body.scrollHeight > window.innerHeight) {
        $("head").append('<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar{margin-right:' + (window.innerWidth - document.documentElement.clientWidth) + "px;}</style>");
        $("body").addClass("compensate-for-scrollbar");
      } // Build html markup and set references
      // ====================================
      // Build html code for buttons and insert into main template


      buttonStr = "";
      $.each(firstItemOpts.buttons, function (index, value) {
        buttonStr += firstItemOpts.btnTpl[value] || "";
      }); // Create markup from base template, it will be initially hidden to
      // avoid unnecessary work like painting while initializing is not complete

      $container = $(self.translate(self, firstItemOpts.baseTpl.replace("{{buttons}}", buttonStr).replace("{{arrows}}", firstItemOpts.btnTpl.arrowLeft + firstItemOpts.btnTpl.arrowRight))).attr("id", "fancybox-container-" + self.id).addClass(firstItemOpts.baseClass).data("FancyBox", self).appendTo(firstItemOpts.parentEl); // Create object holding references to jQuery wrapped nodes

      self.$refs = {
        container: $container
      };
      ["bg", "inner", "infobar", "toolbar", "stage", "caption", "navigation"].forEach(function (item) {
        self.$refs[item] = $container.find(".fancybox-" + item);
      });
      self.trigger("onInit"); // Enable events, deactive previous instances

      self.activate(); // Build slides, load and reveal content

      self.jumpTo(self.currIndex);
    },
    // Simple i18n support - replaces object keys found in template
    // with corresponding values
    // ============================================================
    translate: function (obj, str) {
      var arr = obj.opts.i18n[obj.opts.lang] || obj.opts.i18n.en;
      return str.replace(/\{\{(\w+)\}\}/g, function (match, n) {
        return arr[n] === undefined$1 ? match : arr[n];
      });
    },
    // Populate current group with fresh content
    // Check if each object has valid type and content
    // ===============================================
    addContent: function (content) {
      var self = this,
          items = $.makeArray(content),
          thumbs;
      $.each(items, function (i, item) {
        var obj = {},
            opts = {},
            $item,
            type,
            found,
            src,
            srcParts; // Step 1 - Make sure we have an object
        // ====================================

        if ($.isPlainObject(item)) {
          // We probably have manual usage here, something like
          // $.fancybox.open( [ { src : "image.jpg", type : "image" } ] )
          obj = item;
          opts = item.opts || item;
        } else if ($.type(item) === "object" && $(item).length) {
          // Here we probably have jQuery collection returned by some selector
          $item = $(item); // Support attributes like `data-options='{"touch" : false}'` and `data-touch='false'`

          opts = $item.data() || {};
          opts = $.extend(true, {}, opts, opts.options); // Here we store clicked element

          opts.$orig = $item;
          obj.src = self.opts.src || opts.src || $item.attr("href"); // Assume that simple syntax is used, for example:
          //   `$.fancybox.open( $("#test"), {} );`

          if (!obj.type && !obj.src) {
            obj.type = "inline";
            obj.src = item;
          }
        } else {
          // Assume we have a simple html code, for example:
          //   $.fancybox.open( '<div><h1>Hi!</h1></div>' );
          obj = {
            type: "html",
            src: item + ""
          };
        } // Each gallery object has full collection of options


        obj.opts = $.extend(true, {}, self.opts, opts); // Do not merge buttons array

        if ($.isArray(opts.buttons)) {
          obj.opts.buttons = opts.buttons;
        }

        if ($.fancybox.isMobile && obj.opts.mobile) {
          obj.opts = mergeOpts(obj.opts, obj.opts.mobile);
        } // Step 2 - Make sure we have content type, if not - try to guess
        // ==============================================================


        type = obj.type || obj.opts.type;
        src = obj.src || "";

        if (!type && src) {
          if (found = src.match(/\.(mp4|mov|ogv|webm)((\?|#).*)?$/i)) {
            type = "video";

            if (!obj.opts.video.format) {
              obj.opts.video.format = "video/" + (found[1] === "ogv" ? "ogg" : found[1]);
            }
          } else if (src.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i)) {
            type = "image";
          } else if (src.match(/\.(pdf)((\?|#).*)?$/i)) {
            type = "iframe";
            obj = $.extend(true, obj, {
              contentType: "pdf",
              opts: {
                iframe: {
                  preload: false
                }
              }
            });
          } else if (src.charAt(0) === "#") {
            type = "inline";
          }
        }

        if (type) {
          obj.type = type;
        } else {
          self.trigger("objectNeedsType", obj);
        }

        if (!obj.contentType) {
          obj.contentType = $.inArray(obj.type, ["html", "inline", "ajax"]) > -1 ? "html" : obj.type;
        } // Step 3 - Some adjustments
        // =========================


        obj.index = self.group.length;

        if (obj.opts.smallBtn == "auto") {
          obj.opts.smallBtn = $.inArray(obj.type, ["html", "inline", "ajax"]) > -1;
        }

        if (obj.opts.toolbar === "auto") {
          obj.opts.toolbar = !obj.opts.smallBtn;
        } // Find thumbnail image, check if exists and if is in the viewport


        obj.$thumb = obj.opts.$thumb || null;

        if (obj.opts.$trigger && obj.index === self.opts.index) {
          obj.$thumb = obj.opts.$trigger.find("img:first");

          if (obj.$thumb.length) {
            obj.opts.$orig = obj.opts.$trigger;
          }
        }

        if (!(obj.$thumb && obj.$thumb.length) && obj.opts.$orig) {
          obj.$thumb = obj.opts.$orig.find("img:first");
        }

        if (obj.$thumb && !obj.$thumb.length) {
          obj.$thumb = null;
        }

        obj.thumb = obj.opts.thumb || (obj.$thumb ? obj.$thumb[0].src : null); // "caption" is a "special" option, it can be used to customize caption per gallery item

        if ($.type(obj.opts.caption) === "function") {
          obj.opts.caption = obj.opts.caption.apply(item, [self, obj]);
        }

        if ($.type(self.opts.caption) === "function") {
          obj.opts.caption = self.opts.caption.apply(item, [self, obj]);
        } // Make sure we have caption as a string or jQuery object


        if (!(obj.opts.caption instanceof $)) {
          obj.opts.caption = obj.opts.caption === undefined$1 ? "" : obj.opts.caption + "";
        } // Check if url contains "filter" used to filter the content
        // Example: "ajax.html #something"


        if (obj.type === "ajax") {
          srcParts = src.split(/\s+/, 2);

          if (srcParts.length > 1) {
            obj.src = srcParts.shift();
            obj.opts.filter = srcParts.shift();
          }
        } // Hide all buttons and disable interactivity for modal items


        if (obj.opts.modal) {
          obj.opts = $.extend(true, obj.opts, {
            trapFocus: true,
            // Remove buttons
            infobar: 0,
            toolbar: 0,
            smallBtn: 0,
            // Disable keyboard navigation
            keyboard: 0,
            // Disable some modules
            slideShow: 0,
            fullScreen: 0,
            thumbs: 0,
            touch: 0,
            // Disable click event handlers
            clickContent: false,
            clickSlide: false,
            clickOutside: false,
            dblclickContent: false,
            dblclickSlide: false,
            dblclickOutside: false
          });
        } // Step 4 - Add processed object to group
        // ======================================


        self.group.push(obj);
      }); // Update controls if gallery is already opened

      if (Object.keys(self.slides).length) {
        self.updateControls(); // Update thumbnails, if needed

        thumbs = self.Thumbs;

        if (thumbs && thumbs.isActive) {
          thumbs.create();
          thumbs.focus();
        }
      }
    },
    // Attach an event handler functions for:
    //   - navigation buttons
    //   - browser scrolling, resizing;
    //   - focusing
    //   - keyboard
    //   - detecting inactivity
    // ======================================
    addEvents: function () {
      var self = this;
      self.removeEvents(); // Make navigation elements clickable
      // ==================================

      self.$refs.container.on("click.fb-close", "[data-fancybox-close]", function (e) {
        e.stopPropagation();
        e.preventDefault();
        self.close(e);
      }).on("touchstart.fb-prev click.fb-prev", "[data-fancybox-prev]", function (e) {
        e.stopPropagation();
        e.preventDefault();
        self.previous();
      }).on("touchstart.fb-next click.fb-next", "[data-fancybox-next]", function (e) {
        e.stopPropagation();
        e.preventDefault();
        self.next();
      }).on("click.fb", "[data-fancybox-zoom]", function (e) {
        // Click handler for zoom button
        self[self.isScaledDown() ? "scaleToActual" : "scaleToFit"]();
      }); // Handle page scrolling and browser resizing
      // ==========================================

      $W.on("orientationchange.fb resize.fb", function (e) {
        if (e && e.originalEvent && e.originalEvent.type === "resize") {
          if (self.requestId) {
            cancelAFrame(self.requestId);
          }

          self.requestId = requestAFrame(function () {
            self.update(e);
          });
        } else {
          if (self.current && self.current.type === "iframe") {
            self.$refs.stage.hide();
          }

          setTimeout(function () {
            self.$refs.stage.show();
            self.update(e);
          }, $.fancybox.isMobile ? 600 : 250);
        }
      });
      $D.on("keydown.fb", function (e) {
        var instance = $.fancybox ? $.fancybox.getInstance() : null,
            current = instance.current,
            keycode = e.keyCode || e.which; // Trap keyboard focus inside of the modal
        // =======================================

        if (keycode == 9) {
          if (current.opts.trapFocus) {
            self.focus(e);
          }

          return;
        } // Enable keyboard navigation
        // ==========================


        if (!current.opts.keyboard || e.ctrlKey || e.altKey || e.shiftKey || $(e.target).is("input,textarea,video,audio,select")) {
          return;
        } // Backspace and Esc keys


        if (keycode === 8 || keycode === 27) {
          e.preventDefault();
          self.close(e);
          return;
        } // Left arrow and Up arrow


        if (keycode === 37 || keycode === 38) {
          e.preventDefault();
          self.previous();
          return;
        } // Righ arrow and Down arrow


        if (keycode === 39 || keycode === 40) {
          e.preventDefault();
          self.next();
          return;
        }

        self.trigger("afterKeydown", e, keycode);
      }); // Hide controls after some inactivity period

      if (self.group[self.currIndex].opts.idleTime) {
        self.idleSecondsCounter = 0;
        $D.on("mousemove.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle", function (e) {
          self.idleSecondsCounter = 0;

          if (self.isIdle) {
            self.showControls();
          }

          self.isIdle = false;
        });
        self.idleInterval = window.setInterval(function () {
          self.idleSecondsCounter++;

          if (self.idleSecondsCounter >= self.group[self.currIndex].opts.idleTime && !self.isDragging) {
            self.isIdle = true;
            self.idleSecondsCounter = 0;
            self.hideControls();
          }
        }, 1000);
      }
    },
    // Remove events added by the core
    // ===============================
    removeEvents: function () {
      var self = this;
      $W.off("orientationchange.fb resize.fb");
      $D.off("keydown.fb .fb-idle");
      this.$refs.container.off(".fb-close .fb-prev .fb-next");

      if (self.idleInterval) {
        window.clearInterval(self.idleInterval);
        self.idleInterval = null;
      }
    },
    // Change to previous gallery item
    // ===============================
    previous: function (duration) {
      return this.jumpTo(this.currPos - 1, duration);
    },
    // Change to next gallery item
    // ===========================
    next: function (duration) {
      return this.jumpTo(this.currPos + 1, duration);
    },
    // Switch to selected gallery item
    // ===============================
    jumpTo: function (pos, duration) {
      var self = this,
          groupLen = self.group.length,
          firstRun,
          isMoved,
          loop,
          current,
          previous,
          slidePos,
          stagePos,
          prop,
          diff;

      if (self.isDragging || self.isClosing || self.isAnimating && self.firstRun) {
        return;
      } // Should loop?


      pos = parseInt(pos, 10);
      loop = self.current ? self.current.opts.loop : self.opts.loop;

      if (!loop && (pos < 0 || pos >= groupLen)) {
        return false;
      } // Check if opening for the first time; this helps to speed things up


      firstRun = self.firstRun = !Object.keys(self.slides).length; // Create slides

      previous = self.current;
      self.prevIndex = self.currIndex;
      self.prevPos = self.currPos;
      current = self.createSlide(pos);

      if (groupLen > 1) {
        if (loop || current.index < groupLen - 1) {
          self.createSlide(pos + 1);
        }

        if (loop || current.index > 0) {
          self.createSlide(pos - 1);
        }
      }

      self.current = current;
      self.currIndex = current.index;
      self.currPos = current.pos;
      self.trigger("beforeShow", firstRun);
      self.updateControls(); // Validate duration length

      current.forcedDuration = undefined$1;

      if ($.isNumeric(duration)) {
        current.forcedDuration = duration;
      } else {
        duration = current.opts[firstRun ? "animationDuration" : "transitionDuration"];
      }

      duration = parseInt(duration, 10); // Check if user has swiped the slides or if still animating

      isMoved = self.isMoved(current); // Make sure current slide is visible

      current.$slide.addClass("fancybox-slide--current"); // Fresh start - reveal container, current slide and start loading content

      if (firstRun) {
        if (current.opts.animationEffect && duration) {
          self.$refs.container.css("transition-duration", duration + "ms");
        }

        self.$refs.container.addClass("fancybox-is-open").trigger("focus"); // Attempt to load content into slide
        // This will later call `afterLoad` -> `revealContent`

        self.loadSlide(current);
        self.preload("image");
        return;
      } // Get actual slide/stage positions (before cleaning up)


      slidePos = $.fancybox.getTranslate(previous.$slide);
      stagePos = $.fancybox.getTranslate(self.$refs.stage); // Clean up all slides

      $.each(self.slides, function (index, slide) {
        $.fancybox.stop(slide.$slide, true);
      });

      if (previous.pos !== current.pos) {
        previous.isComplete = false;
      }

      previous.$slide.removeClass("fancybox-slide--complete fancybox-slide--current"); // If slides are out of place, then animate them to correct position

      if (isMoved) {
        // Calculate horizontal swipe distance
        diff = slidePos.left - (previous.pos * slidePos.width + previous.pos * previous.opts.gutter);
        $.each(self.slides, function (index, slide) {
          slide.$slide.removeClass("fancybox-animated").removeClass(function (index, className) {
            return (className.match(/(^|\s)fancybox-fx-\S+/g) || []).join(" ");
          }); // Make sure that each slide is in equal distance
          // This is mostly needed for freshly added slides, because they are not yet positioned

          var leftPos = slide.pos * slidePos.width + slide.pos * slide.opts.gutter;
          $.fancybox.setTranslate(slide.$slide, {
            top: 0,
            left: leftPos - stagePos.left + diff
          });

          if (slide.pos !== current.pos) {
            slide.$slide.addClass("fancybox-slide--" + (slide.pos > current.pos ? "next" : "previous"));
          } // Redraw to make sure that transition will start


          forceRedraw(slide.$slide); // Animate the slide

          $.fancybox.animate(slide.$slide, {
            top: 0,
            left: (slide.pos - current.pos) * slidePos.width + (slide.pos - current.pos) * slide.opts.gutter
          }, duration, function () {
            slide.$slide.css({
              transform: "",
              opacity: ""
            }).removeClass("fancybox-slide--next fancybox-slide--previous");

            if (slide.pos === self.currPos) {
              self.complete();
            }
          });
        });
      } else if (duration && current.opts.transitionEffect) {
        // Set transition effect for previously active slide
        prop = "fancybox-animated fancybox-fx-" + current.opts.transitionEffect;
        previous.$slide.addClass("fancybox-slide--" + (previous.pos > current.pos ? "next" : "previous"));
        $.fancybox.animate(previous.$slide, prop, duration, function () {
          previous.$slide.removeClass(prop).removeClass("fancybox-slide--next fancybox-slide--previous");
        }, false);
      }

      if (current.isLoaded) {
        self.revealContent(current);
      } else {
        self.loadSlide(current);
      }

      self.preload("image");
    },
    // Create new "slide" element
    // These are gallery items  that are actually added to DOM
    // =======================================================
    createSlide: function (pos) {
      var self = this,
          $slide,
          index;
      index = pos % self.group.length;
      index = index < 0 ? self.group.length + index : index;

      if (!self.slides[pos] && self.group[index]) {
        $slide = $('<div class="fancybox-slide"></div>').appendTo(self.$refs.stage);
        self.slides[pos] = $.extend(true, {}, self.group[index], {
          pos: pos,
          $slide: $slide,
          isLoaded: false
        });
        self.updateSlide(self.slides[pos]);
      }

      return self.slides[pos];
    },
    // Scale image to the actual size of the image;
    // x and y values should be relative to the slide
    // ==============================================
    scaleToActual: function (x, y, duration) {
      var self = this,
          current = self.current,
          $content = current.$content,
          canvasWidth = $.fancybox.getTranslate(current.$slide).width,
          canvasHeight = $.fancybox.getTranslate(current.$slide).height,
          newImgWidth = current.width,
          newImgHeight = current.height,
          imgPos,
          posX,
          posY,
          scaleX,
          scaleY;

      if (self.isAnimating || self.isMoved() || !$content || !(current.type == "image" && current.isLoaded && !current.hasError)) {
        return;
      }

      self.isAnimating = true;
      $.fancybox.stop($content);
      x = x === undefined$1 ? canvasWidth * 0.5 : x;
      y = y === undefined$1 ? canvasHeight * 0.5 : y;
      imgPos = $.fancybox.getTranslate($content);
      imgPos.top -= $.fancybox.getTranslate(current.$slide).top;
      imgPos.left -= $.fancybox.getTranslate(current.$slide).left;
      scaleX = newImgWidth / imgPos.width;
      scaleY = newImgHeight / imgPos.height; // Get center position for original image

      posX = canvasWidth * 0.5 - newImgWidth * 0.5;
      posY = canvasHeight * 0.5 - newImgHeight * 0.5; // Make sure image does not move away from edges

      if (newImgWidth > canvasWidth) {
        posX = imgPos.left * scaleX - (x * scaleX - x);

        if (posX > 0) {
          posX = 0;
        }

        if (posX < canvasWidth - newImgWidth) {
          posX = canvasWidth - newImgWidth;
        }
      }

      if (newImgHeight > canvasHeight) {
        posY = imgPos.top * scaleY - (y * scaleY - y);

        if (posY > 0) {
          posY = 0;
        }

        if (posY < canvasHeight - newImgHeight) {
          posY = canvasHeight - newImgHeight;
        }
      }

      self.updateCursor(newImgWidth, newImgHeight);
      $.fancybox.animate($content, {
        top: posY,
        left: posX,
        scaleX: scaleX,
        scaleY: scaleY
      }, duration || 366, function () {
        self.isAnimating = false;
      }); // Stop slideshow

      if (self.SlideShow && self.SlideShow.isActive) {
        self.SlideShow.stop();
      }
    },
    // Scale image to fit inside parent element
    // ========================================
    scaleToFit: function (duration) {
      var self = this,
          current = self.current,
          $content = current.$content,
          end;

      if (self.isAnimating || self.isMoved() || !$content || !(current.type == "image" && current.isLoaded && !current.hasError)) {
        return;
      }

      self.isAnimating = true;
      $.fancybox.stop($content);
      end = self.getFitPos(current);
      self.updateCursor(end.width, end.height);
      $.fancybox.animate($content, {
        top: end.top,
        left: end.left,
        scaleX: end.width / $content.width(),
        scaleY: end.height / $content.height()
      }, duration || 366, function () {
        self.isAnimating = false;
      });
    },
    // Calculate image size to fit inside viewport
    // ===========================================
    getFitPos: function (slide) {
      var self = this,
          $content = slide.$content,
          $slide = slide.$slide,
          width = slide.width || slide.opts.width,
          height = slide.height || slide.opts.height,
          maxWidth,
          maxHeight,
          minRatio,
          aspectRatio,
          rez = {};

      if (!slide.isLoaded || !$content || !$content.length) {
        return false;
      }

      maxWidth = $.fancybox.getTranslate(self.$refs.stage).width;
      maxHeight = $.fancybox.getTranslate(self.$refs.stage).height;
      maxWidth -= parseFloat($slide.css("paddingLeft")) + parseFloat($slide.css("paddingRight")) + parseFloat($content.css("marginLeft")) + parseFloat($content.css("marginRight"));
      maxHeight -= parseFloat($slide.css("paddingTop")) + parseFloat($slide.css("paddingBottom")) + parseFloat($content.css("marginTop")) + parseFloat($content.css("marginBottom"));

      if (!width || !height) {
        width = maxWidth;
        height = maxHeight;
      }

      minRatio = Math.min(1, maxWidth / width, maxHeight / height);
      width = minRatio * width;
      height = minRatio * height; // Adjust width/height to precisely fit into container

      if (width > maxWidth - 0.5) {
        width = maxWidth;
      }

      if (height > maxHeight - 0.5) {
        height = maxHeight;
      }

      if (slide.type === "image") {
        rez.top = Math.floor((maxHeight - height) * 0.5) + parseFloat($slide.css("paddingTop"));
        rez.left = Math.floor((maxWidth - width) * 0.5) + parseFloat($slide.css("paddingLeft"));
      } else if (slide.contentType === "video") {
        // Force aspect ratio for the video
        // "I say the whole world must learn of our peaceful ways… by force!"
        aspectRatio = slide.opts.width && slide.opts.height ? width / height : slide.opts.ratio || 16 / 9;

        if (height > width / aspectRatio) {
          height = width / aspectRatio;
        } else if (width > height * aspectRatio) {
          width = height * aspectRatio;
        }
      }

      rez.width = width;
      rez.height = height;
      return rez;
    },
    // Update content size and position for all slides
    // ==============================================
    update: function (e) {
      var self = this;
      $.each(self.slides, function (key, slide) {
        self.updateSlide(slide, e);
      });
    },
    // Update slide content position and size
    // ======================================
    updateSlide: function (slide, e) {
      var self = this,
          $content = slide && slide.$content,
          width = slide.width || slide.opts.width,
          height = slide.height || slide.opts.height,
          $slide = slide.$slide; // First, prevent caption overlap, if needed

      self.adjustCaption(slide); // Then resize content to fit inside the slide

      if ($content && (width || height || slide.contentType === "video") && !slide.hasError) {
        $.fancybox.stop($content);
        $.fancybox.setTranslate($content, self.getFitPos(slide));

        if (slide.pos === self.currPos) {
          self.isAnimating = false;
          self.updateCursor();
        }
      } // Then some adjustments


      self.adjustLayout(slide);

      if ($slide.length) {
        $slide.trigger("refresh");

        if (slide.pos === self.currPos) {
          self.$refs.toolbar.add(self.$refs.navigation.find(".fancybox-button--arrow_right")).toggleClass("compensate-for-scrollbar", $slide.get(0).scrollHeight > $slide.get(0).clientHeight);
        }
      }

      self.trigger("onUpdate", slide, e);
    },
    // Horizontally center slide
    // =========================
    centerSlide: function (duration) {
      var self = this,
          current = self.current,
          $slide = current.$slide;

      if (self.isClosing || !current) {
        return;
      }

      $slide.siblings().css({
        transform: "",
        opacity: ""
      });
      $slide.parent().children().removeClass("fancybox-slide--previous fancybox-slide--next");
      $.fancybox.animate($slide, {
        top: 0,
        left: 0,
        opacity: 1
      }, duration === undefined$1 ? 0 : duration, function () {
        // Clean up
        $slide.css({
          transform: "",
          opacity: ""
        });

        if (!current.isComplete) {
          self.complete();
        }
      }, false);
    },
    // Check if current slide is moved (swiped)
    // ========================================
    isMoved: function (slide) {
      var current = slide || this.current,
          slidePos,
          stagePos;

      if (!current) {
        return false;
      }

      stagePos = $.fancybox.getTranslate(this.$refs.stage);
      slidePos = $.fancybox.getTranslate(current.$slide);
      return !current.$slide.hasClass("fancybox-animated") && (Math.abs(slidePos.top - stagePos.top) > 0.5 || Math.abs(slidePos.left - stagePos.left) > 0.5);
    },
    // Update cursor style depending if content can be zoomed
    // ======================================================
    updateCursor: function (nextWidth, nextHeight) {
      var self = this,
          current = self.current,
          $container = self.$refs.container,
          canPan,
          isZoomable;

      if (!current || self.isClosing || !self.Guestures) {
        return;
      }

      $container.removeClass("fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-zoomOut fancybox-can-swipe fancybox-can-pan");
      canPan = self.canPan(nextWidth, nextHeight);
      isZoomable = canPan ? true : self.isZoomable();
      $container.toggleClass("fancybox-is-zoomable", isZoomable);
      $("[data-fancybox-zoom]").prop("disabled", !isZoomable);

      if (canPan) {
        $container.addClass("fancybox-can-pan");
      } else if (isZoomable && (current.opts.clickContent === "zoom" || $.isFunction(current.opts.clickContent) && current.opts.clickContent(current) == "zoom")) {
        $container.addClass("fancybox-can-zoomIn");
      } else if (current.opts.touch && (current.opts.touch.vertical || self.group.length > 1) && current.contentType !== "video") {
        $container.addClass("fancybox-can-swipe");
      }
    },
    // Check if current slide is zoomable
    // ==================================
    isZoomable: function () {
      var self = this,
          current = self.current,
          fitPos; // Assume that slide is zoomable if:
      //   - image is still loading
      //   - actual size of the image is smaller than available area

      if (current && !self.isClosing && current.type === "image" && !current.hasError) {
        if (!current.isLoaded) {
          return true;
        }

        fitPos = self.getFitPos(current);

        if (fitPos && (current.width > fitPos.width || current.height > fitPos.height)) {
          return true;
        }
      }

      return false;
    },
    // Check if current image dimensions are smaller than actual
    // =========================================================
    isScaledDown: function (nextWidth, nextHeight) {
      var self = this,
          rez = false,
          current = self.current,
          $content = current.$content;

      if (nextWidth !== undefined$1 && nextHeight !== undefined$1) {
        rez = nextWidth < current.width && nextHeight < current.height;
      } else if ($content) {
        rez = $.fancybox.getTranslate($content);
        rez = rez.width < current.width && rez.height < current.height;
      }

      return rez;
    },
    // Check if image dimensions exceed parent element
    // ===============================================
    canPan: function (nextWidth, nextHeight) {
      var self = this,
          current = self.current,
          pos = null,
          rez = false;

      if (current.type === "image" && (current.isComplete || nextWidth && nextHeight) && !current.hasError) {
        rez = self.getFitPos(current);

        if (nextWidth !== undefined$1 && nextHeight !== undefined$1) {
          pos = {
            width: nextWidth,
            height: nextHeight
          };
        } else if (current.isComplete) {
          pos = $.fancybox.getTranslate(current.$content);
        }

        if (pos && rez) {
          rez = Math.abs(pos.width - rez.width) > 1.5 || Math.abs(pos.height - rez.height) > 1.5;
        }
      }

      return rez;
    },
    // Load content into the slide
    // ===========================
    loadSlide: function (slide) {
      var self = this,
          type,
          $slide,
          ajaxLoad;

      if (slide.isLoading || slide.isLoaded) {
        return;
      }

      slide.isLoading = true;

      if (self.trigger("beforeLoad", slide) === false) {
        slide.isLoading = false;
        return false;
      }

      type = slide.type;
      $slide = slide.$slide;
      $slide.off("refresh").trigger("onReset").addClass(slide.opts.slideClass); // Create content depending on the type

      switch (type) {
        case "image":
          self.setImage(slide);
          break;

        case "iframe":
          self.setIframe(slide);
          break;

        case "html":
          self.setContent(slide, slide.src || slide.content);
          break;

        case "video":
          self.setContent(slide, slide.opts.video.tpl.replace(/\{\{src\}\}/gi, slide.src).replace("{{format}}", slide.opts.videoFormat || slide.opts.video.format || "").replace("{{poster}}", slide.thumb || ""));
          break;

        case "inline":
          if ($(slide.src).length) {
            self.setContent(slide, $(slide.src));
          } else {
            self.setError(slide);
          }

          break;

        case "ajax":
          self.showLoading(slide);
          ajaxLoad = $.ajax($.extend({}, slide.opts.ajax.settings, {
            url: slide.src,
            success: function (data, textStatus) {
              if (textStatus === "success") {
                self.setContent(slide, data);
              }
            },
            error: function (jqXHR, textStatus) {
              if (jqXHR && textStatus !== "abort") {
                self.setError(slide);
              }
            }
          }));
          $slide.one("onReset", function () {
            ajaxLoad.abort();
          });
          break;

        default:
          self.setError(slide);
          break;
      }

      return true;
    },
    // Use thumbnail image, if possible
    // ================================
    setImage: function (slide) {
      var self = this,
          ghost; // Check if need to show loading icon

      setTimeout(function () {
        var $img = slide.$image;

        if (!self.isClosing && slide.isLoading && (!$img || !$img.length || !$img[0].complete) && !slide.hasError) {
          self.showLoading(slide);
        }
      }, 50); //Check if image has srcset

      self.checkSrcset(slide); // This will be wrapper containing both ghost and actual image

      slide.$content = $('<div class="fancybox-content"></div>').addClass("fancybox-is-hidden").appendTo(slide.$slide.addClass("fancybox-slide--image")); // If we have a thumbnail, we can display it while actual image is loading
      // Users will not stare at black screen and actual image will appear gradually

      if (slide.opts.preload !== false && slide.opts.width && slide.opts.height && slide.thumb) {
        slide.width = slide.opts.width;
        slide.height = slide.opts.height;
        ghost = document.createElement("img");

        ghost.onerror = function () {
          $(this).remove();
          slide.$ghost = null;
        };

        ghost.onload = function () {
          self.afterLoad(slide);
        };

        slide.$ghost = $(ghost).addClass("fancybox-image").appendTo(slide.$content).attr("src", slide.thumb);
      } // Start loading actual image


      self.setBigImage(slide);
    },
    // Check if image has srcset and get the source
    // ============================================
    checkSrcset: function (slide) {
      var srcset = slide.opts.srcset || slide.opts.image.srcset,
          found,
          temp,
          pxRatio,
          windowWidth; // If we have "srcset", then we need to find first matching "src" value.
      // This is necessary, because when you set an src attribute, the browser will preload the image
      // before any javascript or even CSS is applied.

      if (srcset) {
        pxRatio = window.devicePixelRatio || 1;
        windowWidth = window.innerWidth * pxRatio;
        temp = srcset.split(",").map(function (el) {
          var ret = {};
          el.trim().split(/\s+/).forEach(function (el, i) {
            var value = parseInt(el.substring(0, el.length - 1), 10);

            if (i === 0) {
              return ret.url = el;
            }

            if (value) {
              ret.value = value;
              ret.postfix = el[el.length - 1];
            }
          });
          return ret;
        }); // Sort by value

        temp.sort(function (a, b) {
          return a.value - b.value;
        }); // Ok, now we have an array of all srcset values

        for (var j = 0; j < temp.length; j++) {
          var el = temp[j];

          if (el.postfix === "w" && el.value >= windowWidth || el.postfix === "x" && el.value >= pxRatio) {
            found = el;
            break;
          }
        } // If not found, take the last one


        if (!found && temp.length) {
          found = temp[temp.length - 1];
        }

        if (found) {
          slide.src = found.url; // If we have default width/height values, we can calculate height for matching source

          if (slide.width && slide.height && found.postfix == "w") {
            slide.height = slide.width / slide.height * found.value;
            slide.width = found.value;
          }

          slide.opts.srcset = srcset;
        }
      }
    },
    // Create full-size image
    // ======================
    setBigImage: function (slide) {
      var self = this,
          img = document.createElement("img"),
          $img = $(img);
      slide.$image = $img.one("error", function () {
        self.setError(slide);
      }).one("load", function () {
        var sizes;

        if (!slide.$ghost) {
          self.resolveImageSlideSize(slide, this.naturalWidth, this.naturalHeight);
          self.afterLoad(slide);
        }

        if (self.isClosing) {
          return;
        }

        if (slide.opts.srcset) {
          sizes = slide.opts.sizes;

          if (!sizes || sizes === "auto") {
            sizes = (slide.width / slide.height > 1 && $W.width() / $W.height() > 1 ? "100" : Math.round(slide.width / slide.height * 100)) + "vw";
          }

          $img.attr("sizes", sizes).attr("srcset", slide.opts.srcset);
        } // Hide temporary image after some delay


        if (slide.$ghost) {
          setTimeout(function () {
            if (slide.$ghost && !self.isClosing) {
              slide.$ghost.hide();
            }
          }, Math.min(300, Math.max(1000, slide.height / 1600)));
        }

        self.hideLoading(slide);
      }).addClass("fancybox-image").attr("src", slide.src).appendTo(slide.$content);

      if ((img.complete || img.readyState == "complete") && $img.naturalWidth && $img.naturalHeight) {
        $img.trigger("load");
      } else if (img.error) {
        $img.trigger("error");
      }
    },
    // Computes the slide size from image size and maxWidth/maxHeight
    // ==============================================================
    resolveImageSlideSize: function (slide, imgWidth, imgHeight) {
      var maxWidth = parseInt(slide.opts.width, 10),
          maxHeight = parseInt(slide.opts.height, 10); // Sets the default values from the image

      slide.width = imgWidth;
      slide.height = imgHeight;

      if (maxWidth > 0) {
        slide.width = maxWidth;
        slide.height = Math.floor(maxWidth * imgHeight / imgWidth);
      }

      if (maxHeight > 0) {
        slide.width = Math.floor(maxHeight * imgWidth / imgHeight);
        slide.height = maxHeight;
      }
    },
    // Create iframe wrapper, iframe and bindings
    // ==========================================
    setIframe: function (slide) {
      var self = this,
          opts = slide.opts.iframe,
          $slide = slide.$slide,
          $iframe;
      slide.$content = $('<div class="fancybox-content' + (opts.preload ? " fancybox-is-hidden" : "") + '"></div>').css(opts.css).appendTo($slide);
      $slide.addClass("fancybox-slide--" + slide.contentType);
      slide.$iframe = $iframe = $(opts.tpl.replace(/\{rnd\}/g, new Date().getTime())).attr(opts.attr).appendTo(slide.$content);

      if (opts.preload) {
        self.showLoading(slide); // Unfortunately, it is not always possible to determine if iframe is successfully loaded
        // (due to browser security policy)

        $iframe.on("load.fb error.fb", function (e) {
          this.isReady = 1;
          slide.$slide.trigger("refresh");
          self.afterLoad(slide);
        }); // Recalculate iframe content size
        // ===============================

        $slide.on("refresh.fb", function () {
          var $content = slide.$content,
              frameWidth = opts.css.width,
              frameHeight = opts.css.height,
              $contents,
              $body;

          if ($iframe[0].isReady !== 1) {
            return;
          }

          try {
            $contents = $iframe.contents();
            $body = $contents.find("body");
          } catch (ignore) {} // Calculate content dimensions, if it is accessible


          if ($body && $body.length && $body.children().length) {
            // Avoid scrolling to top (if multiple instances)
            $slide.css("overflow", "visible");
            $content.css({
              width: "100%",
              "max-width": "100%",
              height: "9999px"
            });

            if (frameWidth === undefined$1) {
              frameWidth = Math.ceil(Math.max($body[0].clientWidth, $body.outerWidth(true)));
            }

            $content.css("width", frameWidth ? frameWidth : "").css("max-width", "");

            if (frameHeight === undefined$1) {
              frameHeight = Math.ceil(Math.max($body[0].clientHeight, $body.outerHeight(true)));
            }

            $content.css("height", frameHeight ? frameHeight : "");
            $slide.css("overflow", "auto");
          }

          $content.removeClass("fancybox-is-hidden");
        });
      } else {
        self.afterLoad(slide);
      }

      $iframe.attr("src", slide.src); // Remove iframe if closing or changing gallery item

      $slide.one("onReset", function () {
        // This helps IE not to throw errors when closing
        try {
          $(this).find("iframe").hide().unbind().attr("src", "//about:blank");
        } catch (ignore) {}

        $(this).off("refresh.fb").empty();
        slide.isLoaded = false;
        slide.isRevealed = false;
      });
    },
    // Wrap and append content to the slide
    // ======================================
    setContent: function (slide, content) {
      var self = this;

      if (self.isClosing) {
        return;
      }

      self.hideLoading(slide);

      if (slide.$content) {
        $.fancybox.stop(slide.$content);
      }

      slide.$slide.empty(); // If content is a jQuery object, then it will be moved to the slide.
      // The placeholder is created so we will know where to put it back.

      if (isQuery(content) && content.parent().length) {
        // Make sure content is not already moved to fancyBox
        if (content.hasClass("fancybox-content") || content.parent().hasClass("fancybox-content")) {
          content.parents(".fancybox-slide").trigger("onReset");
        } // Create temporary element marking original place of the content


        slide.$placeholder = $("<div>").hide().insertAfter(content); // Make sure content is visible

        content.css("display", "inline-block");
      } else if (!slide.hasError) {
        // If content is just a plain text, try to convert it to html
        if ($.type(content) === "string") {
          content = $("<div>").append($.trim(content)).contents();
        } // If "filter" option is provided, then filter content


        if (slide.opts.filter) {
          content = $("<div>").html(content).find(slide.opts.filter);
        }
      }

      slide.$slide.one("onReset", function () {
        // Pause all html5 video/audio
        $(this).find("video,audio").trigger("pause"); // Put content back

        if (slide.$placeholder) {
          slide.$placeholder.after(content.removeClass("fancybox-content").hide()).remove();
          slide.$placeholder = null;
        } // Remove custom close button


        if (slide.$smallBtn) {
          slide.$smallBtn.remove();
          slide.$smallBtn = null;
        } // Remove content and mark slide as not loaded


        if (!slide.hasError) {
          $(this).empty();
          slide.isLoaded = false;
          slide.isRevealed = false;
        }
      });
      $(content).appendTo(slide.$slide);

      if ($(content).is("video,audio")) {
        $(content).addClass("fancybox-video");
        $(content).wrap("<div></div>");
        slide.contentType = "video";
        slide.opts.width = slide.opts.width || $(content).attr("width");
        slide.opts.height = slide.opts.height || $(content).attr("height");
      }

      slide.$content = slide.$slide.children().filter("div,form,main,video,audio,article,.fancybox-content").first();
      slide.$content.siblings().hide(); // Re-check if there is a valid content
      // (in some cases, ajax response can contain various elements or plain text)

      if (!slide.$content.length) {
        slide.$content = slide.$slide.wrapInner("<div></div>").children().first();
      }

      slide.$content.addClass("fancybox-content");
      slide.$slide.addClass("fancybox-slide--" + slide.contentType);
      self.afterLoad(slide);
    },
    // Display error message
    // =====================
    setError: function (slide) {
      slide.hasError = true;
      slide.$slide.trigger("onReset").removeClass("fancybox-slide--" + slide.contentType).addClass("fancybox-slide--error");
      slide.contentType = "html";
      this.setContent(slide, this.translate(slide, slide.opts.errorTpl));

      if (slide.pos === this.currPos) {
        this.isAnimating = false;
      }
    },
    // Show loading icon inside the slide
    // ==================================
    showLoading: function (slide) {
      var self = this;
      slide = slide || self.current;

      if (slide && !slide.$spinner) {
        slide.$spinner = $(self.translate(self, self.opts.spinnerTpl)).appendTo(slide.$slide).hide().fadeIn("fast");
      }
    },
    // Remove loading icon from the slide
    // ==================================
    hideLoading: function (slide) {
      var self = this;
      slide = slide || self.current;

      if (slide && slide.$spinner) {
        slide.$spinner.stop().remove();
        delete slide.$spinner;
      }
    },
    // Adjustments after slide content has been loaded
    // ===============================================
    afterLoad: function (slide) {
      var self = this;

      if (self.isClosing) {
        return;
      }

      slide.isLoading = false;
      slide.isLoaded = true;
      self.trigger("afterLoad", slide);
      self.hideLoading(slide); // Add small close button

      if (slide.opts.smallBtn && (!slide.$smallBtn || !slide.$smallBtn.length)) {
        slide.$smallBtn = $(self.translate(slide, slide.opts.btnTpl.smallBtn)).appendTo(slide.$content);
      } // Disable right click


      if (slide.opts.protect && slide.$content && !slide.hasError) {
        slide.$content.on("contextmenu.fb", function (e) {
          if (e.button == 2) {
            e.preventDefault();
          }

          return true;
        }); // Add fake element on top of the image
        // This makes a bit harder for user to select image

        if (slide.type === "image") {
          $('<div class="fancybox-spaceball"></div>').appendTo(slide.$content);
        }
      }

      self.adjustCaption(slide);
      self.adjustLayout(slide);

      if (slide.pos === self.currPos) {
        self.updateCursor();
      }

      self.revealContent(slide);
    },
    // Prevent caption overlap,
    // fix css inconsistency across browsers
    // =====================================
    adjustCaption: function (slide) {
      var self = this,
          current = slide || self.current,
          caption = current.opts.caption,
          preventOverlap = current.opts.preventCaptionOverlap,
          $caption = self.$refs.caption,
          $clone,
          captionH = false;
      $caption.toggleClass("fancybox-caption--separate", preventOverlap);

      if (preventOverlap && caption && caption.length) {
        if (current.pos !== self.currPos) {
          $clone = $caption.clone().appendTo($caption.parent());
          $clone.children().eq(0).empty().html(caption);
          captionH = $clone.outerHeight(true);
          $clone.empty().remove();
        } else if (self.$caption) {
          captionH = self.$caption.outerHeight(true);
        }

        current.$slide.css("padding-bottom", captionH || "");
      }
    },
    // Simple hack to fix inconsistency across browsers, described here (affects Edge, too):
    // https://bugzilla.mozilla.org/show_bug.cgi?id=748518
    // ====================================================================================
    adjustLayout: function (slide) {
      var self = this,
          current = slide || self.current,
          scrollHeight,
          marginBottom,
          inlinePadding,
          actualPadding;

      if (current.isLoaded && current.opts.disableLayoutFix !== true) {
        current.$content.css("margin-bottom", ""); // If we would always set margin-bottom for the content,
        // then it would potentially break vertical align

        if (current.$content.outerHeight() > current.$slide.height() + 0.5) {
          inlinePadding = current.$slide[0].style["padding-bottom"];
          actualPadding = current.$slide.css("padding-bottom");

          if (parseFloat(actualPadding) > 0) {
            scrollHeight = current.$slide[0].scrollHeight;
            current.$slide.css("padding-bottom", 0);

            if (Math.abs(scrollHeight - current.$slide[0].scrollHeight) < 1) {
              marginBottom = actualPadding;
            }

            current.$slide.css("padding-bottom", inlinePadding);
          }
        }

        current.$content.css("margin-bottom", marginBottom);
      }
    },
    // Make content visible
    // This method is called right after content has been loaded or
    // user navigates gallery and transition should start
    // ============================================================
    revealContent: function (slide) {
      var self = this,
          $slide = slide.$slide,
          end = false,
          start = false,
          isMoved = self.isMoved(slide),
          isRevealed = slide.isRevealed,
          effect,
          effectClassName,
          duration,
          opacity;
      slide.isRevealed = true;
      effect = slide.opts[self.firstRun ? "animationEffect" : "transitionEffect"];
      duration = slide.opts[self.firstRun ? "animationDuration" : "transitionDuration"];
      duration = parseInt(slide.forcedDuration === undefined$1 ? duration : slide.forcedDuration, 10);

      if (isMoved || slide.pos !== self.currPos || !duration) {
        effect = false;
      } // Check if can zoom


      if (effect === "zoom") {
        if (slide.pos === self.currPos && duration && slide.type === "image" && !slide.hasError && (start = self.getThumbPos(slide))) {
          end = self.getFitPos(slide);
        } else {
          effect = "fade";
        }
      } // Zoom animation
      // ==============


      if (effect === "zoom") {
        self.isAnimating = true;
        end.scaleX = end.width / start.width;
        end.scaleY = end.height / start.height; // Check if we need to animate opacity

        opacity = slide.opts.zoomOpacity;

        if (opacity == "auto") {
          opacity = Math.abs(slide.width / slide.height - start.width / start.height) > 0.1;
        }

        if (opacity) {
          start.opacity = 0.1;
          end.opacity = 1;
        } // Draw image at start position


        $.fancybox.setTranslate(slide.$content.removeClass("fancybox-is-hidden"), start);
        forceRedraw(slide.$content); // Start animation

        $.fancybox.animate(slide.$content, end, duration, function () {
          self.isAnimating = false;
          self.complete();
        });
        return;
      }

      self.updateSlide(slide); // Simply show content if no effect
      // ================================

      if (!effect) {
        slide.$content.removeClass("fancybox-is-hidden");

        if (!isRevealed && isMoved && slide.type === "image" && !slide.hasError) {
          slide.$content.hide().fadeIn("fast");
        }

        if (slide.pos === self.currPos) {
          self.complete();
        }

        return;
      } // Prepare for CSS transiton
      // =========================


      $.fancybox.stop($slide); //effectClassName = "fancybox-animated fancybox-slide--" + (slide.pos >= self.prevPos ? "next" : "previous") + " fancybox-fx-" + effect;

      effectClassName = "fancybox-slide--" + (slide.pos >= self.prevPos ? "next" : "previous") + " fancybox-animated fancybox-fx-" + effect;
      $slide.addClass(effectClassName).removeClass("fancybox-slide--current"); //.addClass(effectClassName);

      slide.$content.removeClass("fancybox-is-hidden"); // Force reflow

      forceRedraw($slide);

      if (slide.type !== "image") {
        slide.$content.hide().show(0);
      }

      $.fancybox.animate($slide, "fancybox-slide--current", duration, function () {
        $slide.removeClass(effectClassName).css({
          transform: "",
          opacity: ""
        });

        if (slide.pos === self.currPos) {
          self.complete();
        }
      }, true);
    },
    // Check if we can and have to zoom from thumbnail
    //================================================
    getThumbPos: function (slide) {
      var rez = false,
          $thumb = slide.$thumb,
          thumbPos,
          btw,
          brw,
          bbw,
          blw;

      if (!$thumb || !inViewport($thumb[0])) {
        return false;
      }

      thumbPos = $.fancybox.getTranslate($thumb);
      btw = parseFloat($thumb.css("border-top-width") || 0);
      brw = parseFloat($thumb.css("border-right-width") || 0);
      bbw = parseFloat($thumb.css("border-bottom-width") || 0);
      blw = parseFloat($thumb.css("border-left-width") || 0);
      rez = {
        top: thumbPos.top + btw,
        left: thumbPos.left + blw,
        width: thumbPos.width - brw - blw,
        height: thumbPos.height - btw - bbw,
        scaleX: 1,
        scaleY: 1
      };
      return thumbPos.width > 0 && thumbPos.height > 0 ? rez : false;
    },
    // Final adjustments after current gallery item is moved to position
    // and it`s content is loaded
    // ==================================================================
    complete: function () {
      var self = this,
          current = self.current,
          slides = {},
          $el;

      if (self.isMoved() || !current.isLoaded) {
        return;
      }

      if (!current.isComplete) {
        current.isComplete = true;
        current.$slide.siblings().trigger("onReset");
        self.preload("inline"); // Trigger any CSS transiton inside the slide

        forceRedraw(current.$slide);
        current.$slide.addClass("fancybox-slide--complete"); // Remove unnecessary slides

        $.each(self.slides, function (key, slide) {
          if (slide.pos >= self.currPos - 1 && slide.pos <= self.currPos + 1) {
            slides[slide.pos] = slide;
          } else if (slide) {
            $.fancybox.stop(slide.$slide);
            slide.$slide.off().remove();
          }
        });
        self.slides = slides;
      }

      self.isAnimating = false;
      self.updateCursor();
      self.trigger("afterShow"); // Autoplay first html5 video/audio

      if (!!current.opts.video.autoStart) {
        current.$slide.find("video,audio").filter(":visible:first").trigger("play").one("ended", function () {
          if (Document.exitFullscreen) {
            Document.exitFullscreen();
          } else if (this.webkitExitFullscreen) {
            this.webkitExitFullscreen();
          }

          self.next();
        });
      } // Try to focus on the first focusable element


      if (current.opts.autoFocus && current.contentType === "html") {
        // Look for the first input with autofocus attribute
        $el = current.$content.find("input[autofocus]:enabled:visible:first");

        if ($el.length) {
          $el.trigger("focus");
        } else {
          self.focus(null, true);
        }
      } // Avoid jumping


      current.$slide.scrollTop(0).scrollLeft(0);
    },
    // Preload next and previous slides
    // ================================
    preload: function (type) {
      var self = this,
          prev,
          next;

      if (self.group.length < 2) {
        return;
      }

      next = self.slides[self.currPos + 1];
      prev = self.slides[self.currPos - 1];

      if (prev && prev.type === type) {
        self.loadSlide(prev);
      }

      if (next && next.type === type) {
        self.loadSlide(next);
      }
    },
    // Try to find and focus on the first focusable element
    // ====================================================
    focus: function (e, firstRun) {
      var self = this,
          focusableStr = ["a[href]", "area[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "button:not([disabled]):not([aria-hidden])", "iframe", "object", "embed", "video", "audio", "[contenteditable]", '[tabindex]:not([tabindex^="-"])'].join(","),
          focusableItems,
          focusedItemIndex;

      if (self.isClosing) {
        return;
      }

      if (e || !self.current || !self.current.isComplete) {
        // Focus on any element inside fancybox
        focusableItems = self.$refs.container.find("*:visible");
      } else {
        // Focus inside current slide
        focusableItems = self.current.$slide.find("*:visible" + (firstRun ? ":not(.fancybox-close-small)" : ""));
      }

      focusableItems = focusableItems.filter(focusableStr).filter(function () {
        return $(this).css("visibility") !== "hidden" && !$(this).hasClass("disabled");
      });

      if (focusableItems.length) {
        focusedItemIndex = focusableItems.index(document.activeElement);

        if (e && e.shiftKey) {
          // Back tab
          if (focusedItemIndex < 0 || focusedItemIndex == 0) {
            e.preventDefault();
            focusableItems.eq(focusableItems.length - 1).trigger("focus");
          }
        } else {
          // Outside or Forward tab
          if (focusedItemIndex < 0 || focusedItemIndex == focusableItems.length - 1) {
            if (e) {
              e.preventDefault();
            }

            focusableItems.eq(0).trigger("focus");
          }
        }
      } else {
        self.$refs.container.trigger("focus");
      }
    },
    // Activates current instance - brings container to the front and enables keyboard,
    // notifies other instances about deactivating
    // =================================================================================
    activate: function () {
      var self = this; // Deactivate all instances

      $(".fancybox-container").each(function () {
        var instance = $(this).data("FancyBox"); // Skip self and closing instances

        if (instance && instance.id !== self.id && !instance.isClosing) {
          instance.trigger("onDeactivate");
          instance.removeEvents();
          instance.isVisible = false;
        }
      });
      self.isVisible = true;

      if (self.current || self.isIdle) {
        self.update();
        self.updateControls();
      }

      self.trigger("onActivate");
      self.addEvents();
    },
    // Start closing procedure
    // This will start "zoom-out" animation if needed and clean everything up afterwards
    // =================================================================================
    close: function (e, d) {
      var self = this,
          current = self.current,
          effect,
          duration,
          $content,
          domRect,
          opacity,
          start,
          end;

      var done = function () {
        self.cleanUp(e);
      };

      if (self.isClosing) {
        return false;
      }

      self.isClosing = true; // If beforeClose callback prevents closing, make sure content is centered

      if (self.trigger("beforeClose", e) === false) {
        self.isClosing = false;
        requestAFrame(function () {
          self.update();
        });
        return false;
      } // Remove all events
      // If there are multiple instances, they will be set again by "activate" method


      self.removeEvents();
      $content = current.$content;
      effect = current.opts.animationEffect;
      duration = $.isNumeric(d) ? d : effect ? current.opts.animationDuration : 0;
      current.$slide.removeClass("fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated");

      if (e !== true) {
        $.fancybox.stop(current.$slide);
      } else {
        effect = false;
      } // Remove other slides


      current.$slide.siblings().trigger("onReset").remove(); // Trigger animations

      if (duration) {
        self.$refs.container.removeClass("fancybox-is-open").addClass("fancybox-is-closing").css("transition-duration", duration + "ms");
      } // Clean up


      self.hideLoading(current);
      self.hideControls(true);
      self.updateCursor(); // Check if possible to zoom-out

      if (effect === "zoom" && !($content && duration && current.type === "image" && !self.isMoved() && !current.hasError && (end = self.getThumbPos(current)))) {
        effect = "fade";
      }

      if (effect === "zoom") {
        $.fancybox.stop($content);
        domRect = $.fancybox.getTranslate($content);
        start = {
          top: domRect.top,
          left: domRect.left,
          scaleX: domRect.width / end.width,
          scaleY: domRect.height / end.height,
          width: end.width,
          height: end.height
        }; // Check if we need to animate opacity

        opacity = current.opts.zoomOpacity;

        if (opacity == "auto") {
          opacity = Math.abs(current.width / current.height - end.width / end.height) > 0.1;
        }

        if (opacity) {
          end.opacity = 0;
        }

        $.fancybox.setTranslate($content, start);
        forceRedraw($content);
        $.fancybox.animate($content, end, duration, done);
        return true;
      }

      if (effect && duration) {
        $.fancybox.animate(current.$slide.addClass("fancybox-slide--previous").removeClass("fancybox-slide--current"), "fancybox-animated fancybox-fx-" + effect, duration, done);
      } else {
        // If skip animation
        if (e === true) {
          setTimeout(done, duration);
        } else {
          done();
        }
      }

      return true;
    },
    // Final adjustments after removing the instance
    // =============================================
    cleanUp: function (e) {
      var self = this,
          instance,
          $focus = self.current.opts.$orig,
          x,
          y;
      self.current.$slide.trigger("onReset");
      self.$refs.container.empty().remove();
      self.trigger("afterClose", e); // Place back focus

      if (!!self.current.opts.backFocus) {
        if (!$focus || !$focus.length || !$focus.is(":visible")) {
          $focus = self.$trigger;
        }

        if ($focus && $focus.length) {
          x = window.scrollX;
          y = window.scrollY;
          $focus.trigger("focus");
          $("html, body").scrollTop(y).scrollLeft(x);
        }
      }

      self.current = null; // Check if there are other instances

      instance = $.fancybox.getInstance();

      if (instance) {
        instance.activate();
      } else {
        $("body").removeClass("fancybox-active compensate-for-scrollbar");
        $("#fancybox-style-noscroll").remove();
      }
    },
    // Call callback and trigger an event
    // ==================================
    trigger: function (name, slide) {
      var args = Array.prototype.slice.call(arguments, 1),
          self = this,
          obj = slide && slide.opts ? slide : self.current,
          rez;

      if (obj) {
        args.unshift(obj);
      } else {
        obj = self;
      }

      args.unshift(self);

      if ($.isFunction(obj.opts[name])) {
        rez = obj.opts[name].apply(obj, args);
      }

      if (rez === false) {
        return rez;
      }

      if (name === "afterClose" || !self.$refs) {
        $D.trigger(name + ".fb", args);
      } else {
        self.$refs.container.trigger(name + ".fb", args);
      }
    },
    // Update infobar values, navigation button states and reveal caption
    // ==================================================================
    updateControls: function () {
      var self = this,
          current = self.current,
          index = current.index,
          $container = self.$refs.container,
          $caption = self.$refs.caption,
          caption = current.opts.caption; // Recalculate content dimensions

      current.$slide.trigger("refresh"); // Set caption

      if (caption && caption.length) {
        self.$caption = $caption;
        $caption.children().eq(0).html(caption);
      } else {
        self.$caption = null;
      }

      if (!self.hasHiddenControls && !self.isIdle) {
        self.showControls();
      } // Update info and navigation elements


      $container.find("[data-fancybox-count]").html(self.group.length);
      $container.find("[data-fancybox-index]").html(index + 1);
      $container.find("[data-fancybox-prev]").prop("disabled", !current.opts.loop && index <= 0);
      $container.find("[data-fancybox-next]").prop("disabled", !current.opts.loop && index >= self.group.length - 1);

      if (current.type === "image") {
        // Re-enable buttons; update download button source
        $container.find("[data-fancybox-zoom]").show().end().find("[data-fancybox-download]").attr("href", current.opts.image.src || current.src).show();
      } else if (current.opts.toolbar) {
        $container.find("[data-fancybox-download],[data-fancybox-zoom]").hide();
      } // Make sure focus is not on disabled button/element


      if ($(document.activeElement).is(":hidden,[disabled]")) {
        self.$refs.container.trigger("focus");
      }
    },
    // Hide toolbar and caption
    // ========================
    hideControls: function (andCaption) {
      var self = this,
          arr = ["infobar", "toolbar", "nav"];

      if (andCaption || !self.current.opts.preventCaptionOverlap) {
        arr.push("caption");
      }

      this.$refs.container.removeClass(arr.map(function (i) {
        return "fancybox-show-" + i;
      }).join(" "));
      this.hasHiddenControls = true;
    },
    showControls: function () {
      var self = this,
          opts = self.current ? self.current.opts : self.opts,
          $container = self.$refs.container;
      self.hasHiddenControls = false;
      self.idleSecondsCounter = 0;
      $container.toggleClass("fancybox-show-toolbar", !!(opts.toolbar && opts.buttons)).toggleClass("fancybox-show-infobar", !!(opts.infobar && self.group.length > 1)).toggleClass("fancybox-show-caption", !!self.$caption).toggleClass("fancybox-show-nav", !!(opts.arrows && self.group.length > 1)).toggleClass("fancybox-is-modal", !!opts.modal);
    },
    // Toggle toolbar and caption
    // ==========================
    toggleControls: function () {
      if (this.hasHiddenControls) {
        this.showControls();
      } else {
        this.hideControls();
      }
    }
  });
  $.fancybox = {
    version: "3.5.7",
    defaults: defaults,
    // Get current instance and execute a command.
    //
    // Examples of usage:
    //
    //   $instance = $.fancybox.getInstance();
    //   $.fancybox.getInstance().jumpTo( 1 );
    //   $.fancybox.getInstance( 'jumpTo', 1 );
    //   $.fancybox.getInstance( function() {
    //       console.info( this.currIndex );
    //   });
    // ======================================================
    getInstance: function (command) {
      var instance = $('.fancybox-container:not(".fancybox-is-closing"):last').data("FancyBox"),
          args = Array.prototype.slice.call(arguments, 1);

      if (instance instanceof FancyBox) {
        if ($.type(command) === "string") {
          instance[command].apply(instance, args);
        } else if ($.type(command) === "function") {
          command.apply(instance, args);
        }

        return instance;
      }

      return false;
    },
    // Create new instance
    // ===================
    open: function (items, opts, index) {
      return new FancyBox(items, opts, index);
    },
    // Close current or all instances
    // ==============================
    close: function (all) {
      var instance = this.getInstance();

      if (instance) {
        instance.close(); // Try to find and close next instance

        if (all === true) {
          this.close(all);
        }
      }
    },
    // Close all instances and unbind all events
    // =========================================
    destroy: function () {
      this.close(true);
      $D.add("body").off("click.fb-start", "**");
    },
    // Try to detect mobile devices
    // ============================
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    // Detect if 'translate3d' support is available
    // ============================================
    use3d: function () {
      var div = document.createElement("div");
      return window.getComputedStyle && window.getComputedStyle(div) && window.getComputedStyle(div).getPropertyValue("transform") && !(document.documentMode && document.documentMode < 11);
    }(),
    // Helper function to get current visual state of an element
    // returns array[ top, left, horizontal-scale, vertical-scale, opacity ]
    // =====================================================================
    getTranslate: function ($el) {
      var domRect;

      if (!$el || !$el.length) {
        return false;
      }

      domRect = $el[0].getBoundingClientRect();
      return {
        top: domRect.top || 0,
        left: domRect.left || 0,
        width: domRect.width,
        height: domRect.height,
        opacity: parseFloat($el.css("opacity"))
      };
    },
    // Shortcut for setting "translate3d" properties for element
    // Can set be used to set opacity, too
    // ========================================================
    setTranslate: function ($el, props) {
      var str = "",
          css = {};

      if (!$el || !props) {
        return;
      }

      if (props.left !== undefined$1 || props.top !== undefined$1) {
        str = (props.left === undefined$1 ? $el.position().left : props.left) + "px, " + (props.top === undefined$1 ? $el.position().top : props.top) + "px";

        if (this.use3d) {
          str = "translate3d(" + str + ", 0px)";
        } else {
          str = "translate(" + str + ")";
        }
      }

      if (props.scaleX !== undefined$1 && props.scaleY !== undefined$1) {
        str += " scale(" + props.scaleX + ", " + props.scaleY + ")";
      } else if (props.scaleX !== undefined$1) {
        str += " scaleX(" + props.scaleX + ")";
      }

      if (str.length) {
        css.transform = str;
      }

      if (props.opacity !== undefined$1) {
        css.opacity = props.opacity;
      }

      if (props.width !== undefined$1) {
        css.width = props.width;
      }

      if (props.height !== undefined$1) {
        css.height = props.height;
      }

      return $el.css(css);
    },
    // Simple CSS transition handler
    // =============================
    animate: function ($el, to, duration, callback, leaveAnimationName) {
      var self = this,
          from;

      if ($.isFunction(duration)) {
        callback = duration;
        duration = null;
      }

      self.stop($el);
      from = self.getTranslate($el);
      $el.on(transitionEnd, function (e) {
        // Skip events from child elements and z-index change
        if (e && e.originalEvent && (!$el.is(e.originalEvent.target) || e.originalEvent.propertyName == "z-index")) {
          return;
        }

        self.stop($el);

        if ($.isNumeric(duration)) {
          $el.css("transition-duration", "");
        }

        if ($.isPlainObject(to)) {
          if (to.scaleX !== undefined$1 && to.scaleY !== undefined$1) {
            self.setTranslate($el, {
              top: to.top,
              left: to.left,
              width: from.width * to.scaleX,
              height: from.height * to.scaleY,
              scaleX: 1,
              scaleY: 1
            });
          }
        } else if (leaveAnimationName !== true) {
          $el.removeClass(to);
        }

        if ($.isFunction(callback)) {
          callback(e);
        }
      });

      if ($.isNumeric(duration)) {
        $el.css("transition-duration", duration + "ms");
      } // Start animation by changing CSS properties or class name


      if ($.isPlainObject(to)) {
        if (to.scaleX !== undefined$1 && to.scaleY !== undefined$1) {
          delete to.width;
          delete to.height;

          if ($el.parent().hasClass("fancybox-slide--image")) {
            $el.parent().addClass("fancybox-is-scaling");
          }
        }

        $.fancybox.setTranslate($el, to);
      } else {
        $el.addClass(to);
      } // Make sure that `transitionend` callback gets fired


      $el.data("timer", setTimeout(function () {
        $el.trigger(transitionEnd);
      }, duration + 33));
    },
    stop: function ($el, callCallback) {
      if ($el && $el.length) {
        clearTimeout($el.data("timer"));

        if (callCallback) {
          $el.trigger(transitionEnd);
        }

        $el.off(transitionEnd).css("transition-duration", "");
        $el.parent().removeClass("fancybox-is-scaling");
      }
    }
  }; // Default click handler for "fancyboxed" links
  // ============================================

  function _run(e, opts) {
    var items = [],
        index = 0,
        $target,
        value,
        instance; // Avoid opening multiple times

    if (e && e.isDefaultPrevented()) {
      return;
    }

    e.preventDefault();
    opts = opts || {};

    if (e && e.data) {
      opts = mergeOpts(e.data.options, opts);
    }

    $target = opts.$target || $(e.currentTarget).trigger("blur");
    instance = $.fancybox.getInstance();

    if (instance && instance.$trigger && instance.$trigger.is($target)) {
      return;
    }

    if (opts.selector) {
      items = $(opts.selector);
    } else {
      // Get all related items and find index for clicked one
      value = $target.attr("data-fancybox") || "";

      if (value) {
        items = e.data ? e.data.items : [];
        items = items.length ? items.filter('[data-fancybox="' + value + '"]') : $('[data-fancybox="' + value + '"]');
      } else {
        items = [$target];
      }
    }

    index = $(items).index($target); // Sometimes current item can not be found

    if (index < 0) {
      index = 0;
    }

    instance = $.fancybox.open(items, opts, index); // Save last active element

    instance.$trigger = $target;
  } // Create a jQuery plugin
  // ======================


  $.fn.fancybox = function (options) {
    var selector;
    options = options || {};
    selector = options.selector || false;

    if (selector) {
      // Use body element instead of document so it executes first
      $("body").off("click.fb-start", selector).on("click.fb-start", selector, {
        options: options
      }, _run);
    } else {
      this.off("click.fb-start").on("click.fb-start", {
        items: this,
        options: options
      }, _run);
    }

    return this;
  }; // Self initializing plugin for all elements having `data-fancybox` attribute
  // ==========================================================================


  $D.on("click.fb-start", "[data-fancybox]", _run); // Enable "trigger elements"
  // =========================

  $D.on("click.fb-start", "[data-fancybox-trigger]", function (e) {
    $('[data-fancybox="' + $(this).attr("data-fancybox-trigger") + '"]').eq($(this).attr("data-fancybox-index") || 0).trigger("click.fb-start", {
      $trigger: $(this)
    });
  }); // Track focus event for better accessibility styling
  // ==================================================

  (function () {
    var buttonStr = ".fancybox-button",
        focusStr = "fancybox-focus",
        $pressed = null;
    $D.on("mousedown mouseup focus blur", buttonStr, function (e) {
      switch (e.type) {
        case "mousedown":
          $pressed = $(this);
          break;

        case "mouseup":
          $pressed = null;
          break;

        case "focusin":
          $(buttonStr).removeClass(focusStr);

          if (!$(this).is($pressed) && !$(this).is("[disabled]")) {
            $(this).addClass(focusStr);
          }

          break;

        case "focusout":
          $(buttonStr).removeClass(focusStr);
          break;
      }
    });
  })();
})(window, document, jQuery); // ==========================================================================
//
// Media
// Adds additional media type support
//
// ==========================================================================


(function ($) {

  var defaults = {
    youtube: {
      matcher: /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,
      params: {
        autoplay: 1,
        autohide: 1,
        fs: 1,
        rel: 0,
        hd: 1,
        wmode: "transparent",
        enablejsapi: 1,
        html5: 1
      },
      paramPlace: 8,
      type: "iframe",
      url: "https://www.youtube-nocookie.com/embed/$4",
      thumb: "https://img.youtube.com/vi/$4/hqdefault.jpg"
    },
    vimeo: {
      matcher: /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,
      params: {
        autoplay: 1,
        hd: 1,
        show_title: 1,
        show_byline: 1,
        show_portrait: 0,
        fullscreen: 1
      },
      paramPlace: 3,
      type: "iframe",
      url: "//player.vimeo.com/video/$2"
    },
    instagram: {
      matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
      type: "image",
      url: "//$1/p/$2/media/?size=l"
    },
    // Examples:
    // http://maps.google.com/?ll=48.857995,2.294297&spn=0.007666,0.021136&t=m&z=16
    // https://www.google.com/maps/@37.7852006,-122.4146355,14.65z
    // https://www.google.com/maps/@52.2111123,2.9237542,6.61z?hl=en
    // https://www.google.com/maps/place/Googleplex/@37.4220041,-122.0833494,17z/data=!4m5!3m4!1s0x0:0x6c296c66619367e0!8m2!3d37.4219998!4d-122.0840572
    gmap_place: {
      matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,
      type: "iframe",
      url: function (rez) {
        return "//maps.google." + rez[2] + "/?ll=" + (rez[9] ? rez[9] + "&z=" + Math.floor(rez[10]) + (rez[12] ? rez[12].replace(/^\//, "&") : "") : rez[12] + "").replace(/\?/, "&") + "&output=" + (rez[12] && rez[12].indexOf("layer=c") > 0 ? "svembed" : "embed");
      }
    },
    // Examples:
    // https://www.google.com/maps/search/Empire+State+Building/
    // https://www.google.com/maps/search/?api=1&query=centurylink+field
    // https://www.google.com/maps/search/?api=1&query=47.5951518,-122.3316393
    gmap_search: {
      matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,
      type: "iframe",
      url: function (rez) {
        return "//maps.google." + rez[2] + "/maps?q=" + rez[5].replace("query=", "q=").replace("api=1", "") + "&output=embed";
      }
    }
  }; // Formats matching url to final form

  var format = function (url, rez, params) {
    if (!url) {
      return;
    }

    params = params || "";

    if ($.type(params) === "object") {
      params = $.param(params, true);
    }

    $.each(rez, function (key, value) {
      url = url.replace("$" + key, value || "");
    });

    if (params.length) {
      url += (url.indexOf("?") > 0 ? "&" : "?") + params;
    }

    return url;
  };

  $(document).on("objectNeedsType.fb", function (e, instance, item) {
    var url = item.src || "",
        type = false,
        media,
        thumb,
        rez,
        params,
        urlParams,
        paramObj,
        provider;
    media = $.extend(true, {}, defaults, item.opts.media); // Look for any matching media type

    $.each(media, function (providerName, providerOpts) {
      rez = url.match(providerOpts.matcher);

      if (!rez) {
        return;
      }

      type = providerOpts.type;
      provider = providerName;
      paramObj = {};

      if (providerOpts.paramPlace && rez[providerOpts.paramPlace]) {
        urlParams = rez[providerOpts.paramPlace];

        if (urlParams[0] == "?") {
          urlParams = urlParams.substring(1);
        }

        urlParams = urlParams.split("&");

        for (var m = 0; m < urlParams.length; ++m) {
          var p = urlParams[m].split("=", 2);

          if (p.length == 2) {
            paramObj[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
          }
        }
      }

      params = $.extend(true, {}, providerOpts.params, item.opts[providerName], paramObj);
      url = $.type(providerOpts.url) === "function" ? providerOpts.url.call(this, rez, params, item) : format(providerOpts.url, rez, params);
      thumb = $.type(providerOpts.thumb) === "function" ? providerOpts.thumb.call(this, rez, params, item) : format(providerOpts.thumb, rez);

      if (providerName === "youtube") {
        url = url.replace(/&t=((\d+)m)?(\d+)s/, function (match, p1, m, s) {
          return "&start=" + ((m ? parseInt(m, 10) * 60 : 0) + parseInt(s, 10));
        });
      } else if (providerName === "vimeo") {
        url = url.replace("&%23", "#");
      }

      return false;
    }); // If it is found, then change content type and update the url

    if (type) {
      if (!item.opts.thumb && !(item.opts.$thumb && item.opts.$thumb.length)) {
        item.opts.thumb = thumb;
      }

      if (type === "iframe") {
        item.opts = $.extend(true, item.opts, {
          iframe: {
            preload: false,
            attr: {
              scrolling: "no"
            }
          }
        });
      }

      $.extend(item, {
        type: type,
        src: url,
        origSrc: item.src,
        contentSource: provider,
        contentType: type === "image" ? "image" : provider == "gmap_place" || provider == "gmap_search" ? "map" : "video"
      });
    } else if (url) {
      item.type = item.opts.defaultType;
    }
  }); // Load YouTube/Video API on request to detect when video finished playing

  var VideoAPILoader = {
    youtube: {
      src: "https://www.youtube.com/iframe_api",
      class: "YT",
      loading: false,
      loaded: false
    },
    vimeo: {
      src: "https://player.vimeo.com/api/player.js",
      class: "Vimeo",
      loading: false,
      loaded: false
    },
    load: function (vendor) {
      var _this = this,
          script;

      if (this[vendor].loaded) {
        setTimeout(function () {
          _this.done(vendor);
        });
        return;
      }

      if (this[vendor].loading) {
        return;
      }

      this[vendor].loading = true;
      script = document.createElement("script");
      script.type = "text/javascript";
      script.src = this[vendor].src;

      if (vendor === "youtube") {
        window.onYouTubeIframeAPIReady = function () {
          _this[vendor].loaded = true;

          _this.done(vendor);
        };
      } else {
        script.onload = function () {
          _this[vendor].loaded = true;

          _this.done(vendor);
        };
      }

      document.body.appendChild(script);
    },
    done: function (vendor) {
      var instance, $el, player;

      if (vendor === "youtube") {
        delete window.onYouTubeIframeAPIReady;
      }

      instance = $.fancybox.getInstance();

      if (instance) {
        $el = instance.current.$content.find("iframe");

        if (vendor === "youtube" && YT !== undefined && YT) {
          player = new YT.Player($el.attr("id"), {
            events: {
              onStateChange: function (e) {
                if (e.data == 0) {
                  instance.next();
                }
              }
            }
          });
        } else if (vendor === "vimeo" && Vimeo !== undefined && Vimeo) {
          player = new Vimeo.Player($el);
          player.on("ended", function () {
            instance.next();
          });
        }
      }
    }
  };
  $(document).on({
    "afterShow.fb": function (e, instance, current) {
      if (instance.group.length > 1 && (current.contentSource === "youtube" || current.contentSource === "vimeo")) {
        VideoAPILoader.load(current.contentSource);
      }
    }
  });
})(jQuery); // ==========================================================================
//
// Guestures
// Adds touch guestures, handles click and tap events
//
// ==========================================================================


(function (window, document, $) {

  var requestAFrame = function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || // if all else fails, use setTimeout
    function (callback) {
      return window.setTimeout(callback, 1000 / 60);
    };
  }();

  var cancelAFrame = function () {
    return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || function (id) {
      window.clearTimeout(id);
    };
  }();

  var getPointerXY = function (e) {
    var result = [];
    e = e.originalEvent || e || window.e;
    e = e.touches && e.touches.length ? e.touches : e.changedTouches && e.changedTouches.length ? e.changedTouches : [e];

    for (var key in e) {
      if (e[key].pageX) {
        result.push({
          x: e[key].pageX,
          y: e[key].pageY
        });
      } else if (e[key].clientX) {
        result.push({
          x: e[key].clientX,
          y: e[key].clientY
        });
      }
    }

    return result;
  };

  var distance = function (point2, point1, what) {
    if (!point1 || !point2) {
      return 0;
    }

    if (what === "x") {
      return point2.x - point1.x;
    } else if (what === "y") {
      return point2.y - point1.y;
    }

    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
  };

  var isClickable = function ($el) {
    if ($el.is('a,area,button,[role="button"],input,label,select,summary,textarea,video,audio,iframe') || $.isFunction($el.get(0).onclick) || $el.data("selectable")) {
      return true;
    } // Check for attributes like data-fancybox-next or data-fancybox-close


    for (var i = 0, atts = $el[0].attributes, n = atts.length; i < n; i++) {
      if (atts[i].nodeName.substr(0, 14) === "data-fancybox-") {
        return true;
      }
    }

    return false;
  };

  var hasScrollbars = function (el) {
    var overflowY = window.getComputedStyle(el)["overflow-y"],
        overflowX = window.getComputedStyle(el)["overflow-x"],
        vertical = (overflowY === "scroll" || overflowY === "auto") && el.scrollHeight > el.clientHeight,
        horizontal = (overflowX === "scroll" || overflowX === "auto") && el.scrollWidth > el.clientWidth;
    return vertical || horizontal;
  };

  var isScrollable = function ($el) {
    var rez = false;

    while (true) {
      rez = hasScrollbars($el.get(0));

      if (rez) {
        break;
      }

      $el = $el.parent();

      if (!$el.length || $el.hasClass("fancybox-stage") || $el.is("body")) {
        break;
      }
    }

    return rez;
  };

  var Guestures = function (instance) {
    var self = this;
    self.instance = instance;
    self.$bg = instance.$refs.bg;
    self.$stage = instance.$refs.stage;
    self.$container = instance.$refs.container;
    self.destroy();
    self.$container.on("touchstart.fb.touch mousedown.fb.touch", $.proxy(self, "ontouchstart"));
  };

  Guestures.prototype.destroy = function () {
    var self = this;
    self.$container.off(".fb.touch");
    $(document).off(".fb.touch");

    if (self.requestId) {
      cancelAFrame(self.requestId);
      self.requestId = null;
    }

    if (self.tapped) {
      clearTimeout(self.tapped);
      self.tapped = null;
    }
  };

  Guestures.prototype.ontouchstart = function (e) {
    var self = this,
        $target = $(e.target),
        instance = self.instance,
        current = instance.current,
        $slide = current.$slide,
        $content = current.$content,
        isTouchDevice = e.type == "touchstart"; // Do not respond to both (touch and mouse) events

    if (isTouchDevice) {
      self.$container.off("mousedown.fb.touch");
    } // Ignore right click


    if (e.originalEvent && e.originalEvent.button == 2) {
      return;
    } // Ignore taping on links, buttons, input elements


    if (!$slide.length || !$target.length || isClickable($target) || isClickable($target.parent())) {
      return;
    } // Ignore clicks on the scrollbar


    if (!$target.is("img") && e.originalEvent.clientX > $target[0].clientWidth + $target.offset().left) {
      return;
    } // Ignore clicks while zooming or closing


    if (!current || instance.isAnimating || current.$slide.hasClass("fancybox-animated")) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }

    self.realPoints = self.startPoints = getPointerXY(e);

    if (!self.startPoints.length) {
      return;
    } // Allow other scripts to catch touch event if "touch" is set to false


    if (current.touch) {
      e.stopPropagation();
    }

    self.startEvent = e;
    self.canTap = true;
    self.$target = $target;
    self.$content = $content;
    self.opts = current.opts.touch;
    self.isPanning = false;
    self.isSwiping = false;
    self.isZooming = false;
    self.isScrolling = false;
    self.canPan = instance.canPan();
    self.startTime = new Date().getTime();
    self.distanceX = self.distanceY = self.distance = 0;
    self.canvasWidth = Math.round($slide[0].clientWidth);
    self.canvasHeight = Math.round($slide[0].clientHeight);
    self.contentLastPos = null;
    self.contentStartPos = $.fancybox.getTranslate(self.$content) || {
      top: 0,
      left: 0
    };
    self.sliderStartPos = $.fancybox.getTranslate($slide); // Since position will be absolute, but we need to make it relative to the stage

    self.stagePos = $.fancybox.getTranslate(instance.$refs.stage);
    self.sliderStartPos.top -= self.stagePos.top;
    self.sliderStartPos.left -= self.stagePos.left;
    self.contentStartPos.top -= self.stagePos.top;
    self.contentStartPos.left -= self.stagePos.left;
    $(document).off(".fb.touch").on(isTouchDevice ? "touchend.fb.touch touchcancel.fb.touch" : "mouseup.fb.touch mouseleave.fb.touch", $.proxy(self, "ontouchend")).on(isTouchDevice ? "touchmove.fb.touch" : "mousemove.fb.touch", $.proxy(self, "ontouchmove"));

    if ($.fancybox.isMobile) {
      document.addEventListener("scroll", self.onscroll, true);
    } // Skip if clicked outside the sliding area


    if (!(self.opts || self.canPan) || !($target.is(self.$stage) || self.$stage.find($target).length)) {
      if ($target.is(".fancybox-image")) {
        e.preventDefault();
      }

      if (!($.fancybox.isMobile && $target.parents(".fancybox-caption").length)) {
        return;
      }
    }

    self.isScrollable = isScrollable($target) || isScrollable($target.parent()); // Check if element is scrollable and try to prevent default behavior (scrolling)

    if (!($.fancybox.isMobile && self.isScrollable)) {
      e.preventDefault();
    } // One finger or mouse click - swipe or pan an image


    if (self.startPoints.length === 1 || current.hasError) {
      if (self.canPan) {
        $.fancybox.stop(self.$content);
        self.isPanning = true;
      } else {
        self.isSwiping = true;
      }

      self.$container.addClass("fancybox-is-grabbing");
    } // Two fingers - zoom image


    if (self.startPoints.length === 2 && current.type === "image" && (current.isLoaded || current.$ghost)) {
      self.canTap = false;
      self.isSwiping = false;
      self.isPanning = false;
      self.isZooming = true;
      $.fancybox.stop(self.$content);
      self.centerPointStartX = (self.startPoints[0].x + self.startPoints[1].x) * 0.5 - $(window).scrollLeft();
      self.centerPointStartY = (self.startPoints[0].y + self.startPoints[1].y) * 0.5 - $(window).scrollTop();
      self.percentageOfImageAtPinchPointX = (self.centerPointStartX - self.contentStartPos.left) / self.contentStartPos.width;
      self.percentageOfImageAtPinchPointY = (self.centerPointStartY - self.contentStartPos.top) / self.contentStartPos.height;
      self.startDistanceBetweenFingers = distance(self.startPoints[0], self.startPoints[1]);
    }
  };

  Guestures.prototype.onscroll = function (e) {
    var self = this;
    self.isScrolling = true;
    document.removeEventListener("scroll", self.onscroll, true);
  };

  Guestures.prototype.ontouchmove = function (e) {
    var self = this; // Make sure user has not released over iframe or disabled element

    if (e.originalEvent.buttons !== undefined && e.originalEvent.buttons === 0) {
      self.ontouchend(e);
      return;
    }

    if (self.isScrolling) {
      self.canTap = false;
      return;
    }

    self.newPoints = getPointerXY(e);

    if (!(self.opts || self.canPan) || !self.newPoints.length || !self.newPoints.length) {
      return;
    }

    if (!(self.isSwiping && self.isSwiping === true)) {
      e.preventDefault();
    }

    self.distanceX = distance(self.newPoints[0], self.startPoints[0], "x");
    self.distanceY = distance(self.newPoints[0], self.startPoints[0], "y");
    self.distance = distance(self.newPoints[0], self.startPoints[0]); // Skip false ontouchmove events (Chrome)

    if (self.distance > 0) {
      if (self.isSwiping) {
        self.onSwipe(e);
      } else if (self.isPanning) {
        self.onPan();
      } else if (self.isZooming) {
        self.onZoom();
      }
    }
  };

  Guestures.prototype.onSwipe = function (e) {
    var self = this,
        instance = self.instance,
        swiping = self.isSwiping,
        left = self.sliderStartPos.left || 0,
        angle; // If direction is not yet determined

    if (swiping === true) {
      // We need at least 10px distance to correctly calculate an angle
      if (Math.abs(self.distance) > 10) {
        self.canTap = false;

        if (instance.group.length < 2 && self.opts.vertical) {
          self.isSwiping = "y";
        } else if (instance.isDragging || self.opts.vertical === false || self.opts.vertical === "auto" && $(window).width() > 800) {
          self.isSwiping = "x";
        } else {
          angle = Math.abs(Math.atan2(self.distanceY, self.distanceX) * 180 / Math.PI);
          self.isSwiping = angle > 45 && angle < 135 ? "y" : "x";
        }

        if (self.isSwiping === "y" && $.fancybox.isMobile && self.isScrollable) {
          self.isScrolling = true;
          return;
        }

        instance.isDragging = self.isSwiping; // Reset points to avoid jumping, because we dropped first swipes to calculate the angle

        self.startPoints = self.newPoints;
        $.each(instance.slides, function (index, slide) {
          var slidePos, stagePos;
          $.fancybox.stop(slide.$slide);
          slidePos = $.fancybox.getTranslate(slide.$slide);
          stagePos = $.fancybox.getTranslate(instance.$refs.stage);
          slide.$slide.css({
            transform: "",
            opacity: "",
            "transition-duration": ""
          }).removeClass("fancybox-animated").removeClass(function (index, className) {
            return (className.match(/(^|\s)fancybox-fx-\S+/g) || []).join(" ");
          });

          if (slide.pos === instance.current.pos) {
            self.sliderStartPos.top = slidePos.top - stagePos.top;
            self.sliderStartPos.left = slidePos.left - stagePos.left;
          }

          $.fancybox.setTranslate(slide.$slide, {
            top: slidePos.top - stagePos.top,
            left: slidePos.left - stagePos.left
          });
        }); // Stop slideshow

        if (instance.SlideShow && instance.SlideShow.isActive) {
          instance.SlideShow.stop();
        }
      }

      return;
    } // Sticky edges


    if (swiping == "x") {
      if (self.distanceX > 0 && (self.instance.group.length < 2 || self.instance.current.index === 0 && !self.instance.current.opts.loop)) {
        left = left + Math.pow(self.distanceX, 0.8);
      } else if (self.distanceX < 0 && (self.instance.group.length < 2 || self.instance.current.index === self.instance.group.length - 1 && !self.instance.current.opts.loop)) {
        left = left - Math.pow(-self.distanceX, 0.8);
      } else {
        left = left + self.distanceX;
      }
    }

    self.sliderLastPos = {
      top: swiping == "x" ? 0 : self.sliderStartPos.top + self.distanceY,
      left: left
    };

    if (self.requestId) {
      cancelAFrame(self.requestId);
      self.requestId = null;
    }

    self.requestId = requestAFrame(function () {
      if (self.sliderLastPos) {
        $.each(self.instance.slides, function (index, slide) {
          var pos = slide.pos - self.instance.currPos;
          $.fancybox.setTranslate(slide.$slide, {
            top: self.sliderLastPos.top,
            left: self.sliderLastPos.left + pos * self.canvasWidth + pos * slide.opts.gutter
          });
        });
        self.$container.addClass("fancybox-is-sliding");
      }
    });
  };

  Guestures.prototype.onPan = function () {
    var self = this; // Prevent accidental movement (sometimes, when tapping casually, finger can move a bit)

    if (distance(self.newPoints[0], self.realPoints[0]) < ($.fancybox.isMobile ? 10 : 5)) {
      self.startPoints = self.newPoints;
      return;
    }

    self.canTap = false;
    self.contentLastPos = self.limitMovement();

    if (self.requestId) {
      cancelAFrame(self.requestId);
    }

    self.requestId = requestAFrame(function () {
      $.fancybox.setTranslate(self.$content, self.contentLastPos);
    });
  }; // Make panning sticky to the edges


  Guestures.prototype.limitMovement = function () {
    var self = this;
    var canvasWidth = self.canvasWidth;
    var canvasHeight = self.canvasHeight;
    var distanceX = self.distanceX;
    var distanceY = self.distanceY;
    var contentStartPos = self.contentStartPos;
    var currentOffsetX = contentStartPos.left;
    var currentOffsetY = contentStartPos.top;
    var currentWidth = contentStartPos.width;
    var currentHeight = contentStartPos.height;
    var minTranslateX, minTranslateY, maxTranslateX, maxTranslateY, newOffsetX, newOffsetY;

    if (currentWidth > canvasWidth) {
      newOffsetX = currentOffsetX + distanceX;
    } else {
      newOffsetX = currentOffsetX;
    }

    newOffsetY = currentOffsetY + distanceY; // Slow down proportionally to traveled distance

    minTranslateX = Math.max(0, canvasWidth * 0.5 - currentWidth * 0.5);
    minTranslateY = Math.max(0, canvasHeight * 0.5 - currentHeight * 0.5);
    maxTranslateX = Math.min(canvasWidth - currentWidth, canvasWidth * 0.5 - currentWidth * 0.5);
    maxTranslateY = Math.min(canvasHeight - currentHeight, canvasHeight * 0.5 - currentHeight * 0.5); //   ->

    if (distanceX > 0 && newOffsetX > minTranslateX) {
      newOffsetX = minTranslateX - 1 + Math.pow(-minTranslateX + currentOffsetX + distanceX, 0.8) || 0;
    } //    <-


    if (distanceX < 0 && newOffsetX < maxTranslateX) {
      newOffsetX = maxTranslateX + 1 - Math.pow(maxTranslateX - currentOffsetX - distanceX, 0.8) || 0;
    } //   \/


    if (distanceY > 0 && newOffsetY > minTranslateY) {
      newOffsetY = minTranslateY - 1 + Math.pow(-minTranslateY + currentOffsetY + distanceY, 0.8) || 0;
    } //   /\


    if (distanceY < 0 && newOffsetY < maxTranslateY) {
      newOffsetY = maxTranslateY + 1 - Math.pow(maxTranslateY - currentOffsetY - distanceY, 0.8) || 0;
    }

    return {
      top: newOffsetY,
      left: newOffsetX
    };
  };

  Guestures.prototype.limitPosition = function (newOffsetX, newOffsetY, newWidth, newHeight) {
    var self = this;
    var canvasWidth = self.canvasWidth;
    var canvasHeight = self.canvasHeight;

    if (newWidth > canvasWidth) {
      newOffsetX = newOffsetX > 0 ? 0 : newOffsetX;
      newOffsetX = newOffsetX < canvasWidth - newWidth ? canvasWidth - newWidth : newOffsetX;
    } else {
      // Center horizontally
      newOffsetX = Math.max(0, canvasWidth / 2 - newWidth / 2);
    }

    if (newHeight > canvasHeight) {
      newOffsetY = newOffsetY > 0 ? 0 : newOffsetY;
      newOffsetY = newOffsetY < canvasHeight - newHeight ? canvasHeight - newHeight : newOffsetY;
    } else {
      // Center vertically
      newOffsetY = Math.max(0, canvasHeight / 2 - newHeight / 2);
    }

    return {
      top: newOffsetY,
      left: newOffsetX
    };
  };

  Guestures.prototype.onZoom = function () {
    var self = this; // Calculate current distance between points to get pinch ratio and new width and height

    var contentStartPos = self.contentStartPos;
    var currentWidth = contentStartPos.width;
    var currentHeight = contentStartPos.height;
    var currentOffsetX = contentStartPos.left;
    var currentOffsetY = contentStartPos.top;
    var endDistanceBetweenFingers = distance(self.newPoints[0], self.newPoints[1]);
    var pinchRatio = endDistanceBetweenFingers / self.startDistanceBetweenFingers;
    var newWidth = Math.floor(currentWidth * pinchRatio);
    var newHeight = Math.floor(currentHeight * pinchRatio); // This is the translation due to pinch-zooming

    var translateFromZoomingX = (currentWidth - newWidth) * self.percentageOfImageAtPinchPointX;
    var translateFromZoomingY = (currentHeight - newHeight) * self.percentageOfImageAtPinchPointY; // Point between the two touches

    var centerPointEndX = (self.newPoints[0].x + self.newPoints[1].x) / 2 - $(window).scrollLeft();
    var centerPointEndY = (self.newPoints[0].y + self.newPoints[1].y) / 2 - $(window).scrollTop(); // And this is the translation due to translation of the centerpoint
    // between the two fingers

    var translateFromTranslatingX = centerPointEndX - self.centerPointStartX;
    var translateFromTranslatingY = centerPointEndY - self.centerPointStartY; // The new offset is the old/current one plus the total translation

    var newOffsetX = currentOffsetX + (translateFromZoomingX + translateFromTranslatingX);
    var newOffsetY = currentOffsetY + (translateFromZoomingY + translateFromTranslatingY);
    var newPos = {
      top: newOffsetY,
      left: newOffsetX,
      scaleX: pinchRatio,
      scaleY: pinchRatio
    };
    self.canTap = false;
    self.newWidth = newWidth;
    self.newHeight = newHeight;
    self.contentLastPos = newPos;

    if (self.requestId) {
      cancelAFrame(self.requestId);
    }

    self.requestId = requestAFrame(function () {
      $.fancybox.setTranslate(self.$content, self.contentLastPos);
    });
  };

  Guestures.prototype.ontouchend = function (e) {
    var self = this;
    var swiping = self.isSwiping;
    var panning = self.isPanning;
    var zooming = self.isZooming;
    var scrolling = self.isScrolling;
    self.endPoints = getPointerXY(e);
    self.dMs = Math.max(new Date().getTime() - self.startTime, 1);
    self.$container.removeClass("fancybox-is-grabbing");
    $(document).off(".fb.touch");
    document.removeEventListener("scroll", self.onscroll, true);

    if (self.requestId) {
      cancelAFrame(self.requestId);
      self.requestId = null;
    }

    self.isSwiping = false;
    self.isPanning = false;
    self.isZooming = false;
    self.isScrolling = false;
    self.instance.isDragging = false;

    if (self.canTap) {
      return self.onTap(e);
    }

    self.speed = 100; // Speed in px/ms

    self.velocityX = self.distanceX / self.dMs * 0.5;
    self.velocityY = self.distanceY / self.dMs * 0.5;

    if (panning) {
      self.endPanning();
    } else if (zooming) {
      self.endZooming();
    } else {
      self.endSwiping(swiping, scrolling);
    }

    return;
  };

  Guestures.prototype.endSwiping = function (swiping, scrolling) {
    var self = this,
        ret = false,
        len = self.instance.group.length,
        distanceX = Math.abs(self.distanceX),
        canAdvance = swiping == "x" && len > 1 && (self.dMs > 130 && distanceX > 10 || distanceX > 50),
        speedX = 300;
    self.sliderLastPos = null; // Close if swiped vertically / navigate if horizontally

    if (swiping == "y" && !scrolling && Math.abs(self.distanceY) > 50) {
      // Continue vertical movement
      $.fancybox.animate(self.instance.current.$slide, {
        top: self.sliderStartPos.top + self.distanceY + self.velocityY * 150,
        opacity: 0
      }, 200);
      ret = self.instance.close(true, 250);
    } else if (canAdvance && self.distanceX > 0) {
      ret = self.instance.previous(speedX);
    } else if (canAdvance && self.distanceX < 0) {
      ret = self.instance.next(speedX);
    }

    if (ret === false && (swiping == "x" || swiping == "y")) {
      self.instance.centerSlide(200);
    }

    self.$container.removeClass("fancybox-is-sliding");
  }; // Limit panning from edges
  // ========================


  Guestures.prototype.endPanning = function () {
    var self = this,
        newOffsetX,
        newOffsetY,
        newPos;

    if (!self.contentLastPos) {
      return;
    }

    if (self.opts.momentum === false || self.dMs > 350) {
      newOffsetX = self.contentLastPos.left;
      newOffsetY = self.contentLastPos.top;
    } else {
      // Continue movement
      newOffsetX = self.contentLastPos.left + self.velocityX * 500;
      newOffsetY = self.contentLastPos.top + self.velocityY * 500;
    }

    newPos = self.limitPosition(newOffsetX, newOffsetY, self.contentStartPos.width, self.contentStartPos.height);
    newPos.width = self.contentStartPos.width;
    newPos.height = self.contentStartPos.height;
    $.fancybox.animate(self.$content, newPos, 366);
  };

  Guestures.prototype.endZooming = function () {
    var self = this;
    var current = self.instance.current;
    var newOffsetX, newOffsetY, newPos, reset;
    var newWidth = self.newWidth;
    var newHeight = self.newHeight;

    if (!self.contentLastPos) {
      return;
    }

    newOffsetX = self.contentLastPos.left;
    newOffsetY = self.contentLastPos.top;
    reset = {
      top: newOffsetY,
      left: newOffsetX,
      width: newWidth,
      height: newHeight,
      scaleX: 1,
      scaleY: 1
    }; // Reset scalex/scaleY values; this helps for perfomance and does not break animation

    $.fancybox.setTranslate(self.$content, reset);

    if (newWidth < self.canvasWidth && newHeight < self.canvasHeight) {
      self.instance.scaleToFit(150);
    } else if (newWidth > current.width || newHeight > current.height) {
      self.instance.scaleToActual(self.centerPointStartX, self.centerPointStartY, 150);
    } else {
      newPos = self.limitPosition(newOffsetX, newOffsetY, newWidth, newHeight);
      $.fancybox.animate(self.$content, newPos, 150);
    }
  };

  Guestures.prototype.onTap = function (e) {
    var self = this;
    var $target = $(e.target);
    var instance = self.instance;
    var current = instance.current;
    var endPoints = e && getPointerXY(e) || self.startPoints;
    var tapX = endPoints[0] ? endPoints[0].x - $(window).scrollLeft() - self.stagePos.left : 0;
    var tapY = endPoints[0] ? endPoints[0].y - $(window).scrollTop() - self.stagePos.top : 0;
    var where;

    var process = function (prefix) {
      var action = current.opts[prefix];

      if ($.isFunction(action)) {
        action = action.apply(instance, [current, e]);
      }

      if (!action) {
        return;
      }

      switch (action) {
        case "close":
          instance.close(self.startEvent);
          break;

        case "toggleControls":
          instance.toggleControls();
          break;

        case "next":
          instance.next();
          break;

        case "nextOrClose":
          if (instance.group.length > 1) {
            instance.next();
          } else {
            instance.close(self.startEvent);
          }

          break;

        case "zoom":
          if (current.type == "image" && (current.isLoaded || current.$ghost)) {
            if (instance.canPan()) {
              instance.scaleToFit();
            } else if (instance.isScaledDown()) {
              instance.scaleToActual(tapX, tapY);
            } else if (instance.group.length < 2) {
              instance.close(self.startEvent);
            }
          }

          break;
      }
    }; // Ignore right click


    if (e.originalEvent && e.originalEvent.button == 2) {
      return;
    } // Skip if clicked on the scrollbar


    if (!$target.is("img") && tapX > $target[0].clientWidth + $target.offset().left) {
      return;
    } // Check where is clicked


    if ($target.is(".fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container")) {
      where = "Outside";
    } else if ($target.is(".fancybox-slide")) {
      where = "Slide";
    } else if (instance.current.$content && instance.current.$content.find($target).addBack().filter($target).length) {
      where = "Content";
    } else {
      return;
    } // Check if this is a double tap


    if (self.tapped) {
      // Stop previously created single tap
      clearTimeout(self.tapped);
      self.tapped = null; // Skip if distance between taps is too big

      if (Math.abs(tapX - self.tapX) > 50 || Math.abs(tapY - self.tapY) > 50) {
        return this;
      } // OK, now we assume that this is a double-tap


      process("dblclick" + where);
    } else {
      // Single tap will be processed if user has not clicked second time within 300ms
      // or there is no need to wait for double-tap
      self.tapX = tapX;
      self.tapY = tapY;

      if (current.opts["dblclick" + where] && current.opts["dblclick" + where] !== current.opts["click" + where]) {
        self.tapped = setTimeout(function () {
          self.tapped = null;

          if (!instance.isAnimating) {
            process("click" + where);
          }
        }, 500);
      } else {
        process("click" + where);
      }
    }

    return this;
  };

  $(document).on("onActivate.fb", function (e, instance) {
    if (instance && !instance.Guestures) {
      instance.Guestures = new Guestures(instance);
    }
  }).on("beforeClose.fb", function (e, instance) {
    if (instance && instance.Guestures) {
      instance.Guestures.destroy();
    }
  });
})(window, document, jQuery); // ==========================================================================
//
// SlideShow
// Enables slideshow functionality
//
// Example of usage:
// $.fancybox.getInstance().SlideShow.start()
//
// ==========================================================================


(function (document, $) {

  $.extend(true, $.fancybox.defaults, {
    btnTpl: {
      slideShow: '<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}">' + '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.5 5.4v13.2l11-6.6z"/></svg>' + '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.33 5.75h2.2v12.5h-2.2V5.75zm5.15 0h2.2v12.5h-2.2V5.75z"/></svg>' + "</button>"
    },
    slideShow: {
      autoStart: false,
      speed: 3000,
      progress: true
    }
  });

  var SlideShow = function (instance) {
    this.instance = instance;
    this.init();
  };

  $.extend(SlideShow.prototype, {
    timer: null,
    isActive: false,
    $button: null,
    init: function () {
      var self = this,
          instance = self.instance,
          opts = instance.group[instance.currIndex].opts.slideShow;
      self.$button = instance.$refs.toolbar.find("[data-fancybox-play]").on("click", function () {
        self.toggle();
      });

      if (instance.group.length < 2 || !opts) {
        self.$button.hide();
      } else if (opts.progress) {
        self.$progress = $('<div class="fancybox-progress"></div>').appendTo(instance.$refs.inner);
      }
    },
    set: function (force) {
      var self = this,
          instance = self.instance,
          current = instance.current; // Check if reached last element

      if (current && (force === true || current.opts.loop || instance.currIndex < instance.group.length - 1)) {
        if (self.isActive && current.contentType !== "video") {
          if (self.$progress) {
            $.fancybox.animate(self.$progress.show(), {
              scaleX: 1
            }, current.opts.slideShow.speed);
          }

          self.timer = setTimeout(function () {
            if (!instance.current.opts.loop && instance.current.index == instance.group.length - 1) {
              instance.jumpTo(0);
            } else {
              instance.next();
            }
          }, current.opts.slideShow.speed);
        }
      } else {
        self.stop();
        instance.idleSecondsCounter = 0;
        instance.showControls();
      }
    },
    clear: function () {
      var self = this;
      clearTimeout(self.timer);
      self.timer = null;

      if (self.$progress) {
        self.$progress.removeAttr("style").hide();
      }
    },
    start: function () {
      var self = this,
          current = self.instance.current;

      if (current) {
        self.$button.attr("title", (current.opts.i18n[current.opts.lang] || current.opts.i18n.en).PLAY_STOP).removeClass("fancybox-button--play").addClass("fancybox-button--pause");
        self.isActive = true;

        if (current.isComplete) {
          self.set(true);
        }

        self.instance.trigger("onSlideShowChange", true);
      }
    },
    stop: function () {
      var self = this,
          current = self.instance.current;
      self.clear();
      self.$button.attr("title", (current.opts.i18n[current.opts.lang] || current.opts.i18n.en).PLAY_START).removeClass("fancybox-button--pause").addClass("fancybox-button--play");
      self.isActive = false;
      self.instance.trigger("onSlideShowChange", false);

      if (self.$progress) {
        self.$progress.removeAttr("style").hide();
      }
    },
    toggle: function () {
      var self = this;

      if (self.isActive) {
        self.stop();
      } else {
        self.start();
      }
    }
  });
  $(document).on({
    "onInit.fb": function (e, instance) {
      if (instance && !instance.SlideShow) {
        instance.SlideShow = new SlideShow(instance);
      }
    },
    "beforeShow.fb": function (e, instance, current, firstRun) {
      var SlideShow = instance && instance.SlideShow;

      if (firstRun) {
        if (SlideShow && current.opts.slideShow.autoStart) {
          SlideShow.start();
        }
      } else if (SlideShow && SlideShow.isActive) {
        SlideShow.clear();
      }
    },
    "afterShow.fb": function (e, instance, current) {
      var SlideShow = instance && instance.SlideShow;

      if (SlideShow && SlideShow.isActive) {
        SlideShow.set();
      }
    },
    "afterKeydown.fb": function (e, instance, current, keypress, keycode) {
      var SlideShow = instance && instance.SlideShow; // "P" or Spacebar

      if (SlideShow && current.opts.slideShow && (keycode === 80 || keycode === 32) && !$(document.activeElement).is("button,a,input")) {
        keypress.preventDefault();
        SlideShow.toggle();
      }
    },
    "beforeClose.fb onDeactivate.fb": function (e, instance) {
      var SlideShow = instance && instance.SlideShow;

      if (SlideShow) {
        SlideShow.stop();
      }
    }
  }); // Page Visibility API to pause slideshow when window is not active

  $(document).on("visibilitychange", function () {
    var instance = $.fancybox.getInstance(),
        SlideShow = instance && instance.SlideShow;

    if (SlideShow && SlideShow.isActive) {
      if (document.hidden) {
        SlideShow.clear();
      } else {
        SlideShow.set();
      }
    }
  });
})(document, jQuery); // ==========================================================================
//
// FullScreen
// Adds fullscreen functionality
//
// ==========================================================================


(function (document, $) {

  var fn = function () {
    var fnMap = [["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"], // new WebKit
    ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"], // old WebKit (Safari 5.1)
    ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"], ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"], ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]];
    var ret = {};

    for (var i = 0; i < fnMap.length; i++) {
      var val = fnMap[i];

      if (val && val[1] in document) {
        for (var j = 0; j < val.length; j++) {
          ret[fnMap[0][j]] = val[j];
        }

        return ret;
      }
    }

    return false;
  }();

  if (fn) {
    var FullScreen = {
      request: function (elem) {
        elem = elem || document.documentElement;
        elem[fn.requestFullscreen](elem.ALLOW_KEYBOARD_INPUT);
      },
      exit: function () {
        document[fn.exitFullscreen]();
      },
      toggle: function (elem) {
        elem = elem || document.documentElement;

        if (this.isFullscreen()) {
          this.exit();
        } else {
          this.request(elem);
        }
      },
      isFullscreen: function () {
        return Boolean(document[fn.fullscreenElement]);
      },
      enabled: function () {
        return Boolean(document[fn.fullscreenEnabled]);
      }
    };
    $.extend(true, $.fancybox.defaults, {
      btnTpl: {
        fullScreen: '<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fsenter" title="{{FULL_SCREEN}}">' + '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>' + '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5zm3-8H5v2h5V5H8zm6 11h2v-3h3v-2h-5zm2-11V5h-2v5h5V8z"/></svg>' + "</button>"
      },
      fullScreen: {
        autoStart: false
      }
    });
    $(document).on(fn.fullscreenchange, function () {
      var isFullscreen = FullScreen.isFullscreen(),
          instance = $.fancybox.getInstance();

      if (instance) {
        // If image is zooming, then force to stop and reposition properly
        if (instance.current && instance.current.type === "image" && instance.isAnimating) {
          instance.isAnimating = false;
          instance.update(true, true, 0);

          if (!instance.isComplete) {
            instance.complete();
          }
        }

        instance.trigger("onFullscreenChange", isFullscreen);
        instance.$refs.container.toggleClass("fancybox-is-fullscreen", isFullscreen);
        instance.$refs.toolbar.find("[data-fancybox-fullscreen]").toggleClass("fancybox-button--fsenter", !isFullscreen).toggleClass("fancybox-button--fsexit", isFullscreen);
      }
    });
  }

  $(document).on({
    "onInit.fb": function (e, instance) {
      var $container;

      if (!fn) {
        instance.$refs.toolbar.find("[data-fancybox-fullscreen]").remove();
        return;
      }

      if (instance && instance.group[instance.currIndex].opts.fullScreen) {
        $container = instance.$refs.container;
        $container.on("click.fb-fullscreen", "[data-fancybox-fullscreen]", function (e) {
          e.stopPropagation();
          e.preventDefault();
          FullScreen.toggle();
        });

        if (instance.opts.fullScreen && instance.opts.fullScreen.autoStart === true) {
          FullScreen.request();
        } // Expose API


        instance.FullScreen = FullScreen;
      } else if (instance) {
        instance.$refs.toolbar.find("[data-fancybox-fullscreen]").hide();
      }
    },
    "afterKeydown.fb": function (e, instance, current, keypress, keycode) {
      // "F"
      if (instance && instance.FullScreen && keycode === 70) {
        keypress.preventDefault();
        instance.FullScreen.toggle();
      }
    },
    "beforeClose.fb": function (e, instance) {
      if (instance && instance.FullScreen && instance.$refs.container.hasClass("fancybox-is-fullscreen")) {
        FullScreen.exit();
      }
    }
  });
})(document, jQuery); // ==========================================================================
//
// Thumbs
// Displays thumbnails in a grid
//
// ==========================================================================


(function (document, $) {

  var CLASS = "fancybox-thumbs",
      CLASS_ACTIVE = CLASS + "-active"; // Make sure there are default values

  $.fancybox.defaults = $.extend(true, {
    btnTpl: {
      thumbs: '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}">' + '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14.59 14.59h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76H5.65V5.65z"/></svg>' + "</button>"
    },
    thumbs: {
      autoStart: false,
      // Display thumbnails on opening
      hideOnClose: true,
      // Hide thumbnail grid when closing animation starts
      parentEl: ".fancybox-container",
      // Container is injected into this element
      axis: "y" // Vertical (y) or horizontal (x) scrolling

    }
  }, $.fancybox.defaults);

  var FancyThumbs = function (instance) {
    this.init(instance);
  };

  $.extend(FancyThumbs.prototype, {
    $button: null,
    $grid: null,
    $list: null,
    isVisible: false,
    isActive: false,
    init: function (instance) {
      var self = this,
          group = instance.group,
          enabled = 0;
      self.instance = instance;
      self.opts = group[instance.currIndex].opts.thumbs;
      instance.Thumbs = self;
      self.$button = instance.$refs.toolbar.find("[data-fancybox-thumbs]"); // Enable thumbs if at least two group items have thumbnails

      for (var i = 0, len = group.length; i < len; i++) {
        if (group[i].thumb) {
          enabled++;
        }

        if (enabled > 1) {
          break;
        }
      }

      if (enabled > 1 && !!self.opts) {
        self.$button.removeAttr("style").on("click", function () {
          self.toggle();
        });
        self.isActive = true;
      } else {
        self.$button.hide();
      }
    },
    create: function () {
      var self = this,
          instance = self.instance,
          parentEl = self.opts.parentEl,
          list = [],
          src;

      if (!self.$grid) {
        // Create main element
        self.$grid = $('<div class="' + CLASS + " " + CLASS + "-" + self.opts.axis + '"></div>').appendTo(instance.$refs.container.find(parentEl).addBack().filter(parentEl)); // Add "click" event that performs gallery navigation

        self.$grid.on("click", "a", function () {
          instance.jumpTo($(this).attr("data-index"));
        });
      } // Build the list


      if (!self.$list) {
        self.$list = $('<div class="' + CLASS + '__list">').appendTo(self.$grid);
      }

      $.each(instance.group, function (i, item) {
        src = item.thumb;

        if (!src && item.type === "image") {
          src = item.src;
        }

        list.push('<a href="javascript:;" tabindex="0" data-index="' + i + '"' + (src && src.length ? ' style="background-image:url(' + src + ')"' : 'class="fancybox-thumbs-missing"') + "></a>");
      });
      self.$list[0].innerHTML = list.join("");

      if (self.opts.axis === "x") {
        // Set fixed width for list element to enable horizontal scrolling
        self.$list.width(parseInt(self.$grid.css("padding-right"), 10) + instance.group.length * self.$list.children().eq(0).outerWidth(true));
      }
    },
    focus: function (duration) {
      var self = this,
          $list = self.$list,
          $grid = self.$grid,
          thumb,
          thumbPos;

      if (!self.instance.current) {
        return;
      }

      thumb = $list.children().removeClass(CLASS_ACTIVE).filter('[data-index="' + self.instance.current.index + '"]').addClass(CLASS_ACTIVE);
      thumbPos = thumb.position(); // Check if need to scroll to make current thumb visible

      if (self.opts.axis === "y" && (thumbPos.top < 0 || thumbPos.top > $list.height() - thumb.outerHeight())) {
        $list.stop().animate({
          scrollTop: $list.scrollTop() + thumbPos.top
        }, duration);
      } else if (self.opts.axis === "x" && (thumbPos.left < $grid.scrollLeft() || thumbPos.left > $grid.scrollLeft() + ($grid.width() - thumb.outerWidth()))) {
        $list.parent().stop().animate({
          scrollLeft: thumbPos.left
        }, duration);
      }
    },
    update: function () {
      var that = this;
      that.instance.$refs.container.toggleClass("fancybox-show-thumbs", this.isVisible);

      if (that.isVisible) {
        if (!that.$grid) {
          that.create();
        }

        that.instance.trigger("onThumbsShow");
        that.focus(0);
      } else if (that.$grid) {
        that.instance.trigger("onThumbsHide");
      } // Update content position


      that.instance.update();
    },
    hide: function () {
      this.isVisible = false;
      this.update();
    },
    show: function () {
      this.isVisible = true;
      this.update();
    },
    toggle: function () {
      this.isVisible = !this.isVisible;
      this.update();
    }
  });
  $(document).on({
    "onInit.fb": function (e, instance) {
      var Thumbs;

      if (instance && !instance.Thumbs) {
        Thumbs = new FancyThumbs(instance);

        if (Thumbs.isActive && Thumbs.opts.autoStart === true) {
          Thumbs.show();
        }
      }
    },
    "beforeShow.fb": function (e, instance, item, firstRun) {
      var Thumbs = instance && instance.Thumbs;

      if (Thumbs && Thumbs.isVisible) {
        Thumbs.focus(firstRun ? 0 : 250);
      }
    },
    "afterKeydown.fb": function (e, instance, current, keypress, keycode) {
      var Thumbs = instance && instance.Thumbs; // "G"

      if (Thumbs && Thumbs.isActive && keycode === 71) {
        keypress.preventDefault();
        Thumbs.toggle();
      }
    },
    "beforeClose.fb": function (e, instance) {
      var Thumbs = instance && instance.Thumbs;

      if (Thumbs && Thumbs.isVisible && Thumbs.opts.hideOnClose !== false) {
        Thumbs.$grid.hide();
      }
    }
  });
})(document, jQuery); //// ==========================================================================
//
// Share
// Displays simple form for sharing current url
//
// ==========================================================================


(function (document, $) {

  $.extend(true, $.fancybox.defaults, {
    btnTpl: {
      share: '<button data-fancybox-share class="fancybox-button fancybox-button--share" title="{{SHARE}}">' + '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M2.55 19c1.4-8.4 9.1-9.8 11.9-9.8V5l7 7-7 6.3v-3.5c-2.8 0-10.5 2.1-11.9 4.2z"/></svg>' + "</button>"
    },
    share: {
      url: function (instance, item) {
        return (!instance.currentHash && !(item.type === "inline" || item.type === "html") ? item.origSrc || item.src : false) || window.location;
      },
      tpl: '<div class="fancybox-share">' + "<h1>{{SHARE}}</h1>" + "<p>" + '<a class="fancybox-share__button fancybox-share__button--fb" href="https://www.facebook.com/sharer/sharer.php?u={{url}}">' + '<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m287 456v-299c0-21 6-35 35-35h38v-63c-7-1-29-3-55-3-54 0-91 33-91 94v306m143-254h-205v72h196" /></svg>' + "<span>Facebook</span>" + "</a>" + '<a class="fancybox-share__button fancybox-share__button--tw" href="https://twitter.com/intent/tweet?url={{url}}&text={{descr}}">' + '<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m456 133c-14 7-31 11-47 13 17-10 30-27 37-46-15 10-34 16-52 20-61-62-157-7-141 75-68-3-129-35-169-85-22 37-11 86 26 109-13 0-26-4-37-9 0 39 28 72 65 80-12 3-25 4-37 2 10 33 41 57 77 57-42 30-77 38-122 34 170 111 378-32 359-208 16-11 30-25 41-42z" /></svg>' + "<span>Twitter</span>" + "</a>" + '<a class="fancybox-share__button fancybox-share__button--pt" href="https://www.pinterest.com/pin/create/button/?url={{url}}&description={{descr}}&media={{media}}">' + '<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m265 56c-109 0-164 78-164 144 0 39 15 74 47 87 5 2 10 0 12-5l4-19c2-6 1-8-3-13-9-11-15-25-15-45 0-58 43-110 113-110 62 0 96 38 96 88 0 67-30 122-73 122-24 0-42-19-36-44 6-29 20-60 20-81 0-19-10-35-31-35-25 0-44 26-44 60 0 21 7 36 7 36l-30 125c-8 37-1 83 0 87 0 3 4 4 5 2 2-3 32-39 42-75l16-64c8 16 31 29 56 29 74 0 124-67 124-157 0-69-58-132-146-132z" fill="#fff"/></svg>' + "<span>Pinterest</span>" + "</a>" + "</p>" + '<p><input class="fancybox-share__input" type="text" value="{{url_raw}}" onclick="select()" /></p>' + "</div>"
    }
  });

  function escapeHtml(string) {
    var entityMap = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
      "/": "&#x2F;",
      "`": "&#x60;",
      "=": "&#x3D;"
    };
    return String(string).replace(/[&<>"'`=\/]/g, function (s) {
      return entityMap[s];
    });
  }

  $(document).on("click", "[data-fancybox-share]", function () {
    var instance = $.fancybox.getInstance(),
        current = instance.current || null,
        url,
        tpl;

    if (!current) {
      return;
    }

    if ($.type(current.opts.share.url) === "function") {
      url = current.opts.share.url.apply(current, [instance, current]);
    }

    tpl = current.opts.share.tpl.replace(/\{\{media\}\}/g, current.type === "image" ? encodeURIComponent(current.src) : "").replace(/\{\{url\}\}/g, encodeURIComponent(url)).replace(/\{\{url_raw\}\}/g, escapeHtml(url)).replace(/\{\{descr\}\}/g, instance.$caption ? encodeURIComponent(instance.$caption.text()) : "");
    $.fancybox.open({
      src: instance.translate(instance, tpl),
      type: "html",
      opts: {
        touch: false,
        animationEffect: false,
        afterLoad: function (shareInstance, shareCurrent) {
          // Close self if parent instance is closing
          instance.$refs.container.one("beforeClose.fb", function () {
            shareInstance.close(null, 0);
          }); // Opening links in a popup window

          shareCurrent.$content.find(".fancybox-share__button").click(function () {
            window.open(this.href, "Share", "width=550, height=450");
            return false;
          });
        },
        mobile: {
          autoFocus: false
        }
      }
    });
  });
})(document, jQuery); // ==========================================================================
//
// Hash
// Enables linking to each modal
//
// ==========================================================================


(function (window, document, $) {

  if (!$.escapeSelector) {
    $.escapeSelector = function (sel) {
      var rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;

      var fcssescape = function (ch, asCodePoint) {
        if (asCodePoint) {
          // U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
          if (ch === "\0") {
            return "\uFFFD";
          } // Control characters and (dependent upon position) numbers get escaped as code points


          return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
        } // Other potentially-special ASCII characters get backslash-escaped


        return "\\" + ch;
      };

      return (sel + "").replace(rcssescape, fcssescape);
    };
  } // Get info about gallery name and current index from url


  function parseUrl() {
    var hash = window.location.hash.substr(1),
        rez = hash.split("-"),
        index = rez.length > 1 && /^\+?\d+$/.test(rez[rez.length - 1]) ? parseInt(rez.pop(-1), 10) || 1 : 1,
        gallery = rez.join("-");
    return {
      hash: hash,

      /* Index is starting from 1 */
      index: index < 1 ? 1 : index,
      gallery: gallery
    };
  } // Trigger click evnt on links to open new fancyBox instance


  function triggerFromUrl(url) {
    if (url.gallery !== "") {
      // If we can find element matching 'data-fancybox' atribute,
      // then triggering click event should start fancyBox
      $("[data-fancybox='" + $.escapeSelector(url.gallery) + "']").eq(url.index - 1).focus().trigger("click.fb-start");
    }
  } // Get gallery name from current instance


  function getGalleryID(instance) {
    var opts, ret;

    if (!instance) {
      return false;
    }

    opts = instance.current ? instance.current.opts : instance.opts;
    ret = opts.hash || (opts.$orig ? opts.$orig.data("fancybox") || opts.$orig.data("fancybox-trigger") : "");
    return ret === "" ? false : ret;
  } // Start when DOM becomes ready


  $(function () {
    // Check if user has disabled this module
    if ($.fancybox.defaults.hash === false) {
      return;
    } // Update hash when opening/closing fancyBox


    $(document).on({
      "onInit.fb": function (e, instance) {
        var url, gallery;

        if (instance.group[instance.currIndex].opts.hash === false) {
          return;
        }

        url = parseUrl();
        gallery = getGalleryID(instance); // Make sure gallery start index matches index from hash

        if (gallery && url.gallery && gallery == url.gallery) {
          instance.currIndex = url.index - 1;
        }
      },
      "beforeShow.fb": function (e, instance, current, firstRun) {
        var gallery;

        if (!current || current.opts.hash === false) {
          return;
        } // Check if need to update window hash


        gallery = getGalleryID(instance);

        if (!gallery) {
          return;
        } // Variable containing last hash value set by fancyBox
        // It will be used to determine if fancyBox needs to close after hash change is detected


        instance.currentHash = gallery + (instance.group.length > 1 ? "-" + (current.index + 1) : ""); // If current hash is the same (this instance most likely is opened by hashchange), then do nothing

        if (window.location.hash === "#" + instance.currentHash) {
          return;
        }

        if (firstRun && !instance.origHash) {
          instance.origHash = window.location.hash;
        }

        if (instance.hashTimer) {
          clearTimeout(instance.hashTimer);
        } // Update hash


        instance.hashTimer = setTimeout(function () {
          if ("replaceState" in window.history) {
            window.history[firstRun ? "pushState" : "replaceState"]({}, document.title, window.location.pathname + window.location.search + "#" + instance.currentHash);

            if (firstRun) {
              instance.hasCreatedHistory = true;
            }
          } else {
            window.location.hash = instance.currentHash;
          }

          instance.hashTimer = null;
        }, 300);
      },
      "beforeClose.fb": function (e, instance, current) {
        if (!current || current.opts.hash === false) {
          return;
        }

        clearTimeout(instance.hashTimer); // Goto previous history entry

        if (instance.currentHash && instance.hasCreatedHistory) {
          window.history.back();
        } else if (instance.currentHash) {
          if ("replaceState" in window.history) {
            window.history.replaceState({}, document.title, window.location.pathname + window.location.search + (instance.origHash || ""));
          } else {
            window.location.hash = instance.origHash;
          }
        }

        instance.currentHash = null;
      }
    }); // Check if need to start/close after url has changed

    $(window).on("hashchange.fb", function () {
      var url = parseUrl(),
          fb = null; // Find last fancyBox instance that has "hash"

      $.each($(".fancybox-container").get().reverse(), function (index, value) {
        var tmp = $(value).data("FancyBox");

        if (tmp && tmp.currentHash) {
          fb = tmp;
          return false;
        }
      });

      if (fb) {
        // Now, compare hash values
        if (fb.currentHash !== url.gallery + "-" + url.index && !(url.index === 1 && fb.currentHash == url.gallery)) {
          fb.currentHash = null;
          fb.close();
        }
      } else if (url.gallery !== "") {
        triggerFromUrl(url);
      }
    }); // Check current hash and trigger click event on matching element to start fancyBox, if needed

    setTimeout(function () {
      if (!$.fancybox.getInstance()) {
        triggerFromUrl(parseUrl());
      }
    }, 50);
  });
})(window, document, jQuery); // ==========================================================================
//
// Wheel
// Basic mouse weheel support for gallery navigation
//
// ==========================================================================


(function (document, $) {

  var prevTime = new Date().getTime();
  $(document).on({
    "onInit.fb": function (e, instance, current) {
      instance.$refs.stage.on("mousewheel DOMMouseScroll wheel MozMousePixelScroll", function (e) {
        var current = instance.current,
            currTime = new Date().getTime();

        if (instance.group.length < 2 || current.opts.wheel === false || current.opts.wheel === "auto" && current.type !== "image") {
          return;
        }

        e.preventDefault();
        e.stopPropagation();

        if (current.$slide.hasClass("fancybox-animated")) {
          return;
        }

        e = e.originalEvent || e;

        if (currTime - prevTime < 250) {
          return;
        }

        prevTime = currTime;
        instance[(-e.deltaY || -e.deltaX || e.wheelDelta || -e.detail) < 0 ? "next" : "previous"]();
      });
    }
  });
})(document, jQuery);

/*
-ˋˏ *.·:·.⟐.·:·.* ˎˊ-
━━━ ⋅𖥔⋅ ━━✶━━ ⋅𖥔⋅ ━━━
Add lightbox
━━━ ⋅𖥔⋅ ━━✶━━ ⋅𖥔⋅ ━━━
-ˋˏ *.·:·.⟐.·:·.* ˎˊ-
*/

(function ($) {
  var $lightbox = $('.lightbox');
  $('a[href]').filter(function () {
    return this.href && this.href.match(/\.(?:jpe?g|gif|bmp|a?png)$/i);
  }).addClass('lightbox');
  $lightbox.fancybox({
    touch: {
      vertical: true,
      // Allow to drag content vertically
      momentum: true // Continue movement after releasing mouse/touch when panning

    }
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
})(jQuery);

/*!
 * strings: 3.9.0
 * https://greensock.com
 *
 * Copyright 2008-2021, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
var emojiExp = /([\uD800-\uDBFF][\uDC00-\uDFFF](?:[\u200D\uFE0F][\uD800-\uDBFF][\uDC00-\uDFFF]){2,}|\uD83D\uDC69(?:\u200D(?:(?:\uD83D\uDC69\u200D)?\uD83D\uDC67|(?:\uD83D\uDC69\u200D)?\uD83D\uDC66)|\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC69\u200D(?:\uD83D\uDC69\u200D)?\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D(?:\uD83D\uDC69\u200D)?\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]\uFE0F|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC6F\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3C-\uDD3E\uDDD6-\uDDDF])\u200D[\u2640\u2642]\uFE0F|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F\u200D[\u2640\u2642]|(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642])\uFE0F|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\uD83D\uDC69\u200D[\u2695\u2696\u2708]|\uD83D\uDC68(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708]))\uFE0F|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83D\uDC69\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69]))|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67)\uDB40\uDC7F|\uD83D\uDC68(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC66\u200D\uD83D\uDC66|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92])|(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]))|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDD1-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\u200D(?:(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC67|(?:(?:\uD83D[\uDC68\uDC69])\u200D)?\uD83D\uDC66)|\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC69\uDC6E\uDC70-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD26\uDD30-\uDD39\uDD3D\uDD3E\uDDD1-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])?|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDEEB\uDEEC\uDEF4-\uDEF8]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4C\uDD50-\uDD6B\uDD80-\uDD97\uDDC0\uDDD0-\uDDE6])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267B\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEF8]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4C\uDD50-\uDD6B\uDD80-\uDD97\uDDC0\uDDD0-\uDDE6])\uFE0F)/;
function getText(e) {
  var type = e.nodeType,
      result = "";

  if (type === 1 || type === 9 || type === 11) {
    if (typeof e.textContent === "string") {
      return e.textContent;
    } else {
      for (e = e.firstChild; e; e = e.nextSibling) {
        result += getText(e);
      }
    }
  } else if (type === 3 || type === 4) {
    return e.nodeValue;
  }

  return result;
}

/*!
 * SplitText: 3.9.0
 * https://greensock.com
 *
 * @license Copyright 2008-2021, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/

var _doc,
    _win,
    _coreInitted,
    _stripExp = /(?:\r|\n|\t\t)/g,
    //find carriage returns, new line feeds and double-tabs.
_multipleSpacesExp = /(?:\s\s+)/g,
    _initCore = function _initCore() {
  _doc = document;
  _win = window;
  _coreInitted = 1;
},
    //<name>SplitText</name>
_getComputedStyle = function _getComputedStyle(element) {
  return _win.getComputedStyle(element);
},
    _isArray = Array.isArray,
    _slice = [].slice,
    _toArray = function _toArray(value, leaveStrings) {
  //takes any value and returns an array. If it's a string (and leaveStrings isn't true), it'll use document.querySelectorAll() and convert that to an array. It'll also accept iterables like jQuery objects.
  var type;
  return _isArray(value) ? value : (type = typeof value) === "string" && !leaveStrings && value ? _slice.call(_doc.querySelectorAll(value), 0) : value && type === "object" && "length" in value ? _slice.call(value, 0) : value ? [value] : [];
},
    _isAbsolute = function _isAbsolute(vars) {
  return vars.position === "absolute" || vars.absolute === true;
},
    //some characters are combining marks (think diacritics/accents in European languages) which involve 2 or 4 characters that combine in the browser to form a single character. Pass in the remaining text and an array of the special characters to search for and if the text starts with one of those special characters, it'll spit back the number of characters to retain (often 2 or 4). Used in the specialChars features that was introduced in 0.6.0.
_findSpecialChars = function _findSpecialChars(text, chars) {
  var i = chars.length,
      s;

  while (--i > -1) {
    s = chars[i];

    if (text.substr(0, s.length) === s) {
      return s.length;
    }
  }
},
    _divStart = " style='position:relative;display:inline-block;'",
    _cssClassFunc = function _cssClassFunc(cssClass, tag) {
  if (cssClass === void 0) {
    cssClass = "";
  }

  var iterate = ~cssClass.indexOf("++"),
      num = 1;

  if (iterate) {
    cssClass = cssClass.split("++").join("");
  }

  return function () {
    return "<" + tag + _divStart + (cssClass ? " class='" + cssClass + (iterate ? num++ : "") + "'>" : ">");
  };
},
    _swapText = function _swapText(element, oldText, newText) {
  var type = element.nodeType;

  if (type === 1 || type === 9 || type === 11) {
    for (element = element.firstChild; element; element = element.nextSibling) {
      _swapText(element, oldText, newText);
    }
  } else if (type === 3 || type === 4) {
    element.nodeValue = element.nodeValue.split(oldText).join(newText);
  }
},
    _pushReversed = function _pushReversed(a, merge) {
  var i = merge.length;

  while (--i > -1) {
    a.push(merge[i]);
  }
},
    _isBeforeWordDelimiter = function _isBeforeWordDelimiter(e, root, wordDelimiter) {
  var next;

  while (e && e !== root) {
    next = e._next || e.nextSibling;

    if (next) {
      return next.textContent.charAt(0) === wordDelimiter;
    }

    e = e.parentNode || e._parent;
  }
},
    _deWordify = function _deWordify(e) {
  var children = _toArray(e.childNodes),
      l = children.length,
      i,
      child;

  for (i = 0; i < l; i++) {
    child = children[i];

    if (child._isSplit) {
      _deWordify(child);
    } else {
      if (i && child.previousSibling && child.previousSibling.nodeType === 3) {
        child.previousSibling.nodeValue += child.nodeType === 3 ? child.nodeValue : child.firstChild.nodeValue;
        e.removeChild(child);
      } else if (child.nodeType !== 3) {
        e.insertBefore(child.firstChild, child);
        e.removeChild(child);
      }
    }
  }
},
    _getStyleAsNumber = function _getStyleAsNumber(name, computedStyle) {
  return parseFloat(computedStyle[name]) || 0;
},
    _setPositionsAfterSplit = function _setPositionsAfterSplit(element, vars, allChars, allWords, allLines, origWidth, origHeight) {
  var cs = _getComputedStyle(element),
      paddingLeft = _getStyleAsNumber("paddingLeft", cs),
      lineOffsetY = -999,
      borderTopAndBottom = _getStyleAsNumber("borderBottomWidth", cs) + _getStyleAsNumber("borderTopWidth", cs),
      borderLeftAndRight = _getStyleAsNumber("borderLeftWidth", cs) + _getStyleAsNumber("borderRightWidth", cs),
      padTopAndBottom = _getStyleAsNumber("paddingTop", cs) + _getStyleAsNumber("paddingBottom", cs),
      padLeftAndRight = _getStyleAsNumber("paddingLeft", cs) + _getStyleAsNumber("paddingRight", cs),
      lineThreshold = _getStyleAsNumber("fontSize", cs) * (vars.lineThreshold || 0.2),
      textAlign = cs.textAlign,
      charArray = [],
      wordArray = [],
      lineArray = [],
      wordDelimiter = vars.wordDelimiter || " ",
      tag = vars.tag ? vars.tag : vars.span ? "span" : "div",
      types = vars.type || vars.split || "chars,words,lines",
      lines = allLines && ~types.indexOf("lines") ? [] : null,
      words = ~types.indexOf("words"),
      chars = ~types.indexOf("chars"),
      absolute = _isAbsolute(vars),
      linesClass = vars.linesClass,
      iterateLine = ~(linesClass || "").indexOf("++"),
      spaceNodesToRemove = [],
      isFlex = cs.display === "flex",
      prevInlineDisplay = element.style.display,
      i,
      j,
      l,
      node,
      nodes,
      isChild,
      curLine,
      addWordSpaces,
      style,
      lineNode,
      lineWidth,
      offset;

  iterateLine && (linesClass = linesClass.split("++").join(""));
  isFlex && (element.style.display = "block"); //copy all the descendant nodes into an array (we can't use a regular nodeList because it's live and we may need to renest things)

  j = element.getElementsByTagName("*");
  l = j.length;
  nodes = [];

  for (i = 0; i < l; i++) {
    nodes[i] = j[i];
  } //for absolute positioning, we need to record the x/y offsets and width/height for every <div>. And even if we're not positioning things absolutely, in order to accommodate lines, we must figure out where the y offset changes so that we can sense where the lines break, and we populate the lines array.


  if (lines || absolute) {
    for (i = 0; i < l; i++) {
      node = nodes[i];
      isChild = node.parentNode === element;

      if (isChild || absolute || chars && !words) {
        offset = node.offsetTop;

        if (lines && isChild && Math.abs(offset - lineOffsetY) > lineThreshold && (node.nodeName !== "BR" || i === 0)) {
          //we found some rare occasions where a certain character like &#8209; could cause the offsetTop to be off by 1 pixel, so we build in a threshold.
          curLine = [];
          lines.push(curLine);
          lineOffsetY = offset;
        }

        if (absolute) {
          //record offset x and y, as well as width and height so that we can access them later for positioning. Grabbing them at once ensures we don't trigger a browser paint & we maximize performance.
          node._x = node.offsetLeft;
          node._y = offset;
          node._w = node.offsetWidth;
          node._h = node.offsetHeight;
        }

        if (lines) {
          if (node._isSplit && isChild || !chars && isChild || words && isChild || !words && node.parentNode.parentNode === element && !node.parentNode._isSplit) {
            curLine.push(node);
            node._x -= paddingLeft;

            if (_isBeforeWordDelimiter(node, element, wordDelimiter)) {
              node._wordEnd = true;
            }
          }

          if (node.nodeName === "BR" && (node.nextSibling && node.nextSibling.nodeName === "BR" || i === 0)) {
            //two consecutive <br> tags signify a new [empty] line. Also, if the entire block of content STARTS with a <br>, add a line.
            lines.push([]);
          }
        }
      }
    }
  }

  for (i = 0; i < l; i++) {
    node = nodes[i];
    isChild = node.parentNode === element;

    if (node.nodeName === "BR") {
      if (lines || absolute) {
        node.parentNode && node.parentNode.removeChild(node);
        nodes.splice(i--, 1);
        l--;
      } else if (!words) {
        element.appendChild(node);
      }

      continue;
    }

    if (absolute) {
      style = node.style;

      if (!words && !isChild) {
        node._x += node.parentNode._x;
        node._y += node.parentNode._y;
      }

      style.left = node._x + "px";
      style.top = node._y + "px";
      style.position = "absolute";
      style.display = "block"; //if we don't set the width/height, things collapse in older versions of IE and the origin for transforms is thrown off in all browsers.

      style.width = node._w + 1 + "px"; //IE is 1px short sometimes. Avoid wrapping

      style.height = node._h + "px";
    }

    if (!words && chars) {
      //we always start out wrapping words in their own <div> so that line breaks happen correctly, but here we'll remove those <div> tags if necessary and re-nest the characters directly into the element rather than inside the word <div>
      if (node._isSplit) {
        node._next = j = node.nextSibling;
        node.parentNode.appendChild(node); //put it at the end to keep the order correct.

        while (j && j.nodeType === 3 && j.textContent === " ") {
          // if there are nodes that are just a space right afterward, go ahead and append them to the end so they're not out of order.
          node._next = j.nextSibling;
          node.parentNode.appendChild(j);
          j = j.nextSibling;
        }
      } else if (node.parentNode._isSplit) {
        node._parent = node.parentNode;

        if (!node.previousSibling && node.firstChild) {
          node.firstChild._isFirst = true;
        }

        if (node.nextSibling && node.nextSibling.textContent === " " && !node.nextSibling.nextSibling) {
          //if the last node inside a nested element is just a space (like T<span>nested </span>), remove it otherwise it'll get placed in the wrong order. Don't remove it right away, though, because we need to sense when words/characters are before a space like _isBeforeWordDelimiter(). Removing it now would make that a false negative.
          spaceNodesToRemove.push(node.nextSibling);
        }

        node._next = node.nextSibling && node.nextSibling._isFirst ? null : node.nextSibling;
        node.parentNode.removeChild(node);
        nodes.splice(i--, 1);
        l--;
      } else if (!isChild) {
        offset = !node.nextSibling && _isBeforeWordDelimiter(node.parentNode, element, wordDelimiter); //if this is the last letter in the word (and we're not breaking by lines and not positioning things absolutely), we need to add a space afterwards so that the characters don't just mash together

        node.parentNode._parent && node.parentNode._parent.appendChild(node);
        offset && node.parentNode.appendChild(_doc.createTextNode(" "));

        if (tag === "span") {
          node.style.display = "inline"; //so that word breaks are honored properly.
        }

        charArray.push(node);
      }
    } else if (node.parentNode._isSplit && !node._isSplit && node.innerHTML !== "") {
      wordArray.push(node);
    } else if (chars && !node._isSplit) {
      if (tag === "span") {
        node.style.display = "inline";
      }

      charArray.push(node);
    }
  }

  i = spaceNodesToRemove.length;

  while (--i > -1) {
    spaceNodesToRemove[i].parentNode.removeChild(spaceNodesToRemove[i]);
  }

  if (lines) {
    //the next 7 lines just give us the line width in the most reliable way and figure out the left offset (if position isn't relative or absolute). We must set the width along with text-align to ensure everything works properly for various alignments.
    if (absolute) {
      lineNode = _doc.createElement(tag);
      element.appendChild(lineNode);
      lineWidth = lineNode.offsetWidth + "px";
      offset = lineNode.offsetParent === element ? 0 : element.offsetLeft;
      element.removeChild(lineNode);
    }

    style = element.style.cssText;
    element.style.cssText = "display:none;"; //to improve performance, set display:none on the element so that the browser doesn't have to worry about reflowing or rendering while we're renesting things. We'll revert the cssText later.
    //we can't use element.innerHTML = "" because that causes IE to literally delete all the nodes and their content even though we've stored them in an array! So we must loop through the children and remove them.

    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }

    addWordSpaces = wordDelimiter === " " && (!absolute || !words && !chars);

    for (i = 0; i < lines.length; i++) {
      curLine = lines[i];
      lineNode = _doc.createElement(tag);
      lineNode.style.cssText = "display:block;text-align:" + textAlign + ";position:" + (absolute ? "absolute;" : "relative;");

      if (linesClass) {
        lineNode.className = linesClass + (iterateLine ? i + 1 : "");
      }

      lineArray.push(lineNode);
      l = curLine.length;

      for (j = 0; j < l; j++) {
        if (curLine[j].nodeName !== "BR") {
          node = curLine[j];
          lineNode.appendChild(node);
          addWordSpaces && node._wordEnd && lineNode.appendChild(_doc.createTextNode(" "));

          if (absolute) {
            if (j === 0) {
              lineNode.style.top = node._y + "px";
              lineNode.style.left = paddingLeft + offset + "px";
            }

            node.style.top = "0px";

            if (offset) {
              node.style.left = node._x - offset + "px";
            }
          }
        }
      }

      if (l === 0) {
        //if there are no nodes in the line (typically meaning there were two consecutive <br> tags, just add a non-breaking space so that things display properly.
        lineNode.innerHTML = "&nbsp;";
      } else if (!words && !chars) {
        _deWordify(lineNode);

        _swapText(lineNode, String.fromCharCode(160), " ");
      }

      if (absolute) {
        lineNode.style.width = lineWidth;
        lineNode.style.height = node._h + "px";
      }

      element.appendChild(lineNode);
    }

    element.style.cssText = style;
  } //if everything shifts to being position:absolute, the container can collapse in terms of height or width, so fix that here.


  if (absolute) {
    if (origHeight > element.clientHeight) {
      element.style.height = origHeight - padTopAndBottom + "px";

      if (element.clientHeight < origHeight) {
        //IE8 and earlier use a different box model - we must include padding and borders
        element.style.height = origHeight + borderTopAndBottom + "px";
      }
    }

    if (origWidth > element.clientWidth) {
      element.style.width = origWidth - padLeftAndRight + "px";

      if (element.clientWidth < origWidth) {
        //IE8 and earlier use a different box model - we must include padding and borders
        element.style.width = origWidth + borderLeftAndRight + "px";
      }
    }
  }

  isFlex && (prevInlineDisplay ? element.style.display = prevInlineDisplay : element.style.removeProperty("display"));

  _pushReversed(allChars, charArray);

  words && _pushReversed(allWords, wordArray);

  _pushReversed(allLines, lineArray);
},
    _splitRawText = function _splitRawText(element, vars, wordStart, charStart) {
  var tag = vars.tag ? vars.tag : vars.span ? "span" : "div",
      types = vars.type || vars.split || "chars,words,lines",
      //words = (types.indexOf("words") !== -1),
  chars = ~types.indexOf("chars"),
      absolute = _isAbsolute(vars),
      wordDelimiter = vars.wordDelimiter || " ",
      space = wordDelimiter !== " " ? "" : absolute ? "&#173; " : " ",
      wordEnd = "</" + tag + ">",
      wordIsOpen = 1,
      specialChars = vars.specialChars ? typeof vars.specialChars === "function" ? vars.specialChars : _findSpecialChars : null,
      //specialChars can be an array or a function. For performance reasons, we always set this local "specialChars" to a function to which we pass the remaining text and whatever the original vars.specialChars was so that if it's an array, it works with the _findSpecialChars() function.
  text,
      splitText,
      i,
      j,
      l,
      character,
      hasTagStart,
      testResult,
      container = _doc.createElement("div"),
      parent = element.parentNode;

  parent.insertBefore(container, element);
  container.textContent = element.nodeValue;
  parent.removeChild(element);
  element = container;
  text = getText(element);
  hasTagStart = text.indexOf("<") !== -1;

  if (vars.reduceWhiteSpace !== false) {
    text = text.replace(_multipleSpacesExp, " ").replace(_stripExp, "");
  }

  if (hasTagStart) {
    text = text.split("<").join("{{LT}}"); //we can't leave "<" in the string, or when we set the innerHTML, it can be interpreted as a node
  }

  l = text.length;
  splitText = (text.charAt(0) === " " ? space : "") + wordStart();

  for (i = 0; i < l; i++) {
    character = text.charAt(i);

    if (specialChars && (testResult = specialChars(text.substr(i), vars.specialChars))) {
      // look for any specialChars that were declared. Remember, they can be passed in like {specialChars:["मी", "पा", "है"]} or a function could be defined instead. Either way, the function should return the number of characters that should be grouped together for this "character".
      character = text.substr(i, testResult || 1);
      splitText += chars && character !== " " ? charStart() + character + "</" + tag + ">" : character;
      i += testResult - 1;
    } else if (character === wordDelimiter && text.charAt(i - 1) !== wordDelimiter && i) {
      splitText += wordIsOpen ? wordEnd : "";
      wordIsOpen = 0;

      while (text.charAt(i + 1) === wordDelimiter) {
        //skip over empty spaces (to avoid making them words)
        splitText += space;
        i++;
      }

      if (i === l - 1) {
        splitText += space;
      } else if (text.charAt(i + 1) !== ")") {
        splitText += space + wordStart();
        wordIsOpen = 1;
      }
    } else if (character === "{" && text.substr(i, 6) === "{{LT}}") {
      splitText += chars ? charStart() + "{{LT}}" + "</" + tag + ">" : "{{LT}}";
      i += 5;
    } else if (character.charCodeAt(0) >= 0xD800 && character.charCodeAt(0) <= 0xDBFF || text.charCodeAt(i + 1) >= 0xFE00 && text.charCodeAt(i + 1) <= 0xFE0F) {
      //special emoji characters use 2 or 4 unicode characters that we must keep together.
      j = ((text.substr(i, 12).split(emojiExp) || [])[1] || "").length || 2;
      splitText += chars && character !== " " ? charStart() + text.substr(i, j) + "</" + tag + ">" : text.substr(i, j);
      i += j - 1;
    } else {
      splitText += chars && character !== " " ? charStart() + character + "</" + tag + ">" : character;
    }
  }

  element.outerHTML = splitText + (wordIsOpen ? wordEnd : "");
  hasTagStart && _swapText(parent, "{{LT}}", "<"); //note: don't perform this on "element" because that gets replaced with all new elements when we set element.outerHTML.
},
    _split = function _split(element, vars, wordStart, charStart) {
  var children = _toArray(element.childNodes),
      l = children.length,
      absolute = _isAbsolute(vars),
      i,
      child;

  if (element.nodeType !== 3 || l > 1) {
    vars.absolute = false;

    for (i = 0; i < l; i++) {
      child = children[i];
      child._next = child._isFirst = child._parent = child._wordEnd = null;

      if (child.nodeType !== 3 || /\S+/.test(child.nodeValue)) {
        if (absolute && child.nodeType !== 3 && _getComputedStyle(child).display === "inline") {
          //if there's a child node that's display:inline, switch it to inline-block so that absolute positioning works properly (most browsers don't report offsetTop/offsetLeft properly inside a <span> for example)
          child.style.display = "inline-block";
          child.style.position = "relative";
        }

        child._isSplit = true;

        _split(child, vars, wordStart, charStart); //don't split lines on child elements

      }
    }

    vars.absolute = absolute;
    element._isSplit = true;
    return;
  }

  _splitRawText(element, vars, wordStart, charStart);
};

var SplitText = /*#__PURE__*/function () {
  function SplitText(element, vars) {
    _coreInitted || _initCore();
    this.elements = _toArray(element);
    this.chars = [];
    this.words = [];
    this.lines = [];
    this._originals = [];
    this.vars = vars || {};
    this.split(vars);
  }

  var _proto = SplitText.prototype;

  _proto.split = function split(vars) {
    this.isSplit && this.revert();
    this.vars = vars = vars || this.vars;
    this._originals.length = this.chars.length = this.words.length = this.lines.length = 0;

    var i = this.elements.length,
        tag = vars.tag ? vars.tag : vars.span ? "span" : "div",
        wordStart = _cssClassFunc(vars.wordsClass, tag),
        charStart = _cssClassFunc(vars.charsClass, tag),
        origHeight,
        origWidth,
        e; //we split in reversed order so that if/when we position:absolute elements, they don't affect the position of the ones after them in the document flow (shifting them up as they're taken out of the document flow).


    while (--i > -1) {
      e = this.elements[i];
      this._originals[i] = e.innerHTML;
      origHeight = e.clientHeight;
      origWidth = e.clientWidth;

      _split(e, vars, wordStart, charStart);

      _setPositionsAfterSplit(e, vars, this.chars, this.words, this.lines, origWidth, origHeight);
    }

    this.chars.reverse();
    this.words.reverse();
    this.lines.reverse();
    this.isSplit = true;
    return this;
  };

  _proto.revert = function revert() {
    var originals = this._originals;

    if (!originals) {
      throw "revert() call wasn't scoped properly.";
    }

    this.elements.forEach(function (e, i) {
      return e.innerHTML = originals[i];
    });
    this.chars = [];
    this.words = [];
    this.lines = [];
    this.isSplit = false;
    return this;
  };

  SplitText.create = function create(element, vars) {
    return new SplitText(element, vars);
  };

  return SplitText;
}();
SplitText.version = "3.9.0";

//these are enqueued from a cdn in functions, except for split text which is part of club greensock
gsap.registerPlugin(ScrollTrigger, SplitText);
const headings = document.querySelectorAll("h1, .skew");
const fadesTop = document.querySelectorAll(".fadein-top, .wp-block-column");
const fadesBottom = document.querySelectorAll(".fadein-bottom");
const fadesLeft = document.querySelectorAll(".fadein-left");
const fadesRight = document.querySelectorAll(".fadein-right");
const fadeIn = document.querySelectorAll(".fadein, h3, .wp-block-image");
const separators = document.querySelectorAll("hr");

function setupSplits() {
  headings.forEach(heading => {
    // Reset if needed
    if (heading.anim) {
      heading.anim.progress(1).kill();
      heading.split.revert();
    }

    const split = new SplitText(heading, {
      type: "lines,words,chars",
      linesClass: "split-line"
    }); // Set up the anim

    gsap.from(split.lines, {
      scrollTrigger: {
        toggleActions: "restart pause resume reverse",
        trigger: heading,
        start: 'top 100%'
      },
      duration: 1,
      yPercent: 100,
      ease: 'power2.out',
      skewY: .1,
      skewX: 0,
      rotationX: 180,
      stagger: 0.1,
      autoAlpha: 0,
      delay: .2
    });
    gsap.to(heading, {
      yPercent: 0,
      skewY: 0,
      skewX: 0,
      rotationX: 0,
      ease: 'circ.out',
      duration: 1,
      transformOrigin: "0% 100%",
      autoAlpha: 1
    }); //chars
    // gsap.from(split.chars, {
    //   scrollTrigger: {
    //     toggleActions: "restart pause resume reverse",
    //     trigger: heading,
    //     start: 'top 100%',
    //   },
    //   duration: .7,
    //   yPercent: 100,
    //   ease: "power1",
    //   skewY: 3,
    //   stagger: 0.03,
    //   autoAlpha: 0
    // })
    // gsap.to(heading, {
    //   y: 0,
    //   ease: "circ.out",
    //   duration: .7,
    //   autoAlpha: 1
    // });
  }); // labels.forEach(label => {
  //   if (label.anim) {
  //     label.anim.progress(1).kill();
  //     label.split.revert();
  //   }
  //   const tl = gsap.timeline({
  //     // yes, we can add it to an entire timeline!
  //     scrollTrigger: {
  //       trigger: label,
  //       start: "top 100%", // when the top of the trigger hits the top of the viewport
  //       end: "+=5000", // end after scrolling 500px beyond the start
  //       ease: "power2.easeOut",
  //       toggleActions: "restart pause resume reverse",
  //     }
  //   });
  //   tl.from(label, {
  //       scrollTrigger: {
  //         trigger: label,
  //         start: "top 100%", // when the top of the trigger hits the top of the viewport
  //         end: "+=5000", // end after scrolling 500px beyond the start
  //         ease: "power2.easeOut",
  //         toggleActions: "restart pause resume reverse",
  //       },
  //       duration: 1,
  //       ease: "power2.easeOut",
  //       y: 100,
  //     })
  //     .to(label, {
  //       autoAlpha: 1,
  //       y: 0,
  //       duration: 1,
  //     })
  // });
  // emphasis.forEach(emphasis => {
  //   // Reset if needed
  //   if (emphasis.anim) {
  //     emphasis.anim.progress(1).kill();
  //     emphasis.split.revert();
  //   }
  //   const split = new SplitText(emphasis, {
  //     type: "lines,words,chars",
  //     linesClass: "split-line"
  //   });
  //   // Set up the anim
  //   gsap.from(split.chars, {
  //     scrollTrigger: {
  //       toggleActions: "restart pause resume reverse",
  //       trigger: emphasis,
  //       start: 'top 100%',
  //     },
  //     duration: 2,
  //     yPercent: 100,
  //     ease: 'power3.out',
  //     skewY: 3,
  //     skewX: 1,
  //     stagger: 0.05,
  //     autoAlpha: 0,
  //     delay: 1
  //   })
  //   gsap.to(emphasis, {
  //     y: 0,
  //     ease: "circ.out",
  //     duration: 2,
  //     autoAlpha: 1,
  //     delay: 1
  //   });
  // });

  fadesTop.forEach(fade => {
    if (fade.anim) {
      fade.anim.progress(1).kill();
      fade.split.revert();
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: fade,
        start: "top 100%",
        toggleActions: "restart pause resume reverse"
      }
    });
    tl.fromTo(fade, {
      opacity: 0,
      y: -50,
      duration: 1
    }, {
      opacity: 1,
      duration: 1,
      autoAlpha: 1,
      y: 0,
      delay: .3
    });
  });
  fadesBottom.forEach(fade => {
    if (fade.anim) {
      fade.anim.progress(1).kill();
      fade.split.revert();
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: fade,
        start: "top 100%",
        toggleActions: "restart pause resume reverse"
      }
    });
    tl.fromTo(fade, {
      opacity: 0,
      y: 100
    }, {
      opacity: 1,
      duration: 1,
      autoAlpha: 1,
      y: 0,
      delay: 0.5
    });
  });
  fadesLeft.forEach(fade => {
    if (fade.anim) {
      fade.anim.progress(1).kill();
      fade.split.revert();
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: fade,
        start: "top 100%",
        toggleActions: "restart pause resume reverse"
      }
    });
    tl.fromTo(fade, {
      opacity: 0,
      x: 100
    }, {
      opacity: 1,
      duration: 1,
      autoAlpha: 1,
      x: 0,
      delay: 0.5
    });
  });
  fadesRight.forEach(fade => {
    if (fade.anim) {
      fade.anim.progress(1).kill();
      fade.split.revert();
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: fade,
        start: "top 100%",
        toggleActions: "restart pause resume reverse"
      }
    });
    tl.fromTo(fade, {
      opacity: 0,
      x: -100
    }, {
      opacity: 1,
      duration: 1,
      autoAlpha: 1,
      x: 0,
      delay: 0.5
    });
  });
  fadeIn.forEach(fadein => {
    if (fadein.anim) {
      fadein.anim.progress(1).kill();
      fadein.split.revert();
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: fadein,
        start: "top 100%",
        toggleActions: "restart pause resume reverse"
      }
    });
    tl.fromTo(fadein, {
      opacity: 0
    }, {
      opacity: 1,
      duration: 1,
      autoAlpha: 1,
      delay: 0.5
    });
  });
  separators.forEach(separator => {
    if (separator.anim) {
      separator.anim.progress(1).kill();
      separator.split.revert();
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: separator,
        start: "top bottom",
        toggleActions: "restart pause resume reverse"
      }
    });
    tl.fromTo(separator, {
      width: 0,
      duration: 1
    }, {
      duration: 1,
      autoAlpha: 1,
      width: '100%'
    });
  }); // gsap.to(".img-wrapper > img", {
  //   y: -100,
  //   duration: 1,
  //   ease: "none",
  //   scrollTrigger: {
  //     trigger: ".img-wrapper > img",
  //     // start: "top bottom", // the default values
  //     // end: "bottom top",
  //     scrub: true
  //   },
  // });
}

ScrollTrigger.addEventListener("scroll", setupSplits);
setupSplits(); //hovery images
// const pressImage = document.querySelectorAll(".press .img-wrapper");
// const pos = {
//   x: window.innerWidth / 2,
//   y: window.innerHeight / 2
// };
// const mouse = {
//   x: pos.x,
//   y: pos.y
// };
// const speed = 0.35;
// const xSet = gsap.quickSetter(pressImage, "x", "px");
// const ySet = gsap.quickSetter(pressImage, "y", "px");
// window.addEventListener("mousemove", e => {
//   mouse.x = e.x / 6;
//   mouse.y = e.y / 10;
// });
// gsap.ticker.add(() => {
//   // adjust speed for higher refresh monitors
//   const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
//   pos.x += (mouse.x - pos.x) * dt;
//   pos.y += (mouse.y - pos.y) * dt;
//   xSet(pos.x);
//   ySet(pos.y);
// });

console.log('🥑 %cMade by Monk', 'background: #616a2e; color: #f4e9e2; padding: 5px 17px; border-radius: 3px;');
console.log(' %chttps://monk.com.au ', 'padding: 5px 13px;');
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
    $site.toggleClass("menu-open"); // if ( $('body').hasClass('menu-open') ) {
    // 	$('#mobile-menu .label').text('Close')
    // } else {
    // 	$('#mobile-menu .label').text('Menu')
    // }
  }); //close menu with an outside click (basically anywhere on .site-content)

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
//# sourceMappingURL=script-a5cef51dc.js.map
