import { ctx } from '../selectors.js';
import {
    GRID_SQUARE_SIZE,
    INCREMENT,
    SIZE_MODIFIER
} from '../global.js';

export function generateInitialSnake(
    headX = 225,
    headY = 250,
    headPrevX = 200,
    headPrevY = 250,
    headPosition = 0,
    headMoveDirection = 'right',
    headLastMove = 'right') {
    return [
        {
            x: headX,
            y: headY,
            prevX: headPrevX,
            prevY: headPrevY,
            bodyPosition: headPosition,
            moveDirection: headMoveDirection,
            lastMove: headLastMove,
        },
        {
            x: headX - 25,
            y: headY,
            prevX: headPrevX - 25,
            prevY: headPrevY,
            bodyPosition: headPosition + 1,
            moveDirection: headMoveDirection,
            lastMove: headLastMove,
        },
        {
            x: headX - 50,
            y: headY,
            prevX: headPrevX - 50,
            prevY: headPrevY,
            bodyPosition: headPosition + 2,
            moveDirection: headMoveDirection,
            lastMove: headLastMove,
        }
    ];
}

export function drawBodyPart(bodyPart) {
    ctx.fillStyle = '#009423';
    ctx.fillRect(bodyPart.x, bodyPart.y, GRID_SQUARE_SIZE, GRID_SQUARE_SIZE);
}

export const moveSnake = (snakeBody) => snakeBody.forEach(bodyPart => updateBodyPosition(bodyPart, snakeBody));

export function snakeCollidesWithTail(snakeBody) {
    let collision = false;
    snakeBody.slice(1).forEach(bodyPart => {
        if (bodyPart.x === snakeBody[0].x && bodyPart.y === snakeBody[0].y) {
            collision = true;            
        }
    })
    
    return collision;
}

export const snakeEncountersFood = (snakeHead, food) => (
    snakeHead.x === food.x - SIZE_MODIFIER && 
    snakeHead.y === food.y - SIZE_MODIFIER
);

export function addBodyPart(snakeBody) {
    const previousTailPosition = snakeBody.length - 1;
    const bodyPart = {
        x: snakeBody[previousTailPosition].prevX,
        y: snakeBody[previousTailPosition].prevY,
        prevX: 0,
        prevY: 0, 
        bodyPosition: previousTailPosition + 1,
        moveDirection: snakeBody[previousTailPosition].moveDirection,
        lastMove: snakeBody[previousTailPosition].lastMove,
    }
    snakeBody.push(bodyPart);
}

function updateBodyPosition(bodyPart, snakeBody) {
    if (bodyPart.bodyPosition === 0) {
        move(bodyPart);    
    }
    else {
        bodyPart.prevX = bodyPart.x;
        bodyPart.x = snakeBody[bodyPart.bodyPosition - 1].prevX;

        bodyPart.prevY = bodyPart.y;
        bodyPart.y = snakeBody[bodyPart.bodyPosition - 1].prevY;
    }
}

function move(bodyPart) {
    bodyPart.prevX = bodyPart.x;
    bodyPart.prevY = bodyPart.y;

    switch(bodyPart.moveDirection) {
        case 'up':
            bodyPart.y -= INCREMENT;

            if (bodyPart.y === -25)
                bodyPart.y = canvas.height - 25;
        break;
        
        case 'right':
            bodyPart.x += INCREMENT;

            if (bodyPart.x === canvas.width)
                bodyPart.x = 0;
        break;

        case 'down':
            bodyPart.y += INCREMENT;

            if (bodyPart.y === canvas.height)
                bodyPart.y = 0;
        break;

        case 'left':
            bodyPart.x -= INCREMENT;

            if (bodyPart.x === -25)
                bodyPart.x = canvas.width - 25;
        break;
    }
}