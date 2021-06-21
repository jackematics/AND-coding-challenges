import { 
    GRID_SQUARE_SIZE,
    SIZE_MODIFIER,
} from '../global.js';
import {
    ctx
} from '../selectors.js';

export function generateFood(food, body) {
    const [newFoodX, newFoodY] = getRandomPosition(body);
    food.x = newFoodX;
    food.y = newFoodY;
}

export function drawFood(food) {
    ctx.beginPath();
    ctx.arc(food.x, food.y, food.size, 0, Math.PI * 2);
    ctx.fillStyle = '#000000';
    ctx.fill();
}

export function positionConflictsWithBody(gridX, gridY, body) {
    let conflict = false;
    
    body.forEach(bodyPart => {
        if (bodyPart.x === gridX && bodyPart.y === gridY) {
            conflict = true;
        }
    })

    return conflict;
}

export function generatePosition() {
    return [
        Math.floor(Math.random() * canvas.width / GRID_SQUARE_SIZE) * GRID_SQUARE_SIZE + SIZE_MODIFIER,
        Math.floor(Math.random() * canvas.height / GRID_SQUARE_SIZE) * GRID_SQUARE_SIZE + SIZE_MODIFIER
    ];
}

function getRandomPosition(snakeBody) {
    let position = [];
    do {
        position = generatePosition();
    }
    while(positionConflictsWithBody(position[0] - SIZE_MODIFIER, position[1] - SIZE_MODIFIER, snakeBody))

    return position;
}