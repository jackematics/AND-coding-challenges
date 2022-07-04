# Bullseye

My solution to the PIN coding challenge completed in Typescript with all stretch goals completed (except the unique language one probably).

## How to run

`npm run start` and the solutions to the challenge input and stretch goal input will be printed to the console \
`npm run test` to run the tests \

## The Challenge

A secret agent is attempting to gain access to a doorway using a PIN pad which is organised like this:
┌───┬───┬───┐
│ 1 │ 2 │ 3 │
├───┼───┼───┤
│ 4 │ 5 │ 6 │
├───┼───┼───┤
│ 7 │ 8 │ 9 │
└───┼───┼───┘
│ 0 │
└───┘
They observe somebody using the PIN pad on the doorway to gain access, but unfortunately couldn't get a good enough look at the exact keys which were pressed. The digits were approximately 97516, but each real digit could actually lie on a horizontally or vertically adjacent digit to the approximate ones. Your task is to use this information to determine a list of possible PIN codes.
It's also useful to note that some keys on the PIN pad appear to be more worn/used than others. The following array represents how worn each key looks, from most worn to least: [5,1,2,8,7,4,0,3,6,9]

### Rewards:

:five: Points are awarded for determining all possible PIN codes for the example above \
:three: Further points are awarded for completing the challenge in a unique choice of language amongst other participants \
:two: Further points are awarded for ordering your list of possible PIN numbers by order of likelihood\*, given the above 'wear' data \
