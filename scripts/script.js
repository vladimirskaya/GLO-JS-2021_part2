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
			if (target){
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
                        console.log('comodalWindow.style.left = ',modalWindow.style.left);
                        console.log((clientWidth - coordinates.width) / 2 );
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
            if(target.classList.contains('popup-close')){
                popup.style.display = 'none';
            } else {
                target = target.closest('.popup-content');
                if(!target){
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

})
