import axios from "axios";

const TOKEN = "";
const CHAT_ID = "-1001734485530";
const URI_IP = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
const success = document.querySelector('.success')
const checkbox = document.querySelector('.form__label-checkbox')
// создаем новый объект `Date`
let today = new Date();
let now = today.toLocaleString();


// Проверка поддержки webp, добавление класса webp или no-webp  для HTML
export function isWebp() {
    // Проверка поддержки webp
    function testWebP(callback) {
        let webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height === 2);
        };
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }

    //
    testWebP(function (support) {
        if (support === true) {
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

//Обработка события нажатия по кнопке меню
export function servicesPress(selector) {
    //Добавляем обработчик события при нажатии
    selector.addEventListener('click', function () {
        //Добавляем класс элементу
        selector.classList.toggle("tabs__inner-btn--active");
        selector.parentNode.classList.toggle("tabs__inner--visible");

        document.querySelectorAll('.tabs__list-item').forEach(item => {
            item.addEventListener('click', function () {
                if (document.querySelector('.tabs__inner--visible')) {
                    document.querySelector('.tabs__inner--visible').classList.remove("tabs__inner--visible");
                }
            });
        });
    });
}

export function fixedPress(selector) {
    selector.addEventListener('click', function () {
        document.querySelector('.fixed__inner').classList.toggle("fixed__inner--visible");
        document.querySelectorAll('a[href^="#"]').forEach(item => {
            item.addEventListener('click', function () {
                document.querySelector('.fixed__inner').classList.remove("fixed__inner--visible");
            })
        })
        if (document.querySelector('.social--visible')) {
            document.querySelector('.social--visible').classList.remove('social--visible')
        }
    });
}

export function socialPress(selector) {
    selector.addEventListener('click', function () {
        document.querySelector('.social').classList.toggle("social--visible");
        document.querySelectorAll('.social__link').forEach(item => {
            item.addEventListener('click', function () {
                document.querySelector('.social').classList.remove("social--visible");
            })
        })
    });
}


export function scrolTo() {
    const smoothLinks = document.querySelectorAll('a[href^="#"]');
    for (let smoothLink of smoothLinks) {
        smoothLink.addEventListener('click', function (e) {
            e.preventDefault();
            if (document.querySelector('.nav__btn--active')) {
                document.querySelector('.nav__btn--active').classList.remove('nav__btn--active')
            }
            const id = smoothLink.getAttribute('href');
            document.querySelector(id).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            if (document.querySelector('.social--visible')) {
                document.querySelector('.social--visible').classList.remove('social--visible')
            }
        });

    }

}


export function fixedHiden() {
    if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
        document.querySelector(".fixed").style.display = "block";
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
        this.classList.add('tabs__list-item--active');
        tabName = this.getAttribute('data-tab-name');
        selectTabContent(tabName);
    }

    function selectTabContent(tabName) {
        tabContent.forEach(item => {
            item.classList.contains(tabName) ? item.classList.add('tabs__box--visible') : item.classList.remove('tabs__box--visible');

        })
    }
}

export function telValidation(phoneInput) {

    let getInputNumbersValue = function (input) {
        return input.value.replace(/\D/g, "");
    }

    let onPhoneInput = function (e) {
        let input = e.target,
            inputNumbersValue = getInputNumbersValue(input),
            formattedInputValue = "",
            selectionStart = input.selectionStart;

        if (!inputNumbersValue) {
            return input.value = "";
        }

        if (input.value.length !== selectionStart) {
            if (e.data && /\D/g.test(e.data)) {
                input.value = inputNumbersValue;
            }
            return
        }

        if (["8"].indexOf(inputNumbersValue[0]) > -1) {
            let firstSymbols = (inputNumbersValue[0] === "8") ? "80" : "";
            formattedInputValue = firstSymbols + " ";
            if (inputNumbersValue.length > 2) {
                formattedInputValue += "(" + inputNumbersValue.substring(2, 4)
            }
            if (inputNumbersValue.length >= 5) {
                formattedInputValue += ") " + inputNumbersValue.substring(4, 7)
            }
            if (inputNumbersValue.length >= 8) {
                formattedInputValue += "-" + inputNumbersValue.substring(7, 9)
            }
            if (inputNumbersValue.length >= 10) {
                formattedInputValue += "-" + inputNumbersValue.substring(9, 11)
            }
        } else if (["3"].indexOf(inputNumbersValue[0]) > -1) {
            let firstSymbols = (inputNumbersValue[0] === "3") ? "+375" : "";
            formattedInputValue = firstSymbols + " ";
            if (inputNumbersValue.length > 3) {
                formattedInputValue += "(" + inputNumbersValue.substring(3, 5)
            }
            if (inputNumbersValue.length >= 6) {
                formattedInputValue += ") " + inputNumbersValue.substring(5, 8)
            }
            if (inputNumbersValue.length >= 9) {
                formattedInputValue += "-" + inputNumbersValue.substring(8, 10)
            }
            if (inputNumbersValue.length >= 11) {
                formattedInputValue += "-" + inputNumbersValue.substring(10, 12)
            }
        } else {
            //else
            input.value = "";
        }
        input.value = formattedInputValue;
    }

    let onPhoneKeyDown = function (e) {
        let input = e.target;
        if (e.keyCode === 8 && getInputNumbersValue(input).length === 1) {
            input.value = "";
        }
    }

    let onPhonePaste = function (e) {
        let pasted = e.clipboardData || window.clipboardData,
            input = e.target,
            inputNumbersValue = getInputNumbersValue(input)

        if (pasted) {
            let pastedText = pasted.getData("Text");
            if (/\D/g.test(pastedText)) {
                input.value = inputNumbersValue;
            }
        }
    }

    phoneInput.addEventListener('input', onPhoneInput);
    phoneInput.addEventListener('keydown', onPhoneKeyDown);
    phoneInput.addEventListener('paste', onPhonePaste);
}


export function sendMessage() {
    document.querySelector('.form').addEventListener('submit', function (e) {
        e.preventDefault()

        let message = `<b>Заявка с сайта!</b>\n`;
        message += `<b>создана: ${now}</b>\n`
        message += `<b>Имя: ${this.name.value}</b>\n`
        message += `<b>Телефон: ${this.telephone.value}</b>\n`
        message += `<b>Описание: ${this.description.value}</b>`

        axios.post(URI_IP, {
            chat_id: CHAT_ID,
            parse_mode: 'html',
            text: message
        })
            .then((res) => {
                this.name.value = "";
                this.telephone.value = "";
                this.description.value = "";
                checkbox.style.display = "none"
                success.style.display = "inline-block"
            })
            .catch((err) => {
                console.warn(err)
            })
            .finally(() => {
                console.log('конец')
            })
    })
}
