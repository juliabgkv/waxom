import 'owl.carousel/dist/assets/owl.carousel.min.css';
import 'owl.carousel/dist/assets/owl.theme.default.min.css';
import './styles.scss';

import 'owl.carousel/dist/owl.carousel.min.js';

$(document).ready(function(){
    $('.home-owl-carousel').owlCarousel({
        items: 1,
        dots: true,
        loop: true,
        autoplay: true,
        autoplayHoverPause: true,
        nav: true,
        navText: ["", ""],
        navContainer: '.home-carousel-container .custom-nav'
    });
    $('.posts-owl-carousel').owlCarousel({
        items: 3,
        loop: true,
        center: true,
        margin: 20,
        nav: true,
        dots: false
    });
});

$('#playVideoBtn').on('click', onPlayVideoBtnClick);

function onPlayVideoBtnClick() {
    $('#videoCover').fadeOut(1000, function() {
        $(this).remove();
        const $videoPlayer = $('#videoPlayer');
        $videoPlayer.show();
        $videoPlayer.find('iframe').attr('src', 'https://www.youtube.com/embed/BztJ2iKrCGY?autoplay=1');
    });
}