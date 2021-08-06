<?php

/**
 * Buttons Template.
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */

// Create id attribute allowing for custom "anchor" value.
$id = 'monk-button-' . $block['id'];
if( !empty($block['anchor']) ) {
    $id = $block['anchor'];
}

// Create class attribute allowing for custom "className" and "align" values.
$className = 'monk-buttons monk-block';
if( !empty($block['className']) ) {
    $className .= ' ' . $block['className'];
}
if( !empty($block['align']) ) {
    $className .= ' align' . $block['align'];
}

// Load values and assign defaults.
$links = get_field('links') ?: '';
?>

<div id="<?php echo esc_attr($id); ?>" class="<?php echo esc_attr($className); ?>">
  <div class="container">
    <?php
    if ( $links ) :
    foreach ( $links as $link ) : ?>
      <a href="<?php echo $link['link']['url'];?>" class="btn <?php echo $link['theme'];?>" <?php echo (!empty($link['link']['target'])) ? 'target="'.$link['link']['target'].'"' : '';?> <?php echo (!empty($link['target']) && $link['target'] === 'blank') ? 'rel="nofollow noopener' : '';?>><?php echo $link['link']['title'];?> <?php if ( $link['theme'] !== 'outline' ) { echo get_icon('arrow_right_alt',20); } ?></a>
    <?php endforeach;
    endif;?>
  </div>
</div>