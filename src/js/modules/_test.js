// Проверка поддержки webp, добавление класса webp или no-webp  для HTML
export function isWebp() {
    // Проверка поддержки webp
    function testWebP(callback) {
        let webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height == 2);
        };
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }

    //
    testWebP(function (support) {
        if (support == true) {
            document.querySelector('body').classList.add('webp');
        } else {
            document.querySelector('body').classList.add('no-webp');
        }
    });
}


//Обработка события нажатия по кнопке меню
export function menuPress(selector) {
    //Добавляем обработчик события при нажатии
    selector.addEventListener('click', function () {
        //Добавляем класс элементу
        selector.classList.toggle("nav__btn--active");
    });
}


export function scrolTo() {
    const smoothLinks = document.querySelectorAll('a[href^="#"]');
    for (let smoothLink of smoothLinks) {
        smoothLink.addEventListener('click', function (e) {
            e.preventDefault();
            // if (document.querySelector('.nav__btn--active')) {
            //     document.querySelector('.nav__btn--active').classList.remove('nav__btn--active')
            // }
            const id = smoothLink.getAttribute('href');
            document.querySelector(id).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
}


export function fixedHiden() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        document.querySelector(".fixed").style.display = "inline-block";
    } else {
        document.querySelector(".fixed").style.display = "none";
    }
}


export function parallax() {
    if (document.querySelector('.header__parallax')) {
        const parallaxBox = document.querySelector('.header__parallax');
        const parallaxItem1 = document.querySelector('.header__parallax-sub1');
        const parallaxItem2 = document.querySelector('.header__parallax-sub2');
        const parallaxItem3 = document.querySelector('.header__parallax-sub3');

        //
        let theresholdSets = [];
        for (let i = 0; i <= 1.0; i += 0.005) {
            theresholdSets.push(i);
        }
        const callback = function (entries, observer) {
            const scrollTopProcent = window.pageYOffset / parallaxBox.offsetHeight * 800;
            setParallaxItemsStyle(scrollTopProcent);
        };
        const observer = new IntersectionObserver(callback, {
            threshold: theresholdSets
        });

        observer.observe(document.querySelector('.header__parallax-main'))

        function setParallaxItemsStyle(scrollTopProcent) {
            parallaxItem1.style.cssText = `transform: translateY(+${scrollTopProcent}%)`;
            parallaxItem2.style.cssText = `transform: translateY(+${scrollTopProcent / 5 + 50}%)`;
            parallaxItem3.style.cssText = `transform: translateY(+${scrollTopProcent + 100}%)`;
        }
    }
}


export function tabs() {

    let tabItem = document.querySelectorAll('.tabs__list-item'),
        tabContent = document.querySelectorAll('.tabs__box'),
        tabName;

    tabItem.forEach(item => {
        item.addEventListener('click', selectTabItem);
    })

    function selectTabItem() {
        document.querySelector('.tabs__list-item--active').classList.remove('tabs__list-item--active');
        if ((this.getAttribute('data-tab-number') >= 3)) {
            console.log('>=3')
            let count = ((this.getAttribute('data-tab-number') - 1));
            // console.log(count)
            for (let i = 2; i < (count + 2); i++){
                let tabNumber = i.getAttribute('data-tab-name');
                console.log(tabNumber)
            }
        } else {
            this.classList.add('tabs__list-item--active');
            tabName = this.getAttribute('data-tab-name');
            selectTabContent(tabName);
        }

    }

    function selectTabContent(tabName) {
        tabContent.forEach(item => {
            item.classList.contains(tabName) ? item.classList.add('tabs__box--visible') : item.classList.remove('tabs__box--visible');

        })
    }

    function selectTabNumber(tabNumber) {
        tabContent.forEach(item => {
            item.classList.contains(tabNumber) ? item.classList.add('tabs__box--visible') : item.classList.remove('tabs__box--visible');

        })
    }
}