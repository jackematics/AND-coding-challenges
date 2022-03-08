# Random Maze Generator

This is the finished result for my random maze generator. I've built it in Java, using the javax.swing library to display the grid. The generator should work
with all values greater than or equal to 5 for both the height and width of the grid, although once you have a height and width beyond 250 for each it takes a
long time to run (I haven't tested how far so I recommend sticking between 5 and 250 for both the height and width values). These values don't both need to be the 
same, but because of the way I've set up the grid display if the height and width values are too different each grid square can become very elongated - it still
should all work correctly but it will look a bit weird.

I'm not sure how efficient or random this is but it seems to do the job. I didn't use any standard random maze generation algorithms to build it, the logic 
works by creating the critical path first: set a square as the current square, load all the viable surrounding squares the path can move to, then randomly pick
one of these surrounding squares. I then generated dead end offshoots from the critical path after this had been generated.

## How To Run

Go into Main.java in the src directory. in the main method, there is a mazeGenerator variable that instantiates the MazeGenerator class with height and width 
values: set these values depending on what size you want the generated grid to be. At the end of the main method there is a new MazeGridLayout instance,
set the gridWidth and gridHeight values to whatever size you want, this is the size of the window the grid will be displayed on (and it will affect things 
such as the size of each grid square). Once you're happy with these, run the program. 

## The Challenge

This week’s challenge is to build an application capable of generating random mazes to a given specification. Given a target width and height, your algorithm should be capable of outputting a unique, solvable maze.
:six:  Points are awarded for generating valid, solvable mazes  
:three:  Further points are awarded for a solution which can visualise the most optimal route to solve the maze  
:one:  Further point is awarded for a non-JavaScript solution

### Notes:
You’re free to decide on a suitable start and end location for each maze. You can also assume a minimum width and height of 10 units. Maze walls should be 1 unit in thickness. Mazes don’t necessarily have to be square.