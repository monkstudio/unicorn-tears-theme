<?php
$items = get_sub_field('items');
$section_title = get_sub_field('section_title');
$counter = 0;
?>
<section class="accordion-list">
  <div class="container">
    <div class="row">
      <div class="col">
        <?php
        if ( get_sub_field('section_title')) {
            get_template_part( 'template-parts/layouts/section-title' );
        }?>
        <div class="accordion-items">
          <?php
          $counter = 0;
          foreach($items as $item ) :
          $counter++; ?>
          <div id="<?php echo sanitize_title($item['title']);?>-panel<?php echo $counter;?>">
            <div class="content panel">
                <button class="panel-header"><?php echo $item['title'];?> <?php echo get_icon('plus',20);?></button>
                <div class="panel-content">
                <?php echo $item['content'];?>
                </div>
            </div>
          </div>
          <?php endforeach;?>
        </div>
      </div>
    </div>
  </div>
</section>
