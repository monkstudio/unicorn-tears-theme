<div class="cover-wrapper <?php echo ( get_sub_field('align_content') )? the_sub_field('align_content') : '';?>">
    <?php
    $id = get_sub_field('background_image');
    $size = 'large';
    $img_src = wp_get_attachment_image_url( $id, $size );
    $img_srcset = wp_get_attachment_image_srcset( $id, $size );
    $title = get_post($id)->post_title;
    $alt = isset(get_post_meta($id, '_wp_attachment_image_alt')[0]) ? get_post_meta($id, '_wp_attachment_image_alt')[0] : $title;
    $caption = wp_get_attachment_caption($id);
    // var_dump(isset(get_post_meta($id, '_wp_attachment_image_alt')[0]))
    ?>
    <figure class="img-wrapper">
        <img src="<?php echo esc_url( $img_src ); ?>"
        srcset="<?php echo esc_attr( $img_srcset ); ?>"
        sizes="
        (max-width: 768px) 800px,
        (max-width: 1200px) 1200px,
        (max-width: 2000px) 2000px,
        100vw"
        alt="<?php echo $alt; ?>"
        title="<?php echo $title; ?>"
        class="img"
        loading="lazy">
    </figure>
    <div class="inner">
        <?php the_sub_field('content'); ?>
    </div>
</div>
