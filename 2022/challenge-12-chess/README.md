# Chess

My solution for the Chess coding challenge completed in Node, Typescript and React with all stretch goals completed. This was a bigger time investment than expected, I started doing strict TDD then ended up down a bunch of refactoring rabbit holes and eventually just had the most basic unit tests barely covering functionality. But it seems to work! I've diverged from the brief a bit in providing all valid moves for a selected piece at a selected square rather than two specified squares. Also annoyingly the white pieces I downloaded are in fact transparent, not white, but I can't be bothered looking for different pieces.

## How to run

`npm run start` and the app should run on http://localhost:3000 \
`npm run test` to run the tests \
Enjoy

## The Challenge

The task this week is to create a function which takes the name of a chess piece, its position on a board and an intended destination. The function should return true if the piece can move to the destination, or false if it can't. You can assume that the piece is the only piece on the board and that it is a White piece. \

### Rewards:

:four: Points are awarded for a working algorithm capable of validating sample moves. \
:three: Further points are awarded for illustrating the movement with a simple user interface. \
:two: Further points are awarded for providing at least one unit test. \
:one: Further point is awarded for providing support for the Black pieces (your function should accept an additional 'colour' parameter) \
