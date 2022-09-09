import * as functions from "./modules/functions.js";
const width = window.screen.availWidth;


functions.isWebp()
if (width > 768) {
    functions.parallax()
}

window.onscroll = function () {
    functions.fixedHiden()
};

window.onload = function () {
    if (width <= 768) {
        functions.menuPress(document.querySelector('.nav__btn'));
    }
    if (width <= 1200) {
        functions.servicesPress(document.querySelector('.tabs__inner-btn'));
    }
    functions.fixedPress(document.querySelector('.fixed__btn'));
    functions.socialPress(document.querySelector('.contact-info__btn'));
    functions.scrolTo();
    functions.tabs()
    functions.sendMessage()
    functions.telValidation(document.querySelector('input[type=tel]'))

    const swiper = new Swiper('.swiper', {
        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        mousewheel: true,
        keyboard: true,
        spaceBetween: 50,
        autoHeight: true,
    });
};

