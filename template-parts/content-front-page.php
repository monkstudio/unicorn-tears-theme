<?php
/**
 * Template part for displaying the front page.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Unicorn_Tears
 */

?>

<?php get_template_part( 'template-parts/modules/module', 'page-title' ); ?>

<?php if ( get_post()->post_content == ! '' ) : ?>
<section id="intro">
    <div class="container">
        <div class="entry-content">
            <?php the_content(); ?>
        </div>
    </div>
</section>
<?php endif; ?>

<?php get_template_part( 'template-parts/modules/module', 'page-layouts' ); ?>
