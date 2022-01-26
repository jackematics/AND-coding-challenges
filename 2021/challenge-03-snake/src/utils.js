import {
    startButton,
    difficultyModifierDropdown
} from './selectors.js';

export function switchMenuItems() {
    startButton.disabled = !startButton.disabled;
    difficultyModifierDropdown.disabled = !difficultyModifierDropdown.disabled;
}