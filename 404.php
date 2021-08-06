<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package Unicorn_Tears
 */

get_header(); ?>


<section id="page-content" class="error-404 monk-block">
    <div class="container">
        <div class="content">
            <?php get_template_part( 'template-parts/modules/module', 'page-title' ); ?>
            <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="btn">
                Click here to go back home.
            </a>
        </div>
    </div>
</section>

<?php
get_footer();
