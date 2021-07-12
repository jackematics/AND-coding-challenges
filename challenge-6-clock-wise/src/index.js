import ClockDisplay from "./clock-display.js";

const ONES = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const TEENS = ['eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const TENS = ['ten', 'twenty', 'thirty', 'forty', 'fifty'];

const submitTime = document.querySelector('#submit-time');
const anglicisedTime = document.querySelector('#anglicised-time');
const playAudio = document.querySelector('#play-audio');

export const angliciseTime = (time) => {
    const hour = time.substring(0, 2);
    const minute = time.substring(3, 5);
    const meridiem = parseInt(hour) < 12 ? 'am' : 'pm';

    const anglicisedHour = angliciseHour(hour);
    const anglicisedMinute = angliciseMinute(minute);

    return `It is ${anglicisedHour} ${anglicisedMinute} ${meridiem}.`;
}

export const angliciseHour = (hour) => {
    hour = twelvifyHour(hour); 

    if (hour[0] === '0')
        return ONES[parseInt(hour[1]) - 1];
    else if (hour[0] === '1' && hour[1] !== '0')
        return TEENS[parseInt(hour[1]) - 1];
    else
        return TENS[0];
}

export const twelvifyHour = (hour) => {
    let twelvifiedHour = parseInt(hour) % 12;
    if (twelvifiedHour === 0)
        twelvifiedHour = 12;

    if (twelvifiedHour < 10)
        twelvifiedHour = `0${twelvifiedHour}`;

    return twelvifiedHour.toString();
}

export const angliciseMinute = (minute) => {
    if (minute[0] === '0')
        return minute[1] === '0' ? `` : `o'${ONES[parseInt(minute[1]) - 1]}`;
    else if (minute[0] === '1' && minute[1] !== '0')
        return TEENS[parseInt(minute[1]) - 1];
    else {
        if (minute[1] === '0')
            return TENS[parseInt(minute[0] - 1)];
        else
            return `${TENS[parseInt(minute[0]) - 1]} ${ONES[parseInt(minute[1]) - 1]}`
    }
}

export const validHour = (hour) => {
    return hour.length == 2 &&
           (0 <= parseInt(hour) && parseInt(hour) <= 23);
}

export const validMinute = (minute) => {
    return minute.length == 2 &&
           (0 <= parseInt(minute) && parseInt(minute) <= 59);
}

export const validTime = (hour, minute) => {
    return validHour(hour) && validMinute(minute);
}

const handleTimeSubmit = () => {
    const hourInput = document.querySelector('#hour-input');
    const minuteInput = document.querySelector('#minute-input');
    const validationMessage = document.querySelector('#time-validation-message');

    if (validTime(hourInput.value, minuteInput.value)) {
        const time = `${hourInput.value}:${minuteInput.value}`;
        anglicisedTime.textContent = angliciseTime(time);

        validationMessage.textContent = '';
    }
    else {
        validationMessage.textContent = 'Must input a valid 24-hour time.';
    }
}

const handlePlayAudio = () => {
    if (anglicisedTime.textContent) {
        const synth = window.speechSynthesis;
        const utter = new SpeechSynthesisUtterance(anglicisedTime.textContent.toLocaleUpperCase());
        utter.lang = 'en-gb'
    
        synth.speak(utter);
    }
    else {
        const validationMessage = document.querySelector('#audio-validation-message');
        validationMessage.textContent = 'There is no text to recite.';
    }
}

if (submitTime) {
    submitTime.addEventListener('click', handleTimeSubmit);
}

if (playAudio) {
    playAudio.addEventListener('click', handlePlayAudio);
}

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const timeIncrementArrow = [
    { x: 755, y: 266 },
    { x: 770, y: 281 },
    { x: 740, y: 281 }
]

const timeDecrementArrow = [
    { x: 740, y: 286 },
    { x: 770, y: 286 },
    { x: 755, y: 301 }
]

const time = {
    hour: '00',
    minute: '00'
}

const digitStartingPositions = [
    { x: 615, y: 270 },
    { x: 640, y: 270 },
    { x: 680, y: 270 },
    { x: 705, y: 270 }
];

const dots = [
    { centreX: 670, centreY: 277, radius: 2 },
    { centreX: 670, centreY: 292, radius: 2 }
];

const clockDisplay = new ClockDisplay(ctx, time, timeIncrementArrow, timeDecrementArrow, digitStartingPositions, dots);

const drawBackground = (url) => {
    return new Promise((resolve) => {
        const background = new Image();
        background.addEventListener("load", () => { resolve(background); });
        background.src = url;
    }) 
}

const drawBedroom = () => {
    drawBackground('./src/assets/bedroom.png')
    .then((background) => {
        ctx.drawImage(background, 0, 0, 1011, 762);
        clockDisplay.drawClockDisplay();
    })
}

drawBedroom();

const handleCanvasClick = (canvas, e) => {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (isInsideTriangle(
        timeIncrementArrow[0].x, timeIncrementArrow[0].y, 
        timeIncrementArrow[1].x, timeIncrementArrow[1].y,
        timeIncrementArrow[2].x, timeIncrementArrow[2].y,
        x, y)) {

        clockDisplay.incrementTime();
        drawBedroom();
    }
    else if (isInsideTriangle(
        timeDecrementArrow[0].x, timeDecrementArrow[0].y, 
        timeDecrementArrow[1].x, timeDecrementArrow[1].y,
        timeDecrementArrow[2].x, timeDecrementArrow[2].y,
        x, y)) {

        clockDisplay.decrementTime();
        drawBedroom();
    }
}

const isInsideTriangle = (x1, y1, x2, y2, x3, y3, x, y) => {
    const A = area(x1, y1, x2, y2, x3, y3);
    const A1 = area(x, y, x2, y2, x3, y3);
    const A2 = area(x1, y1, x, y, x3, y3);
    const A3 = area(x1, y1, x2, y2, x, y);

    return (A == A1 + A2 + A3);
}

const area = (x1, y1, x2, y2, x3, y3) => { 
    return Math.abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2.0);
}

canvas.addEventListener('mousedown', (e) => handleCanvasClick(canvas, e));