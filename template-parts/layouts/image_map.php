<div class="container">
    <div class="image-map">
      <?php
      $id = get_sub_field('image');
      $size = 'large';
      $img_src = wp_get_attachment_image_url( $id, $size );
      $img_srcset = wp_get_attachment_image_srcset( $id, $size );
      $title = get_post($id)->post_title;
      $alt = isset(get_post_meta($id, '_wp_attachment_image_alt')[0]) ? get_post_meta($id, '_wp_attachment_image_alt')[0] : $title;
      // var_dump(isset(get_post_meta($id, '_wp_attachment_image_alt')[0]))
      ?>
      <img src="<?php echo esc_url( $img_src ); ?>"
      srcset="<?php echo esc_attr( $img_srcset ); ?>"
      sizes="(min-width: 1024px) 1200px, 80vw"
      alt="<?php echo $alt; ?>"
      class="img">

      <?php
      $maps = get_sub_field('image_map');
      foreach ($maps as $map) :
      $point = $map['image_point'];?>
      <div class="tooltip <?php echo ($point['left'] < 50) ? "align-left":"align-right" ;?>" style="top:<?php echo $point['top'];?>%; left:<?php echo $point['left'];?>%;">
        <?php // echo get_icon('plus',10);?>
        <div class="icon plus" aria-hidden="true"></div>
        <div class="content">
          <?php echo $map['content'];?>
        </div>
      </div>
      <?php endforeach; ?>
    </div>
</div>