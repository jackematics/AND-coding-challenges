package com.company;

import java.awt.*;

public class GridSquare {
    private Point _coordinates;
    private boolean _isPathSquare = false;
    private boolean _isOnCriticalPath = false;
    private GridSquare _previousSquare = null;

    public GridSquare(Point coordinates) {
        _coordinates = coordinates;
    }

    public Point getCoordinates() {
        return _coordinates;
    }

    public boolean isOnPath() {
        return _isPathSquare;
    }

    public void setPathSquare(boolean value) {
        _isPathSquare = value;
    }

    public boolean isOnCriticalPath() { return _isOnCriticalPath; }

    public void setCriticalPathSquare(boolean value) { _isOnCriticalPath = value; }

    public GridSquare getPreviousSquare() { return _previousSquare; }

    public void setPreviousSquare(GridSquare previousSquare) { _previousSquare = previousSquare; }
}
