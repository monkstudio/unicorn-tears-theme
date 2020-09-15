
<div class="container
<?php echo ( get_sub_field('left_align') === true ) ? ' left-align' : '' ;?>
">
    <div class="row">
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
            <img src="<?php echo esc_url( $img_src ); ?>"
            srcset="<?php echo esc_attr( $img_srcset ); ?>"
            sizes="(min-width: 1024px) 50vw, 100vw"
            alt="<?php echo $alt; ?>"
            class="img"
            loading="lazy">
          <?php endif; ?>
        </div>
        <div class="col">
            <div class="content">
              <?php the_sub_field('content'); ?>
            </div>
        </div>
    </div>
</div>