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

<<<<<<< HEAD
    }

    countTimer('31 july 2020');

    //menu
    const toggleMenu = () => {
                
            const btnMenu = document.querySelector('.menu'),
                menu = document.querySelector('menu'),
                closeBtn = document.querySelector('.close-btn'),
                menuItems = menu.querySelectorAll('ul>li');

            const handlerMenu = function(){
                    menu.classList.toggle('active-menu');
            };
            btnMenu.addEventListener('click', handlerMenu);
            closeBtn.addEventListener('click', handlerMenu);

            menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));
    };

    toggleMenu();
	
=======
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

>>>>>>> 218f260e9a49a505f29e04c3b243c86a5f9058b0
	//popup   
	const togglePopup = () => {
		let intViewerWidth = window.innerWidth;
		console.log(intViewerWidth);
		const popup = document.querySelector('.popup'), // само окно
			popupBtn = document.querySelectorAll('.popup-btn'), // кнопка раскрытия окна
			popupClose = document.querySelector('.popup-close');

		

		function animatePopup() {
			let start = Date.now(); // запоминаем дату начала
			let timer = setInterval(function () {
				// сколько времени прошло с начала анимации?
				let timePassed = Date.now() - start;

				if (timePassed >= 2000) {
					clearInterval(timer); // закончить анимацию через 2 секунды
					return;
				}

				// отрисовать анимацию на момент timePassed, прошедший с начала анимации
				draw(timePassed);

			}, 20);

			// в то время как timePassed идёт от 0 до 2000
			// left изменяет значение от 0px до 400px
			function draw(timePassed) {
				popup.style.left = timePassed / 5 + 'px';
				console.log(popup.style.left);
			}
		}
		
		popup.style.display = 'block';
		let coordinates = popup.getBoundingClientRect()
		console.log(coordinates);
		console.log(popup.offsetParent);
		console.log(popup.clientHeight, popup.offsetTop);

		// /console.log(popup.style.display);
		popup.style.position = "block";
		coordinates.left = '-100px';
		//popup.offsetLeft
		popupBtn.forEach((elem) => {
			elem.addEventListener('click', () => {

				animatePopup();





			});
		});
		popupClose.addEventListener('click', () => {
			popup.style.display = 'none'
		})
	}

	togglePopup();

})