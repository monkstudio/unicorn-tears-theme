<?php
$items = get_sub_field('items');
$section_title = get_sub_field('section_title');
$counter = 0;
?>
<section class="accordion-list">
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="sidebar">
          <h4><?php echo $section_title;?></h4>
          <!-- <?php //echo sanitize_title($section_title);?>-panel<?php //echo $counter;?>"> -->
        </div>
      </div>
      <div class="col">
        <div class="accordion-items">
          <?php
          $counter = 0;
          foreach($items as $item ) :
          $counter++; ?>
          <div id="<?php echo sanitize_title($section_title);?>-panel<?php echo $counter;?>">
            <div class="content panel">
                <strong class="panel-header"><?php echo $item['title'];?> <div class="plus icon"></div> </strong>
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
