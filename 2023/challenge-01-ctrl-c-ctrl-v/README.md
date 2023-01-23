# Control C, Control V

My solution to the Control C, Control V coding challenge completed in typescript with all stretch goals completed. My solution of throwing an error if the command is invalid is a bit dodgy, but apart from that I'm pretty happy with it.

## How to run

`npm run test` to run the tests. To try out more inputs than are currently tested add more test cases to the it.each.

## The Challenge

The challenge is to analyse these strings for any instances of [CTRL+C] and [CTRL+V]. When [CTRL+C] is encountered, the contents of the string before it should be 'copied' to a clipboard. Upon any instance of [CTRL+V] in the string, this clipboard should be pasted in its place. If [CTRL+V] is encountered before any corresponding [CTRL+C] then it should simply paste nothing.

### Rewards:

:five: Points are awarded for a working algorithm as described above \
:three: Further points are awarded for supporting [CTRL+X], which should remove the preceding text before copying it to the clipboard \
:two: Further points are awarded for validating your solution with a collection of unit tests.
