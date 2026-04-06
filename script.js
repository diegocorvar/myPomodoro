const PLAYING = true;
const PAUSE = false;
const SHOW = 'block';
const HIDE = 'none';

const TEXT = 0;
const ICON = 1;

let startTimerSound = new Audio('./assets/audio/start-timer-grimmSound.mp3');
let stopTimerSound = new Audio('./assets/audio/stop-timer-theWorld.mp3');

const strtTimeBtn = document.getElementById('start-time-btn');
const pausTiemBtn = document.getElementById('pause-time-btn');
const mainContainer = document.getElementById('main-container');
const minutes = document.getElementById('min');
const seconds = document.getElementById('sec');

let currentMin = Number(minutes.textContent);
let currentSec = Number(seconds.textContent);
let count = 0;

let clockPlaying = PAUSE;

function shiftTimeCtrlBtn() {
    strtTimeBtn.style.display = clockPlaying ? SHOW : HIDE;
    pausTiemBtn.style.display = clockPlaying ? HIDE : SHOW;

    clockPlaying = clockPlaying ? PAUSE : PLAYING;
}

function showOnTimeCtrlBtn(element) {
    const playBtn = ['Junbi dekita?', '▶︎'];
    const pauseBtn = ['Ganbare!', '||'];

    if (!clockPlaying) 
        strtTimeBtn.textContent = playBtn[element];
    else
        pausTiemBtn.textContent = pauseBtn[element];
}

strtTimeBtn.addEventListener("mouseenter", () => showOnTimeCtrlBtn(ICON));
strtTimeBtn.addEventListener("mouseleave", () => showOnTimeCtrlBtn(TEXT));
strtTimeBtn.addEventListener("click", shiftTimeCtrlBtn);
strtTimeBtn.addEventListener("click", timer);
strtTimeBtn.addEventListener("click", () => {
    stopTimerSound.pause();
    stopTimerSound.currentTime = 0;
    startTimerSound.play();
});
strtTimeBtn.addEventListener("click", () => {
    document.body.style.transition = 'background-color 0.1s ease';
    document.body.style.backgroundColor = '#af4949';
});

pausTiemBtn.addEventListener("mouseenter", () => showOnTimeCtrlBtn(ICON));
pausTiemBtn.addEventListener("mouseleave", () => showOnTimeCtrlBtn(TEXT));
pausTiemBtn.addEventListener("click", shiftTimeCtrlBtn);
pausTiemBtn.addEventListener("click", () => {
    startTimerSound.pause();
    startTimerSound.currentTime = 0;
    stopTimerSound.play();
});
pausTiemBtn.addEventListener("click", () => {
    document.body.style.transition = 'background-color 5s ease';
    document.body.style.backgroundColor = '#191919';
});

function timer() {
    if (clockPlaying) {
        count++;

        if (count == 100){
            if (currentSec == 0)
                currentSec = 60;
            else
                currentSec--;
            count = 0;
        }

        if (currentSec == 60) {
            currentMin--;
            currentSec = 59;
        }

        let minStr = String(currentMin);
        let secStr = String(currentSec);

        if (currentMin < 10)
            minStr = '0' + minStr;

        if (currentSec < 10)
            secStr = '0' + secStr;

        minutes.textContent = minStr;
        seconds.textContent = secStr;

        setTimeout(timer, 10);
    }
}