window.addEventListener('DOMContentLoaded', function(){
    'use strict';

    // Timer
    function countTimer(deadline){
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
				
			if (timeRemaining > 0){ 	
				timeData.seconds = Math.floor(timeRemaining % 60),
				timeData.minutes = Math.floor(timeRemaining / 60 % 60),
				timeData.hours = Math.floor(timeRemaining /60 / 60) % 24,
				timeData.days = Math.floor(timeRemaining /60 / 60) / 24;
			}
			return timeData;
        } 
        
		function correctTimeView(timeNumber){
			return (timeNumber < 10)? '0' + timeNumber : timeNumber;
		}
		
        function updateClock() {
            let timer = getTimeRemaining();
            console.log(timer);
			if (timer.timeRemaining < 0){
				document.querySelector('.timer-numbers').style.color = 'red';
				clearTimeout(comeOn);
			}
            timeHours.textContent = correctTimeView(timer.hours);
            timeMinutes.textContent = correctTimeView(timer.minutes);
            timeSeconds.textContent = correctTimeView(timer.seconds);           
        }

<<<<<<< HEAD
		let comeOn = setInterval(updateClock, 1000);

    }

    countTimer('31 july 2021');



        //menu
        const toggleMenu = () => {
=======
		let comeOn = setTimeout(updateClock, 1000);

    }

    countTimer('31 july 2020');

    //menu
    const toggleMenu = () => {
>>>>>>> 0992b5cdf1d955c65d16e8402095bf3f86185197
                
            const btnMenu = document.querySelector('.menu'),
                menu = document.querySelector('menu'),
                closeBtn = document.querySelector('.close-btn'),
                menuItems = menu.querySelectorAll('ul>li');

            const handlerMenu = function(){
<<<<<<< HEAD
                    menu.classList.toggle('active-menu');
=======
                    if (!menu.style.transform || menu.style.transform === `translate(-100%)`)   {
                        menu.style.transform = `translate(0)`;
                    }else{
                        menu.style.transform = `translate(-100%)`;
                }
>>>>>>> 0992b5cdf1d955c65d16e8402095bf3f86185197
            };
            btnMenu.addEventListener('click', handlerMenu);
            closeBtn.addEventListener('click', handlerMenu);

            menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));
<<<<<<< HEAD
        };

        toggleMenu();
=======
    };

    toggleMenu();
	
	//popup   
	const togglePopup = () => {
		const popup = document.querySelector('.popup'),
			popupBtn = document.querySelectorAll('.popup-btn'),
			popupClose = document.querySelector('.popup-close');
			
		popupBtn.forEach((elem) => {
			elem.addEventListener('click', () => popup.style.display = "block")
			});
		popupClose.addEventListener('click', () => popup.style.display = 'none')
		}   
>>>>>>> 0992b5cdf1d955c65d16e8402095bf3f86185197
})

    
