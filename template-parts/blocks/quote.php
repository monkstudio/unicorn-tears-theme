<?php

/**
 * Quote Block Template.
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */

// Create id attribute allowing for custom "anchor" value.
$id = 'monk-quote-' . $block['id'];
if( !empty($block['anchor']) ) {
    $id = $block['anchor'];
}

// Create class attribute allowing for custom "className" and "align" values.
$className = 'monk-quote monk-block';
if( !empty($block['className']) ) {
    $className .= ' ' . $block['className'];
}
if( !empty($block['align']) ) {
    $className .= ' align' . $block['align'];
}

// Load values and assign defaults.
$quotes = get_field('quotes') ?: '';
$cite = get_field('citation') ?: '';
$link = get_field('call_to_action') ?: '';

?>

<div id="<?php echo esc_attr($id); ?>" class="<?php echo esc_attr($className); ?>">
  <div class="container">
    <div class="quotes slider">
      <?php foreach($quotes as $quote):?>
      <div class="slide">
          <blockquote>
            <?php echo $quote['quote'];?>
          </blockquote>

          <?php if ($quote['citation']):?>
            <cite><?php echo $quote['citation'];?></cite>
          <?php endif;?>

      </div>
      <?php endforeach; ?>
    </div>

    <?php
    if ( !empty($link) ) : ?>
    <a href="<?php echo $link['url'];?>" class="btn outline" <?php echo (!empty($link['target'])) ? 'target="'.$link['target'].'"' : '';?> <?php echo (!empty($link['target']) && $link['target'] === 'blank') ? 'rel="nofollow noopener' : '';?>><?php echo $link['title'];?></a>
    <?php endif; ?>
  </div>
</div>