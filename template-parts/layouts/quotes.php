
<?php
$quotes = get_sub_field('quotes');

if( $quotes ): ?>
    <div class="quotes slider">
      <?php foreach($quotes as $quote):?>
      <div class="slide">
        <div class="container">
          <div class="quote">
            <p>
              "<?php echo $quote['quote'];?>"
            </p>
            <?php if ($quote['citation']):?>
              <div class="attribution"><?php echo $quote['citation'];?></div>
            <?php endif;?>
          </div>
        </div>
        
      </div>
      <?php endforeach; ?>
    </div>
      <a href="<?php //echo $cta;?>"></a>
    <?php endif; ?>