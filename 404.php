<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package Unicorn_Tears
 */

get_header(); ?>

<div class="container">
    <section id="404" class="page-layout">
        <?php get_template_part( 'template-parts/modules/module', 'page-title' ); ?>
        <div class="page-content">
            <a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home" class="btn">
                Click here to go back home.
            </a>
        </div>
    </section>
</div>

<?php
get_footer();
