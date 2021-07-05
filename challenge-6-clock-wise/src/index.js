const ONES = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'seven', 'eight', 'nine'];
const TEENS = ['eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',' seventeen', 'eighteen', 'nineteen'];
const TENS = ['ten', 'twenty', 'thirty', 'forty', 'fifty'];

const angliciseTime = (time) => {
    const hour = time.substring(0, 1);
    const minute = time.substring(3, 4);
    const meridiem = parseInt(hour) <= 12 ? 'am' : 'pm';

    const anglicisedHour = angliciseHour(hour);
    const anglicisedMinute = angliciseMinute(minute);

    return `It is ${anglicisedHour} ${anglicisedMinute} ${meridiem}`;
}

const angliciseHour = (hour) => {
    hour = twelvifyHour(hour); 

    if (hour[0] === '0')
        return ONES[parseInt(hour[1]) - 1];
    else if (hour[0] === 1 && hour[1] !== '0')
        return TEENS[parseInt(hour[1]) - 1];
    else
        return TENS[0];
}

const twelvifyHour = (twelvifiedHour) => {
    twelvifiedHour = parseInt(twelvifiedHour) % 12;
    if (twelvifiedHour === 0)
        twelvifiedHour = 12;

    return twelvifiedHour.toString();
}

const angliciseMinute = (minute) => {
    if (minute[0] === '0')
        return minute[1] === 0 ? `o'clock` : `o'${ONES[parseInt(minute[1]) - 1]}`;
    else if (minute[0] === 1 && minute[1] !== '0')
        return TEENS[parseInt(minute[1]) - 1];
    else {
        if (minute[1] === '0')
            return TENS[minute[0] - 1];
        else
            return `${TENS[minute[0] - 1]} ${ONES[minute[1] - 1]}`
    }
}