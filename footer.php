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

	<footer id="colophon" class="site-footer" role="contentinfo" aria-label="site colophon">

		<div class="container">
			<div class="row">
				<div class="col">
					© Copyright <?php bloginfo('name'); ?> <?php
							echo date_i18n(
								/* translators: Copyright date format, see https://secure.php.net/date */
								_x( 'Y', 'copyright date format', 'unicorn-tears' )
							);
							?> <span class="separator">|</span> Made by <a href="https://monk.com.au" target="_blank" rel="noreferrer">Monk</a>
				</div>
				<div class="col">
					<?php if ( has_nav_menu( 'social' ) ) : ?>
					<nav class="social-navigation" role="navigation" aria-label="<?php _e( 'Social Links Menu', 'unicorn-tears' ); ?>">
						<?php
							wp_nav_menu( array(
								'theme_location' => 'social',
								'menu_class'     => 'social-links-menu',
								'depth'          => 1,
								'link_before'    => '<span class="screen-reader-text">',
								'link_after'     => '</span>',
							) );
						?>
					</nav><!-- .social-navigation -->
					<?php endif;?>
				</div>
			</div>
		</div>

	</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>