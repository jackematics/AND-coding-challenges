import ConnectFour from "./connect-four";
import ConnectFourAi from "./connect-four-ai";
import Disk from "./disk";

describe("ConnectFourAi", () => {
  describe("calculateConnectFourMovesLeft()", () => {
    describe("calculateHorizontalMovesLeft()", () => {
      it("should return 4 for an empty grid", () => {
        const game = new ConnectFour();
        const ai = new ConnectFourAi(game, Disk.RED);

        expect(ai.calculateHorizontalMovesLeft({ row: 5, column: 0 })).toBe(4);
      });

      it("should return 4 for a single obstruction behind", () => {
        const game = new ConnectFour();
        const ai = new ConnectFourAi(game, Disk.RED);

        game.dropDiskInColumn(2, Disk.YELLOW);

        expect(ai.calculateHorizontalMovesLeft({ row: 5, column: 3 })).toBe(4);
      });

      it("should return 4 for a single obstruction ahead", () => {
        const game = new ConnectFour();
        const ai = new ConnectFourAi(game, Disk.RED);

        game.dropDiskInColumn(6, Disk.YELLOW);

        expect(ai.calculateHorizontalMovesLeft({ row: 5, column: 2 })).toBe(4);
      });

      it("should return 3 for a disk already in place", () => {
        const game = new ConnectFour();
        const ai = new ConnectFourAi(game, Disk.RED);

        game.dropDiskInColumn(1, Disk.RED);

        expect(ai.calculateHorizontalMovesLeft({ row: 5, column: 3 })).toBe(3);
      });

      it("should return 2 for 2 disks already in place", () => {
        const game = new ConnectFour();
        const ai = new ConnectFourAi(game, Disk.RED);

        game.dropDiskInColumn(1, Disk.RED);
        game.dropDiskInColumn(4, Disk.RED);

        expect(ai.calculateHorizontalMovesLeft({ row: 5, column: 3 })).toBe(2);
      });

      it("should return 5 if completely obstructed", () => {
        const game = new ConnectFour();
        const ai = new ConnectFourAi(game, Disk.RED);

        game.dropDiskInColumn(3, Disk.YELLOW);

        expect(ai.calculateHorizontalMovesLeft({ row: 5, column: 2 })).toBe(5);
      });

      it("should return 3 if almost obstructed and 1 disk in place", () => {
        const game = new ConnectFour();
        const ai = new ConnectFourAi(game, Disk.RED);

        game.dropDiskInColumn(4, Disk.YELLOW);
        game.dropDiskInColumn(3, Disk.RED);

        expect(ai.calculateHorizontalMovesLeft({ row: 5, column: 2 })).toBe(3);
      });

      it("should return 2 if almost obstructed and 2 disks in place", () => {
        const game = new ConnectFour();
        const ai = new ConnectFourAi(game, Disk.RED);

        game.dropDiskInColumn(4, Disk.YELLOW);
        game.dropDiskInColumn(3, Disk.RED);
        game.dropDiskInColumn(0, Disk.RED);

        expect(ai.calculateHorizontalMovesLeft({ row: 5, column: 2 })).toBe(2);
      });
    });

    describe("calculateVerticalMovesLeft()", () => {
      it("should return 4 for an empty grid", () => {
        const game = new ConnectFour();
        const ai = new ConnectFourAi(game, Disk.RED);

        expect(ai.calculateVerticalMovesLeft({ row: 4, column: 0 })).toBe(4);
      });

      it("should return 4 for a single obstruction below", () => {
        const game = new ConnectFour();
        const ai = new ConnectFourAi(game, Disk.RED);

        game.dropDiskInColumn(2, Disk.YELLOW);

        expect(ai.calculateVerticalMovesLeft({ row: 4, column: 2 })).toBe(4);
      });

      it("should return 3 for a disk already in place", () => {
        const game = new ConnectFour();
        const ai = new ConnectFourAi(game, Disk.RED);

        game.dropDiskInColumn(1, Disk.RED);

        expect(ai.calculateVerticalMovesLeft({ row: 4, column: 1 })).toBe(3);
      });

      it("should return 2 for 2 disks already in place", () => {
        const game = new ConnectFour();
        const ai = new ConnectFourAi(game, Disk.RED);

        game.dropDiskInColumn(1, Disk.RED);
        game.dropDiskInColumn(1, Disk.RED);

        expect(ai.calculateVerticalMovesLeft({ row: 3, column: 1 })).toBe(2);
      });

      it("should return 5 if completely obstructed", () => {
        const game = new ConnectFour();
        const ai = new ConnectFourAi(game, Disk.RED);

        game.dropDiskInColumn(3, Disk.YELLOW);
        game.dropDiskInColumn(3, Disk.RED);
        game.dropDiskInColumn(3, Disk.YELLOW);

        expect(ai.calculateVerticalMovesLeft({ row: 2, column: 3 })).toBe(5);
      });

      it("should return 3 if almost connect four but 1 blocked", () => {
        const game = new ConnectFour();
        const ai = new ConnectFourAi(game, Disk.RED);

        game.dropDiskInColumn(3, Disk.RED);
        game.dropDiskInColumn(3, Disk.RED);
        game.dropDiskInColumn(3, Disk.RED);
        game.dropDiskInColumn(3, Disk.YELLOW);

        expect(ai.calculateVerticalMovesLeft({ row: 1, column: 3 })).toBe(5);
      });
    });

    describe("calculateUpRightDiagonalMovesLeft()", () => {
      it("should return 4 for an empty grid", () => {
        const game = new ConnectFour();
        const ai = new ConnectFourAi(game, Disk.RED);

        expect(
          ai.calculateUpRightDiagonalMovesLeft({ row: 5, column: 0 })
        ).toBe(4);
      });

      it("should return 4 for a single obstruction behind", () => {
        const game = new ConnectFour();
        const ai = new ConnectFourAi(game, Disk.RED);

        game.dropDiskInColumn(2, Disk.YELLOW);

        expect(
          ai.calculateUpRightDiagonalMovesLeft({ row: 5, column: 0 })
        ).toBe(4);
      });

      // it("should return 4 for a single obstruction ahead", () => {
      //   const game = new ConnectFour();
      //   const ai = new ConnectFourAi(game, Disk.RED);

      //   game.dropDiskInColumn(6, Disk.YELLOW);

      //   expect(ai.calculateUpRightDiagonalMovesLeft(5, 2)).toBe(4);
      // });

      // it("should return 3 for a disk already in place", () => {
      //   const game = new ConnectFour();
      //   const ai = new ConnectFourAi(game, Disk.RED);

      //   game.dropDiskInColumn(1, Disk.RED);

      //   expect(ai.calculateUpRightDiagonalMovesLeft(5, 3)).toBe(3);
      // });

      // it("should return 2 for 2 disks already in place", () => {
      //   const game = new ConnectFour();
      //   const ai = new ConnectFourAi(game, Disk.RED);

      //   game.dropDiskInColumn(1, Disk.RED);
      //   game.dropDiskInColumn(4, Disk.RED);

      //   expect(ai.calculateUpRightDiagonalMovesLeft(5, 3)).toBe(2);
      // });

      // it("should return 4 if completely obstructed", () => {
      //   const game = new ConnectFour();
      //   const ai = new ConnectFourAi(game, Disk.RED);

      //   game.dropDiskInColumn(4, Disk.YELLOW);

      //   expect(ai.calculateUpRightDiagonalMovesLeft(5, 5)).toBe(4);
      // });

      // it("should return 3 if almost obstructed and 1 disk in place", () => {
      //   const game = new ConnectFour();
      //   const ai = new ConnectFourAi(game, Disk.RED);

      //   game.dropDiskInColumn(4, Disk.YELLOW);
      //   game.dropDiskInColumn(3, Disk.RED);

      //   expect(ai.calculateUpRightDiagonalMovesLeft(5, 2)).toBe(3);
      // });

      // it("should return 2 if almost obstructed and 2 disks in place", () => {
      //   const game = new ConnectFour();
      //   const ai = new ConnectFourAi(game, Disk.RED);

      //   game.dropDiskInColumn(4, Disk.YELLOW);
      //   game.dropDiskInColumn(3, Disk.RED);
      //   game.dropDiskInColumn(0, Disk.RED);

      //   expect(ai.calculateUpRightDiagonalMovesLeft(5, 2)).toBe(2);
      // });
    });
  });
});
