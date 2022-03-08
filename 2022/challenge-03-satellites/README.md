# Satellites

My solution for the Satellites coding challenge completed in Java with all stretch goals completed unless someone else decides to use Java in the language lucky dip.

## How to run

Open the challenge-03-satellites folder in your preferred Java IDE (I use Intellij) and run the main file.

## The Challenge

Consider a list of satellites moving through 2D space: [-2,-1, 1,-2]
The absolute value of each satellite represents its size, and the sign of the satellite represents its direction of travel (- being left, + being right). If two satellites meet, the smaller satellite is destroyed. If meeting satellites are the same size, both are destroyed. All satellites are moving at the same speed.
Given this information, the challenge is to write an algorithm capable of determining the final state of these sample problems after all collisions have taken place.

### Rewards:
:four:  Points are awarded for a working algorithm which solves the sample problems
:three:  Further points are awarded for using only one loop
:three:  Further points are awarded for using a language unique among other participants

### Example:
For the following list of satellites: [-3, 1, 1,-2, 3,-2]
The expected output after all collisions is: [-3,-2, 3]