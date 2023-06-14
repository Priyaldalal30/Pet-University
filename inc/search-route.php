<?php

add_action('rest_api_init','universityRegisterSearch');

function universityRegisterSearch() {
    register_rest_route('university/v1','search', array(
        'methods' => WP_REST_SERVER::READABLE,
        'callback' => 'universitySearchResult'
    )
    );
}

function universitySearchResult($data){
    $mainQuery = new WP_Query(array(
        'post_type' => array('professor','post','page','program','event'),
        's' => sanitize_text_field($data['term'])
       ));
    
    $results = array(
        'generalInfo' => array(),
        'professors' => array(),
        'programs' => array(),
        'events' => array()
    );

    while($mainQuery->have_posts()){
        $mainQuery->the_post();

        if (get_post_type() == 'post' OR get_post_type() == 'page') {
            array_push($results['generalInfo'], array(
            'title' => get_the_title(),
            'link' => get_the_permalink(),
        ));
        }

         if (get_post_type() == 'professor') {
            array_push($results['professors'], array(
            'title' => get_the_title(),
            'link' => get_the_permalink(),
        ));
        }

         if (get_post_type() == 'program') {
            array_push($results['programs'], array(
            'title' => get_the_title(),
            'link' => get_the_permalink(),
        ));
        }

         if (get_post_type() == 'event') {
            array_push($results['events'], array(
            'title' => get_the_title(),
            'link' => get_the_permalink(),
        ));
        }
       
    }

    return $results;
}