<?php

/**
 * Video block
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */

// Create id attribute allowing for custom "anchor" value.
$id = 'monk-video-' . $block['id'];
if( !empty($block['anchor']) ) {
    $id = $block['anchor'];
}

// Create class attribute allowing for custom "className" and "align" values.
$className = 'monk-video';
if( !empty($block['className']) ) {
    $className .= ' ' . $block['className'];
}
if( !empty($block['align']) ) {
    $className .= ' align' . $block['align'];
}

// Load values and assign defaults.
$poster = get_field('video_poster') ?: '';
$video_id = get_field('video_id') ?: '';
$unique_id = wp_unique_id();
?>

<div id="<?php echo esc_attr($id); ?>" class="<?php echo esc_attr($className); ?>">
    <div class="feature video">
        <div class="video-bg cover">
        <?php
        if ( $poster ) :
        // $img_id = is_product_category() ? $thumbnail_id : get_post_thumbnail_id($ID);
        $img_id = $poster;
        $size = 'large';
        $img_src = wp_get_attachment_image_url( $img_id, $size );
        $img_srcset = wp_get_attachment_image_srcset( $img_id, $size );
        $title = get_post($img_id)->post_title;
        $alt = isset(get_post_meta($id, '_wp_attachment_image_alt')[0]) ? get_post_meta($img_id, '_wp_attachment_image_alt')[0] : $title;
        ?>
        <img src="<?php echo esc_url( $img_src ); ?>"
        srcset="<?php echo esc_attr( $img_srcset ); ?>"
        sizes="
        (max-width: 768px) 800px,
        (max-width: 1200px) 1200px,
        (max-width: 2000px) 2000px,
        100vw"
        alt="<?php echo $alt; ?>"
        class="img"
        loading="lazy">
        <?php endif;?>
            <div id="video-wrapper-<?php echo $block['id'];?>" class="video-wrapper">
                <div id="video-<?php echo $video_id;?>-<?php echo $unique_id;?>"></div>
                <!-- // 'origin': '<?php //echo //home_url(); ?>',put in params for live site -->
                <script type="text/javascript">
                    var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
                    // if ( viewportWidth > 768) {
                        // 2. This code loads the IFrame Player API code asynchronously.  
                        playerList.push('<?php echo $video_id;?>-<?php echo $unique_id;?>')
                    // }
                </script>
            </div>
        </div>
    </div>
</div>