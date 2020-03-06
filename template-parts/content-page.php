<?php
/**
 * Template part for displaying page content in page.php
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Unicorn_Tears
 */

?>
<section id="intro" class="page-layout">
    <div class="container">
        <div class="entry-content">
            <?php get_template_part( 'template-parts/modules/module', 'test' ); ?>
            <?php if ( is_post_type_archive()) {
                $post_content = get_post(get_page_ID());
                $content = $post_content->post_content;
                echo apply_filters('the_content',$content);
            } elseif(is_tax()) {
                $ID = get_queried_object()->term_id;
                echo term_description($ID);
            } elseif(is_home()) {
                $ID = get_option( 'page_for_posts' );
                the_field('content',$ID );
            } else {
                the_content();
            } ?>
        </div>
    </div>
</section>

<?php get_template_part( 'template-parts/modules/module', 'page-layouts' ); ?>