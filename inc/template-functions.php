<?php
/**
 * Additional features to allow styling of the templates
 *
 * @package Unicorn_Tears
 */

/**
 * Adds custom classes to the array of body classes.
 *
 * @param array $classes Classes for the body element.
 * @return array
 */
function unicorn_tears_body_classes( $classes ) {
	// Adds a class of group-blog to blogs with more than 1 published author.
	if ( is_multi_author() ) {
		$classes[] = 'group-blog';
	}

	// Adds a class of hfeed to non-singular pages.
	if ( ! is_singular() ) {
		$classes[] = 'hfeed';
	}

	//page features
	$feature = get_field('feature_options');
	// Check for post thumbnail.
	if ( has_post_thumbnail() && $feature === 'image' ||  $feature === 'video' ||  $feature === 'slider') {
		$classes[] = 'has-feature';
	} else {
		$classes[] = 'missing-feature';
	}

	// Check if we're showing comments.
	// if ( $post && ( ( 'post' === $post_type || comments_open() || get_comments_number() ) && ! post_password_required() ) ) {
	// 	$classes[] = 'showing-comments';
	// } else {
	// 	$classes[] = 'not-showing-comments';
	// }

	// Slim page template class names (class = name - file suffix).
	if ( is_page_template() ) {
		$classes[] = basename( get_page_template_slug(), '-template' );
	}

	// Check if posts have single pagination.
	if ( is_single() && ( get_next_post() || get_previous_post() ) ) {
		$classes[] = 'has-single-pagination';
	} else {
		$classes[] = 'has-no-pagination';
	}

	//make a class out of the page slug - handy instead of page ids
	$query = get_queried_object();
	if ( isset($query->slug)) {
		$classes[] = 'page-'.$query->slug;
	} elseif(isset($query->post_name)) {
		$classes[] = 'page-'.$query->post_name;
	}elseif(isset($query->name)) {
		$classes[] = 'page-'.$query->name;
	}

	//check if page is loaded on a mobile device
	if ( wp_is_mobile() ) {
	$classes[] = 'is-touch';
	} else {
	$classes[] = 'no-touch';
	}

	return $classes;
}
add_filter( 'body_class', 'unicorn_tears_body_classes' );

/**
 * Add a pingback url auto-discovery header for singularly identifiable articles.
 */
function unicorn_tears_pingback_header() {
	if ( is_singular() && pings_open() ) {
		echo '<link rel="pingback" href="', esc_url( get_bloginfo( 'pingback_url' ) ), '">';
	}
}
add_action( 'wp_head', 'unicorn_tears_pingback_header' );


//custom menu classes - modify conditional to suit
// function add_additional_class_on_li($classes, $item, $args) {
// 	if($item->post_title === 'Models' && is_singular('models') || $item->post_title === 'Models' && is_page('shortlist')) {
// 			$classes[] = 'current-menu-item';
// 	}
// 	return $classes;
// }
// add_filter('nav_menu_css_class', 'add_additional_class_on_li', 1, 3);


/**
 * Add a widget to the dashboard.
 *
 * This function is hooked into the 'wp_dashboard_setup' action below.
 */

function unicorn_tears_add_dashboard_widgets() {

	wp_add_dashboard_widget(
		'monk_welcome',         // Widget slug.
		__('Welcome' , 'unicorn-tears'),         // Title.
		'unicorn_tears_welcome_widget' // Display function.
	);

	wp_add_dashboard_widget(
		'monk_quicklinks',         // Widget slug.
		__('Quick Links', 'unicorn-tears'),         // Title.
		'unicorn_tears_quicklinks_widget' // Display function.
	);
}
add_action( 'wp_dashboard_setup', 'unicorn_tears_add_dashboard_widgets' );

/**
 * Create the dashboard widgets
 */
function unicorn_tears_welcome_widget() {
	echo "<pre>\n     ┌╌┐\n ";
	echo "   .╌╌╌.\n ";
	echo "   (  ◓ ▻     Made by <a href='http://monk.com.au' target='_blank'>Monk</a> \n";
	echo "  /   ◜  \\\n";
	echo " /   {    }\n" ;
	echo " \    ◟  /◞\n";
	echo " \︿︿︿︿==\n </pre>";
}

function unicorn_tears_quicklinks_widget() {
	echo __('✏️ <a href="/wp-admin/post-new.php">Add a new post</a><br>', 'unicorn-tears');
	echo __('✏️ <a href="/wp-admin/post-new.php?post_type=page">Add a new page</a><br>', 'unicorn-tears');
	echo __('🔖 <a href="/wp-admin/nav-menus.php">Update the navigation menus</a><br>', 'unicorn-tears');
	echo __('💌 <a href="/wp-admin/admin.php?page=gf_entries">View your form entries</a><br>', 'unicorn-tears');
	echo __('⚙️ <a href="/wp-admin/options-general.php">Manage your site settings</a><br>', 'unicorn-tears');
	echo __('<a href="mailto:paul@monk.com.au" class="monk-btn">Questions? Email us.</a>', 'unicorn-tears');

}

function unicorn_tears_admin_color_schemes() {
	//Get the theme directory
	$theme_dir = get_template_directory_uri();

	//Ocean
	wp_admin_css_color( 'Monk', __('Monk', 'unicorn-tears'),
		$theme_dir . '/dist/css/admincolors.css',
		array( '#f4e9e2', '#33312d', '#616a2e', '#707070' )
	);
}
add_action('admin_init', 'unicorn_tears_admin_color_schemes');

function set_default_admin_color($user_id) {
	$args = array(
		'ID' => $user_id,
		'admin_color' => 'Monk'
	);
	wp_update_user( $args );
}
add_action('user_register', 'set_default_admin_color');

