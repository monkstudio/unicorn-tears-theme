<?php
/**
 * Template part for displaying the front page.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Unicorn_Tears
 */

?>
<?php echo get_icon('arrow',20,'arrow-icon','arrow');?>
<?php echo get_icon('arrow',20,'arrow-icon','arrow');?>
<?php echo get_social_icon('instagram',20,'ig');?>
<?php echo get_social_link_svg('https://facebook.com',20,'fb',false,'Facebook');?>
<a href="#modal1" class="modal-trigger">Modal</a>
<div id="modal1" class="modal">
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</div>
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
