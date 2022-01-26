import { introAudio } from './audio.js';
import { animate } from './game.js';
import { switchMenuItems } from './utils.js';

export function handleStart() {
    introAudio.play();
    animate();
    switchMenuItems();
}

export let difficultyModifier = 150;
export function setDifficulty(e) {
    const selectedValue = e.target.options[e.target.options.selectedIndex].value;
    switch (selectedValue) {
        case 'very-easy':
            difficultyModifier = 150;
            break;

        case 'easy':
            difficultyModifier = 125;
            break;   

        case 'normal':
            difficultyModifier = 100;
            break;

        case 'hard':
            difficultyModifier = 75;
            break;

        case 'very-hard':
            difficultyModifier = 50;
            break;
    }
}

export function setDirection(e, snakeBody) {
    e.preventDefault();
    switch (e.key) {
        case 'ArrowUp':
            if (snakeBody[0].lastMove != 'down') 
                snakeBody[0].moveDirection = 'up';
            break;

        case 'ArrowRight':
            if (snakeBody[0].lastMove != 'left') 
                snakeBody[0].moveDirection = 'right'; 
            break;

        case 'ArrowDown':
            if (snakeBody[0].lastMove != 'up') 
                snakeBody[0].moveDirection = 'down'; 
            break;
        
        case 'ArrowLeft':
            if (snakeBody[0].lastMove != 'right') 
                snakeBody[0].moveDirection = 'left'; 
            break;

        default:
    }    
}