<?php

/**
 * Gallery Block Template.
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */

// Create id attribute allowing for custom "anchor" value.
$id = 'monk-gallery-' . $block['id'];
if( !empty($block['anchor']) ) {
    $id = $block['anchor'];
}

// Create class attribute allowing for custom "className" and "align" values.
$className = 'monk-gallery monk-block';
if( !empty($block['className']) ) {
    $className .= ' ' . $block['className'];
}
if( !empty($block['align']) ) {
    $className .= ' align' . $block['align'];
}

// Load values and assign defaults.

$images = get_field('images');
$title = get_field('section_title');
$link = get_field('call_to_action');
?>

<div id="<?php echo esc_attr($id); ?>" class="<?php echo esc_attr($className); ?>">
  <?php if ( $title ) : ?>
      <div class="container">
          <h2 class="small"><?php echo $title;?></h2>
      </div>
  <?php endif;?>

  <div class="slider-wrapper">
    <div class="gallery-slider">
      <?php foreach( $images as $image ): ?>
        <?php
        $id = $image;
        $size = 'medium_large';
        $img_src = wp_get_attachment_image_url( $id, $size );
        $img_srcset = wp_get_attachment_image_srcset( $id, $size );
        $title = get_post($id)->post_title;
        $alt = isset(get_post_meta($id, '_wp_attachment_image_alt')[0]) ? get_post_meta($id, '_wp_attachment_image_alt')[0] : $title;
        $desc = isset(get_post($id)->post_content) ? get_post($id)->post_content : $title;
        ?>
          <div class="slide">
              <figure class="img-wrapper">
                  <img src="<?php echo esc_url( $img_src ); ?>"
                  srcset="<?php echo esc_attr( $img_srcset ); ?>"
                  sizes="
                  (max-width: 768px) 800px,
                  100vw"
                  alt="<?php echo $alt; ?>"
                  class="img">
              </figure>
          </div>
      <?php endforeach; ?>
    <button class="prev"><?php echo get_icon('arrow_left_alt',20);?><span class="screen-reader-text">Previous Slide</span></button>
    <button class="next"><?php echo get_icon('arrow_right_alt',20);?><span class="screen-reader-text">Next Slide</span></button>
  </div>
</div>

</div>