<?php

/**
 * Feature Post
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */

// Create id attribute allowing for custom "anchor" value.
$id = 'monk-feature-post-' . $block['id'];
if( !empty($block['anchor']) ) {
    $id = $block['anchor'];
}

// Create class attribute allowing for custom "className" and "align" values.
$className = 'monk-full-width monk-block';
if( !empty($block['className']) ) {
    $className .= ' ' . $block['className'];
}
if( !empty($block['align']) ) {
    $className .= ' align' . $block['align'];
}

global $post;
// Load values and assign defaults.
$content = get_field('content') ?: '';
$link = get_field('call_to_action') ?: '';
$feature_post = get_field('feature_post') ?: '';

?>

<div id="<?php echo esc_attr($id); ?>" class="has-bg monk-feature-post <?php echo esc_attr($className); ?>">
  <div class="container">
    <div class="row">
      <div class="content">
          <?php echo $content;?>
          <?php
          if ( !empty($link) ) : ?>
          <a href="<?php echo $link['url'];?>" class="btn outline" <?php echo (!empty($link['target'])) ? 'target="'.$link['target'].'"' : '';?> <?php echo (!empty($link['target']) && $link['target'] === 'blank') ? 'rel="nofollow noopener' : '';?>><?php echo $link['title'];?></a>
          <?php endif; ?>
        </div>
        <div class="featured-post">
          <?php

// var_dump($feature_post[0]);
          $args = array(
            'post__in' => [$feature_post[0]->ID],
            'post_type' => 'any'
          );
          $postslist = get_posts( $args );
          foreach ( $postslist as $post ) :
              setup_postdata( $post );

              get_template_part( 'template-parts/content', 'excerpt' );
          endforeach;
          wp_reset_postdata();
          ?>
        </div>
    </div>
  </div>
</div>