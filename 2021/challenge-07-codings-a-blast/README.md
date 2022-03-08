# Codings A Blast

My solution for the Codings A Blast coding challenge. I didn't create an interactive UI for it, and I have no idea if the language is unique but the core logic for bomb defusal 
is all in here.

## How to Run

Open the challenge-7-codings-a-blast folder in your preferred Java IDE and run the program, the solution will appear in the console. 

## The Challenge

In order to disarm a bomb, there are a few wires which need to be carefully cut. There are 6 different colours of wire and each colour has a unique rule concerning which other colour wires should be cut:
If you cut a white wire, you can't then immediately cut white or black wires.
If you cut an orange wire, you have to then immediately cut a green one.
If you cut a black wire, you aren't allowed to then immediately cut a white, green or orange one.
If you cut a red wire, you must then immediately cut an orange or black one.
If you cut a green wire, you must then immediately cut an orange or white one.
If you cut a purple wire, you can't then immediately cut a purple, green, orange or white one.

Your challenge is to create an algorithm which, given some sequences of wire cuts, can determine whether or not the bomb was successfully disarmed in each case.
:six:  Points are awarded for a working algorithm using the given sequences  
:three:  Points are awarded for an interactive user interface  
:one:  Point is awarded for use of a unique coding language (used by no other participants)  