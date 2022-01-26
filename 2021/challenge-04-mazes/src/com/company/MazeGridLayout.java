package com.company;

import javax.swing.*;
import java.awt.*;
import java.util.ArrayList;
import java.util.List;

public class MazeGridLayout {
    MazeGridLayout(GridSquare[][] maze, int gridWidth, int gridHeight) {
        var jFrame = new JFrame();
        List<GridSquare> gridSquareList = new ArrayList<>();

        for (int row = 0; row < maze.length; row++) {
            for (int column = 0; column < maze[0].length; column++) {
                gridSquareList.add(maze[row][column]);
            }
        }

        for (GridSquare square : gridSquareList) {
            if (square.isOnCriticalPath()) {
                JPanel criticalPath = new JPanel();
                criticalPath.setBackground(Color.red);
                jFrame.add(criticalPath);
            }
            else if (square.isOnPath()){
                JPanel path = new JPanel();
                path.setBackground(Color.white);
                jFrame.add(path);
            }
            else {
                JPanel wall = new JPanel();
                wall.setBackground(Color.black);
                jFrame.add(wall);
            }
        }

        jFrame.setLayout(new GridLayout(maze.length, maze[0].length));
        //setting grid layout of 3 rows and 3 columns

        jFrame.setSize(gridWidth, gridHeight);
        jFrame.setVisible(true);
    }
}
