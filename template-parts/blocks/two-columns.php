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
$id = 'monk-two-columns-' . $block['id'];
if( !empty($block['anchor']) ) {
    $id = $block['anchor'];
}

// Create class attribute allowing for custom "className" and "align" values.
$className = 'monk-two-columns monk-block';
if( !empty($block['className']) ) {
    $className .= ' ' . $block['className'];
}
if( !empty($block['align']) ) {
    $className .= ' align' . $block['align'];
}

// Load values and assign defaults.
$title = get_field('section_title') ?: '';
$left = get_field('left_column') ?: '';
$right = get_field('right_column') ?: '';


if( !empty($contain) ) {
  $className .= ' contain';
}
?>

<div id="<?php echo esc_attr($id); ?>" class="<?php echo esc_attr($className); ?>">
  <div class="container">
      <div class="row">
          <div class="col">
            <div class="content">
              <?php echo $left; ?>
            </div>
          </div>
          <div class="col">
            <div class="content">
              <?php echo $right; ?>
            </div>
          </div>
      </div>
  </div>
</div>