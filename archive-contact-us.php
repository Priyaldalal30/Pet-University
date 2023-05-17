<?php 
get_header(); 
pageBanner(array(
  'title' => 'Contact Us',
));?>


    <div class="container container--narrow page-section">
<ul class="link-list min-list">
<?php 
while(have_posts()) {
  the_post(); ?>
 <li>
    <div><?php the_title(); ?></div>
    <div><?php the_content(); ?></div>
 </li>
<?php }
echo paginate_links();
?>
</ul>
    </div>

<?php
get_footer();
?>
