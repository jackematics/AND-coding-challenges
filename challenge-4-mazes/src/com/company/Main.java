package com.company;

import java.awt.*;

public class Main {

    public static void main(String[] args) {
        var mazeGenerator = new MazeGenerator(50, 50);
        GridSquare[][] maze = mazeGenerator.getMaze();

//      displayMazeToConsole(maze);
        new MazeGridLayout(maze, 1000, 1000);
    }

    private static void displayMazeToConsole(GridSquare[][] maze) {
        System.out.println("Welcome to Jack's Trivially Escapable Generated Maze mwahahaha");
        System.out.println();
        System.out.println(" KEY ");
        System.out.println("-------");
        System.out.println("C: 'Critical Path', the path to escape");
        System.out.println("P: 'Path', this will lead you to a dead end or two");
        System.out.println("#: 'Wall', try not to walk into or through this");
        System.out.println();
        System.out.println();
        System.out.println("ENTRANCE");
        System.out.println();

        for (int row = 0; row < maze.length; row++) {
            for (int column = 0; column < maze[0].length; column++) {
                GridSquare currentSquare = maze[row][column];
                if (currentSquare.isOnCriticalPath()) {
                    System.out.print('C');
                }
                else if (currentSquare.isOnPath()) {
                    System.out.print('P');
                }
                else {
                    System.out.print('#');
                }
            }
            System.out.println();
        }
        System.out.println();
        System.out.println("EXIT");
    }
}
