<?php

/**
 * Cards
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */

// Create id attribute allowing for custom "anchor" value.
$id = 'monk-cards-' . $block['id'];
if( !empty($block['anchor']) ) {
    $id = $block['anchor'];
}

// Create class attribute allowing for custom "className" and "align" values.
$className = 'monk-cards monk-block';
if( !empty($block['className']) ) {
    $className .= ' ' . $block['className'];
}
if( !empty($block['align']) ) {
    $className .= ' align' . $block['align'];
}

global $post;
// Load values and assign defaults.
$cards = get_field('cards') ?: '';
?>

<div id="<?php echo esc_attr($id); ?>" class="<?php echo esc_attr($className); ?>">
  <div class="container">
    <div class="row">
      <?php foreach ( $cards as $card ) : ?>
        <div class="card">
          <?php
          if ( $card['image'] ) :
          $id = $card['image'];
          $size = 'medium';
          $img_src = wp_get_attachment_image_url( $id, $size );
          $img_srcset = wp_get_attachment_image_srcset( $id, $size );
          $title = get_post($id)->post_title;
          $alt = isset(get_post_meta($id, '_wp_attachment_image_alt')[0]) ? get_post_meta($id, '_wp_attachment_image_alt')[0] : $title;
          // var_dump(isset(get_post_meta($id, '_wp_attachment_image_alt')[0]))
          ?>
          <figure class="img-wrapper">
              <img src="<?php echo esc_url( $img_src ); ?>"
              srcset="<?php echo esc_attr( $img_srcset ); ?>"
              sizes="(min-width: 768px) 700px, 1000px"
              alt="<?php echo $alt; ?>"
              class="img"
              loading="lazy">
          </figure>
          <?php endif;?>
          <div class="content">
              <div class="inner">
                  <?php echo $card['content']; ?>
                  <?php 
                  $link = $card['link'];
                  if ( !empty($link) ) : ?>
                  <a href="<?php echo $link['url'];?>" class="btn outline" <?php echo (!empty($link['target'])) ? 'target="'.$link['target'].'"' : '';?> <?php echo (!empty($link['target']) && $link['target'] === 'blank') ? 'rel="nofollow noopener' : '';?>><?php echo $link['title'];?></a>
                  <?php endif; ?>
              </div>
          </div>
        </div>
      <?php endforeach;?>
    </div>
  </div>
</div>