<?php
$slides = get_sub_field('slides');

if( $slides ): ?>
    <div class="info-slider">
      <?php foreach( $slides as $slide ):

      $link = $slide['slide_content']['link'];

      $id = $slide['image'];
      $size = 'medium_large';
      $img_src = wp_get_attachment_image_url( $id, $size );
      $img_srcset = wp_get_attachment_image_srcset( $id, $size );
      $title = get_post($id)->post_title;
      $alt = isset(get_post_meta($id, '_wp_attachment_image_alt')[0]) ? get_post_meta($id, '_wp_attachment_image_alt')[0] : $title;
      // var_dump(isset(get_post_meta($id, '_wp_attachment_image_alt')[0]))
      ?>
      <div class="slide">
        <div class="slide-wrapper">
          <div class="col">
            <figure class="img-wrapper">
              <img src="<?php echo esc_url( $img_src ); ?>"
              srcset="<?php echo esc_attr( $img_srcset ); ?>"
              sizes="(min-width: 768px) 700px, 1000px"
              alt="<?php echo $alt; ?>"
              title="<?php echo $title; ?>"
              class="img">
            </figure>
          </div>
          <div class="col">
            <?php echo $slide['slide_content']['content'];?>
            <?php if ( !empty($link) ) : ?>
              <a href="<?php echo $link['url'];?>" class="btn" <?php echo (!empty($link['target'])) ? 'target="'.$link['target'].'"' : '';?> <?php echo (!empty($link['target']) && $link['target'] === 'blank') ? 'rel="nofollow noopener' : '';?>><?php echo $link['title'];?></a>
            <?php endif; ?>
          </div>
        </div>
      </div>
      <?php endforeach; ?>
    </div>

    <?php endif; ?>