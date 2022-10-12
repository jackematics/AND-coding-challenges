import Tile from '../business-rules/tile';
import TileType from '../enums/tile-type';

export default class TestHelper {
  public static readonly checkResetAssigner = {
    assign: () => {
      return [
        [
          new Tile(TileType.Empty, { row: 0, col: 0 }),
          new Tile(TileType.Mine, { row: 0, col: 1 }),
          new Tile(TileType.Empty, { row: 0, col: 2 }),
        ],
        [
          new Tile(TileType.Empty, { row: 1, col: 0 }),
          new Tile(TileType.Mine, { row: 2, col: 1 }),
          new Tile(TileType.Empty, { row: 3, col: 2 }),
        ],
      ];
    },
  };

  public static readonly checkEmptySquareAssigner = {
    assign: () => {
      return [
        [
          new Tile(TileType.Empty, { row: 0, col: 0 }),
          new Tile(TileType.Empty, { row: 0, col: 1 }),
          new Tile(TileType.Empty, { row: 0, col: 2 }),
        ],
        [
          new Tile(TileType.Empty, { row: 1, col: 0 }),
          new Tile(TileType.Empty, { row: 1, col: 1 }),
          new Tile(TileType.Empty, { row: 1, col: 2 }),
        ],
        [
          new Tile(TileType.Empty, { row: 2, col: 0 }),
          new Tile(TileType.Empty, { row: 2, col: 1 }),
          new Tile(TileType.Empty, { row: 2, col: 2 }),
        ],
        [
          new Tile(TileType.Empty, { row: 3, col: 0 }),
          new Tile(TileType.Empty, { row: 3, col: 1 }),
          new Tile(TileType.Mine, { row: 3, col: 2 }),
        ],
      ];
    },
  };

  public static readonly checkMineSquareAssigner = {
    assign: () => {
      return [
        [
          new Tile(TileType.Mine, { row: 0, col: 0 }),
          new Tile(TileType.Empty, { row: 0, col: 1 }),
          new Tile(TileType.Mine, { row: 0, col: 2 }),
        ],
        [
          new Tile(TileType.Mine, { row: 1, col: 0 }),
          new Tile(TileType.Mine, { row: 1, col: 1 }),
          new Tile(TileType.Empty, { row: 1, col: 2 }),
        ],
      ];
    },
  };

  public static readonly simpleAssigner = {
    assign: () => {
      return [
        [
          new Tile(TileType.Empty, { row: 0, col: 0 }),
          new Tile(TileType.Mine, { row: 0, col: 1 }),
          new Tile(TileType.Empty, { row: 0, col: 2 }),
        ],
      ];
    },
  };
}
