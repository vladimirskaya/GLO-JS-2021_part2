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
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li');

        const handlerMenu = function () {
            menu.classList.toggle('active-menu');
        };
        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);

        menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));
    };

    toggleMenu();

    //popup  
    const togglePopup = () => {
        let count = 0, // для перемещения от границы окна
            comeOn,
            intViewerWidth = window.innerWidth;
        console.log('ширина онка intViewerWidth', intViewerWidth);
        const popup = document.querySelector('.popup'), // само окно
            popupBtn = document.querySelectorAll('.popup-btn'); // кнопка раскрытия окна

        popupBtn.forEach((elem) => {
            elem.addEventListener('click', () => {

                function animatePopup() {
                    count += 20;
                    modalWindow.style.left = count + 'px';
                    if (parseFloat(modalWindow.style.left) > (intViewerWidth - coordinates.width) / 2) {
                        //console.log('comeOn');
                        clearTimeout(comeOn);
                        return;
                    }
                    setTimeout(animatePopup, 15);
                }

                // popup.style.position = 'relative';
                popup.style.display = "block";
                const modalWindow = popup.querySelector('.popup-content');
                let coordinates = modalWindow.getBoundingClientRect();
                modalWindow.style.left = `-${coordinates.width}px`;
                if (intViewerWidth > 768) {
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
            dot = document.querySelectorAll('.dot'),
            slider = document.querySelector('.portfolio-content');

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
            } else if (target.matches('#arrow-left')){
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }

            if(currentSlide >= slide.length){
                currentSlide = 0;
            }

            if (currentSlide < 0){
                currentSlide = slide.length - 1;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
    
        });

//обработчик события на весь слайдер
slider.addEventListener('mouseover', (event) =>{
    if(event.target.matches('.portfolio-btn') || 
        event.target.matches('.dot')){
            stopSlide();
        }
});
slider.addEventListener('mouseout', (event) =>{
    if(event.target.matches('.portfolio-btn') || 
        event.target.matches('.dot')){
            startSlide();
        }
});

        startSlide(1500);
    };

    slider();


})