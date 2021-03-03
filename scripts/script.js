window.addEventListener('DOMContentLoaded', function () {
        'use strict';

        // Timer
        function countTimer(deadline) {
            let timeHours = document.querySelector('#timer-hours'),
                timeMinutes = document.querySelector('#timer-minutes'),
                timeSeconds = document.querySelector('#timer-seconds');

            function getTimeRemaining() {
                let dateStop = new Date(deadline).getTime(),
                    dateNow = new Date().getTime(),
                    timeRemaining = (dateStop - dateNow) / 1000,
                    timeData = {
                        timeRemaining,
                        hours: 0,
                        minutes: 0,
                        seconds: 0
                    };

                if (timeRemaining > 0) {
                    timeData.seconds = Math.floor(timeRemaining % 60),
                        timeData.minutes = Math.floor(timeRemaining / 60 % 60),
                        timeData.hours = Math.floor(timeRemaining / 60 / 60) % 24,
                        timeData.days = Math.floor(timeRemaining / 60 / 60) / 24;
                }
                return timeData;
            }

            function correctTimeView(timeNumber) {
                return (timeNumber < 10) ? '0' + timeNumber : timeNumber;
            }

            function updateClock() {
                let timer = getTimeRemaining();
                console.log(timer);
                if (timer.timeRemaining < 0) {
                    document.querySelector('.timer-numbers').style.color = 'red';
                    clearTimeout(comeOn);
                }
                timeHours.textContent = correctTimeView(timer.hours);
                timeMinutes.textContent = correctTimeView(timer.minutes);
                timeSeconds.textContent = correctTimeView(timer.seconds);
            }

            let comeOn = setTimeout(updateClock, 1000);

        }

        countTimer('31 july 2020');

        //menu
        const toggleMenu = () => {

            const btnMenu = document.querySelector('.menu'),
                menu = document.querySelector('menu');

            const handlerMenu = function () {
                menu.classList.toggle('active-menu');
            };

            //первый обработчик, через делегирование
            menu.addEventListener('click', (event) => {
                let target = event.target;
                //console.log('target1: ', target);
                target = target.closest('a'); // найдет ближайшую ссылку
                //console.log('target2: ', target);*/
                if (target) {
                    //console.log('зашло в условие, причем таргет сейчас: ', target);
                    handlerMenu();
                }

            });

            // второй обработчик без делегирования (сделать один общий для двух <- услож.)
            btnMenu.addEventListener('click', handlerMenu);
        };

        toggleMenu();

        //popup  
        const togglePopup = () => {
            const popup = document.querySelector('.popup'), // само окно
                popupBtn = document.querySelectorAll('.popup-btn'); // кнопка раскрытия окна

            popupBtn.forEach((elem) => {
                elem.addEventListener('click', () => {
                    const modalWindow = popup.querySelector('.popup-content');

                    let comeOn,
                        count = 0, // счетчик для перемещения от границы окна
                        clientWidth = document.documentElement.clientWidth,
                        coordinates = modalWindow.getBoundingClientRect();
                    console.log('ширина онка clientWidth', clientWidth);

                    function animatePopup() {
                        count += 20;
                        modalWindow.style.left = count + 'px';
                        if (parseFloat(modalWindow.style.left) > (clientWidth - coordinates.width) / 2) {
                            console.log('comodalWindow.style.left = ', modalWindow.style.left);
                            console.log((clientWidth - coordinates.width) / 2);
                            clearTimeout(comeOn);
                            return;
                        }
                        setTimeout(animatePopup, 15);
                    }

                    // popup.style.position = 'relative';
                    popup.style.display = "block";
                    modalWindow.style.left = `-${coordinates.width}px`;
                    if (clientWidth > 768) {
                        comeOn = setTimeout(animatePopup, 15);
                    } else {
                        modalWindow.style.left = `${coordinates.x}px`;
                    }
                });
            });

            popup.addEventListener('click', (event) => {
                let target = event.target;
                if (target.classList.contains('popup-close')) {
                    popup.style.display = 'none';
                } else {
                    target = target.closest('.popup-content');
                    if (!target) {
                        popup.style.display = 'none';
                    }
                }
            });
        }

        togglePopup();

        //табы
        const tabs = () => {
            const tabHeader = document.querySelector('.service-header'),
                tab = tabHeader.querySelectorAll('.service-header-tab'),
                tabContent = document.querySelectorAll('.service-tab');

            const toggleTabContent = (index) => {
                for (let i = 0; i < tabContent.length; i++) {
                    if (index === i) {
                        tab[i].classList.add('active')
                        tabContent[i].classList.remove('d-none');
                    } else {
                        tab[i].classList.remove('active')
                        tabContent[i].classList.add('d-none');
                    }
                }
            };

            tabHeader.addEventListener('click', (event) => {
                let target = event.target;
                //console.log('target1: ', target);
                target = target.closest('.service-header-tab');
                //console.log('target2: ', target);
                if (target) {
                    tab.forEach((item, i) => {
                        if (item === target) {
                            toggleTabContent(i);
                        }
                    });
                }
            });
        };

        tabs();


        //cslider
        const slider = () => {
            const slide = document.querySelectorAll('.portfolio-item'),
                btn = document.querySelectorAll('.portfolio-btn'),
                portfolioDots = document.querySelector('.portfolio-dots'),
                slider = document.querySelector('.portfolio-content');

            for (let i = 0; i < slide.length; i++) {
                let dot = document.createElement('li');
                if (i === 0) dot.className = 'dot dot-active';
                else dot.className = 'dot';
                portfolioDots.append(dot);
            }

            const dot = portfolioDots.querySelectorAll('.dot');

            let currentSlide = 0,
                interval;

            const prevSlide = (elem, index, strClass) => {
                elem[index].classList.remove(strClass);
            };
            const nextSlide = (elem, index, strClass) => {
                elem[index].classList.add(strClass);
            };

            const autoPlaySlide = () => {

                prevSlide(slide, currentSlide, 'portfolio-item-active');
                prevSlide(dot, currentSlide, 'dot-active');
                currentSlide++;
                if (currentSlide >= slide.length) {
                    currentSlide = 0;
                }
                nextSlide(slide, currentSlide, 'portfolio-item-active');
                nextSlide(dot, currentSlide, 'dot-active');
            };
            const startSlide = (time = 3000) => {
                interval = setInterval(autoPlaySlide, time);
            };
            const stopSlide = () => {
                clearInterval(interval);
            };

            slider.addEventListener('click', (event) => {
                event.preventDefault();
                let target = event.target;

                prevSlide(slide, currentSlide, 'portfolio-item-active');
                prevSlide(dot, currentSlide, 'dot-active');
                // if(!target.matches('.portfolio-btn, .dot')){
                //     return;
                // }

                if (target.matches('#arrow-right')) {
                    currentSlide++;
                } else if (target.matches('#arrow-left')) {
                    currentSlide--;
                } else if (target.matches('.dot')) {
                    dot.forEach((elem, index) => {
                        if (elem === target) {
                            currentSlide = index;
                        }
                    });
                }

                if (currentSlide >= slide.length) {
                    currentSlide = 0;
                }

                if (currentSlide < 0) {
                    currentSlide = slide.length - 1;
                }

                nextSlide(slide, currentSlide, 'portfolio-item-active');
                nextSlide(dot, currentSlide, 'dot-active');

            });

            //обработчик события на весь слайдер
            slider.addEventListener('mouseover', (event) => {
                if (event.target.matches('.portfolio-btn') ||
                    event.target.matches('.dot')) {
                    stopSlide();
                }
            });
            slider.addEventListener('mouseout', (event) => {
                if (event.target.matches('.portfolio-btn') ||
                    event.target.matches('.dot')) {
                    startSlide();
                }
            });

            startSlide(1500);
        };

        slider();

        //Block Our Team
        const toggleCommandPhoto = () => {
            let targetSrcMain;
            const command = document.querySelector('#command');

            command.addEventListener('mouseover', (event) => {
                let target = event.target.closest('img');
                if (target !== null) {
                    console.log(target.src);
                    targetSrcMain = target.src;
                    target.src = target.dataset.img;
                    console.log(target.src);
                }
            });

            command.addEventListener('mouseout', (event) => {
                let target = event.target.closest('img');
                if (target !== null) {
                    target.src = targetSrcMain;
                }

            });
        }
        toggleCommandPhoto();


        //block check validation Connection
        const checkInputs = () => {

            //part 1. Проверка калькулятора
            //Ф. обеспечивает ввод только цифр в калькуляторе в калькуляторе  
            const validCalcNumber = () => {
                const inputsCalcBlock = document.querySelectorAll('.calc-block > input');
                inputsCalcBlock.forEach(item => {
                    item.value = ''
                });
                // console.log(inputsCalcBlock);
                inputsCalcBlock.forEach((item) => {
                    item.addEventListener('input', (event) => {
                        event.target.value = event.target.value.replace(/\D/g, '');
                    })
                });

            };
            validCalcNumber();

            //Часть 2. Проверка форм отправки сообщений
            const forms = document.querySelectorAll('form');

            forms.forEach((form) => {

                form.addEventListener('input', (event) => {
                    let target = event.target.closest('input');
                    // console.log('target in form', target);
                    let regEx = '';
                    //console.log(' target.addEventListener(-input-, (t) =>{ заехвли + target.name',target.name);
                    if (target.name === 'user_name' || target.name === 'user_message') {
                        regEx = /[^а-я\ \-]/gi;
                    } else if (target.name === 'user_phone') {
                        regEx = /[^\d\-\(\)]/g;
                    } else if (target.name === 'user_email') {
                        regEx = /[^a-z\@\-\_\.\!\~\*\']/gi;
                    }
                    //console.log(regEx);
                    target.value = target.value.replace(regEx, '');

                    // target.addEventListener('blur',(target) =>{
                    //     console.log('target.name: ',target);
                });
            });

            forms.forEach((form) => {

                form.addEventListener('change', (event) => {
                    let target = event.target.closest('input');
                    console.log('in change, target.name: ', target.name);
                    target.addEventListener('blur',() =>{
                        if (target.name === 'user_name' || target.name === 'user_message') {
                            validAlpha(target);
                        } else if (target.name === 'user_phone') {
                            validPhone(target);
                        } else if (target.name === 'user_email') {
                            validMail(target);
                        };

                        function validAlpha(t) {
                            let correctValue = t.value.replace(/\ {2,}/, ' ').replace(/\-{2,}/, '-').trim();                           
                            t.value = correctValue[0].toUpperCase() + correctValue.slice(1).toLowerCase();   
                        };

                        function validPhone(t) {
                            let correctValue = '',
                                onlyNumbers = t.value.match(/\d+/g);
                            if(onlyNumbers) {
                                for (let i = 0; i < onlyNumbers.length; i++){
                                correctValue += onlyNumbers[i];
                            }
                            correctValue =  correctValue[0] + '(' + correctValue.slice(1,4) + ')' + correctValue.slice(4,7) + '-' + correctValue.slice(7)
                            }
                            t.value = correctValue;
                            
                        };

                        function validMail(t) {
                            //let correctValue = 
                            let regExBeforeDot = /.+\./,
                                regeXBeforeDog = /.+\@/,
                                value = t.value.replace(/\@{2,}/g, '@').replace(/\.{2,}/g, '.'),
                                before_domen2 = String(value.match(regExBeforeDot)),
                                domen2 = value.replace(before_domen2, '').replace(/\@/g, ''),
                                before_domen1 = String(before_domen2.match(regeXBeforeDog)),
                                domen1 = before_domen2.replace(before_domen1,''),

                                login = before_domen1.replace(/\@/g, '');
                            console.log('Само значение: ',t.value);
                            console.log('че получили: ', login + '@' + domen1 + '.' + domen2);
                            console.log('login = ', login);
                            console.log('before_domen1 = ', before_domen1, ' => midBit =',domen1);
                            console.log('before_domen2 = ', before_domen2, ' => lastBit =',domen2);
                            t.value = login + '@' + domen1 + '.' + domen2;

                        }





                    });
                    
                });
            });




        







}
checkInputs();




})