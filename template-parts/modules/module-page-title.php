

<?php if ( is_archive() ) : ?>
	<?php the_archive_title('<h1 class="section-title">', '</h1>');?>
<?php elseif ( is_404() ) : ?>
	<h1 class="section-title">
		<?php esc_html_e( 'Oops! That page can&rsquo;t be found.', 'unicorn-tears' ); ?>
	</h1>
<?php elseif ( is_singular() ) : ?>
	<?php the_title('<h1 class="section-title">', '</h1>'); ?>
<?php elseif ( is_search() ) : ?>
	<h1 class="section-title"><?php printf( esc_html__( 'Search Results for: %s', 'unicorn-tears' ), '<span>' . get_search_query() . '</span>' ); ?></h1>
<?php elseif ( is_home() ) : ?>
	<?php $title = get_the_title( get_option('page_for_posts') );?>
	<h1 class="section-title">
	<?php echo $title ?>
	</h1>
<?php else : ?>
<h1 class="section-title">
	<?php the_title(); ?>
</h1>
<?php endif; ?>