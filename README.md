# Through centuries-old myth, tall stories, hand waving, a whole lotta [_s], [Monk] faff, and general hocus pocus, the power of unicorn tears have finally been harnessed to create the quintessential WordPress starter theme.

**Featuring:**
  - premade mobile menu styles
  - a blinged out command line
  - unopinionated template files
  - helpful theme functions
  - predefined acf page layouts such as columns, accordions, and cards

**With this theme and it's related gulpfile you can:**
  - add inline svg icons and social links with ease
  - change responsive menu styles using a single class
  - manage and develop multiple WordPress installs
  - generate automatic favicons
  - use es6 js
  - easily customise a woocommerce build with added mini cart dropdown functionality
  - incorporate modular scale responsive typography
  - use a tried and tested simple display:table grid framework or roll your own
  - optional swipebox, slick slider
  - modify default gutenberg block styles with ease
  - generate favicons
  - generate a site manifest
  - optimise images as you develop

As Phat Kitty Sr. says,

> I always start the day with a good cuppa joe
> doused with a good 100mL of unicorn tears 💋


**Unicorn Tears was brought to you by...**
```
  .^====^.
 =( ^--^ )=    ME!!! The resident phat kitty. Meow :3
  /      \   /~
+( |    | )//
```

# Features

### Social media menu
You can build a social menu by making a new menu in the Appearance editor, and assigning it to the Social menu using custom links. Any links related to social medias will automically be converted to inline svg social icons. Any unrecognized networks will show a chain icon.

---

### Inline svg icon functions
Commonly used SVG icons can now be called by the function `get_icon('$svgname, $size, $title, $desc')`.

** `get_icon()` or  `get_social_icon()` parameters:**
- `$svgname` = name of svg defined in the array
- `$size` = size of svg required
- `$title = SVG title (makes it more accessible)
- `$desc` = SVG description ( makes it more accessible)

Alternatively you can use, `get_social_link_svg()` to display a svg based on a given url.

**` get_social_link_svg()` parameters:**
- `$uri` = url of social network
- `$size` = size of svg required
- `$wrap_link` = wrap displayed svg with the given url
- `$title = SVG title (makes it more accessible)
- `$desc` = SVG description ( makes it more accessible)

Custom SVGs can be defined as inline svg's in the relevant array in `inc/class-svg-icons.php`

---

### Responsive menus

There are several predefined menu classes you can use for the nav menu. Just add the relevant class to `.menu-wrapper` in the header.

---

### Page layouts

Page layouts are based on ACF's custom fields. Custom ones can be added accordingly.

---

### Favicons
Favicons can be generated automatically and put in the /dist folder if there is a `favicon.png` placed in `src/images`