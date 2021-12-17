<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Unicorn_Tears
 */

?>

</main><!-- #content -->

	<footer id="colophon" class="site-footer">
		<div class="container">
			<div class="row">
				<?php
                printf(
                    /* translators: 1:Site title, 2: current year */
                    esc_html__('© Copyright %1$s %2$s', 'unicorn-tears'),
    get_bloginfo('name'),
    date_i18n(
                        /* translators: Copyright date format, see https://secure.php.net/date */
                        _x(' Y', 'copyright date format', 'unicorn-tears')
                    )
);
                ?>
				<?php if (has_nav_menu('social')) : ?>
				<nav class="social-navigation" role="navigation" aria-label="<?php _e('Social Links Menu', 'unicorn-tears'); ?>">
					<?php
                        wp_nav_menu(array(
                            'theme_location' => 'social',
                            'menu_class'     => 'social-links-menu',
                            'depth'          => 1,
                            'link_before'    => '<span class="screen-reader-text">',
                            'link_after'     => '</span>',
                        ));
                    ?>
				</nav><!-- .social-navigation -->
				<?php endif;?>
			</div>
		</div>

	</footer><!-- #colophon -->
</div><!-- #page -->
<div class="screen-overlay" aria-hidden="true"></div>
<?php wp_footer(); ?>

<script type="text/javascript">

function onYouTubeIframeAPIReady() {
		if(playerList.length === 0)
		return;

		for(var i = 0; i < playerList.length;i++) {
				createPlayer(playerList[i]);
		}
}

function createPlayer(playerInfo) {
	var videoWrapper = '#video-' + playerInfo;
	var playerElem = document.querySelector(videoWrapper);
	var playerWrapper = playerElem.parentNode

	var player = new YT.Player('video-' + playerInfo, {
				videoId:playerInfo.split('-')[0],  // youtube video id
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
						'playlist': playerInfo.split('-')[0],
						'wmode': 'opaque'
				},
				events: {
						'onReady': function() {
							player.playVideo();
							player.mute();
						},
						'onStateChange': function(event) {
							if(event.data === 1) {
									playerWrapper.classList.add('fadein')
							} else if(event.data === 0) {
									player.playVideo();
									player.mute();
							}
						}
				}
		});
		return player;
}
</script>
</body>
</html>
