# Challenging Chains

My solution for the Challenging Chains coding challenge with all stretch goals completed in Java. My solution was to count every chain in the grid that only has one neighbouring chain, i.e. a chain end. Every chain has two ends (except chains that consist of only one link which is an edge case I handled), so if I count every chain end and divide this number by two the result will be the number of chains in the grid.

Unless I'm doing this wrong, according to my timer this process takes less than a millisecond (around 235700 nanoseconds). 

## How to Run

Open the challenge-13-challenging-chains folder in your preferred Java IDE (I use Intellij), run main, and the solution will appear in the console.
