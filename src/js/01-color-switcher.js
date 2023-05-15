function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');

const COLOR_CHANGE_TIME = 1000;
let intervalID = null;

console.log(body)

startBtn.addEventListener('click', onStart);
stopBtn.addEventListener('click', onStop);


function onStart(evt) {
    body.style.backgroundColor = getRandomHexColor();
    startBtn.disabled = true;
    stopBtn.disabled = false;

    intervalID = setInterval( () => {
        body.style.backgroundColor = getRandomHexColor();
    }, COLOR_CHANGE_TIME)
}

function onStop() {
    clearInterval(intervalID);
    startBtn.disabled = false;
    stopBtn.disabled = true;
}
