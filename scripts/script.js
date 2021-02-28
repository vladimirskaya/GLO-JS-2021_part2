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
            intViewerWidth = document.documentElement.clientWidth;
        console.log('ширина онка intViewerWidth', intViewerWidth);
        const popup = document.querySelector('.popup'), // само окно
            popupBtn = document.querySelectorAll('.popup-btn'), // кнопка раскрытия окна
            popupClose = document.querySelector('.popup-close');

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
        popupClose.addEventListener('click', () => {
            popup.style.display = 'none';

        })
    }

    togglePopup();

})
