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

if (submitTime)
    submitTime.addEventListener('click', handleTimeSubmit);

if (playAudio)
    playAudio.addEventListener('click', handlePlayAudio);