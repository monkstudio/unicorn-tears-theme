<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Unicorn_Tears
 */

get_header(); ?>

    <?php
    if( is_front_page()) {
        get_template_part( 'template-parts/content', 'front-page' );
    } else {
        get_template_part( 'template-parts/content', 'page' );
    }
    ?>

<?php
//get_sidebar();
get_footer();
