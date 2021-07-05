const ONES = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const TEENS = ['eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',' seventeen', 'eighteen', 'nineteen'];
const TENS = ['ten', 'twenty', 'thirty', 'forty', 'fifty'];

const submitTime = document.querySelector('#submit-time');
const anglicisedTime = document.querySelector('#anglicised-time');
const playAudio = document.querySelector('#play-audio');

const angliciseTime = (time) => {
    const hour = time.substring(0, 2);
    const minute = time.substring(3, 5);
    const meridiem = parseInt(hour) < 12 || parseInt(hour) === 24 ? 'am' : 'pm';

    const anglicisedHour = angliciseHour(hour);
    const anglicisedMinute = angliciseMinute(minute);

    return `It is ${anglicisedHour} ${anglicisedMinute} ${meridiem}.`;
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
    twelvifiedHour = parseInt(hour) % 12;
    if (twelvifiedHour === 0)
        twelvifiedHour = 12;

    if (twelvifiedHour < 10)
        twelvifiedHour = `0${twelvifiedHour}`;

    return twelvifiedHour.toString();
}

const angliciseMinute = (minute) => {
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

const handleTimeSubmit = () => {
    const hourInput = document.querySelector('#hour-input');
    const minuteInput = document.querySelector('#minute-input');
    const time = `${hourInput.value}:${minuteInput.value}`;
    anglicisedTime.textContent = angliciseTime(time);
}

submitTime.addEventListener('click', handleTimeSubmit);