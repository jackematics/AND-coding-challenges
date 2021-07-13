import ClockDisplay from "./clock-display.js";
import { isInsideTriangle, isInsideEllipse } from './utils.js';

const ONES = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const TEENS = ['eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const TENS = ['ten', 'twenty', 'thirty', 'forty', 'fifty'];

const angliciseTime = (time) => {
    const hour = time.substring(0, 2);
    const minute = time.substring(3, 5);
    const meridiem = parseInt(hour) < 12 ? 'am' : 'pm';

    const anglicisedHour = angliciseHour(hour);
    const anglicisedMinute = angliciseMinute(minute);

    return anglicisedMinute === '' 
        ? `It is ${anglicisedHour} ${meridiem}.`
        : `It is ${anglicisedHour} ${anglicisedMinute} ${meridiem}.`
}

const angliciseHour = (hour) => {
    hour = twelvifyHour(hour); 

    if (hour[0] === '0')
        return ONES[parseInt(hour[1]) - 1];
    else if (hour[0] === '1' && hour[1] !== '0')
        return TEENS[parseInt(hour[1]) - 1];
    else
        return TENS[0];
}

const twelvifyHour = (hour) => {
    let twelvifiedHour = parseInt(hour) % 12;
    if (twelvifiedHour === 0)
        twelvifiedHour = 12;

    if (twelvifiedHour < 10)
        twelvifiedHour = `0${twelvifiedHour}`;

    return twelvifiedHour.toString();
}

const angliciseMinute = (minute) => {
    if (minute[0] === '0')
        return minute[1] === '0' ? `` : `o' ${ONES[parseInt(minute[1]) - 1]}`;
    else if (minute[0] === '1' && minute[1] !== '0')
        return TEENS[parseInt(minute[1]) - 1];
    else {
        if (minute[1] === '0')
            return TENS[parseInt(minute[0] - 1)];
        else
            return `${TENS[parseInt(minute[0]) - 1]} ${ONES[parseInt(minute[1]) - 1]}`
    }
}

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const timeIncrementArrow = [
    { x: 765, y: 266 },
    { x: 780, y: 281 },
    { x: 750, y: 281 }
]

const timeDecrementArrow = [
    { x: 750, y: 286 },
    { x: 780, y: 286 },
    { x: 765, y: 301 }
]

const timeSetButton = {
    centreX: 593,
    centreY: 295,
    radiuxX: 15,
    radiusY: 10
}

const time = {
    hour: '00',
    minute: '00'
}

const digitStartingPositions = [
    { x: 625, y: 270 },
    { x: 650, y: 270 },
    { x: 690, y: 270 },
    { x: 715, y: 270 }
];

const dots = [
    { centreX: 680, centreY: 277, radius: 2 },
    { centreX: 680, centreY: 292, radius: 2 }
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
    clockDisplay.setEnglishTime('');

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
    else if (isInsideEllipse(
        timeSetButton.centreX, timeSetButton.centreY,
        timeSetButton.radiuxX, timeSetButton.radiusY,
        x, y
    )) {
        mouseDone();
        handleTimeSubmit();
    }
}

const handleTimeSubmit = () => {
    const hourInput = clockDisplay.getTime().hour;
    const minuteInput = clockDisplay.getTime().minute;

    const time = `${hourInput}:${minuteInput}`;
    const englishTime = angliciseTime(time);

    clockDisplay.setEnglishTime(englishTime);
    drawBedroom();

    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(englishTime.toLocaleUpperCase());
    utter.lang = 'en-gb'

    synth.speak(utter);
}

let timer = null;

const mouseDone = () => {
    clearInterval(timer);
}

canvas.addEventListener('mousedown', (e) => {
    e.preventDefault();
    timer = setInterval(() => {
        handleCanvasClick(canvas, e)
    }, 50)
});

canvas.addEventListener("mouseup", mouseDone);
canvas.addEventListener("mouseleave", mouseDone);