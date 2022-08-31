# Sudoku

My solution for the Sudoku coding challenge completed in C++ with all stretch goals completed. This is the first time I've really built a program in C++ so it was a bit of a learning curve and a pain to configure but I learnt a lot! There are probably some questionable design decisions in there from my unfamiliarity with the language, but it was nice to get unit tests up and running so I could do TDD. 

## How to run

Open the solution file in your preferred C++ IDE, I used Visual Studio (on Windows because it sucks on Mac). Build the solution and Sudoku project. You may need to restore nuget packages. Run the debugger (F5 / ctrl F5) and voila! The solution should all print out to the console.

Otherwise you can build the solution and run the Sudoku.exe at \Sudoku\bin\Debug-x64\Sudoku.

## The Challenge

Sudoku is a number-placement puzzle where the objective is to fill a 9x9 grid with digits such that each column, each row and each 3x3 sub-grid contain all digits from 1 to 9 exactly once. The challenge this week is to write code capable of validating whether a given Sudoku solution is valid or not.

### Rewards:

:five: Points are awarded for an algorithm capable of validating these sample games. \
:three: Further points are awarded for solving the challenge in a unique choice of language among other participants. \
:two: Further points are awarded for outputting a description of where an error in a game lies (for example Row 2, or Sub-grid 1,2 etc). \

### Example:
For this sample Sudoku:
[
  [1, 5, 2, 4, 8, 9, 3, 7, 6],
  [7, 3, 9, 2, 5, 6, 8, 4, 1],
  [4, 6, 8, 3, 7, 1, 2, 9, 5],
  [3, 8, 7, 1, 2, 4, 6, 5, 9],
  [5, 9, 1, 7, 6, 3, 4, 2, 8],
  [2, 4, 6, 8, 9, 5, 7, 1, 3],
  [9, 1, 4, 6, 3, 7, 5, 8, 2],
  [6, 2, 5, 9, 4, 8, 1, 3, 7],
  [8, 7, 3, 5, 1, 2, 9, 6, 4]
]
The expected output is true