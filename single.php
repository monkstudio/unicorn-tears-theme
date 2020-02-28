<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package Unicorn_Tears
 */

get_header(); ?>

    <div class="container">
        <?php
        while ( have_posts() ) : the_post();

            get_template_part( 'template-parts/content', get_post_format() );

            // get_template_part( 'template-parts/modules/module', 'nav' );

            // If comments are open or we have at least one comment, load up the comment template.
            // if ( comments_open() || get_comments_number() ) :
            //     comments_template();
            // endif;

        endwhile; // End of the loop.
        ?>
    </div>

<?php
//get_sidebar();
get_footer();
