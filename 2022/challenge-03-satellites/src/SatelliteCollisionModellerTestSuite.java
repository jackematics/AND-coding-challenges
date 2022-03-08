import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class SatelliteCollisionModellerTestSuite {
    @Test
    public void testPlayNonCollidingSatellites() {
        ArrayList<Integer> satellites = new ArrayList<>(Arrays.asList(-2, -1, 1, 2));

        SatelliteCollisionModeller.modelCollisions(satellites);

        assertTrue(satellites.equals(Arrays.asList(new Integer[]{-2, -1, 1, 2})));
    }

    @Test
    public void testPlayCollisionsScenario1() {
        ArrayList<Integer> satellites = new ArrayList<>(Arrays.asList(-2, 1, 1, -2));

        SatelliteCollisionModeller.modelCollisions(satellites);

        assertTrue(satellites.equals(Arrays.asList(new Integer[]{-2, -2})));
    }

    @Test
    public void testPlayCollisionsScenario2() {
        ArrayList<Integer> satellites = new ArrayList<>(Arrays.asList(1, 1, -2, -2));

        SatelliteCollisionModeller.modelCollisions(satellites);

        assertTrue(satellites.equals(Arrays.asList(new Integer[]{-2, -2})));
    }

    @Test
    public void testPlayLoneSurvivor() {
        ArrayList<Integer> satellites = new ArrayList<>(Arrays.asList(10, 2, -5));

        SatelliteCollisionModeller.modelCollisions(satellites);

        assertTrue(satellites.equals(Arrays.asList(new Integer[]{10})));
    }

    @Test
    public void testPlayGenocide() {
        ArrayList<Integer> satellites = new ArrayList<>(Arrays.asList(8, -8));

        SatelliteCollisionModeller.modelCollisions(satellites);

        assertTrue(satellites.equals(Arrays.asList(new Integer[]{})));
    }
}
