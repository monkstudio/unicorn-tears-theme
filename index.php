<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Unicorn_Tears
 */

get_header(); ?>

<div class="container">

    <?php if ( have_posts() ) : ?>
        <section class="posts">
            <?php
            /* Start the Loop */
            while ( have_posts() ) : the_post();

                get_template_part( 'template-parts/content', 'excerpt');

            endwhile;?>
            <?php get_template_part( 'template-parts/modules/module', 'nav' );

            else :

                get_template_part( 'template-parts/content', 'none' );?>

        </section>

    <?php endif; ?>
</div>

<?php
//get_sidebar();
get_footer();
