<?php
//get the page id
$ID = get_page_ID();
$feature = get_field('feature_options',$ID);

?>

<div class="feature-wrapper">
    <?php if ( is_front_page() && get_post()->post_content == ! '' ) : ?>
    <section id="intro" data-aos="flip-up" data-aos-duration="1000" data-aos-once="true">
        <div class="container">
            <div class="content">
                <?php the_content(); ?>
                <a href="https://www.youtube.com/watch?v=1bSyo3x7-VQ" data-fancybox class="cta"><?php echo get_icon('play',20);?> Play Video</a>
            </div>
        </div>
    </section>
    <?php else : ?>
        <?php get_template_part( 'template-parts/modules/module', 'page-title' ); ?>
    <?php endif; ?>
    
    <?php
    if ( !empty($ID) && !empty($feature) ) : //get feature options
        if ( (has_post_thumbnail($ID) && $feature === 'image') ) : ?>
            <div class="feature image">
                <?php
                // $img_id = is_product_category() ? $thumbnail_id : get_post_thumbnail_id($ID);
                $img_id = get_post_thumbnail_id($ID);
                $size = 'large';
                $img_src = wp_get_attachment_image_url( $img_id, $size );
                $img_srcset = wp_get_attachment_image_srcset( $img_id, $size );
                $title = get_post($id)->post_title;
                $alt = isset(get_post_meta($id, '_wp_attachment_image_alt')[0]) ? get_post_meta($id, '_wp_attachment_image_alt')[0] : $title;
                ?>
                <img src="<?php echo esc_url( $img_src ); ?>"
                srcset="<?php echo esc_attr( $img_srcset ); ?>"
                sizes="
                (max-width: 768px) 800px,
                (max-width: 1200px) 1400px,
                (max-width: 2000px) 2000px"
                alt="<?php echo $alt; ?>"
                class="img"
                loading="lazy">
            </div>

        <?php elseif ( $feature === 'video' ) : ?>
            <?php
            if ( get_field('player_options',$ID) === 'vi') :
                $videoid = get_field('feature_video_id');
                $videourl = 'http://player.vimeo.com/video/' . $videoid;

                $args =
                    add_query_arg( array(
                    'title' => 0,
                    'byline' => 0
                ), $videourl );?>

                <div class="feature video">
                    <div class="video-wrapper">
                        <iframe
                            id="viplayer"
                            type="text/html"
                            width="100%"
                            height="100%"
                            src="<?php echo esc_url($args); ?>"
                            frameborder="0"
                            webkitallowfullscreen mozallowfullscreen allowfullscreen>
                        </iframe>
                    </div>
                </div>
            <?php else :
            $videoid = get_field('feature_video_id',$ID);
            ?>
            <div class="feature video">
                <?php
                if (get_field('feature_video_bg')) :
                // $img_id = is_product_category() ? $thumbnail_id : get_post_thumbnail_id($ID);
                $img_id = get_field('feature_video_bg');
                $size = 'large';
                $img_src = wp_get_attachment_image_url( $img_id, $size );
                $img_srcset = wp_get_attachment_image_srcset( $img_id, $size );
                $title = get_post($id)->post_title;
                $alt = isset(get_post_meta($id, '_wp_attachment_image_alt')[0]) ? get_post_meta($id, '_wp_attachment_image_alt')[0] : $title;
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
                    if ( get_field('feature_video_bg')) :
                    // $img_id = is_product_category() ? $thumbnail_id : get_post_thumbnail_id($ID);
                    $img_id = get_field('feature_video_bg');
                    $size = 'large';
                    $img_src = wp_get_attachment_image_url( $img_id, $size );
                    $img_srcset = wp_get_attachment_image_srcset( $img_id, $size );
                    $title = get_post($id)->post_title;
                    $alt = isset(get_post_meta($id, '_wp_attachment_image_alt')[0]) ? get_post_meta($id, '_wp_attachment_image_alt')[0] : $title;
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
                        <div id="video" class="animate video-wrapper">
                            <div id="player"></div>
                            <!-- // 'origin': '<?php //echo //home_url(); ?>',put in params for live site -->
                            <script type="text/javascript">
                                var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
                                if ( viewportWidth > 768) {
                                    // 2. This code loads the IFrame Player API code asynchronously.
                                    var tag = document.createElement('script');
                                    tag.src = "https://www.youtube.com/iframe_api";
                                    var firstScriptTag = document.getElementsByTagName('script')[0];
                                    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                                    var player;
                                    var playerWrapper = document.querySelector('#video');
                                    function onYouTubeIframeAPIReady() {
                                        player = new YT.Player('player', {
                                            videoId: '<?php echo $videoid; ?>',  // youtube video id
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
                                                'playlist': '<?php echo $videoid; ?>',
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
                                }
                            </script>
                        </div>
                    </div>
                </div>
            <?php endif; ?>

        <?php elseif ( $feature == 'slider') :
        $images = get_field('feature_slider',$ID);
            if( $images ):
                $slides = get_field('feature_slider',$ID);
                if( $slides ): ?>

                    <div class="feature slider">
                        <?php foreach( $slides as $slide ):
                            $link = $slide['slide']['link']; ?>
                            <div class="slide">
                                <?php
                                $id = $slide['slide']['image'];
                                $size = 'large';
                                $img_src = wp_get_attachment_image_url( $id, $size );
                                $img_srcset = wp_get_attachment_image_srcset( $id, $size );
                                $title = get_post($id)->post_title;
                                $alt = isset(get_post_meta($id, '_wp_attachment_image_alt')[0]) ? get_post_meta($id, '_wp_attachment_image_alt')[0] : $title;
                                ?>
                                <img src="<?php echo esc_url( $img_src ); ?>"
                                srcset="<?php echo esc_attr( $img_srcset ); ?>"
                                sizes="(min-width: 768px) 1600px, 100vw"
                                alt="<?php echo $alt; ?>"
                                class="img"
                                loading="lazy">
                                <div class="caption-content">
                                    <?php echo $slide['slide']['content'];?>
                                    <?php if ( !empty($link) ) : ?>
                                    <a href="<?php echo $link['url'];?>" class="btn" <?php echo (!empty($link['target'])) ? 'target="'.$link['target'].'"' : '';?> <?php echo (!empty($link['target']) && $link['target'] === 'blank') ? 'rel="nofollow noopener' : '';?>><?php echo $link['title'];?></a>
                                    <?php endif; ?>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                <?php endif; ?>
            <?php endif; ?>
        <?php endif; ?>
    <?php endif; ?>
</div>