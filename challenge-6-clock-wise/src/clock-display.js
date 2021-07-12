class ClockDisplay {
    #ctx;
    #digitStartingPositions;
    #dots;
    #dx;
    #dy;
    #time;
    #timeDecrementArrow;
    #timeIncrementArrow;
    #englishTime;

    constructor(ctx, time, timeIncrementArrow, timeDecrementArrow, digitStartingPositions, dots) {
        this.#ctx = ctx;
        this.#time = time;
        this.#timeIncrementArrow = timeIncrementArrow;
        this.#timeDecrementArrow = timeDecrementArrow;
        this.#digitStartingPositions = digitStartingPositions;
        this.#dots = dots;
        this.#dx = 20;
        this.#dy = 15; 
        this.#englishTime = '';

        this.init();
    }
    
    init() {
        this.drawClockDisplay();
    }

    getTime() {
        return this.#time;
    }

    setEnglishTime(englishTime) {
        this.#englishTime = englishTime;
    }

    drawClockDisplay() {
        this.#drawTimeSet();
        this.#drawTimeContainer();
        this.#drawArrow(this.#timeIncrementArrow);
        this.#drawArrow(this.#timeDecrementArrow);
        this.#drawDots(this.#dots);
        this.#drawTime(this.#time);
        this.#drawEnglishTime(this.#englishTime);
    }

    incrementTime() {
        let minuteInteger = parseInt(this.#time.minute);
        let hourInteger = parseInt(this.#time.hour);
        minuteInteger++;
    
        if (minuteInteger === 60) {
            minuteInteger = 0;
            hourInteger++;
    
            if (hourInteger === 24) {
                hourInteger = 0;
            }
        }
    
        this.#time.hour = hourInteger < 10 
            ? `0${hourInteger.toString()}`
            : hourInteger.toString();
    
        this.#time.minute = minuteInteger < 10 
            ? `0${minuteInteger.toString()}`
            : minuteInteger.toString();
    }
    
    decrementTime() {
        let minuteInteger = parseInt(this.#time.minute);
        let hourInteger = parseInt(this.#time.hour);
        minuteInteger--;
    
        if (minuteInteger === -1) {
            minuteInteger = 59;
            hourInteger--;
    
            if (hourInteger === -1) {
                hourInteger = 23;
            }
        }
    
        this.#time.hour = hourInteger < 10 
            ? `0${hourInteger.toString()}`
            : hourInteger.toString();
    
        this.#time.minute = minuteInteger < 10 
            ? `0${minuteInteger.toString()}`
            : minuteInteger.toString();
    }

    #drawTimeSet() {
        this.#ctx.beginPath();
        this.#ctx.strokeStyle = 'red';
        this.#ctx.ellipse(593, 295, 15, 10, 0, Math.PI * 2, false);
        this.#ctx.fillStyle = 'red';
        this.#ctx.fill();
        this.#ctx.stroke();
        this.#ctx.font = 'bold 12px Arial';
        this.#ctx.fillStyle = 'black';
        this.#ctx.fillText('SET', 581, 299);
    }
    
    #drawTimeContainer() {
        this.#ctx.beginPath();
        this.#ctx.rect(615, 264, 130, 40);
        this.#ctx.strokeStyle = 'red';
        this.#ctx.stroke();
    }
    
    #drawArrow(arrow) {
        this.#ctx.beginPath();
        this.#ctx.moveTo(arrow[0].x, arrow[0].y);
        this.#ctx.lineTo(arrow[1].x, arrow[1].y);
        this.#ctx.lineTo(arrow[2].x, arrow[2].y);
        this.#ctx.strokeStyle = 'red';
        this.#ctx.closePath();
        this.#ctx.fillStyle = 'red';
        this.#ctx.fill();
    }
    
    #drawDots(dots) {
        this.#drawDot(dots[0].centreX, dots[0].centreY, dots[0].radius);
        this.#drawDot(dots[1].centreX, dots[1].centreY, dots[1].radius);
    }

    #drawDot(centreX, centreY, radius) {
        this.#ctx.beginPath();
        this.#ctx.strokeStyle = 'red';
        this.#ctx.arc(centreX, centreY, radius, 0, Math.PI * 2, false);
        this.#ctx.fillStyle = 'red'
        this.#ctx.fill();
        this.#ctx.stroke();
    }

    #drawEnglishTime() {
        this.#ctx.font = 'bold 40px Arial';
        this.#ctx.fillStyle = 'black';
        this.#ctx.fillText(this.#englishTime, 500, 150);
    }
    
    #drawTime(time) {
        this.#drawTimeComponent(parseInt(time.hour[0]), 0);
        this.#drawTimeComponent(parseInt(time.hour[1]), 1)
        this.#drawTimeComponent(parseInt(time.minute[0]), 2)
        this.#drawTimeComponent(parseInt(time.minute[1]), 3)
    }
    
    #drawTimeComponent(component, startingPosition) {
        switch(component) {
            case 0:
                this.#drawZero(this.#digitStartingPositions[startingPosition].x, this.#digitStartingPositions[startingPosition].y)
            break;
    
            case 1:
                this.#drawOne(this.#digitStartingPositions[startingPosition].x, this.#digitStartingPositions[startingPosition].y)
            break;
    
            case 2:
                this.#drawTwo(this.#digitStartingPositions[startingPosition].x, this.#digitStartingPositions[startingPosition].y)
            break;
    
            case 3:
                this.#drawThree(this.#digitStartingPositions[startingPosition].x, this.#digitStartingPositions[startingPosition].y)
            break;
    
            case 4:
                this.#drawFour(this.#digitStartingPositions[startingPosition].x, this.#digitStartingPositions[startingPosition].y)
            break;
    
            case 5:
                this.#drawFive(this.#digitStartingPositions[startingPosition].x, this.#digitStartingPositions[startingPosition].y)
            break;
    
            case 6:
                this.#drawSix(this.#digitStartingPositions[startingPosition].x, this.#digitStartingPositions[startingPosition].y)
            break;
    
            case 7:
                this.#drawSeven(this.#digitStartingPositions[startingPosition].x, this.#digitStartingPositions[startingPosition].y)
            break;
    
            case 8:
                this.#drawEight(this.#digitStartingPositions[startingPosition].x, this.#digitStartingPositions[startingPosition].y)
            break;
    
            case 9:
                this.#drawNine(this.#digitStartingPositions[startingPosition].x, this.#digitStartingPositions[startingPosition].y)
            break;
        }
    }
    
    #drawZero(startX, startY) {
        this.#drawIncrementRight(startX, startY);
        this.#drawIncrementDown(startX + this.#dx, startY);
        this.#drawIncrementDown(startX + this.#dx, startY + this.#dy);
        this.#drawIncrementLeft(startX + this.#dx, startY + 2*this.#dy);
        this.#drawIncrementUp(startX, startY + 2*this.#dy);
        this.#drawIncrementUp(startX, startY + this.#dy);
    }
    
    #drawOne(startX, startY) {
        this.#drawIncrementDown(startX, startY);
        this.#drawIncrementDown(startX, startY + this.#dy);
    }
    
    #drawTwo(startX, startY) {
        this.#drawIncrementRight(startX, startY);
        this.#drawIncrementDown(startX + this.#dx, startY);
        this.#drawIncrementLeft(startX + this.#dx, startY + this.#dy);
        this.#drawIncrementDown(startX, startY + this.#dy);
        this.#drawIncrementRight(startX, startY + 2*this.#dy);
    }
    
    #drawThree(startX, startY) {
        this.#drawIncrementRight(startX, startY);
        this.#drawIncrementDown(startX + this.#dx, startY);
        this.#drawIncrementLeft(startX + this.#dx, startY + this.#dy);
        this.#drawIncrementDown(startX + this.#dx, startY + this.#dy);
        this.#drawIncrementLeft(startX + this.#dx, startY + 2*this.#dy);
    }
    
    #drawFour(startX, startY) {
        this.#drawIncrementDown(startX, startY);
        this.#drawIncrementRight(startX, startY + this.#dy);
        this.#drawIncrementUp(startX + this.#dx, startY + this.#dy);
        this.#drawIncrementDown(startX + this.#dx, startY + this.#dy);
    }
    
    #drawFive(startX, startY) {
        this.#drawIncrementRight(startX, startY);
        this.#drawIncrementDown(startX, startY);
        this.#drawIncrementRight(startX, startY + this.#dy);
        this.#drawIncrementDown(startX + this.#dx, startY + this.#dy);
        this.#drawIncrementLeft(startX + this.#dx, startY + 2*this.#dy);
    }
    
    #drawSix(startX, startY) {
        this.#drawIncrementRight(startX, startY);
        this.#drawIncrementDown(startX, startY);
        this.#drawIncrementDown(startX, startY + this.#dy);
        this.#drawIncrementRight(startX, startY + 2*this.#dy);
        this.#drawIncrementUp(startX + this.#dx, startY + 2*this.#dy);
        this.#drawIncrementLeft(startX + this.#dx, startY + this.#dy);
    }
    
    #drawSeven(startX, startY) {
        this.#drawIncrementDown(startX, startY);
        this.#drawIncrementRight(startX, startY);
        this.#drawIncrementDown(startX + this.#dx, startY);
        this.#drawIncrementDown(startX + this.#dx, startY + this.#dy);
    }
    
    #drawEight(startX, startY) {
        this.#drawZero(startX, startY);
        this.#drawIncrementRight(startX, startY + this.#dy);
    }
    
    #drawNine(startX, startY) {
        this.#drawIncrementRight(startX, startY);
        this.#drawIncrementDown(startX, startY);
        this.#drawIncrementRight(startX, startY + this.#dy);
        this.#drawIncrementUp(startX + this.#dx, startY + this.#dy);
        this.#drawIncrementDown(startX + this.#dx, startY + this.#dy);
    }
    
    #drawIncrementRight(startX, startY) {
        this.#ctx.beginPath();
        this.#ctx.lineWidth = 3;
        this.#ctx.strokeStyle = 'red';
        this.#ctx.moveTo(startX, startY);
        this.#ctx.lineTo(startX + this.#dx, startY);
        this.#ctx.stroke();
    }
    
    #drawIncrementDown(startX, startY) {
        this.#ctx.beginPath();
        this.#ctx.lineWidth = 3;
        this.#ctx.strokeStyle = 'red';
        this.#ctx.moveTo(startX, startY);
        this.#ctx.lineTo(startX, startY + this.#dy);
        this.#ctx.stroke();
    }
    
    #drawIncrementLeft(startX, startY) {
        this.#ctx.beginPath();
        this.#ctx.lineWidth = 3;
        this.#ctx.strokeStyle = 'red';
        this.#ctx.moveTo(startX, startY);
        this.#ctx.lineTo(startX - this.#dx, startY);
        this.#ctx.stroke();
    }
    
    #drawIncrementUp(startX, startY) {
        this.#ctx.beginPath();
        this.#ctx.lineWidth = 3;
        this.#ctx.strokeStyle = 'red';
        this.#ctx.moveTo(startX, startY);
        this.#ctx.lineTo(startX, startY - this.#dy);
        this.#ctx.stroke();
    }
}

export default ClockDisplay;