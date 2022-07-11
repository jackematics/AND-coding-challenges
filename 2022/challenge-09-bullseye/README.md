# Bullseye

My solution to the Bullseye coding challenge completed in Typescript with all stretch goals completed. I approached this by using the symmetry of a dartboard: generating the top left corner of the board then reversing and reflecting this for the other corners.

## How to run

`npm run start` and the solutions to the challenge input and stretch goal input will be printed to the console \
`npm run test` to run the tests \

## The Challenge

The challenge this week is to generate a square dartboard of side length n. The numerical values on the board should increase with proximity to the centre of the board. For boards of an even number size, the centre will be made up of the four highest values.

### Rewards:

:four: Points are awarded for generating a dartboard of any given size (where n > 0). \
:three: Further points are awarded for using only 1 loop. \
:three: Further points are awarded for generating circular\* dartboards. \

### Example:

Example:
For a square dartboard of size 8, the expected output would look something like:
11111111
12222221
12333321
12344321
12344321
12333321
12222221
11111111
