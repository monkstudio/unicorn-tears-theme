<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Unicorn_Tears
 */


?>
    <!DOCTYPE html>
    <html class="no-js" <?php language_attributes(); ?>>

    <head>
        <meta charset="<?php bloginfo( 'charset' ); ?>">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="profile" href="http://gmpg.org/xfn/11">

        <meta name="mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="msapplication-starturl" content="/">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <?php wp_head(); ?>

        <script type="text/javascript">
            var tag = document.createElement('script');
                tag.src = "https://www.youtube.com/iframe_api";
                var firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag),
                playerList = [];
        </script>
    </head>
    <body <?php body_class(); ?>>
    <?php wp_body_open(); ?>

    <div id="page" class="site">
        <a class="skip-link screen-reader-text" href="#content">
            <?php esc_html_e( 'Skip to content', 'unicorn-tears' ); ?>
        </a>

        <header id="masthead">
            <div class="site-branding">
                <a href="<?php echo esc_url( home_url( '/' ) ); ?>">
                    <img src="<?php echo esc_url( get_template_directory_uri() ); ?>/dist/images/logo.svg" class="logo" alt="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>">
                </a>
            </div>

            <nav id="site-navigation" class="main-navigation" role="navigation" aria-label="Navigation menu for <?php bloginfo('name');?>">
                <button id="mobile-menu" class="menu-toggle hamburger hamburger--collapse" aria-controls="primary-menu" aria-expanded="false" type="button">
                    <span class="hamburger-box">
                        <span class="hamburger-inner"></span>
                    </span>
                    <div class="screen-reader-text">Menu</div>
                </button>

                <div class="menu-wrapper overlay">
                    <div class="overlay-content">
                        <?php
                        if ( has_nav_menu( 'primary' ) ) {
                            wp_nav_menu( array( 'theme_location' => 'primary', 'menu_id' => 'primary' ) );
                        } ?>
                    </div>
                </div>
            </nav>
        </header>
        <!-- #masthead -->
        <main id="content" class="site-content">

        <?php get_template_part( 'template-parts/modules/module', 'features' ); ?>