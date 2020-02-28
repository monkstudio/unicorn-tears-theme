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

    <?php

    get_template_part( 'template-parts/content', 'page');

    if ( have_posts() ) : ?>
    <section class="cards page-layout">
        <div class="container">
            <div class="row">
            <?php while ( have_posts() ) : the_post();

                /*
                    * Include the Post-Format-specific template for the content.
                    * If you want to override this in a child theme, then include a file
                    * called content-___.php (where ___ is the Post Format name) and that will be used instead.
                    */
                get_template_part( 'template-parts/content', 'excerpt');

            endwhile; ?>
            </div>

        <?php get_template_part( 'template-parts/modules/module', 'nav' );

        else :

            get_template_part( 'template-parts/content', 'none' );?>

        </div>
    </section>
    <?php endif; ?>

<?php
//get_sidebar();
get_footer();
