<?php
/**
 * SVG icons related functions
 *
 * @package WordPress
 * @subpackage Twenty_Nineteen
 * @since 1.0.0
 */

/**
 * Gets the SVG code for a given icon.
 */
function get_icon( $icon, $size = 24, $class = '', $title = false, $desc = false  ) {
	return SVG_Icons::get_svg( 'ui', $icon, $size, $class, $title, $desc );
}

/**
 * Gets the SVG code for a given social icon.
 */
function get_social_icon( $icon, $size = 24, $wrap_link = true, $class = '', $title = false, $desc = false  ) {
	return SVG_Icons::get_svg( 'social', $icon, $size, $wrap_link, $class, $title, $desc );
}

/**
 * Detects the social network from a URL and returns the SVG code for its icon.
 */
function get_social_link_svg( $uri, $size = 24, $wrap_link = false, $class = 'social-icon', $title = false,$desc = false) {
	//set the svg
	$svg = SVG_Icons::get_social_link_svg( $uri, $size, $wrap_link, $class, $title, $desc );

	if ( empty( $svg ) ) {
		$svg = get_social_icon( 'chain', $size, $wrap_link, $class, $title, $desc );
	}
	//return the svg
	if ( $wrap_link) {
		return '<a href="'.$uri.'" target="_blank"><div class="screen-reader-text">'.$title.'</div>'.$svg.'</a>';
	} else {
		return $svg;
	}
}

/**
 * Display SVG icons in social links menu.
 *
 * @param  string  $item_output The menu item output.
 * @param  WP_Post $item        Menu item object.
 * @param  int     $depth       Depth of the menu.
 * @param  array   $args        wp_nav_menu() arguments.
 * @return string  $item_output The menu item output with social icon.
 */
function nav_menu_social_icons( $item_output, $item, $depth, $args ) {
	// Change SVG icon inside social links menu if there is supported URL.
	if ( 'social' === $args->theme_location ) {
		$svg = get_social_link_svg( $item->url, 24, false,'social-link' );
		if ( empty( $svg ) ) {
			$svg = get_social_icon( 'chain' );
		}
		$item_output = str_replace( $args->link_after, '</span>' . $svg, $item_output );
	}

	return $item_output;
}
add_filter( 'walker_nav_menu_start_el', 'nav_menu_social_icons', 10, 4 );