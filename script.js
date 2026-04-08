// PLAYING: Indicates if the timer is running
const PLAYING = true;
// PAUSE: Indicates if the timer isn't running
const PAUSE = false;

// SHOW: Used to change the display of an element to show it with 'block'
// Releated to shiftTimeCtrlBtn()
const SHOW = 'block';
// HIDE: Used to change the display of an element to hide it with 'none'
// Releated to shiftTimeCtrlBtn()
const HIDE = 'none';

// TEXT: Used to choose 'text' to show on the timeControlButtons within an array that contains both text (0) and icon (1)
// Releated to showOnTimeCtrlBtn()
const TEXT = 0;
// ICON: Used to choose 'icon' to show on the timeControlButtons within an array that contains both text (0) and icon (1)
// Releated to showOnTimeCtrlBtn()
const ICON = 1;


// ======= COLORS ==============================================================================================

const POMODORO_COLOR = '#af4949';
const PAUSE_COLOR = '#191919';
const SHORT_REST_COLOR = '#0853a3';


// BODY: Used to represent the default value ('') of the changeBackgroundColorOf() function
// Releated to changeBackgroundColorOf()
const BODY = '';


// ======= TIMER MODES =========================================================================================

// POMODORO: Represents the first mode: 'POMODORO', whitin the MODES array
// Releated to MODES array
const POMODORO = 0;
// POMODORO: Represents the second mode: 'SHORT_REST', whitin the MODES array
// Releated to MODES array
const SHORT_REST = 1;

// currentMode: Global variable used to indicates the current timer mode
let currentMode = POMODORO;

// MODES: Array that contains all timer modes
const MODES = [
    'POMODORO', 'SHORT_REST'
];

// ========== PRESETS ==========================================================================================

// PRESET_COLORS: An object of objects that contains preset colors of all timer modes.
const PRESET_COLORS = {
    POMODORO: {backgroundColor: '#af4949', buttonsColor: 'rgb(88, 13, 13)'},
    SHORT_REST: {backgroundColor: '#0853a3', buttonsColor: '#053569'}
};

// PRESET_COLORS: An object of objects that contains pre-established times for all timer modes.
const PRESET_TIMES = {
    POMODORO: {minutes: 25, seconds: 0},
    SHORT_REST: {minutes: 5, seconds: 0}
}


// ========== AUDIOS =========================================================================================

// girmmAudio: An Audio object of the song that plays at the fight with a boss of Hollow Knight videogame
// Used when starts the timer
let grimmAudio = new Audio('./assets/audio/start-timer-grimmSound.mp3');
// girmmAudio: An Audio object that contains sound from the popular lines "The World!" from JoJo's Bizarre Adventure
// Used when pauses the timer
let theWorldAudio = new Audio('./assets/audio/stop-timer-theWorld.mp3');


// ========== ELEMENTS FROM HTML =============================================================================

const strtTimeBtn = document.getElementById('start-time-btn');
const pausTiemBtn = document.getElementById('pause-time-btn');
const mainContainer = document.getElementById('main-container');
const clockContainer = document.getElementById('clock-section');
const timeCtrlBtns = document.getElementsByClassName('time-ctrl-btn');
const optionBtns = document.getElementsByClassName('option-btn');
const minutes = document.getElementById('min');
const seconds = document.getElementById('sec');

// currentMin = Used to store the current minutes of the timer
// Related to timer()
let currentMin = Number(minutes.textContent);
// currentSec = Used to store the current seconds of the timer
// Related to timer()
let currentSec = Number(seconds.textContent);
// count = Used to mesure the time within timer() function
// Related to timer()
let count = 0;

// clockPlaying: Global variable that indicates the current state of the timer: playing or on pause
let clockPlaying = PAUSE;


// ========== TIME CONTROL BUTTONS ==========================================================================

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


// ========== FUNCTIONS =============================================================================

// shiftTimeCtrlBtn: A function that switch the visibility of time control buttons depending on clockPlaying value
// Related to clockPlaying variable
function shiftTimeCtrlBtn() {
    strtTimeBtn.style.display = clockPlaying ? SHOW : HIDE;
    pausTiemBtn.style.display = clockPlaying ? HIDE : SHOW;

    clockPlaying = clockPlaying ? PAUSE : PLAYING;
}

// showOnTimeCtrlBtn(): Used to toggle between icon or text when hover over a time control button
function showOnTimeCtrlBtn(element) {
    const playBtn = ['Junbi dekita?', '▶︎'];
    const pauseBtn = ['Ganbare!', '||'];

    if (!clockPlaying) 
        strtTimeBtn.textContent = playBtn[element];
    else
        pausTiemBtn.textContent = pauseBtn[element];
}

function handleButtonClick (audioToPlay, audioToPause, color, elementIds, scaleValue) {
    shiftTimeCtrlBtn();
    timer();

    // Sounds
    audioToPause.pause();
    audioToPause.currentTime = 0;
    audioToPlay.play();

    changeBackgroundColorOf(BODY, color);
    const Ttime = color == PAUSE_COLOR ? '0.3s' : '0.1s';
    scaleElements(elementIds, scaleValue, Ttime);
}

function changeBackgroundColorOf (elementId = BODY, color, tTime = '0.1s') {
    if (elementId == BODY) {
        document.body.style.setProperty('transition', `background-color ${tTime} ease`);
        document.body.style.setProperty('background-color', color);
    }
    else {
        const element = document.getElementById(elementId);
        element.style.setProperty('transition', `background-color ${tTime} ease`);
        element.style.setProperty('background-color', color);
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
        btn.style.setProperty('background-color', PRESET_COLORS[MODES[currentMode]]);
        
    });
    
    scaleElements(['options-container', 'task-section', 'greeting-text'], 1, '0.3s');
    shiftTimeCtrlBtn();
}