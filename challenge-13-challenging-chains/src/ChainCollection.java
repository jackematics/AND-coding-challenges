import java.awt.*;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

public class ChainCollection {
    private GridSquare[][] chainGrid;
    private int numberOfRows;
    private int numberOfColumns;
    private int chainCount;
    private int chainLength;

    public ChainCollection(String inputPath) throws IOException {
        initialiseChainGrid(inputPath);

        long startTime = System.currentTimeMillis();
        countChains();
        long endTime = System.currentTimeMillis();
        System.out.println("Milliseconds to complete: " + (endTime - startTime));

        countChainLength();
    }

    public int getChainCount() {
        return chainCount;
    }

    public int getChainLength() {
        return chainLength;
    }

    private void initialiseChainGrid(String chainsInput) throws IOException {
        List<String> chainCollection = Files.readAllLines(Paths.get(chainsInput));
        numberOfRows = chainCollection.size();
        numberOfColumns = chainCollection.stream().map(String::length).max(Integer::compareTo).get();

        chainGrid = new GridSquare[numberOfRows][numberOfColumns];

        populateGrid(chainCollection);
    }

    private void populateGrid(List<String> chainCollection) {
        for (int row = 0; row < numberOfRows; row++) {
            int currentRowLength = chainCollection.get(row).length();
            for (int column = 0; column < numberOfColumns; column++) {
                if (column >= currentRowLength) {
                    setNonChainSquare(row, column);
                }
                else {
                    setGridSquare(chainCollection, row, column);
                }
            }
        }
    }

    private void setNonChainSquare(int row, int column) {
        chainGrid[row][column] = new GridSquare(
                new Point(column, row),
                false
        );
    }

    private void setGridSquare(List<String> chainCollection, int row, int column) {
        boolean containsChain = chainCollection.get(row).charAt(column) == '#';
        chainGrid[row][column] = new GridSquare(
                new Point(column, row),
                containsChain
        );
    }

    private void countChains() {
        int chainEndCount = 0;

        for (int row = 0; row < numberOfRows; row++) {
            for (int column = 0; column < numberOfColumns; column++) {
                GridSquare currentSquare = chainGrid[row][column];

                if (currentSquare.hasChain()) {
                    chainEndCount += accumulateChainEnds(currentSquare);
                }
            }
        }

        chainCount = chainEndCount / 2;
    }

    private int accumulateChainEnds(GridSquare currentSquare) {
        int neighbouringLinkCount = countNeighbouringLinks(currentSquare);
        switch(neighbouringLinkCount) {
            case 0:
                return 2;

            case 1:
                return 1;

            default:
                return 0;
        }
    }

    private int countNeighbouringLinks(GridSquare square) {
        int currentColumn = square.getX();
        int currentRow = square.getY();
        int neighbouringLinks = 0;

        if (currentRow > 0 &&
            chainGrid[currentRow - 1][currentColumn].hasChain()) {
            neighbouringLinks++;
        }

        if (currentColumn < numberOfColumns - 1 &&
            chainGrid[currentRow][currentColumn + 1].hasChain()) {
            neighbouringLinks++;
        }

        if (currentRow < numberOfRows - 1 &&
            chainGrid[currentRow + 1][currentColumn].hasChain()) {
            neighbouringLinks++;
        }

        if (currentColumn > 0 &&
            chainGrid[currentRow][currentColumn - 1].hasChain()) {
            neighbouringLinks++;
        }

        return neighbouringLinks;
    }

    private void countChainLength() {
        int chainLength = 0;

        for (int row = 0; row < numberOfRows; row++) {
            for (int column = 0; column < numberOfColumns; column++) {
                if (chainGrid[row][column].hasChain()) {
                    chainLength++;
                }
            }
        }

        this.chainLength = chainLength;
    }
}
