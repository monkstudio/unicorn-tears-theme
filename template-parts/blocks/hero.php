<?php

/**
 * Hero Banner Block Template.
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */

// Create id attribute allowing for custom "anchor" value.
$id = 'monk-hero-banner-' . $block['id'];
if( !empty($block['anchor']) ) {
    $id = $block['anchor'];
}

// Create class attribute allowing for custom "className" and "align" values.
$className = 'monk-hero-banner monk-block';
if( !empty($block['className']) ) {
    $className .= ' ' . $block['className'];
}
if( !empty($block['align']) ) {
    $className .= ' align' . $block['align'];
}

// Load values and assign defaults.
$content = get_field('content') ?: '';
$link = get_field('call_to_action') ?: '';
$img = get_field('image') ?: false;
?>

<div id="<?php echo esc_attr($id); ?>" class="<?php echo esc_attr($className); ?>">
  <div class="container">
    <div class="row">
      <div class="content">
          <?php echo $content;?>
          <?php
          if ( !empty($link) ) : ?>
          <a href="<?php echo $link['url'];?>" class="btn centered" <?php echo (!empty($link['target'])) ? 'target="'.$link['target'].'"' : '';?> <?php echo (!empty($link['target']) && $link['target'] === 'blank') ? 'rel="nofollow noopener' : '';?>><?php echo $link['title'];?> <?php echo get_icon('arrow_right_alt',20);?></a>
          <?php endif; ?>
        </div>
        <?php
        if ( $img  ) :
        // $img_id = is_product_category() ? $thumbnail_id : get_post_thumbnail_id($ID);
        $img_id = $img;
        $size = 'large';
        $img_src = wp_get_attachment_image_url( $img_id, $size );
        $img_srcset = wp_get_attachment_image_srcset( $img_id, $size );
        $title = get_post($img_id)->post_title;
        $alt = isset(get_post_meta($img_id, '_wp_attachment_image_alt')[0]) ? get_post_meta($img_id, '_wp_attachment_image_alt')[0] : $title;
        ?>
        <figure class="img-wrapper">
        <img src="<?php echo esc_url( $img_src ); ?>"
        srcset="<?php echo esc_attr( $img_srcset ); ?>"
        sizes="
        (max-width: 768px) 800px,
        (max-width: 1200px) 1400px,
        1000px"
        alt="<?php echo $alt; ?>"
        class="img"
        loading="lazy">
        </figure>
        <?php endif;?>
    </div>
  </div>
</div>