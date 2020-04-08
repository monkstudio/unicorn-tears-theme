<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package Unicorn_Tears
 */

get_header(); ?>


<section id="404" class="page-layout">
    <div class="container">
        <div class="page-content">
            <?php get_template_part( 'template-parts/modules/module', 'page-title' ); ?>
            <a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home" class="btn">
                Click here to go back home.
            </a>
        </div>
    </div>
</section>

<?php
get_footer();
