import {
    eatAudio,
    gameOverAudio
} from './audio.js';
import {
    drawFood,
    generateFood,
} from './entities/food.js'
import { 
    addBodyPart,
    drawBodyPart,
    generateInitialSnake,
    moveSnake,
    snakeCollidesWithTail,
    snakeEncountersFood,
} from './entities/snake.js';
import { 
    difficultyModifier,
    handleStart, 
    setDifficulty,
    setDirection
} from './handlers.js';
import {
    canvas,
    ctx, 
    difficultyModifierDropdown,
    highScoreDisplay,
    startButton,
    scoreDisplay,
} from './selectors.js';
import {
    switchMenuItems
} from './utils.js';

// Event listeners
startButton.addEventListener('click', handleStart);
difficultyModifierDropdown.addEventListener('change', setDifficulty);
document.addEventListener('keydown', function(e) {
    setDirection(e, snakeBody);
});

// Game functionality
let snakeBody = generateInitialSnake();
const food = {
    size: 10
}

generateFood(food, snakeBody);

let last = 0;
let score = 0;
let highScore = 0;
export function animate() {
    clear();
    snakeBody.forEach(bodyPart => drawBodyPart(bodyPart));
    drawFood(food);

    let now = Date.now();
    if (now - last > difficultyModifier) {
        last = now;

        moveSnake(snakeBody);
        snakeBody[0].lastMove = snakeBody[0].moveDirection;

        if (snakeCollidesWithTail(snakeBody)) {    
            gameOver();
            return;
        }

        if (snakeEncountersFood(snakeBody[0], food)) {
            addBodyPart(snakeBody);                       
            eatAudio.play();
            generateFood(food, snakeBody);           
            updateScore();                   
        }
    }

    requestAnimationFrame(animate);
}

function updateScore() {
    score += Math.floor(1000 * snakeBody.length / difficultyModifier);
    scoreDisplay.innerHTML = score; 
}

const clear = () => ctx.clearRect(0, 0, canvas.width, canvas.height);

function gameOver() {
    clear();
    gameOverAudio.play();
    snakeBody = generateInitialSnake();

    if (score > highScore) {
        highScore = score;
        highScoreDisplay.innerHTML = highScore;
    }

    score = 0;
    scoreDisplay.innerHTML = 0;

    ctx.font = "60px Kristen ITC";
    ctx.fillText("GAME OVER", 45, canvas.height / 2);

    switchMenuItems();
}