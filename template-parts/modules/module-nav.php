
<?php if ( is_home() || is_archive() ) :
the_posts_navigation( array(
    'prev_text'                  => __( '<div class="btn">Older Posts</div>' , 'unicorn-tears'),
    'next_text'                  => __( '<div class="btn">Newer Posts</div>' , 'unicorn-tears')
) );
else :
the_post_navigation( array(
    'prev_text'                  => __( '<div class="btn">Older</div>' , 'unicorn-tears'),
    'next_text'                  => __( '<div class="btn">Newer</div>' , 'unicorn-tears')
) );
endif; ?>