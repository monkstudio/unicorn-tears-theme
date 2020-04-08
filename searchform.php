
<?php $unique_id = esc_attr( get_unique_id( 'search-form-' ) ); ?>

<form role="search" method="get" class="search-form" action="<?php echo esc_url( home_url( '/' ) ); ?>">
	<label for="<?php echo esc_attr($unique_id); ?>">
		<span class="screen-reader-text"><?php echo _x( 'Search for:', 'label', 'unicorn-tears' ); ?></span>
	</label>
	<input type="search" id="<?php echo $unique_id; ?>" class="search-field" placeholder="<?php echo esc_attr_x( 'Search', 'placeholder', 'unicorn-tears' ); ?>" value="<?php echo get_search_query(); ?>" name="s" />
	<button type="submit" class="btn search-submit"><?php echo get_icon('search',20);?><span class="screen-reader-text"><?php echo _x( 'Search', 'submit button', 'unicorn-tears' ); ?></span></button>
</form>