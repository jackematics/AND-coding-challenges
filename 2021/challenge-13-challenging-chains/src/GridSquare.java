import java.awt.*;

public class GridSquare {
    private Point location;
    private boolean hasChain;

    public GridSquare(Point location, boolean containsChain) {
        this.location = location;
        this.hasChain = containsChain;
    }

    public int getX() {
        return location.x;
    }

    public int getY() {
        return location.y;
    }

    public boolean hasChain() {
        return hasChain;
    }
}
