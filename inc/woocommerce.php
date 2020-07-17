<?php
/**
 * WooCommerce Compatibility File
 *
 * @link https://woocommerce.com/
 *
 * @package unicorn-tears
 */

/**
 * WooCommerce setup function.
 *
 * @link https://docs.woocommerce.com/document/third-party-custom-theme-compatibility/
 * @link https://github.com/woocommerce/woocommerce/wiki/Enabling-product-gallery-features-(zoom,-swipe,-lightbox)-in-3.0.0
 *
 * @return void
 */
function unicorn_tears_woocommerce_setup() {
	add_theme_support( 'woocommerce' );
	add_theme_support( 'wc-product-gallery-zoom' );
	add_theme_support( 'wc-product-gallery-lightbox' );
	add_theme_support( 'wc-product-gallery-slider' );
}
add_action( 'after_setup_theme', 'unicorn_tears_woocommerce_setup' );

/**
 * WooCommerce specific scripts & stylesheets.
 *
 * @return void
 */

/*
function unicorn_tears_woocommerce_scripts() {
	wp_enqueue_style( 'unicorn-tears-woocommerce-style', get_template_directory_uri() . '/woocommerce.css' );
	$font_path   = WC()->plugin_url() . '/assets/fonts/';
	$inline_font = '@font-face {
			font-family: "star";
			src: url("' . $font_path . 'star.eot");
			src: url("' . $font_path . 'star.eot?#iefix") format("embedded-opentype"),
				url("' . $font_path . 'star.woff") format("woff"),
				url("' . $font_path . 'star.ttf") format("truetype"),
				url("' . $font_path . 'star.svg#star") format("svg");
			font-weight: normal;
			font-style: normal;
		}';

	wp_add_inline_style( 'unicorn-tears-woocommerce-style', $inline_font );
}
add_action( 'wp_enqueue_scripts', 'unicorn_tears_woocommerce_scripts' );
*/

/**
 * Disable the default WooCommerce stylesheet.
 *
 * Removing the default WooCommerce stylesheet and enqueing your own will
 * protect you during WooCommerce core updates.
 *
 * @link https://docs.woocommerce.com/document/disable-the-default-stylesheet/
 */
add_filter( 'woocommerce_enqueue_styles', '__return_empty_array' );

//handle store notice
function replace_dismiss( $notice ){
	return str_replace( 'Dismiss', '<span class="screen-reader-text">Close</span>' . get_icon('close',12) . '</span>', $notice );
}
add_filter( 'woocommerce_demo_store','replace_dismiss' );



// remove default woocommerce things
remove_action( 'woocommerce_sidebar', 'woocommerce_get_sidebar', 10);
remove_action('woocommerce_before_main_content', 'woocommerce_breadcrumb', 20, 0);
remove_action('woocommerce_before_shop_loop', 'woocommerce_catalog_ordering', 30, 0);
remove_action('woocommerce_before_shop_loop', 'woocommerce_result_count', 20, 0);
// remove_action('woocommerce_after_shop_loop_item', 'woocommerce_template_loop_add_to_cart', 10, 0);
remove_action( 'wp_footer', 'woocommerce_demo_store',10 );

//single page
remove_action( 'woocommerce_after_single_product_summary', 'woocommerce_output_product_data_tabs',10, 0);
// remove_action( 'woocommerce_after_single_product_summary', 'woocommerce_upsell_display',15, 0);
// remove_action( 'woocommerce_after_single_product_summary', 'woocommerce_output_related_products',20, 0);
remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_meta',40, 0);



//add actions
add_action( 'wp_body_open', 'woocommerce_demo_store',10 );
add_action( 'woocommerce_single_product_summary', 'woocommerce_breadcrumb',0, 0);
add_action( 'woocommerce_archive_description', 'woocommerce_catalog_ordering',30, 0);



if ( ! function_exists( 'unicorn_tears_woocommerce_wrapper_before' ) ) {
	/**
	 * Before Content.
	 *
	 * Wraps all WooCommerce content in wrappers which match the theme markup.
	 *
	 * @return void
	 */
	function unicorn_tears_woocommerce_wrapper_before() {
		?>
			<section class="products-wrapper">
				<div class="container">
			<?php
	}
}
add_action( 'woocommerce_before_main_content', 'unicorn_tears_woocommerce_wrapper_before' );

if ( ! function_exists( 'unicorn_tears_woocommerce_wrapper_after' ) ) {
	/**
	 * After Content.
	 *
	 * Closes the wrapping divs.
	 *
	 * @return void
	 */
	function unicorn_tears_woocommerce_wrapper_after() {
			?>
			</div>
			</section>
		<?php
	}
}
add_action( 'woocommerce_after_main_content', 'unicorn_tears_woocommerce_wrapper_after' );


/**
 * Add 'woocommerce-active' class to the body tag.
 *
 * @param  array $classes CSS classes applied to the body tag.
 * @return array $classes modified to include 'woocommerce-active' class.
 */
function unicorn_tears_woocommerce_active_body_class( $classes ) {
	$classes[] = 'woocommerce-active';

	return $classes;
}
add_filter( 'body_class', 'unicorn_tears_woocommerce_active_body_class' );

// /**
//  * Products per page.
//  *
//  * @return integer number of products.
//  */
// function unicorn_tears_woocommerce_products_per_page() {
// 	return 21;
// }
// add_filter( 'loop_shop_per_page', 'unicorn_tears_woocommerce_products_per_page' );

// /**
//  * Product gallery thumnbail columns.
//  *
//  * @return integer number of columns.
//  */
// function unicorn_tears_woocommerce_thumbnail_columns() {
// 	return 3;
// }
// add_filter( 'woocommerce_product_thumbnails_columns', 'unicorn_tears_woocommerce_thumbnail_columns' );

/**
 * Default loop columns on product archives.
 *
 * @return integer products per row.
 */
function unicorn_tears_woocommerce_loop_columns() {
	return 3;
}
add_filter( 'loop_shop_columns', 'unicorn_tears_woocommerce_loop_columns' );

/**
 * Related Products Args.
 *
 * @param array $args related products args.
 * @return array $args related products args.
 */
function unicorn_tears_woocommerce_related_products_args( $args ) {
	$defaults = array(
		'posts_per_page' => 3,
		'columns'        => 3,
	);

	$args = wp_parse_args( $defaults, $args );

	return $args;
}
add_filter( 'woocommerce_output_related_products_args', 'unicorn_tears_woocommerce_related_products_args' );

if ( ! function_exists( 'unicorn_tears_woocommerce_product_columns_wrapper' ) ) {
	/**
	 * Product columns wrapper.
	 *
	 * @return  void
	 */
	function unicorn_tears_woocommerce_product_columns_wrapper() {
		$columns = unicorn_tears_woocommerce_loop_columns();
		echo '<div class="columns-' . absint( $columns ) . '">';
	}
}
add_action( 'woocommerce_before_shop_loop', 'unicorn_tears_woocommerce_product_columns_wrapper', 40 );

if ( ! function_exists( 'unicorn_tears_woocommerce_product_columns_wrapper_close' ) ) {
	/**
	 * Product columns wrapper close.
	 *
	 * @return  void
	 */
	function unicorn_tears_woocommerce_product_columns_wrapper_close() {
		echo '</div>';
	}
}
add_action( 'woocommerce_after_shop_loop', 'unicorn_tears_woocommerce_product_columns_wrapper_close', 40 );

/**
 * Remove default WooCommerce wrapper.
 */
remove_action( 'woocommerce_before_main_content', 'woocommerce_output_content_wrapper', 10 );
remove_action( 'woocommerce_after_main_content', 'woocommerce_output_content_wrapper_end', 10 );

if ( ! function_exists( 'unicorn_tears_woocommerce_wrapper_before' ) ) {
	/**
	 * Before Content.
	 *
	 * Wraps all WooCommerce content in wrappers which match the theme markup.
	 *
	 * @return void
	 */
	function unicorn_tears_woocommerce_wrapper_before() {
		?>
		<div id="primary" class="content-area">
			<main id="main" class="site-main" role="main">
			<?php
	}
}
add_action( 'woocommerce_before_main_content', 'unicorn_tears_woocommerce_wrapper_before' );

if ( ! function_exists( 'unicorn_tears_woocommerce_wrapper_after' ) ) {
	/**
	 * After Content.
	 *
	 * Closes the wrapping divs.
	 *
	 * @return void
	 */
	function unicorn_tears_woocommerce_wrapper_after() {
			?>
			</main><!-- #main -->
		</div><!-- #primary -->
		<?php
	}
}
add_action( 'woocommerce_after_main_content', 'unicorn_tears_woocommerce_wrapper_after' );

/**
 * Sample implementation of the WooCommerce Mini Cart.
 *
 * You can add the WooCommerce Mini Cart to header.php like so ...
 *
	<?php
		if ( function_exists( 'unicorn_tears_woocommerce_header_cart' ) ) {
			unicorn_tears_woocommerce_header_cart();
		}
	?>
 */

if ( ! function_exists( 'unicorn_tears_woocommerce_cart_link_fragment' ) ) {
	/**
	 * Cart Fragments.
	 *
	 * Ensure cart contents update when products are added to the cart via AJAX.
	 *
	 * @param array $fragments Fragments to refresh via AJAX.
	 * @return array Fragments to refresh via AJAX.
	 */
	function unicorn_tears_woocommerce_cart_link_fragment( $fragments ) {
		global $woocommerce;
		ob_start();
		print unicorn_tears_woocommerce_cart_count();
		$fragments['span.cart-count'] = ob_get_clean();

		return $fragments;
	}
}
add_filter( 'woocommerce_add_to_cart_fragments', 'unicorn_tears_woocommerce_cart_link_fragment' );

if ( ! function_exists( 'unicorn_tears_woocommerce_cart_link' ) ) {
	/**
	 * Cart Link.
	 *
	 * Displayed a link to the cart including the number of items present and the cart total.
	 *
	 * @return void
	 */
	function unicorn_tears_woocommerce_cart_link() {
		?>
		<a class="cart-contents" href="<?php echo esc_url( wc_get_cart_url() ); ?>">
			<div class="screen-reader-text"><?php esc_attr_e( 'View your shopping cart', 'unicorn-tears' ); ?></div>
			<?php
			$item_count_text = sprintf(
				/* translators: number of items in the mini cart. */
				_n( '%d item', '%d items', WC()->cart->get_cart_contents_count(), 'unicorn-tears' ),
				WC()->cart->get_cart_contents_count()
			);
			?>
			<span class="amount"><?php echo wp_kses_data( WC()->cart->get_cart_subtotal() ); ?></span> <span class="count"><?php echo esc_html( $item_count_text ); ?></span>
		</a>
		<?php
	}
}

if ( ! function_exists( 'unicorn_tears_woocommerce_cart_count' ) ) {
	/**
	 * Cart Link.
	 *
	 * Displayed a link to the cart including the number of items present and the cart total.
	 *
	 * @return void
	 */
	function unicorn_tears_woocommerce_cart_count() {
		?>
			<?php
			$item_count_text = sprintf(
				/* translators: number of items in the mini cart. */
				_n( '%d', '%d', WC()->cart->get_cart_contents_count(), 'unicorn-tears' ),
				WC()->cart->get_cart_contents_count()
			);
			return '<span class="cart-count">(' . $item_count_text .')</span>';

	}
}

if ( ! function_exists( 'unicorn_tears_woocommerce_header_cart' ) ) {
	/**
	 * Display Header Cart.
	 *
	 * @return void
	 */
	function unicorn_tears_woocommerce_header_cart() {
		if ( is_cart() ) {
			$class = 'current-menu-item';
		} else {
			$class = '';
		}
		?>
		<ul id="site-header-cart" class="site-header-cart">
			<li class="<?php echo esc_attr( $class ); ?>">
				<?php unicorn_tears_woocommerce_cart_link(); ?>
			</li>
			<li>
				<?php
				$instance = array(
					'title' => '',
				);

				the_widget( 'WC_Widget_Cart', $instance );
				?>
			</li>
		</ul>
		<?php
	}
}



if ( ! function_exists( 'unicorn_tears_append_cart_count' ) ) {
	/**
	 * Append cart count to the Cart item in the menu.
	 *
	 * @return void
	 */
	function unicorn_tears_append_cart_count( $items, $args ) {
		if ($args->theme_location == 'account') {
			$split = preg_split('/(?<=>Cart)/',$items);
			$items = $split[0] . unicorn_tears_woocommerce_cart_count() . $split[1];
		}
		return $items;
	}
}
add_filter( 'wp_nav_menu_items', 'unicorn_tears_append_cart_count', 20, 2 );
