<?php
$images = get_sub_field('images');

if( $images ): ?>
<div class="container">
    <div class="slider-wrapper">
        <div class="gallery-wrapper <?php echo ( get_sub_field('turn_into_a_slider') === true) ? 'gallery-slider' : '';?>">
            <?php foreach( $images as $image ): ?>
            <?php
            $id = $image['ID'];
            $size = 'medium_large';
            $img_src = wp_get_attachment_image_url( $id, $size );
            $img_srcset = wp_get_attachment_image_srcset( $id, $size );
            $title = get_post($id)->post_title;
            $alt = isset(get_post_meta($id, '_wp_attachment_image_alt')[0]) ? get_post_meta($id, '_wp_attachment_image_alt')[0] : $title;
            // var_dump(isset(get_post_meta($id, '_wp_attachment_image_alt')[0]))
            ?>
                <?php if ( get_sub_field('turn_into_a_slider') )  :?>
                <div class="slide">
                <?php endif; ?>
                    <figure class="img-wrapper">
                        <img src="<?php echo esc_url( $img_src ); ?>"
                        srcset="<?php echo esc_attr( $img_srcset ); ?>"
                        sizes="
                        (max-width: 768px) 800px,
                        1000px"
                        alt="<?php echo $alt; ?>"
                        title="<?php echo $title; ?>"
                        class="img">
                    </figure>
                <?php if ( get_sub_field('turn_into_a_slider') )  :?>
                </div>
                <?php endif; ?>
            <?php endforeach; ?>
        </div>
    </div>
</div>
<?php endif; ?>
