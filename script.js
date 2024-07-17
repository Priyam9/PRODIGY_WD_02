let startTime;
let updatedTime;
let difference;
let tInterval;
let savedTime = 0;
let running = false;
let lapNumber = 0;

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', recordLap);

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - savedTime;
        tInterval = setInterval(getShowTime, 1);
        startStopButton.innerHTML = 'Stop';
        running = true;
    } else {
        clearInterval(tInterval);
        savedTime = difference;
        startStopButton.innerHTML = 'Start';
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    savedTime = 0;
    difference = 0;
    running = false;
    display.innerHTML = '00:00:00.000';
    startStopButton.innerHTML = 'Start';
    lapsContainer.innerHTML = '';
    lapNumber = 0;
}

function recordLap() {
    if (running) {
        lapNumber++;
        const lapTime = document.createElement('div');
        lapTime.innerHTML = `Lap ${lapNumber}: ${display.innerHTML}`;
        lapsContainer.appendChild(lapTime);
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 1);

    display.innerHTML = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${padMilliseconds(milliseconds)}`;
}

function pad(number) {
    return (number < 10) ? '0' + number : number;
}

function padMilliseconds(number) {
    return (number < 10) ? '00' + number : (number < 100) ? '0' + number : number;
}
