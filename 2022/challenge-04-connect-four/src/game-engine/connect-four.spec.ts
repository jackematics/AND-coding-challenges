import ConnectFour from "./connect-four";
import Disk from "./disk";

describe("ConnectFour", () => {
  it("should initialise a 7x6 grid of empty disks", () => {
    const connectFour = new ConnectFour();
    const grid: Disk[][] = connectFour.getGrid();

    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        expect(grid[i][j]).toBe(Disk.EMPTY);
      }
    }
  });

  describe("When dropping disks", () => {
    it("should error if the column is less than the grid bounds", () => {
      const connectFour = new ConnectFour();
      const errorDrop = () => connectFour.dropDiskInColumn(-1, Disk.RED);

      expect(errorDrop).toThrowError();
    });

    it("should error if the column is greater than the grid bounds", () => {
      const connectFour = new ConnectFour();
      const errorDrop = () => connectFour.dropDiskInColumn(7, Disk.RED);

      expect(errorDrop).toThrowError();
    });

    it("should error if an empty disk is dropped", () => {
      const connectFour = new ConnectFour();
      const errorDrop = () => connectFour.dropDiskInColumn(7, Disk.EMPTY);

      expect(errorDrop).toThrowError();
    });

    it("should place a disk at the bottom of the grid", () => {
      const connectFour = new ConnectFour();
      connectFour.dropDiskInColumn(0, Disk.RED);

      expect(connectFour.getGrid()[5][0]).toBe(Disk.RED);
    });

    it("should place a disk on top of a non-empty disk", () => {
      const connectFour = new ConnectFour();
      connectFour.dropDiskInColumn(3, Disk.RED);
      connectFour.dropDiskInColumn(3, Disk.YELLOW);

      expect(connectFour.getGrid()[5][3]).toBe(Disk.RED);
      expect(connectFour.getGrid()[4][3]).toBe(Disk.YELLOW);
    });
  });
});
