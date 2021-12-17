<?php
//get the page id
$ID = get_page_ID();
$feature = get_field('feature_options',$ID);
?>

<?php if ( !empty($ID) && !empty($feature) ) : //get feature options ?>
    <div class="feature-wrapper">
        <?php if ( (has_post_thumbnail($ID) && $feature === 'image') ) : ?>
            <div class="feature image">
                <?php
                // $img_id = is_product_category() ? $thumbnail_id : get_post_thumbnail_id($ID);
                $img_id = get_post_thumbnail_id($ID);
                $size = 'large';
                $img_src = wp_get_attachment_image_url( $img_id, $size );
                $img_srcset = wp_get_attachment_image_srcset( $img_id, $size );
                $title = get_post( $img_id )->post_title;
                $alt = isset(get_post_meta( $img_id, '_wp_attachment_image_alt')[0]) ? get_post_meta( $img_id, '_wp_attachment_image_alt')[0] : $title;
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
                $video_id = get_field('feature_video_id',$ID);
                $unique_id = wp_unique_id();
                ?>
                <div class="feature video">
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
                        <div id="feature-video-wrapper-<?php echo $video_id;?>" class="video-wrapper">
                                <div id="video-<?php echo $video_id;?>-<?php echo $unique_id;?>"></div>
                                <script type="text/javascript">
                                    var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
                                    // if ( viewportWidth > 768) {
                                        playerList.push('<?php echo $video_id;?>-<?php echo $unique_id;?>')
                                    // }
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
</div>
<?php endif; ?>