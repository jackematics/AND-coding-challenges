/**
 * @jest-environment jsdom
 */

const { expect, it, describe } = require("@jest/globals");
const { 
    angliciseTime, 
    angliciseHour, 
    twelvifyHour, 
    angliciseMinute,
    validHour,
    validMinute,
    validTime
} = require('./index');

describe('When anglicising a 24 hour time', () => {
    it('should return the 12 hour time in English plus pm if it is in the afternoon', () => {
        expect(angliciseTime('12:00')).toBe('It is twelve  pm.');
        expect(angliciseTime('15:03')).toBe('It is three o\'three pm.');
        expect(angliciseTime('23:13')).toBe('It is eleven thirteen pm.');
        expect(angliciseTime('17:45')).toBe('It is five forty five pm.');
    });

    it('should return the 12 hour time in English plus am if it is in the morning', () => {
        expect(angliciseTime('00:00')).toBe('It is twelve  am.');
        expect(angliciseTime('03:04')).toBe('It is three o\'four am.');
        expect(angliciseTime('09:12')).toBe('It is nine twelve am.');
        expect(angliciseTime('10:59')).toBe('It is ten fifty nine am.');
    });
});

describe('When anglicising the hour component of a 24 hour time', () => {
    it('should return the hour component of the 12 hour time in English', () => {
        expect(angliciseHour('00')).toBe('twelve');
        expect(angliciseHour('04')).toBe('four');
        expect(angliciseHour('11')).toBe('eleven');
        expect(angliciseHour('15')).toBe('three');
        expect(angliciseHour('20')).toBe('eight');
        expect(angliciseHour('24')).toBe('twelve');
    });
});

describe('When converting the hour component of a 24 hour time to a 12 hour time', () => {
    it('should return the hour component of the 12 hour time', () => {
        expect(twelvifyHour('00')).toBe('12');
        expect(twelvifyHour('04')).toBe('04');
        expect(twelvifyHour('11')).toBe('11');
        expect(twelvifyHour('15')).toBe('03');
        expect(twelvifyHour('24')).toBe('12');
    });
});

describe('When anglicising the minute component of a 24 hour time', () => {
    it('should return the minute component of the 12 hour time in English', () => {
        expect(angliciseMinute('00')).toBe('');
        expect(angliciseMinute('04')).toBe('o\'four');
        expect(angliciseMinute('17')).toBe('seventeen');
        expect(angliciseMinute('15')).toBe('fifteen');
        expect(angliciseMinute('24')).toBe('twenty four');
        expect(angliciseMinute('59')).toBe('fifty nine');
    });
});

describe('When inputting an hour', () => {
    it('should be between 0 and 24 in a valid format', () => {
        expect(validHour('00')).toBe(true);
        expect(validHour('06')).toBe(true);
        expect(validHour('13')).toBe(true);
        expect(validHour('21')).toBe(true);
        expect(validHour('4')).toBe(false);
        expect(validHour('0')).toBe(false);
        expect(validHour('-5')).toBe(false);
        expect(validHour('37')).toBe(false);
        expect(validHour('24')).toBe(false);
    });
});

describe('When inputting a minute', () => {
    it('should be between 0 and 59 in a valid format', () => {
        expect(validMinute('00')).toBe(true);
        expect(validMinute('06')).toBe(true);
        expect(validMinute('13')).toBe(true);
        expect(validMinute('47')).toBe(true);
        expect(validMinute('59')).toBe(true);
        expect(validMinute('4')).toBe(false);
        expect(validMinute('0')).toBe(false);
        expect(validMinute('-5')).toBe(false);
        expect(validMinute('60')).toBe(false);
        expect(validMinute('75')).toBe(false);
    });
});

describe('When inputting a time', () => {
    it('should be in a valid 24 hour format', () => {
        expect(validTime('00', '00')).toBe(true);
        expect(validTime('06', '06')).toBe(true);
        expect(validTime('13', '13')).toBe(true);
        expect(validTime('21', '21')).toBe(true);
        expect(validTime('4', '04')).toBe(false);
        expect(validTime('04', '4')).toBe(false);
        expect(validTime('0', '20')).toBe(false);
        expect(validTime('20', '0')).toBe(false);
        expect(validTime('-5', '12')).toBe(false);
        expect(validTime('37', '25')).toBe(false);
        expect(validTime('25', '37')).toBe(false);
    });
});