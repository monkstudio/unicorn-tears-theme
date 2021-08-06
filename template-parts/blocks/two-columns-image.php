<?php

/**
 * Two Columns Block Template.
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */

// Create id attribute allowing for custom "anchor" value.
$id = 'monk-two-columns-image-' . $block['id'];
if( !empty($block['anchor']) ) {
    $id = $block['anchor'];
}

// Create class attribute allowing for custom "className" and "align" values.
$className = 'monk-two-columns-image monk-block';
if( !empty($block['className']) ) {
    $className .= ' ' . $block['className'];
}
if( !empty($block['align']) ) {
    $className .= ' align' . $block['align'];
}

// Load values and assign defaults.
$content = get_field('content') ?: '';
$left_align = get_field('left_align') ? ' left-align' : false;
$image = get_field('image') ?: '';
$link = get_field('call_to_action');
?>

<div id="<?php echo esc_attr($id); ?>" class="<?php echo esc_attr($className); ?> <?php echo esc_attr($left_align); ?>">
  <div class="container">
    <div class="row">
      <div class="col">
          <div class="content" data-aos="<?php echo $left_align ?'fade-left' : 'fade-right';?>" data-aos-duration="1000">
            <?php echo $content; ?>
          </div>
      </div>
      <div class="col" data-aos="<?php echo $left_align ?'fade-right' : 'fade-left';?>" data-aos-duration="1000">
        <?php 
        if ( $image ) : ?>
            <?php
            $id = $image;
            $size = 'medium_large';
            $img_src = wp_get_attachment_image_url( $id, $size );
            $img_srcset = wp_get_attachment_image_srcset( $id, $size );
            $title = get_post($id)->post_title;
            $alt = isset(get_post_meta($id, '_wp_attachment_image_alt')[0]) ? get_post_meta($id, '_wp_attachment_image_alt')[0] : $title;
            // var_dump(isset(get_post_meta($id, '_wp_attachment_image_alt')[0]))
            ?>
            <figure class="img-wrapper">
              <img src="<?php echo esc_url( $img_src ); ?>"
              srcset="<?php echo esc_attr( $img_srcset ); ?>"
              sizes="
              (max-width: 768px) 800px,
              (max-width: 1200px) 1200px,
              800px"
              alt="<?php echo $alt; ?>"
              class="img"
              loading="lazy">
            </figure>

        <?php endif; ?>
      </div>
    </div>
  </div>
</div>