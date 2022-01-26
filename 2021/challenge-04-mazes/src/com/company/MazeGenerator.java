package com.company;

import java.awt.*;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

public class MazeGenerator {
    private GridSquare[][] _maze;
    private List<GridSquare> _criticalPath = new ArrayList<>();

    public MazeGenerator(int height, int width) {
        if (height >= 5 && width >= 5){
            generateMaze(height, width);
        }
        else {
            throw new IllegalArgumentException("Height and width must each be greater than or equal to 5");
        }
    }

    public GridSquare[][] getMaze() {
        return _maze;
    }

    public void generateMaze(int height, int width) {
        var maze = new GridSquare[height][width];
        maze = generateInitialMaze(maze);
        maze = generateCriticalPath(maze);
        setCriticalPath(maze);
        maze = generateDeadEnds(maze);

        _maze = maze;
    }

    private GridSquare[][] generateInitialMaze(GridSquare[][] maze) {
        for (int row = 0; row < maze.length; row++) {
            for (int column = 0; column < maze[0].length; column++) {
                var gridSquare = new GridSquare(new Point(column, row));
                maze[row][column] = gridSquare;
            }
        }

        maze = setInitialSquares(maze);

        return maze;
    }

    private GridSquare[][] setInitialSquares(GridSquare[][] mazeGrid) {
        int mazeWidthCentre = (mazeGrid[0].length - 1) / 2;

        GridSquare initialSquare = mazeGrid[0][mazeWidthCentre];
        GridSquare exitSquare = mazeGrid[mazeGrid.length - 1][mazeWidthCentre];
        GridSquare currentSquare = mazeGrid[1][mazeWidthCentre];
        currentSquare.setPreviousSquare(initialSquare);

        List<GridSquare> specialSquares = new ArrayList<>() {{
                add(initialSquare);
                add(exitSquare);
                add(currentSquare);
        }};

        specialSquares.forEach(square -> {
                square.setPathSquare(true);
                square.setCriticalPathSquare(true);
        });

        return mazeGrid;
    }

    private GridSquare[][] generateCriticalPath(GridSquare[][] maze) {
        int mazeWidthCentre = (maze[0].length - 1) / 2;

        GridSquare initialSquare = maze[0][mazeWidthCentre];
        GridSquare exitSquare = maze[maze.length - 1][mazeWidthCentre];
        GridSquare currentSquare = maze[1][mazeWidthCentre];

        boolean exitReached = false;
        while(!exitReached) {
            List<GridSquare> surroundingSquares = getViableSurroundingSquares(currentSquare, maze);

            if (surroundingSquares.size() == 0) {
                if (pathTrapped(currentSquare, initialSquare)) {
                    maze = generateInitialMaze(maze);
                    currentSquare = maze[1][mazeWidthCentre];
                    currentSquare.setPreviousSquare(initialSquare);
                }
                else {
                    currentSquare.setCriticalPathSquare(false);
                    currentSquare = currentSquare.getPreviousSquare();
                }

                continue;
            }

            currentSquare = pickNextSquare(currentSquare, surroundingSquares, true);

            int rowBelowCurrentSquare = currentSquare.getCoordinates().y + 1;
            int currentSquareColumn = currentSquare.getCoordinates().x;
            exitReached = maze[rowBelowCurrentSquare][currentSquareColumn] == exitSquare;
        }

        return maze;
    }

    private List<GridSquare> getViableSurroundingSquares(GridSquare currentSquare, GridSquare[][] maze) {
        List<GridSquare> surroundingSquares = getSurroundingSquares(currentSquare, maze);

        int mazeWidthCentre = (maze[0].length - 1) / 2;
        GridSquare penultimateSquare = maze[maze.length -  2][mazeWidthCentre];
        if (surroundingSquares.contains(penultimateSquare)) {
            surroundingSquares.removeIf(square -> square != penultimateSquare);
        }
        else {
            surroundingSquares.removeIf(square ->
                    square == currentSquare.getPreviousSquare() ||
                    square.isOnPath() ||
                    isOnAnEdge(square, maze) ||
                    isAdjacentToPath(square, maze));
        }

        return surroundingSquares;
    }

    private List<GridSquare> getSurroundingSquares(GridSquare square, GridSquare[][] maze) {
        Point coordinates = square.getCoordinates();
        List<GridSquare> surroundingSquares = new ArrayList<>() {{
            add(maze[coordinates.y - 1][coordinates.x]);
            add(maze[coordinates.y][coordinates.x + 1]);
            add(maze[coordinates.y + 1][coordinates.x]);
            add(maze[coordinates.y][coordinates.x - 1]);
        }};

        return surroundingSquares;
    }

    private boolean isOnAnEdge(GridSquare square, GridSquare[][] maze) {
        int x = square.getCoordinates().x;
        int y = square.getCoordinates().y;

        int mazeHeight = maze.length;
        int mazeWidth = maze[0].length;

        return  ((0 <= x && x < mazeWidth) && (y == 0))  ||
                ((0 <= x && x < mazeWidth) && (y == mazeHeight - 1)) ||
                ((x == 0 ) && (0 <= y && y < mazeHeight)) ||
                ((x == mazeWidth - 1) && (0 <= y && y < mazeHeight));
    }

    private boolean isAdjacentToPath(GridSquare square, GridSquare[][] maze) {
        Point squareCoordinates = square.getCoordinates();
        List<GridSquare> surroundingSquares = getSurroundingSquares(square, maze);

        int pathCount = 0;
        for (GridSquare surroundingSquare : surroundingSquares) {
            if (surroundingSquare.isOnPath()) {
                pathCount++;
            }
        }

        return pathCount > 1;
    }

    private boolean pathTrapped(GridSquare currentSquare, GridSquare initialSquare)  {
        return currentSquare.getPreviousSquare() == initialSquare;
    }

    private GridSquare pickNextSquare(GridSquare square, List<GridSquare> surroundingSquares, boolean isCritical) {
        int nextSquareIndex = ThreadLocalRandom.current().nextInt(0, surroundingSquares.size());
        GridSquare nextSquare = surroundingSquares.get(nextSquareIndex);
        nextSquare.setPreviousSquare(square);
        if (isCritical) {
            nextSquare.setCriticalPathSquare(true);
        }
        nextSquare.setPathSquare(true);

        return nextSquare;
    }

    private void setCriticalPath(GridSquare[][] maze) {
        for (int row = 0; row < maze.length; row++) {
            for (int column = 0; column < maze[0].length; column++) {
                GridSquare currentSquare = maze[row][column];

                if (currentSquare.isOnCriticalPath()) {
                    _criticalPath.add(currentSquare);
                }
            }
        }
    }

    private GridSquare[][] generateDeadEnds(GridSquare[][] maze) {
        for (int i = 1; i < _criticalPath.size() - 1; i++) {
            GridSquare square = _criticalPath.get(i);
            maze = generateDeadEnd(square, maze);
        }

        return maze;
    }

    private GridSquare[][] generateDeadEnd(GridSquare initialSquare, GridSquare[][] maze) {
        GridSquare currentSquare = initialSquare;
        currentSquare.setPreviousSquare(initialSquare);

        boolean deadEndReached = false;
        while(!deadEndReached) {
            List<GridSquare> surroundingSquares = getViableSurroundingSquares(currentSquare, maze);
            if (surroundingSquares.size() == 0) {
                if (pathTrapped(currentSquare, initialSquare)) {
                    deadEndReached = true;
                }
                else {
                    currentSquare = currentSquare.getPreviousSquare();
                }

                continue;
            }

            currentSquare = pickNextSquare(currentSquare, surroundingSquares, false);
        }

        return maze;
    }
}
