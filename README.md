# Through centuries-old myth, tall stories, hand waving, a whole lotta _s, Monk faff, and general hocus pocus, the power of unicorn tears have finally been harnessed to create the quintessential WordPress starter theme.

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
  - optional fancybox and simple modal built in
  - generate favicons
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
You can build a social menu by making a new menu in the Appearance editor, and assigning it to the Social menu using custom links. Any links related to social medias will automically be converted to inline svg social icons. Any unrecognized networks will show a chain icon. New social icons can be added in `inc/class-svg-icons.php`.

---

### Inline svg icon functions
Commonly used SVG icons can now be called by the function `get_icon('$icon, $size, $class, $title, $desc')`.

** `get_icon()` or  `get_social_icon()` parameters:**
- `$svgname` = name of svg defined in the array (required)
- `$size` = size of svg required (required)
- `class` = icon class (optional)
- `$title = SVG title (optional)
- `$desc` = SVG description (optional)
eg `<?php echo get_icon('arrow',20,'arrow-icon','arrow');?>`
eg. <?php echo get_social_icon('instagram',20,'ig');?>

Alternatively you can use, `get_social_link_svg()` to display a svg based on a given social media url. New icons can be defined in `inc/class-svg-icons.php`

**`get_social_link_svg()` parameters:**
- `$uri` = url of social network (required)
- `$size` = size of svg required (required)
- `class` = icon class (optional)
- `$wrap_link` = wrap displayed svg with the given url  (optional)
- `$title = SVG title (optional)
- `$desc` = SVG description (optional)

eg `<?php echo get_social_link_svg('https://facebook.com',20,'fb',false,'Facebook');?>`
Custom SVGs can be defined as inline svg's in the relevant array in `inc/class-svg-icons.php`

---

### Responsive menus

There are several predefined menu classes you can use for the nav menu (found in _menus.scss).
To use include the relevant class to `.menu-wrapper` in the header and compile the associated sass file.

---

### Page layouts

Page layouts are based on ACF Pro custom fields.
---

### Favicons
Favicons will be created automatically if there is a `favicon.png` placed in `src/images` (but will have to be manually linked in the header).