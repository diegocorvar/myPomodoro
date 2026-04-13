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
// SHORT_REST: Represents the second mode: 'SHORT_REST', whitin the MODES array
// Releated to MODES array
const SHORT_REST = 1;
// LONG_REST: Represents the third mode: 'LONG_REST', whitin the MODES array
// Releated to MODES array
const LONG_REST = 2;
// LONG_REST: Represents the four mode: 'FOCUS_TRACK', whitin the MODES array
// Releated to MODES array
const FOCUS_TRACK = 3;

// currentMode: Global variable used to indicates the current timer mode
let currentMode = POMODORO;

// MODES: Array that contains all timer modes
const MODES = [
    'POMODORO', 'SHORT_REST', 'LONG_REST', 'FOCUS_TRACK'
];

const MODES_NAMES = [
    'Pomodoro', 'Short rest', 'Long rest', 'Focus track'
];

// pomodoroCounter: Global variable used for count the number of pomodoros finished
let pomodoroCounter = 0; 

// ========== PRESETS ==========================================================================================

// PRESET_COLORS: An object of objects that contains preset colors of all timer modes.
const PRESET_COLORS = {
    POMODORO: {backgroundColor: '#af4949', buttonsColor: 'rgb(88, 13, 13)'},
    SHORT_REST: {backgroundColor: '#3f8287', buttonsColor: '#306266ff'},
    LONG_REST: {backgroundColor: '#06407eff', buttonsColor: '#03284eff'},
    FOCUS_TRACK: {backgroundColor: '#191919', buttonsColor: '#302f2fff'}
};

// PRESET_COLORS: An object of objects that contains pre-established times for all timer modes.
const PRESET_TIMES = {
    POMODORO: {hours: 0, minutes: 25, seconds: 0},
    SHORT_REST: {hours: 0, minutes: 5, seconds: 0},
    LONG_REST: {hours: 0, minutes: 15, seconds: 0},
    FOCUS_TRACK: {hours: 0, minutes: 0, seconds: 0}
}

let currentProgress = 0;

// ========== AUDIOS =========================================================================================

// girmmAudio: An Audio object of the song that plays at the fight with a boss of Hollow Knight videogame
// Used when starts the timer
let grimmAudio = new Audio('./assets/audio/start-timer-grimmSound.mp3');
// girmmAudio: An Audio object that contains sound from the popular lines "The World!" from JoJo's Bizarre Adventure
// Used when pauses the timer
let theWorldAudio = new Audio('./assets/audio/stop-timer-theWorld.mp3');
let clickButtonAudio = new Audio('./assets/audio/button-click.mp3');


// ========== ELEMENTS FROM HTML =============================================================================

// TIMER CONTROL BUTTONS
const strtTimeBtn = document.getElementById('start-time-btn');
const pausTiemBtn = document.getElementById('pause-time-btn');
const timeCtrlBtns = document.getElementsByClassName('time-ctrl-btn');

// CONTAINERS
const counterContainer = document.getElementById('counter-section');
const mainContainer = document.getElementById('main-container');
const clockContainer = document.getElementById('clock-section');
const clock = document.getElementById('clock-container');

// OPTION BUTTONS
const optionBtns = document.getElementsByClassName('option-btn');
const pomodoroMBtn = document.getElementById('pomodoro-mode-btn');
const shortbreakMBtn = document.getElementById('shortBreak-mode-btn');
const longbreakMBtn = document.getElementById('longBreak-mode-btn');
const focustrackMBtn = document.getElementById('focus-mode-btn');

// TIME UNITS
const hours = document.getElementById('hrs');
const hrsDblDot = document.getElementById('hrs-doubledot');
const minutes = document.getElementById('min');
const seconds = document.getElementById('sec');

// COUNTERS
const pomCounterTxt = document.getElementById('pomodoro-count');

// TEXT 
const currentModeTitle = document.getElementById('current-mode-txt');

// PROGRESS BAR 
const progBar = document.getElementById('progress-bar');

const addTaskBtn = document.getElementById('add-task-btn');


// ========== TIMER VARIABLES =============================================================================

// currentHr = Used to store the current hours of the timer
// Related to timer()
let currentHr = Number(hours.textContent);
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

let totalSeconds = calcTotalSeconds();

function calcTotalSeconds() {
    return Number(hours.textContent) * 3600 + Number(minutes.textContent) * 60 + Number(seconds.textContent);
}


// ========== TIME CONTROL BUTTONS ==========================================================================

strtTimeBtn.addEventListener("mouseenter", () => showOnTimeCtrlBtn(ICON));
strtTimeBtn.addEventListener("mouseleave", () => showOnTimeCtrlBtn(TEXT));
strtTimeBtn.addEventListener("click", () => {
        handleButtonClick(
            grimmAudio,
            theWorldAudio,
            PRESET_COLORS[MODES[currentMode]]['backgroundColor'],
            ['options-container', 'counter-section', 'greeting-text', 'tasks-container'],
            0
        )
        totalSeconds = calcTotalSeconds();
        if (currentProgress != 0) currentProgress--;
    }
);

pausTiemBtn.addEventListener("mouseenter", () => showOnTimeCtrlBtn(ICON));
pausTiemBtn.addEventListener("mouseleave", () => showOnTimeCtrlBtn(TEXT));
pausTiemBtn.addEventListener("click", () => handleButtonClick(
    clickButtonAudio,
    grimmAudio,
    PAUSE_COLOR,
    ['options-container', 'counter-section', 'greeting-text', 'tasks-container'],
    1
));

function handleButtonClick (audioToPlay, audioToPause, color, elementIds, scaleValue) {
    shiftTimeCtrlBtn();
    if (currentMode != FOCUS_TRACK) timer();
    else stopWatch();

    // Sounds
    audioToPause.pause();
    audioToPause.currentTime = 0;
    audioToPlay.play();

    changeBackgroundColorOf(BODY, color);
    const Ttime = color == PAUSE_COLOR ? '0.3s' : '0.1s';
    scaleElements(elementIds, scaleValue, Ttime);
}

// ========== OPTION MODE BUTTONS ==========================================================================

pomodoroMBtn.addEventListener('click', () => handleOptModBtn(POMODORO));
shortbreakMBtn.addEventListener('click', () => handleOptModBtn(SHORT_REST));
longbreakMBtn.addEventListener('click', () => handleOptModBtn(LONG_REST));
focustrackMBtn.addEventListener('click', () => handleOptModBtn(FOCUS_TRACK));

function handleOptModBtn (mode) {
    changeModeTo(mode);
    clickButtonAudio.pause();
    clickButtonAudio.currentTime = 0;
    clickButtonAudio.play();
}




addTaskBtn.addEventListener('mouseenter', () => {
    document.getElementById('add-img').style.filter = 'invert(59%) sepia(1%) saturate(2388%) hue-rotate(10deg) brightness(94%) contrast(83%)';
});
addTaskBtn.addEventListener('mouseleave', () => {
    document.getElementById('add-img').style.filter = 'invert(81%) sepia(3%) saturate(0%) hue-rotate(138deg) brightness(104%) contrast(96%)';
});


// ========== FUNCTIONS =============================================================================

// shiftTimeCtrlBtn: A function that switch the visibility of time control buttons depending on clockPlaying value
// Related to clockPlaying variable
function shiftTimeCtrlBtn() {
    strtTimeBtn.style.display = clockPlaying ? SHOW : HIDE;
    pausTiemBtn.style.display = clockPlaying ? HIDE : SHOW;

    clockPlaying = clockPlaying ? PAUSE : PLAYING;
    progBar.style.width = clockPlaying ? `${currentProgress * 100 / totalSeconds}%` : '100%';
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
                increaseProgBar();
            count = 0;
        }

        if (currentSec == 60 && currentMin == 0) {

            if (currentMode == POMODORO) {
                pomodoroCounter++;
                pomCounterTxt.textContent = pomodoroCounter;
                if (pomodoroCounter % 4 == 0) changeModeTo(LONG_REST);
                else changeModeTo(SHORT_REST);
            }
            else changeModeTo(POMODORO);
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

function stopWatch() {
    if (clockPlaying) {
        count++;

        if (count == 100){
            currentSec++;
            count = 0;
        }

        if (currentSec == 60) {
            currentMin++;
            currentSec = 0;
        }

        if (currentMin == 60) {
            currentHr++;
            currentMin = 0;
        }

        let hrsStr = String(currentHr);
        let minStr = String(currentMin);
        let secStr = String(currentSec);

        if (currentHr < 10)
            hrsStr = '0' + hrsStr;

        if (currentMin < 10)
            minStr = '0' + minStr;

        if (currentSec < 10)
            secStr = '0' + secStr;

        hours.textContent = hrsStr;
        minutes.textContent = minStr;
        seconds.textContent = secStr;
        
        setTimeout(stopWatch, 10);
    }
}

function changeModeTo(mode) { 
    currentProgress = 0;
    if (currentMode != FOCUS_TRACK) totalSeconds = calcTotalSeconds();      
    currentMode = mode;

    currentModeTitle.textContent = MODES_NAMES[currentMode];

    const hrs = PRESET_TIMES[MODES[currentMode]]['hours'];
    const min = PRESET_TIMES[MODES[currentMode]]['minutes'];
    const sec = PRESET_TIMES[MODES[currentMode]]['seconds'];
    
    hours.textContent = hrs < 10 ? '0' + hrs : `${hrs}`;
    minutes.textContent = min < 10 ? '0' + min : `${min}`;
    seconds.textContent = sec < 10 ? '0' + sec : `${sec}`;

    currentHr = hrs;
    currentMin = min;
    currentSec = sec;

    if (currentMode == FOCUS_TRACK){
        hours.classList.remove('hide');
        hrsDblDot.classList.remove('hide');
        counterContainer.classList.add('hide');
    }
    else {
        hours.classList.add('hide');
        hrsDblDot.classList.add('hide');
        counterContainer.classList.remove('hide');
    }

    let elementsToChange = [
        [BODY, PAUSE_COLOR],
        [clockContainer, PRESET_COLORS[MODES[currentMode]]['backgroundColor']],
    ];

    elementsToChange.push(
        ...[...timeCtrlBtns].map(btn => [
            btn,
            PRESET_COLORS[MODES[currentMode]]['buttonsColor'], '0.3s'
        ])
    );
    elementsToChange.push(
        ...[...optionBtns].map(btn => [
            btn,
            PRESET_COLORS[MODES[currentMode]]
        ])
    );

    changeColors(elementsToChange);

    function changeColors (elements) {
        elements.forEach(([element, color]) => {
            changeBackgroundColorOf(element.id, color);
        });
    }
    
    scaleElements(['options-container', 'counter-section', 'greeting-text', 'tasks-container'], 1, '0.3s');
    if (clockPlaying) shiftTimeCtrlBtn();
}

function increaseProgBar() {
    currentProgress++;
    progBar.style.width = `${currentProgress * 100 / totalSeconds}%`;
}