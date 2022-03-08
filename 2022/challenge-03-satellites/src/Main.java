import java.util.ArrayList;
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        ArrayList<Integer> sampleSatellitesA = new ArrayList<>(Arrays.asList(-4,2,-3,3,4,-1,2,-2,3,-4));
        System.out.println("Sample problem A: " + SatelliteCollisionModeller.modelCollisions(sampleSatellitesA));

        ArrayList<Integer> sampleSatellitesB = new ArrayList<>(Arrays.asList(5,-2,-5,-2,3,-1,-1,3,-4));
        System.out.println("Sample problem B: " + SatelliteCollisionModeller.modelCollisions(sampleSatellitesB));

        ArrayList<Integer> sampleSatellitesC = new ArrayList<>(Arrays.asList(1,-1,1,1,-1,-1,1,-1));
        System.out.println("Sample problem C: " + SatelliteCollisionModeller.modelCollisions(sampleSatellitesC));
    }
}
