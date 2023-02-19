# Langton's Ant

My solution to the Langton's Ant coding challenge completed in typescript with all stretch goals completed (if you count typescript as a unique framework? There was nothing in the requirements that says it isn't ;)).

Really enjoyed this one, it was a good opportunity to try out a new approach to TDD in React by separating the logic in a custom hook and testing that, its return value acting like a backend api contract. Then I would only have html, css and some styling logic in the frontend. The component itself was not tested because it seemed incredibly awkward and the hook tests covered the most important functionality.

To speed up/slow down the ant reduce/increase the value for the timeout. It gets funky after a while with a weird tail thing being created in an infinite loop.

## How to run

`npm run dev` to run the application.
`npm run test` to run the tests.

## The Challenge

The task this week is to create a simulation of Langton's Ant. Langton's Ant is a cellular automaton that moves around a two-dimensional grid of black and white cells. The ant can face one of four different directions - north, south, east or west. At each step of the simulation the ant will decide where to move - if the ant is currently on a black cell then it turns 90 degrees to the right and moves forward one cell . Similarly, if the ant is on a white cell then it turns 90 degrees to the left and moves forward one cell. Whenever the ant leaves a cell, it inverts the colour of that cell. You're free to choose the starting size and colour of your grid, as well as the starting direction and position of the ant.

### Rewards:

:five: Points are awarded for a working simulation of Langton's Ant with a simple user interface to display the grid and the ant's movement. \
:three: Further points are awarded for creating your simulation in a unique choice of language (or a unique frontend JavaScript framework). \
:two: Further points are awarded for expanding the grid by one cell in all directions if the ant attempts to move outside of the grid.
