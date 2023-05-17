import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const dateField = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');

const ref = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
}

startBtn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const startDate = new Date();
        if(selectedDates[0] - startDate < 0){
            startBtn.disabled = true;
            Notify.failure('Select the date in the FUTURE');
        }

        else {
            startBtn.disabled = false;
            countDownTime = selectedDates[0];
        }
    },
};

flatpickr(dateField, options);

// const timer = {
//     timerID: null,
//     onStart(evt) {
//         startBtn.disabled = true;
//         dateField.disabled = true;
    
//         this.timerID = setInterval(() => {
//             const currentDate = Date.now();
//             deltaTime = countDownTime - currentDate;
//             const time = convertMs(deltaTime);
//             updateTimer(time);

//             console.log(time);
    
//             }, 1000); 
//     },

//     stopTimer(){
//         if(deltaTime <= 0){
//             clearInterval(this.timerID);
//             startBtn.disabled = false;
//             dateField.disabled = false;
//         }
//     }
    
// };


// startBtn.addEventListener('click', timer.onStart);

startBtn.addEventListener('click', onStart);

let deltaTime = null;
let timerID;

function onStart(evt) {
    startBtn.disabled = true;
    dateField.disabled = true;

    timerID = setInterval(() => {
        const currentDate = Date.now();
        deltaTime = countDownTime - currentDate;
        const time = convertMs(deltaTime);
        updateTimer(time);

        }, 1000); 
};

// function stopTimer(){
//     if(deltaTime <= 0){
//         clearInterval(timerID);
//         startBtn.disabled = false;
//         dateField.disabled = false;
//         return;
//     }
// };

// stopTimer();

function updateTimer({ days, hours, minutes, seconds }) {
    if(deltaTime < 0){
        clearInterval(timerID);
        startBtn.disabled = false;
        dateField.disabled = false;
        return;
    }
    
    ref.days.textContent = `${days}`;
    ref.hours.textContent = `${hours}`;
    ref.minutes.textContent = `${minutes}`;
    ref.seconds.textContent = `${seconds}`;
}

///////// Counting functions ///////


function addLeadingZero(value){
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }
  



