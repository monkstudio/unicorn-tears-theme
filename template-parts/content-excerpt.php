<?php
/**
 * Template part for displaying an event card
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Unicorn_Tears
 */

?>
<div class="post card">
  <a href="<?php the_permalink();?>">
    <?php
    if ( has_post_thumbnail()):
    $id = get_post_thumbnail_id();
    $size = 'medium';
    $img_src = wp_get_attachment_image_url( $id, $size );
    $img_srcset = wp_get_attachment_image_srcset( $id, $size );
    $title = get_post($id)->post_title;
    $alt = isset(get_post_meta($id, '_wp_attachment_image_alt')[0]) ? get_post_meta($id, '_wp_attachment_image_alt')[0] : $title;
    // var_dump(isset(get_post_meta($id, '_wp_attachment_image_alt')[0]))
    ?>
    <img src="<?php echo esc_url( $img_src ); ?>"
    srcset="<?php echo esc_attr( $img_srcset ); ?>"
    sizes="(min-width: 768px) medium, 300px"
    alt="<?php echo $alt; ?>"
    class="img">
    <?php endif;?>
    <div class="inner">
      <?php the_title('<h2>','</h2>');?>
      <div class="excerpt">
        <?php echo wp_trim_words( get_the_content(), 20, '...' ); ?>
      </div>
    </div>
  </a>
</div>