import 'owl.carousel/dist/assets/owl.carousel.min.css';
import 'owl.carousel/dist/assets/owl.theme.default.min.css';
import './styles.scss';

import 'owl.carousel/dist/owl.carousel.min.js';

$(document).ready(function() {
    const STICKED_CLASS = 'sticked';
    const $menuButton = $('#menuButton');
    const $navPanel = $('#navPanel');
    const $navMenu = $('#navMenu');
    let navMenuIsOpen = false;

    checkScroll();

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

    $(window).on('scroll', checkScroll);
    $('#playVideoBtn').on('click', onPlayVideoBtnClick);
    $menuButton.on('click', onMenuButtonClick);

    function onPlayVideoBtnClick() {
        $('#videoCover').fadeOut(1000, function() {
            $(this).remove();
            const $videoPlayer = $('#videoPlayer');
            $videoPlayer.show();
            $videoPlayer.find('iframe').attr('src', 'https://www.youtube.com/embed/BztJ2iKrCGY?autoplay=1');
        });
    }
    function onMenuButtonClick() {
        if(!navMenuIsOpen) {
            openMenu();
        } else {
            closeMenu();
        }
    }
    function closeMenu() {
        navMenuIsOpen = false;
        $menuButton.removeClass('open');
        $navMenu.removeClass('opened-menu');

        if($navPanel.hasClass(STICKED_CLASS) && !$navMenu.hasClass('opened-menu') && isScrollOnTop()) {
            $navPanel.removeClass(STICKED_CLASS)
        }
    }
    function openMenu() {
        navMenuIsOpen = true;
        $menuButton.addClass('open');
        $navMenu.addClass('opened-menu');

        if(!$navPanel.hasClass(STICKED_CLASS)) {
            stickNavPanel();
        }
    }
    function checkScroll() {
        if(!isScrollOnTop()) {
            stickNavPanel();
        } else {
            $navPanel.removeClass(STICKED_CLASS);
        }
    }
    function isScrollOnTop() {
        return $(window).scrollTop() === 0;
    }
    function stickNavPanel() {
        $navPanel.addClass(STICKED_CLASS);
    }
});