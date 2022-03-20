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

  it("should be 4 consecutive disks for the win condition", () => {
    const connectFour = new ConnectFour();
    expect(connectFour.getWinCount()).toBe(4);
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

  describe("When calculating the next available row index", () => {
    it("should be 5 for an empty column", () => {
      const connectFour = new ConnectFour();

      expect(connectFour.calculateRowDropIndex(0)).toBe(5);
    });

    it("should be 4 for a column with one disk in it", () => {
      const connectFour = new ConnectFour();

      connectFour.dropDiskInColumn(0, Disk.RED);

      expect(connectFour.calculateRowDropIndex(0)).toBe(4);
    });

    it("should be 0 for a column with one space left", () => {
      const connectFour = new ConnectFour();

      connectFour.dropDiskInColumn(0, Disk.RED);
      connectFour.dropDiskInColumn(0, Disk.RED);
      connectFour.dropDiskInColumn(0, Disk.RED);
      connectFour.dropDiskInColumn(0, Disk.RED);
      connectFour.dropDiskInColumn(0, Disk.RED);

      expect(connectFour.calculateRowDropIndex(0)).toBe(0);
    });

    it("should be -1 for a column with no spaces left", () => {
      const connectFour = new ConnectFour();

      connectFour.dropDiskInColumn(0, Disk.RED);
      connectFour.dropDiskInColumn(0, Disk.RED);
      connectFour.dropDiskInColumn(0, Disk.RED);
      connectFour.dropDiskInColumn(0, Disk.RED);
      connectFour.dropDiskInColumn(0, Disk.RED);
      connectFour.dropDiskInColumn(0, Disk.RED);

      expect(connectFour.calculateRowDropIndex(0)).toBe(-1);
    });
  });

  describe("When calculating a connect-four", () => {
    it("should return true if there are four consecutive horizontal disks", () => {
      const connectFour = new ConnectFour();

      connectFour.dropDiskInColumn(0, Disk.RED);
      connectFour.dropDiskInColumn(1, Disk.RED);
      connectFour.dropDiskInColumn(2, Disk.RED);
      connectFour.dropDiskInColumn(3, Disk.RED);

      expect(connectFour.isConnectFour(Disk.RED)).toBe(true);
    });

    it("should return false if there are not four consecutive horizontal disks", () => {
      const connectFour = new ConnectFour();

      connectFour.dropDiskInColumn(0, Disk.RED);
      connectFour.dropDiskInColumn(1, Disk.RED);
      connectFour.dropDiskInColumn(2, Disk.YELLOW);
      connectFour.dropDiskInColumn(3, Disk.RED);

      expect(connectFour.isConnectFour(Disk.RED)).toBe(false);
    });

    it("should return true if there are four consecutive vertical disks", () => {
      const connectFour = new ConnectFour();

      connectFour.dropDiskInColumn(0, Disk.RED);
      connectFour.dropDiskInColumn(0, Disk.RED);
      connectFour.dropDiskInColumn(0, Disk.RED);
      connectFour.dropDiskInColumn(0, Disk.RED);

      expect(connectFour.isConnectFour(Disk.RED)).toBe(true);
    });

    it("should return false if there are not four consecutive vertical disks", () => {
      const connectFour = new ConnectFour();

      connectFour.dropDiskInColumn(0, Disk.RED);
      connectFour.dropDiskInColumn(0, Disk.RED);
      connectFour.dropDiskInColumn(0, Disk.YELLOW);
      connectFour.dropDiskInColumn(0, Disk.RED);

      expect(connectFour.isConnectFour(Disk.RED)).toBe(false);
    });

    it("should return true if there are four consecutive up right diagonal disks", () => {
      const connectFour = new ConnectFour();

      connectFour.dropDiskInColumn(0, Disk.RED);
      connectFour.dropDiskInColumn(1, Disk.YELLOW);
      connectFour.dropDiskInColumn(1, Disk.RED);
      connectFour.dropDiskInColumn(2, Disk.YELLOW);
      connectFour.dropDiskInColumn(2, Disk.YELLOW);
      connectFour.dropDiskInColumn(2, Disk.RED);
      connectFour.dropDiskInColumn(3, Disk.YELLOW);
      connectFour.dropDiskInColumn(3, Disk.YELLOW);
      connectFour.dropDiskInColumn(3, Disk.YELLOW);
      connectFour.dropDiskInColumn(3, Disk.RED);

      expect(connectFour.isConnectFour(Disk.RED)).toBe(true);
    });

    it("should return true if there are four consecutive up right diagonal disks higher in the grid", () => {
      const connectFour = new ConnectFour();

      connectFour.dropDiskInColumn(2, Disk.YELLOW);
      connectFour.dropDiskInColumn(2, Disk.YELLOW);
      connectFour.dropDiskInColumn(2, Disk.RED);
      connectFour.dropDiskInColumn(3, Disk.YELLOW);
      connectFour.dropDiskInColumn(3, Disk.YELLOW);
      connectFour.dropDiskInColumn(3, Disk.YELLOW);
      connectFour.dropDiskInColumn(3, Disk.RED);
      connectFour.dropDiskInColumn(4, Disk.YELLOW);
      connectFour.dropDiskInColumn(4, Disk.YELLOW);
      connectFour.dropDiskInColumn(4, Disk.YELLOW);
      connectFour.dropDiskInColumn(4, Disk.YELLOW);
      connectFour.dropDiskInColumn(4, Disk.RED);
      connectFour.dropDiskInColumn(5, Disk.YELLOW);
      connectFour.dropDiskInColumn(5, Disk.YELLOW);
      connectFour.dropDiskInColumn(5, Disk.YELLOW);
      connectFour.dropDiskInColumn(5, Disk.YELLOW);
      connectFour.dropDiskInColumn(5, Disk.YELLOW);
      connectFour.dropDiskInColumn(5, Disk.RED);

      expect(connectFour.isConnectFour(Disk.RED)).toBe(true);
    });

    it("should return false if there are not four consecutive up right diagonal disks", () => {
      const connectFour = new ConnectFour();

      connectFour.dropDiskInColumn(0, Disk.RED);
      connectFour.dropDiskInColumn(1, Disk.YELLOW);
      connectFour.dropDiskInColumn(1, Disk.RED);
      connectFour.dropDiskInColumn(2, Disk.YELLOW);
      connectFour.dropDiskInColumn(2, Disk.YELLOW);
      connectFour.dropDiskInColumn(2, Disk.YELLOW);
      connectFour.dropDiskInColumn(3, Disk.YELLOW);
      connectFour.dropDiskInColumn(3, Disk.YELLOW);
      connectFour.dropDiskInColumn(3, Disk.YELLOW);
      connectFour.dropDiskInColumn(3, Disk.RED);

      expect(connectFour.isConnectFour(Disk.RED)).toBe(false);
    });

    it("should return true if there are four consecutive down left diagonal disks", () => {
      const connectFour = new ConnectFour();

      connectFour.dropDiskInColumn(3, Disk.RED);
      connectFour.dropDiskInColumn(2, Disk.YELLOW);
      connectFour.dropDiskInColumn(2, Disk.RED);
      connectFour.dropDiskInColumn(1, Disk.YELLOW);
      connectFour.dropDiskInColumn(1, Disk.YELLOW);
      connectFour.dropDiskInColumn(1, Disk.RED);
      connectFour.dropDiskInColumn(0, Disk.YELLOW);
      connectFour.dropDiskInColumn(0, Disk.YELLOW);
      connectFour.dropDiskInColumn(0, Disk.YELLOW);
      connectFour.dropDiskInColumn(0, Disk.RED);

      expect(connectFour.isConnectFour(Disk.RED)).toBe(true);
    });

    it("should return true if there are four consecutive up left diagonal disks higher in the grid", () => {
      const connectFour = new ConnectFour();

      connectFour.dropDiskInColumn(2, Disk.YELLOW);
      connectFour.dropDiskInColumn(2, Disk.YELLOW);
      connectFour.dropDiskInColumn(2, Disk.YELLOW);
      connectFour.dropDiskInColumn(2, Disk.YELLOW);
      connectFour.dropDiskInColumn(2, Disk.YELLOW);
      connectFour.dropDiskInColumn(2, Disk.RED);
      connectFour.dropDiskInColumn(3, Disk.YELLOW);
      connectFour.dropDiskInColumn(3, Disk.YELLOW);
      connectFour.dropDiskInColumn(3, Disk.YELLOW);
      connectFour.dropDiskInColumn(3, Disk.YELLOW);
      connectFour.dropDiskInColumn(3, Disk.RED);
      connectFour.dropDiskInColumn(4, Disk.YELLOW);
      connectFour.dropDiskInColumn(4, Disk.YELLOW);
      connectFour.dropDiskInColumn(4, Disk.YELLOW);
      connectFour.dropDiskInColumn(4, Disk.RED);
      connectFour.dropDiskInColumn(5, Disk.YELLOW);
      connectFour.dropDiskInColumn(5, Disk.YELLOW);
      connectFour.dropDiskInColumn(5, Disk.RED);

      expect(connectFour.isConnectFour(Disk.RED)).toBe(true);
    });

    it("should return false if there are not four consecutive up left diagonal disks", () => {
      const connectFour = new ConnectFour();

      connectFour.dropDiskInColumn(3, Disk.RED);
      connectFour.dropDiskInColumn(2, Disk.YELLOW);
      connectFour.dropDiskInColumn(2, Disk.RED);
      connectFour.dropDiskInColumn(1, Disk.YELLOW);
      connectFour.dropDiskInColumn(1, Disk.YELLOW);
      connectFour.dropDiskInColumn(1, Disk.YELLOW);
      connectFour.dropDiskInColumn(0, Disk.YELLOW);
      connectFour.dropDiskInColumn(0, Disk.YELLOW);
      connectFour.dropDiskInColumn(0, Disk.YELLOW);
      connectFour.dropDiskInColumn(0, Disk.RED);

      expect(connectFour.isConnectFour(Disk.RED)).toBe(false);
    });
  });

  describe("reset()", () => {
    it("should reinitalise the grid", () => {
      const connectFour = new ConnectFour();

      connectFour.dropDiskInColumn(3, Disk.RED);
      connectFour.dropDiskInColumn(2, Disk.YELLOW);
      connectFour.dropDiskInColumn(2, Disk.RED);
      connectFour.dropDiskInColumn(1, Disk.YELLOW);
      connectFour.dropDiskInColumn(1, Disk.YELLOW);
      connectFour.dropDiskInColumn(1, Disk.YELLOW);
      connectFour.dropDiskInColumn(0, Disk.YELLOW);
      connectFour.dropDiskInColumn(0, Disk.YELLOW);
      connectFour.dropDiskInColumn(0, Disk.YELLOW);
      connectFour.dropDiskInColumn(0, Disk.RED);

      connectFour.reset();

      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
          expect(connectFour.getGrid()[i][j]).toBe(Disk.EMPTY);
        }
      }
    });
  });
});
