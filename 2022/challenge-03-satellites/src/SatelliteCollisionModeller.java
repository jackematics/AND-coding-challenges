import java.util.ArrayList;

public final class SatelliteCollisionModeller {
    public static ArrayList<Integer> modelCollisions(ArrayList<Integer> satellites) {
        int previousTickSatellitesSize = satellites.size();
        int currentIndex = 0;
        while (true) {
            if (satellites.size() <= 1) {
                return satellites;
            }

            if (satellites.get(currentIndex) > 0 && doesCollide(satellites.get(currentIndex), satellites.get(currentIndex + 1))) {
                collidePositiveSatellite(currentIndex, satellites);
            }

            currentIndex++;
            if (currentIndex >= satellites.size() - 1) {
                if (satellites.size() == previousTickSatellitesSize) {
                    return satellites;
                }

                previousTickSatellitesSize = satellites.size();
                currentIndex = 0;
            }
        }
    }

    private static boolean doesCollide(int satelliteA, int satelliteB) {
        return satelliteA > 0 && satelliteB < 0;
    }

    private static void collidePositiveSatellite(int satelliteIndex, ArrayList<Integer> satellites) {
        if (satellites.get(satelliteIndex) < 0) {
            throw new IllegalArgumentException("Can only move positive colliding satellites");
        }

        if (Math.abs(satellites.get(satelliteIndex)) > Math.abs(satellites.get(satelliteIndex + 1))) {
            satellites.remove(satelliteIndex + 1);
        }
        else if (Math.abs(satellites.get(satelliteIndex)) < Math.abs(satellites.get(satelliteIndex + 1))) {
            satellites.remove(satelliteIndex);
        }
        else {
            satellites.remove(satelliteIndex + 1);
            satellites.remove(satelliteIndex);
        }
    }
}
