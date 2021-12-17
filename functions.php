<?php
/**
 * Unicorn Tears functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Unicorn_Tears
 */

if (!defined('ON_MONK')) {
	define('ON_MONK', false);
}

if ( ! function_exists( 'unicorn_tears_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function unicorn_tears_setup() {
	/*
	 * Make theme available for translation.
	 * Translations can be filed in the /languages/ directory.
	 * If you're building a theme based on Unicorn Tears, use a find and replace
	 * to change 'unicorn-tears' to the name of your theme in all the template files.
	 */
	// load_theme_textdomain( 'unicorn-tears', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support( 'title-tag' );

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
	 */
	add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus( array(
		'primary' => esc_html__( 'Primary', 'unicorn-tears' ),
		'social' => esc_html__( 'Social', 'unicorn-tears' ),
	) );

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support( 'html5', array(
		'search-form',
		// 'comment-form',
		// 'comment-list',
		'gallery',
		'caption',
	) );

	// Add theme support for selective refresh for widgets.
	add_theme_support( 'customize-selective-refresh-widgets' );

    /**
     * Enable support for the following post formats:
     * aside, gallery, quote, image, and video
     */
	//add_theme_support( 'post-formats', array ( 'aside', 'gallery', 'quote', 'image', 'video' ) );

}
endif;
add_action( 'after_setup_theme', 'unicorn_tears_setup' );


/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function unicorn_tears_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'unicorn_tears_content_width', 640 );
}
add_action( 'after_setup_theme', 'unicorn_tears_content_width', 0 );


/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function unicorn_tears_widgets_init() {
	register_sidebar( array(
		'name'          => esc_html__( 'Sidebar', 'unicorn-tears' ),
		'id'            => 'sidebar-1',
		'description'   => esc_html__( 'Add widgets here.', 'unicorn-tears' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );
}
add_action( 'widgets_init', 'unicorn_tears_widgets_init' );


/**
 * Enqueue scripts and styles.
 */
function unicorn_tears_scripts() {
	// wp_deregister_script( 'jquery-core' );
	// wp_register_script( 'jquery-core', "https://code.jquery.com/jquery-3.1.1.min.js", array(), '3.1.1' );
	// wp_deregister_script( 'jquery-migrate' );
	// wp_register_script( 'jquery-migrate', "https://code.jquery.com/jquery-migrate-3.0.0.min.js", array(), '3.0.0' );
	// wp_register_script( 'aos', "https://unpkg.com/aos@2.3.1/dist/aos.js" );
	$scripts = glob('wp-content/themes/unicorn-tears/dist/js/script-*.js');
	$script = pathinfo($scripts[1])['basename'];
	$script_min = pathinfo($scripts[0])['basename'];

	// $styles = glob('wp-content/themes/unicorn-tears/dist/css/style-*.css');
	// $style = pathinfo($styles[0])['basename'];
	// $style_min = pathinfo($styles[1])['basename'];

	//localize data
	// Register the scripts
	if(ON_MONK) {
	//if any es6 scripts are used
	// wp_register_script( 'unicorn-tears-scripts', get_template_directory_uri() . '/dist/js/imports.js', array('jquery'), null, true);
			wp_register_style( 'unicorn-tears-styles', get_template_directory_uri() . '/dist/css/style.css',  null);
			wp_register_script( 'unicorn-tears-scripts', get_template_directory_uri() . '/dist/js/' . $script, array('jquery'), null, true);
	} else {
	// wp_register_script( 'unicorn-tears-scripts', get_template_directory_uri() . '/dist/js/imports.js', array('jquery'), null, true);
			wp_register_style( 'unicorn-tears-styles', get_template_directory_uri() . '/dist/css/style.min.css', null );
			wp_register_script( 'unicorn-tears-scripts', get_template_directory_uri() . '/dist/js/' . $script_min, array('jquery'), null, true);
	};


	//enqueue scripts and styles
	//css
	// wp_enqueue_style( 'aos-styles', 'https://unpkg.com/aos@2.3.1/dist/aos.css' );
	// wp_enqueue_style( 'csshead', 'https://csswizardry.com/ct/ct.css' );
	wp_enqueue_style( 'typekit', 'https://use.typekit.net/zcd0ukj.css' );
	wp_enqueue_style( 'unicorn-tears-styles');

	//js
	wp_enqueue_script('jquery');
	// wp_enqueue_script('aos');
	// wp_enqueue_script('google-maps', 'https://maps.googleapis.com/maps/api/js?key=key', ['jquery'], date("dmY"), true );

	wp_enqueue_script('gsap', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.8.0/gsap.min.js');
	wp_enqueue_script('gsap-scrollTrigger', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.8.0/ScrollTrigger.min.js');

	wp_enqueue_script('unicorn-tears-scripts');
	wp_enqueue_script('unicorn-tears-scripts-es');

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
			wp_enqueue_script( 'comment-reply' );
	}

	/*!
	♡♡♡♡♡♡♡♡♡♡♡
	♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
	Localization
	♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
	♡♡♡♡♡♡♡♡♡♡♡
	*/
	//theme url
	$site = array( 'url' => get_template_directory_uri() );
	wp_localize_script( 'unicorn-tears-scripts', 'site', $site );

	//nav menu
	$navcontent = array(
		'has_navigation' => 'false',
	);
	if ( has_nav_menu( 'primary' ) ) {
			$navcontent['has_navigation'] = 'true';
			$navcontent['expand']         = __( 'Expand child menu', 'unicorn-tears' );
			$navcontent['collapse']       = __( 'Collapse child menu', 'unicorn-tears' );
			$navcontent['iconOpen']           = '<span class="icon cross" aria-hidden="true"></span>';
			// $navcontent['iconClose']           = get_icon('cross_close',20);
	}
	wp_localize_script( 'unicorn-tears-scripts', 'navcontent', $navcontent );

	//gmaps vars
	if ( get_field( 'map_styles','option' ) || get_field( 'map_icon_colour','option' )  ) {
			$gmaps['mapstyles'] = get_field( 'map_styles','option');
			$gmaps['mapicon']   = get_field( 'map_icon_colour','option');

	wp_localize_script( 'unicorn-tears-scripts', 'gmaps', $gmaps );
}

}

add_action( 'wp_enqueue_scripts', 'unicorn_tears_scripts' );


function add_type_attribute($tag, $handle, $src) {
	if ( 'unicorn-tears-scripts' !== $handle ) {
			return $tag;
	}
	$tag = '<script type="module" src="' . esc_url( $src ) . '"></script>';
	return $tag;
}
add_filter('script_loader_tag', 'add_type_attribute' , 10, 3);

// function add_jquery_cdn_attributes( $html, $handle ) {
// if ( 'jquery' === $handle ) {
// 		return str_replace( "type='text/javascript'", 'type="text/javascript" integrity="sha256-pasqAKBDmFT4eHoN2ndd6lN370kFiGUFyTiUHWhU7k8=" crossorigin="anonymous"', $html );
// }
// return $html;
// }
// add_filter( 'script_loader_tag', 'add_jquery_cdn_attributes', 10, 2 );



/**
 * Customizer additions.
 */
// require get_template_directory() . '/inc/customizer.php';
/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Additional features to allow styling of the templates.
 */
require get_template_directory() . '/inc/template-functions.php';


/**
 * Load svg icon functions.
 */
require get_template_directory() . '/inc/class-svg-icons.php';
require get_template_directory() . '/inc/icon-functions.php';

/**
 * Load woocommerce functions
 */
// require get_template_directory() . '/inc/woocommerce.php';

/**
 * Additional features to allow styling of the templates.
 */
require get_template_directory() . '/inc/gutenberg.php';



//Detect JS
function javascript_detection() {
	echo "<script>(function(html){html.className = html.className.replace(/\bno-js\b/,'js')})(document.documentElement);</script>\n";
}
add_action( 'wp_head', 'javascript_detection', 0 );

//Add ACF options page
if( function_exists('acf_add_options_page') ) {
	acf_add_options_page();
}

//Allow SVG uploads
function cc_mime_types($mimes) {
	$mimes['svg'] = 'image/svg+xml';
	return $mimes;
}
add_filter('upload_mimes', 'cc_mime_types');

//place kitty
function place_kitty($width, $height) {
    $size = implode('/', func_get_args());
    echo "<img src='https://placekitten.com/g/$size' alt='Kitties!' >";

}

//map shortcode
// function my_acf_init() {
// 	acf_update_setting('google_api_key', 'key');
// }
// add_action('acf/init', 'my_acf_init');
// to use type [map] in visual editor
function maphtml() {
	ob_start();
	?>
		<?php

		$location = get_field('map','option');

		if( !empty($location) ):
		?>
			<div class="acf-map">
				<?php foreach ( $location as $marker) :?>
					<div class="marker" data-lat="<?php echo $marker['location']['lat']; ?>" data-lng="<?php echo $marker['location']['lng']; ?>">
						<p class="address"><?php echo $marker['location']['address']; ?></p>
					</div>
				<?php endforeach; ?>
			</div>
		<?php endif; ?>

<?php
	return ob_get_clean();

}
add_shortcode( 'map', 'maphtml' );


function get_page_ID() {
	if ( is_home() ) {
		$ID = get_option('page_for_posts');
	} elseif ( is_post_type_archive('product')) {
		$pageobj = get_page_by_path('shop');
		$ID = $pageobj->ID;
	} elseif ( class_exists( 'woocommerce' ) && is_product_category()) {
		$query = get_queried_object();
		$ID = $query->term_id;
		// $taxID = get_term_meta($id, 'thumbnail_id');
		// $ID = $taxID;
	} else {
		$ID = get_the_ID();
	}
	return $ID;
}


//add data titles if any
add_filter( 'nav_menu_link_attributes', function ( $atts, $item, $args ) {
	$atts['data-title'] = $item->title;

	return $atts;
}, 10, 3 );


//generate unique id for search forms etc
function get_unique_id( $prefix = '' ) {
	static $id_counter = 0;
	if ( function_exists( 'wp_unique_id' ) ) {
		return wp_unique_id( $prefix );
	}
	return $prefix . (string) ++$id_counter;
}


/*!
♡♡♡♡♡♡♡♡♡♡♡
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
Page Injections
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
♡♡♡♡♡♡♡♡♡♡♡
*/
//header injections
add_action('wp_head', 'header_tags');
function header_tags(){
	if ( get_field('header_tags','option') ) {
		echo get_field('header_tags','option');
	}
};

//body tags
add_action('wp_body_open', 'body_tags');
function body_tags(){
	if ( get_field('body_tags','option') ) {
		echo get_field('body_tags','option');
	}
};
//footer injections
add_action('wp_footer', 'footer_tags');
function footer_tags(){
	if ( get_field('footer_tags','option') ) {
		echo get_field('footer_tags','option');
	}
};



 /*!
♡♡♡♡♡♡♡♡♡♡♡
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
Button shortcode plus tiny mce button
♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
♡♡♡♡♡♡♡♡♡♡♡
*/
add_action( 'after_setup_theme', 'swp_theme_setup' );
if ( ! function_exists( 'swp_theme_setup' ) ) {
  function swp_theme_setup(){
    /********* TinyMCE Buttons ***********/
    add_action( 'init', 'swp_buttons' );
  }
}
/********* TinyMCE Buttons ***********/
if ( ! function_exists( 'swp_buttons' ) ) {
  function swp_buttons() {
    if ( ! current_user_can( 'edit_posts' ) && ! current_user_can( 'edit_pages' ) ) {
          return;
      }
      if ( get_user_option( 'rich_editing' ) !== 'true' ) {
          return;
      }
      add_filter( 'mce_external_plugins', 'swp_add_buttons' );
      add_filter( 'mce_buttons', 'swp_register_buttons' );
  }
}
if ( ! function_exists( 'swp_add_buttons' ) ) {
  function swp_add_buttons( $plugin_array ) {
      $plugin_array['swpbtn'] = get_stylesheet_directory_uri().'/dist/js/tinymce_buttons.js';
      return $plugin_array;
  }
}
if ( ! function_exists( 'swp_register_buttons' ) ) {
  function swp_register_buttons( $buttons ) {
      array_push( $buttons, 'swpbtn' );
      return $buttons;
  }
}

function button_shortcode( $atts ) {
	extract( shortcode_atts( array(
		'url' => '',
		'title' => '',
		'target' => '',
	), $atts ) );

	if (empty($atts['target'])) {
		$atts['target'] = 'self';
	}
	return '<a href="'. $atts['url'] . '" class="btn" target="_' . $atts['target'].'">' . $atts['title'] . '</a>';
}
add_shortcode( 'button', 'button_shortcode' );




/**
 * Archives
 */
/**
 * Filters the archive title and styles the word before the first colon.
 *
 * @param string $title Current archive title.
 *
 * @return string $title Current archive title.
 */
function unicorn_tears_get_the_archive_title( $title ) {

	$regex = apply_filters(
		'unicorn_tears_get_the_archive_title_regex',
		array(
			'pattern'     => '/(\A[^\:]+\:)/',
			'replacement' => '<span class="screen-reader-text">$1</span>',
		)
	);

	if ( empty( $regex ) ) {

		return $title;

	}

	return preg_replace( $regex['pattern'], $regex['replacement'], $title );

}

add_filter( 'get_the_archive_title', 'unicorn_tears_get_the_archive_title' );




/**
 * Add a Sub Nav Toggle to the Expanded Menu and Mobile Menu.
 *
 * @param stdClass $args An array of arguments.
 * @param string   $item Menu item.
 * @param int      $depth Depth of the current menu item.
 *
 * @return stdClass $args An object of wp_nav_menu() arguments.
 */
function unicorn_tears_add_sub_toggles_to_main_menu( $args, $item, $depth ) {
	// Wrap the menu item link contents in a div, used for positioning.
	$args->before = '<div class="ancestor-wrapper">';
	$args->after  = '';

	// Add a toggle to items with children.
	if ( in_array( 'menu-item-has-children', $item->classes, true ) ) {

		$toggle_target_string = '.menu-modal .menu-item-' . $item->ID . ' > .sub-menu';

		// Add the sub menu toggle.
		$args->after .= '<button class="dropdown-toggle" data-toggle-target="' . $toggle_target_string . '" aria-expanded="false"><span class="screen-reader-text">' . __( 'Show sub menu', 'unicorn-tears' ) . '</span>' . get_icon('arrow',15,'toggle-icon'). '</button>';

	}

	// Close the wrapper.
	$args->after .= '</div><!-- .ancestor-wrapper -->';

	return $args;

}

add_filter( 'nav_menu_item_args', 'unicorn_tears_add_sub_toggles_to_main_menu', 10, 3 );


/**
 * Debug function to show the name of the current template being used
 */
function show_template() {
	global $template;
	if ( is_user_logged_in() ) {
		echo '<div style="background-color:#000;color:#fff">';
		print_r( $template );
		if ( is_single() ) {
			echo ' (and using Post Format: ' . ucfirst( get_post_format() ? get_post_format() : 'standard' ) . ')';
		}
		echo '</div>';
	}
}
// add_action( 'wp_head', 'show_template' );



//disable tabindex changes
add_filter( 'gform_tabindex', '__return_false' );

