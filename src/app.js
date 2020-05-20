import 'owl.carousel/dist/assets/owl.carousel.min.css';
import 'owl.carousel/dist/assets/owl.theme.default.min.css';
import './styles.scss';

import 'owl.carousel/dist/owl.carousel.min.js';
import 'waypoints/lib/jquery.waypoints.min.js';
import 'counterup/jquery.counterup.min.js';

$(document).ready(function() {
    const STICKED_CLASS = 'sticked';
    const VIDEO_URL = 'https://www.youtube.com/embed/BztJ2iKrCGY?autoplay=1';
    const $menuButton = $('#menuButton');
    const $navPanel = $('#navPanel');
    const $navMenu = $('#navMenu');
    let navMenuIsOpen = false;
    
    init();

    function init() {
        checkScroll();
        $('.counter').counterUp({
            delay: 10,
            time: 2500
        });
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
        initPostsCarousel();
        bindEvents();
    }

    function bindEvents() {
        $(window).on('scroll', checkScroll);
        $('#playVideoBtn').on('click', onPlayVideoBtnClick);
        $menuButton.on('click', onBurgerClick);
        $navMenu.on('click', onNavMenuClick);
    }

    function onPlayVideoBtnClick() {
        $('#videoCover').fadeOut(1000, function() {
            $(this).remove();
            const $videoPlayer = $('#videoPlayer');
            $videoPlayer.show();
            $videoPlayer.find('iframe').attr('src', VIDEO_URL);
        });
    }

    function onBurgerClick(e) {
        if(!navMenuIsOpen) {
            openMenu();
        } else {
            closeMenu();
        }
    }

    function onNavMenuClick(e) {
        if($(e.target).hasClass('nav-menu-link')) {
            const navPanelHeight = Number($('#navPanel').css('height').replace('px', '')) - 2;
            const target = $(e.target).attr('href');
            $('html, body').animate({
                scrollTop: $(target).offset().top - navPanelHeight
            }, 500);
        }
    }

    function closeMenu() {
        navMenuIsOpen = false;
        $menuButton.removeClass('open');
        $navMenu.removeClass('opened-menu');
        $('body').css('overflow', 'auto');

        if($navPanel.hasClass(STICKED_CLASS) && !$navMenu.hasClass('opened-menu') && isScrollOnTop()) {
            $navPanel.removeClass(STICKED_CLASS)
        }
    }

    function openMenu() {
        navMenuIsOpen = true;
        $menuButton.addClass('open');
        $navMenu.addClass('opened-menu');
        $('body').css('overflow', 'hidden');

        if(!$navPanel.hasClass(STICKED_CLASS)) {
            stickNavPanel();
        }
    }

    function checkScroll() {
        toggleNavigationItem();
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

    function initPostsCarousel() {
        const windowWidth = window.innerWidth;
        const owlCarouselConfig = {
            loop: true,
            center: true,
            margin: 20,
            nav: true,
            dots: false
        };
        if(windowWidth < 710 ) {
            owlCarouselConfig.items = 1;
        } else {
            owlCarouselConfig.items = 3;
        }
        $('.posts-owl-carousel').owlCarousel(owlCarouselConfig);
    }

    function toggleNavigationItem() {
        const navPanelHeight = Number($('#navPanel').css('height').replace('px', ''));
		const currentWindowTopPos = $(window).scrollTop();
		const aboutTopPosition = $('#about').offset().top - navPanelHeight;
        const portfolioTopPosition = $('#portfolio').offset().top - navPanelHeight;
        const featuresTopPosition = $('#features').offset().top - navPanelHeight;
        const blogTopPosition = $('#blog').offset().top - navPanelHeight;
        const contactTopPosition = $('#contact').offset().top - $(window).height() + navPanelHeight;
        let currentSectionId = null;

        switch(true) {
            case(currentWindowTopPos >= contactTopPosition):
                currentSectionId = 'contact';
                break;
            case(currentWindowTopPos >= blogTopPosition):
                currentSectionId = 'blog';
                break;
            case(currentWindowTopPos >= featuresTopPosition):
                currentSectionId = 'features';
                break;
            case(currentWindowTopPos >= portfolioTopPosition):
                currentSectionId = 'portfolio';
                break;
            case(currentWindowTopPos >= aboutTopPosition):
                currentSectionId = 'about';
                break;
            default:
                currentSectionId = 'home';
                break;
        }
        activateCurrentAnchor(currentSectionId);
    }
    
    function activateCurrentAnchor(sectionId) {
        $('.nav-menu-link').removeClass('active');
	    $(`a[href="#${sectionId}"]`).addClass('active');
    }
});