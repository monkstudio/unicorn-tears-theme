
<div class="container
<?php echo ( get_sub_field('left_align_image') ) ? ' left-align' : '' ;?>
">
    <div class="row">
        <div class="col">
            <div class="content">
              <?php the_sub_field('content'); ?>
            </div>
        </div>
        <div class="col">
          <?php $image = get_sub_field('image');
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