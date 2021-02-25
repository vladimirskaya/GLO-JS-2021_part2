window.addEventListener('DOMContentLoaded', function(){
    'use strict'

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
            //console.log(timer);
			if (timer.timeRemaining < 0){
				document.querySelector('.timer-numbers').style.color = 'red';
				clearInterval(comeOn);
			}
            timeHours.textContent = correctTimeView(timer.hours);
            timeMinutes.textContent = correctTimeView(timer.minutes);
            timeSeconds.textContent = correctTimeView(timer.seconds);           
        }

		let comeOn = setInterval(updateClock, 1000);

    }

    countTimer('31 july 2021');
})


        //menu
        const toggleMenu = () => {
                
            const btnMenu = document.querySelector('.menu'),
                menu = document.querySelector('menu'),
                closeBtn = document.querySelector('.close-btn'),
                menuItems = menu.querySelectorAll('ul>li');


            btnMenu.addEventListener('click', () => {
                if (!menu.style.transform || menu.style.transform === `translate(-100%)`)   {
                    menu.style.transform = `translate(0)`;
                }else{
                    menu.style.transform = `translate(-100%)`;
                }
                
                });
                closeBtn.addEventListener('click', () => {
                    menu.style.transform = `translate(-100%)`;
                });

            for (let i = 0; i < menuItems.length; i++){
                menuItems[i].addEventListener('click', () => {
                    menu.style.transform = `translate(-100%)`;
                });

            }
        };

        toggleMenu();
})
