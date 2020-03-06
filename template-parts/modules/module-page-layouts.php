<?php
    if(have_rows('page_layouts')) {
        echo '<div class="page-layouts">';
        $counter=0;
        while(have_rows('page_layouts')) {
            $counter++;
            the_row(); ?>
            <section id="<?php echo 's' . $counter; ?>" class="page-layout animate <?php echo get_row_layout();?>" aria-label="page section">
                <?php get_template_part('template-parts/layouts/' . get_row_layout()); ?>
            </section>
    <?php }
    echo '</div>';
    }
?>