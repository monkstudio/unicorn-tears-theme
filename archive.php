<?php
/**
 * The template for displaying archive pages
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Unicorn_Tears
 */

get_header(); ?>

<?php get_template_part( 'template-parts/content', 'page');?>

<?php if ( have_posts() ) : ?>
    <section class="posts">
        <div class="container">
            <div class="row">
                <?php
                /* Start the Loop */
                while ( have_posts() ) : the_post();

                    /*
                        * Include the Post-Format-specific template for the content.
                        * If you want to override this in a child theme, then include a file
                        * called content-___.php (where ___ is the Post Format name) and that will be used instead.
                        */
                    get_template_part( 'template-parts/content', 'excerpt');

                endwhile;?>
            </div>
        <?php get_template_part( 'template-parts/modules/module', 'nav' );

        else :

            get_template_part( 'template-parts/content', 'none' );?>

        </div>
    </section>

<?php endif;

//get_sidebar();
get_footer();
