
<?php

//disable gutenberg for pages
// add_filter('use_block_editor_for_post_type', function($enabled, $post_type){
//     if(in_array($post_type, [
//         // Add Post Types that you don't want to use with Gutenberg here:
// 				'page',
// 				// 'post',
//     ]) ) {
//         $enabled = false;
//     }
//     return $enabled;
// }, 11, 2);

//disable gutenberg styles
// function custom_theme_assets() {
//     wp_dequeue_style( 'wp-block-library' );
// 		wp_dequeue_style( 'wp-block-library-theme' );
// 		wp_dequeue_style( 'wc-block-style' );
// }
// add_action( 'wp_enqueue_scripts', 'custom_theme_assets', 100 );



function unicorn_tears_disable_editor_fullscreen_by_default() {
	$script = "jQuery( window ).load(function() { const isFullscreenMode = wp.data.select( 'core/edit-post' ).isFeatureActive( 'fullscreenMode' ); if ( isFullscreenMode ) { wp.data.dispatch( 'core/edit-post' ).toggleFeature( 'fullscreenMode' ); } });";
	wp_add_inline_script( 'wp-blocks', $script );
}
add_action( 'enqueue_block_editor_assets', 'unicorn_tears_disable_editor_fullscreen_by_default' );




/**
 * Registers an editor stylesheet in a sub-directory.
 */
function add_editor_styles_sub_dir() {
	add_editor_style( trailingslashit( get_template_directory_uri() ) . 'dist/css/style.css' );
}
add_action( 'after_setup_theme', 'add_editor_styles_sub_dir' );


// add theme styles to gutenberg
add_action( 'enqueue_block_editor_assets', function() {
	wp_enqueue_style( 'monk-styles',trailingslashit( get_template_directory_uri() ) . 'dist/css/editor.css');
});

//register acf blocks
add_action('acf/init', 'my_acf_init_block_types');
function my_acf_init_block_types() {

    // Check function exists.
    if( function_exists('acf_register_block_type') ) {

        // register a testimonial block.
        acf_register_block_type(array(
            'name'              => 'Two Columns',
            'title'             => __('Two Columns'),
            'description'       => __('Two columns with content'),
            'render_template'   => 'template-parts/blocks/two-columns.php',
            'category'          => 'formatting',
            'icon'              => 'admin-comments',
            'keywords'          => array( 'monk', 'two_columns', 'content' ),
        ));
        acf_register_block_type(array(
          'name'              => 'Two Columns - Image',
          'title'             => __('Two Columns - image & content'),
          'description'       => __('Two columns - image & content'),
          'render_template'   => 'template-parts/blocks/two-columns-image.php',
          'category'          => 'formatting',
          'icon'              => 'admin-comments',
          'keywords'          => array( 'monk', 'two_columns', 'image', 'content' ),
      ));
				acf_register_block_type(array(
					'name'              => 'Full Width Section',
					'title'             => __('Full Width Section'),
					'description'       => __('A full width section'),
					'render_template'   => 'template-parts/blocks/fw.php',
					'category'          => 'formatting',
					'icon'              => 'admin-comments',
					'keywords'          => array( 'monk', 'fw', 'full width', 'content' ),
			));
			acf_register_block_type(array(
				'name'              => 'Video Section',
				'title'             => __('Video Section'),
				'description'       => __('A featured video'),
				'render_template'   => 'template-parts/blocks/video.php',
				'category'          => 'formatting',
				'icon'              => 'admin-comments',
				'keywords'          => array( 'monk', 'video', 'feature', 'content' ),
			));
			acf_register_block_type(array(
				'name'              => 'Hero Banner',
				'title'             => __('Hero Banner'),
				'description'       => __('Hero Banner'),
				'render_template'   => 'template-parts/blocks/hero.php',
				'category'          => 'formatting',
				'icon'              => 'admin-comments',
				'keywords'          => array( 'monk', 'hero', 'banner', 'content' ),
			));
			acf_register_block_type(array(
				'name'              => 'Cards',
				'title'             => __('Cards'),
				'description'       => __('Cards'),
				'render_template'   => 'template-parts/blocks/cards.php',
				'category'          => 'formatting',
				'icon'              => 'admin-comments',
				'keywords'          => array( 'monk', 'image', 'text', 'content', 'cards'),
			));
      acf_register_block_type(array(
				'name'              => 'Accordion',
				'title'             => __('Accordion'),
				'description'       => __('Accordion'),
				'render_template'   => 'template-parts/blocks/accordion.php',
				'category'          => 'formatting',
				'icon'              => 'admin-comments',
				'keywords'          => array( 'monk', 'accordion', 'content' ),
			));

      acf_register_block_type(array(
				'name'              => 'Gallery',
				'title'             => __('Gallery'),
				'description'       => __('Gallery'),
				'render_template'   => 'template-parts/blocks/gallery.php',
				'category'          => 'formatting',
				'icon'              => 'admin-comments',
				'keywords'          => array( 'monk', 'gallery', 'content' ),
			));
			// acf_register_block_type(array(
			// 	'name'              => 'Quotes',
			// 	'title'             => __('Quote Slider'),
			// 	'description'       => __('A quote slider'),
			// 	'render_template'   => 'template-parts/blocks/quote.php',
			// 	'category'          => 'formatting',
			// 	'icon'              => 'admin-comments',
			// 	'keywords'          => array( 'monk', 'cta', 'quote', 'slider', 'content' ),
				// 'enqueue_assets'		=> function(){
				// 	wp_enqueue_script( 'flickity', get_template_directory_uri() . '/src/js/vendor/flickity.min.js',['jquery',],'1.8.1', true);
				// 	wp_enqueue_script( 'monk-scripts', get_template_directory_uri() . '/src/js/sliders.js',['flickity'],'1.8.1', true);
				// },
			// ));
    }
}
