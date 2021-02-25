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
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor(timeRemaining / 60 % 60),
                hours = Math.floor(timeRemaining /60 / 60) % 24,
                days = Math.floor(timeRemaining /60 / 60) / 24;
                return{ timeRemaining, hours, minutes, seconds };
        } 
        
        function updateClock() {
            let timer = getTimeRemaining();

            console.log(timer);
            // console.log('seconds: ', seconds);
            // console.log('minutes: ', minutes);
            // console.log('hours: ', hours);

            timeHours.textContent = timer.hours;
            timeMinutes.textContent = timer.minutes;
            timeSeconds.textContent = timer.seconds;

            if (timer.timerRemaining > 0) {
                setTimeout(updateClock, 1000);
            }   
        }

        updateClock();

    }

    countTimer('31 july 2019');
        // setInterval(countTimer, 1000,'31 july 2021');

})