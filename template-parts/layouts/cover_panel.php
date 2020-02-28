<div class="cover-wrapper <?php echo ( get_sub_field('align_content') )? the_sub_field('align_content') : '';?>">
    <?php
    $id = get_sub_field('background_image');
    $size = 'large';
    $img_src = wp_get_attachment_image_url( $id, $size );
    $img_srcset = wp_get_attachment_image_srcset( $id, $size );
    $title = get_post($id)->post_title;
    $alt = isset(get_post_meta($id, '_wp_attachment_image_alt')[0]) ? get_post_meta($id, '_wp_attachment_image_alt')[0] : $title;
    // var_dump(isset(get_post_meta($id, '_wp_attachment_image_alt')[0]))
    ?>
    <img src="<?php echo esc_url( $img_src ); ?>"
    srcset="<?php echo esc_attr( $img_srcset ); ?>"
    sizes="(min-width: 1024px) 1200px, 700px"
    alt="<?php echo $alt; ?>"
    title="<?php echo $title; ?>"
    class="img">
    <div class="inner">
        <?php the_sub_field('content'); ?>
    </div>
</div>