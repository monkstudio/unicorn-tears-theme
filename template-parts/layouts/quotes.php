
<?php
$quotes = get_sub_field('quotes');

if( $quotes ): ?>
  <?php
  if ( get_sub_field('section_title')){
      get_template_part( 'template-parts/layouts/section-title' );
  }?>
  <div class="quotes slider">
    <?php foreach($quotes as $quote):?>
    <div class="slide">
      <div class="container">
        <div class="quote">
            "<?php echo $quote['quote'];?>"
        </div>

        <?php if ($quote['citation']):?>
          <div class="attribution"><?php echo $quote['citation'];?></div>
        <?php endif;?>
      </div>

    </div>
    <?php endforeach; ?>
  </div>
<?php endif; ?>