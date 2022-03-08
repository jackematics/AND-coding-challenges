# Challenging Chains

My solution for the Challenging Chains coding challenge with all stretch goals completed in Java. My solution was to count every chain in the grid that only has one neighbouring chain link, i.e. the end of a chain. Every chain has two ends (except chains that consist of only one link which is an edge case I handled), so if I count every chain end and divide this number by two the result will be the number of chains in the grid.

Unless I'm doing this wrong, according to my timer this process takes less than a millisecond (around 235700 nanoseconds). 

## How to Run

Open the challenge-13-challenging-chains folder in your preferred Java IDE (I use Intellij), run main, and the solution will appear in the console.

## The Challenge

For a chain which is considered ‘unbroken’, all parts of the chain can be reached without exiting the chain. For example, in this diagram:
#######
#
#
there is 1 unbroken chain. However, in this diagram:
### #######

          #
there are actually 3 distinct unbroken chains.
Your task is to write a program which can determine how many separate chains exist in this input problem. You can assume that links can only be connected vertically and horizontally (not diagonally) and that no two chains touch one another.

:five:  Points are awarded for a working solution  
:three:  Points are awarded for a solution which returns in less than 0.25s  
:two:  Points are awarded for also returning the total length of chain in the input  