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
$className = 'monk-video monk-block';
if( !empty($block['className']) ) {
    $className .= ' ' . $block['className'];
}
if( !empty($block['align']) ) {
    $className .= ' align' . $block['align'];
}

// Load values and assign defaults.
$poster = get_field('video_poster') ?: '';
$video_id = get_field('video_id') ?: '';

?>

<div id="<?php echo esc_attr($id); ?>" class="<?php echo esc_attr($className); ?>">
    <div class="feature video">
    <?php
    if ($poster) :
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
    (max-width: 1200px) 1400px,
    (max-width: 2000px) 2000px,
    100vw"
    alt="<?php echo $alt; ?>"
    class="img"
    loading="lazy">
    <?php endif;?>
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
            <div id="video-<?php echo $block['id'];?>" class="animate video-wrapper">
                <div id="player"></div>
                <!-- // 'origin': '<?php //echo //home_url(); ?>',put in params for live site -->
                <script type="text/javascript">
                    var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
                    // if ( viewportWidth > 768) {
                        // 2. This code loads the IFrame Player API code asynchronously.
                        var tag = document.createElement('script');
                        tag.src = "https://www.youtube.com/iframe_api";
                        var firstScriptTag = document.getElementsByTagName('script')[0];
                        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                        var player;
                        var videoPlayer = '#video-<?php echo $block['id'];?>';
                        var playerWrapper = document.querySelector(videoPlayer);
                        function onYouTubeIframeAPIReady() {
                            player = new YT.Player('player', {
                                videoId: '<?php echo $video_id; ?>',  // youtube video id
                                allowfullscreen: 1,
                                playerVars: {
                                    'enablejsapi': 1,
                                    'autoplay': 1,
                                    'rel': 0,
                                    'iv_load_policy': 3,
                                    'showinfo': 0,
                                    'modestbranding': 1,
                                    'playsinline': 1,
                                    'showinfo': 0,
                                    'rel': 0,
                                    'controls': 0,
                                    'color':'white',
                                    'loop': 0,
                                    'mute':1,
                                    'playlist': '<?php echo $video_id; ?>',
                                    'wmode': 'opaque'
                                },
                                events: {
                                    'onReady': onPlayerReady,
                                    'onStateChange': onPlayerStateChange
                                }
                            });
                        }

                        function onPlayerReady() {
                            player.playVideo();
                            player.mute();
                        }
                        function onPlayerStateChange(el) {
                            if(el.data === 1) {
                                playerWrapper.classList.add('fadein')
                            } else if(el.data === 0) {
                                // playerWrapper.classList.remove('fadein')
                                player.playVideo();
                                player.mute();
                            }
                        }
                    // }
                </script>
            </div>
        </div>
    </div>
</div>