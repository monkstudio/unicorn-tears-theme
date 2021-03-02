<?php 
if ( get_sub_field('section_title')){
    get_template_part( 'template-parts/layouts/section-title' ); 
}?>

<div class="container">
    <?php $tiled = get_sub_field('make_into_tiles');if( have_rows('card') ): ?>
    <div class="row <?php echo ($tiled ) ? 'tiled' : '';?>">
        <?php while( have_rows('card') ): the_row();
            $image = get_sub_field('image');
            $content = get_sub_field('content');
            $link = get_sub_field('link');
            ?>

            <div class="col">
                <div class="card">
                    <?php
                    if ( $image ) :
                    $id = $image;
                    $size = 'medium';
                    $img_src = wp_get_attachment_image_url( $id, $size );
                    $img_srcset = wp_get_attachment_image_srcset( $id, $size );
                    $title = get_post($id)->post_title;
                    $alt = isset(get_post_meta($id, '_wp_attachment_image_alt')[0]) ? get_post_meta($id, '_wp_attachment_image_alt')[0] : $title;
                    // var_dump(isset(get_post_meta($id, '_wp_attachment_image_alt')[0]))
                    ?>
                    <figure class="img-wrapper">
                        <img src="<?php echo esc_url( $img_src ); ?>"
                        srcset="<?php echo esc_attr( $img_srcset ); ?>"
                        sizes="(min-width: 768px) 700px, 1000px"
                        alt="<?php echo $alt; ?>"
                        class="img"
                        loading="lazy">
                    </figure>
                    <?php endif;?>
                    <div class="content">
                        <div class="inner">
                            <?php echo $content; ?>
                            <?php if ( !empty($link) ) : ?>
                            <a href="<?php echo $link['url'];?>" class="btn" <?php echo (!empty($link['target'])) ? 'target="'.$link['target'].'"' : '';?> <?php echo (!empty($link['target']) && $link['target'] === 'blank') ? 'rel="nofollow noopener' : '';?>><?php echo $link['title'];?></a>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
            </div>
        <?php endwhile; ?>
    </div>
    <?php endif; ?>
</div>