const PLAYING = true;
const PAUSE = false;
const SHOW = 'block';
const HIDE = 'none';
const TEXT = 0;
const ICON = 1;
const POMODORO_COLOR = '#af4949';
const PAUSE_COLOR = '#191919';
const SHORT_REST_COLOR = '#0853a3';
const BODY = '';

const POMODORO = 0;
const SHORT_REST = 1;

let currentMode = POMODORO;

const MODES = [
    'POMODORO', 'SHORT_REST'
];

const PRESET_COLORS = {
    POMODORO: {backgroundColor: '#af4949', buttonsColor: 'rgb(88, 13, 13)'},
    SHORT_REST: {backgroundColor: '#0853a3', buttonsColor: '#053569'}
};

const PRESET_TIMES = {
    POMODORO: {minutes: 25, seconds: 0},
    SHORT_REST: {minutes: 5, seconds: 0}
}

let grimmAudio = new Audio('./assets/audio/start-timer-grimmSound.mp3');
let theWorldAudio = new Audio('./assets/audio/stop-timer-theWorld.mp3');

const strtTimeBtn = document.getElementById('start-time-btn');
const pausTiemBtn = document.getElementById('pause-time-btn');
const mainContainer = document.getElementById('main-container');
const clockContainer = document.getElementById('clock-section');
const timeCtrlBtns = document.getElementsByClassName('time-ctrl-btn');
const optionBtns = document.getElementsByClassName('option-btn');
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
strtTimeBtn.addEventListener("click", () => handleButtonClick(
    grimmAudio,
    theWorldAudio,
    PRESET_COLORS[MODES[currentMode]]['backgroundColor'],
    ['options-container', 'task-section', 'greeting-text'],
    0
));

pausTiemBtn.addEventListener("mouseenter", () => showOnTimeCtrlBtn(ICON));
pausTiemBtn.addEventListener("mouseleave", () => showOnTimeCtrlBtn(TEXT));
pausTiemBtn.addEventListener("click", () => handleButtonClick(
    theWorldAudio,
    grimmAudio,
    PAUSE_COLOR,
    ['options-container', 'task-section', 'greeting-text'],
    1
));

function handleButtonClick (audioToPlay, audioToPause, color, elementIds, scaleValue) {
    shiftTimeCtrlBtn();
    timer();

    // Sounds
    // audioToPause.pause();
    // audioToPause.currentTime = 0;
    // audioToPlay.play();

    changeBackgroundColorOf(BODY, color);
    const Ttime = color == PAUSE_COLOR ? '5s' : '0.1s';
    scaleElements(elementIds, scaleValue, Ttime);
}

function changeBackgroundColorOf (elementId = BODY, color, tTime = '0.1s') {
    if (elementId == BODY) {
        document.body.style.transition = `background-color ${tTime} ease`;
        document.body.style.backgroundColor = color;
    }
    else {
        const element = document.getElementById(elementId);
        element.style.transition = `all ${tTime} ease`;
        element.style.backgroundColor = color;
    }
}

function scaleElements (elementIds, scaleValue, tTime = '0.1s') {
    elementIds.forEach(id => {
        const element = document.getElementById(id);
        element.style.transform = `scale(${scaleValue})`;
        element.style.transition = `all ${tTime}`;
    });
}

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

        if (currentSec == 60 && currentMin == 0) {

            if (currentMode == POMODORO) changeModeTo(SHORT_REST);
            else if (currentMode == SHORT_REST) changeModeTo(POMODORO);
            return;
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

function changeModeTo(mode) {        
    currentMode = mode;

    const min = PRESET_TIMES[MODES[currentMode]]['minutes'];
    const sec = PRESET_TIMES[MODES[currentMode]]['seconds'];
    
    minutes.textContent = min < 10 ? '0' + min : `${min}`;
    currentMin = min;
    currentSec = sec;

    changeBackgroundColorOf(BODY, PAUSE_COLOR);
    changeBackgroundColorOf(clockContainer.id, PRESET_COLORS[MODES[currentMode]]['backgroundColor']);
    const timeBtnsArray = [...timeCtrlBtns];
    const optionBtnsArray = [...optionBtns];
    timeBtnsArray.forEach(btn => {
        changeBackgroundColorOf(btn.id, PRESET_COLORS[MODES[currentMode]]['buttonsColor'], '0.3s');
    });
    optionBtnsArray.forEach(btn => {
        changeBackgroundColorOf(btn.id, PRESET_COLORS[MODES[currentMode]]['backgroundColor']);
    });
    
    scaleElements(['options-container', 'task-section', 'greeting-text'], 1, '5s');
    shiftTimeCtrlBtn();
}