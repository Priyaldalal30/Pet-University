<?php 
get_header(); 
pageBanner(array(
  'title' => 'All Events',
  'subtitle' => 'Come and join us for some educational fun!'
));
?>

    <div class="container container--narrow page-section">
<?php 
while(have_posts()) {
  the_post(); 
  get_template_part('template/event');
 }
echo paginate_links();
?>
<hr class="section-break">
<p>Check out our <a href="<?php echo site_url('/past-events')?>">past events</a> </p>
    </div>

<?php
get_footer();
?>
