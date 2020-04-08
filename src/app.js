import 'owl.carousel/dist/assets/owl.carousel.min.css';
import 'owl.carousel/dist/assets/owl.theme.default.min.css';
import './styles.scss';

import 'owl.carousel/dist/owl.carousel.min.js';

$(document).ready(function(){
    $(".owl-carousel").owlCarousel({
        items: 1,
        dots: true,
        loop: true,
        // autoplay: true,
        autoplayHoverPause: true,
        nav: true,
        navText: ["", ""],
        navContainer: '.carousel-container .custom-nav'
    });
});