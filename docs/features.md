# Theme Features

## Menu styles
This theme currently has five custom mobile menu styles. These can be activated on the fly by using one class.
To use:
1. Navigate to ``scss/navigation/_menus.scss``
2. At the bottom of the file import the mobile menu you would like to use eg. ``@import "menus/dropdown"; ``
3. Append the name of the menu as a class to the menu wrapper in header.php eg. ``<div class="menu-wrapper dropdown>``
4. Edit the menu styles according to your project

Sidenote: Everything inside the menu wrapper will be contained within the mobile menu, meaning you can have a combination of menus, images, and other content. I generally put all mobile menu content inside the overlay div to account for custom spacings and margins.

## Bootstrap sass
Bootstrap 3's css is automatically include in the scss folder. Comment what you need in ``scss/_bootstrap.scss``.
Bootstrap JS files can be loaded in through bower and copied to the js folder as needed.

## Hamburger styles
This theme uses [CSS Hamburgers]. You can specify the style and edit animations, colours etc. in ``scss/navigation/mobile/_hamburgers.scss``. Make sure to change the class accordingly in header.php if you decide to change the hamburger style.

## Browser hacks
Any browser hacks can be written in their browser-specific stylesheet in ``scss/browsers``. Make sure to import the hack file in style.scss if you end up using it.

## Built in swipebox
Swipebox is automatically enabled with this theme. To turn off just make sure swipebox is removed as a dependency in bower.json. It would also be a good idea to uncomment swipebox styles in ``scss/media/_media.scss``
Asides from swipebox, lightgallery and modaal's css is also included in the scss folder- all you need are the js files.

## CSS Icons
Pure CSS icons from cssicon.space are found in ``scss/elements/_icons.scss``. Usage: ``<div class="close icon"></div>``. There are also pure CSS arrows using arrow-* eg. ``<div class="arrow-left"></div>``

## Fontello
This theme comes with icons preloaded from fontello. If you want to change the fontello font simply replace the fonts in ``fonts/fontello`` and replace the fontello icon codes in ``scss/typography/fonts/_fontello-codes.scss``

### ✨ If you have any other sugestions for features to add bring it up with the phat kitty ✨