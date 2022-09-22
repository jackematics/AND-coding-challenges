import Tile from '../tile';
import { BoardIndex } from '../types/board-index';

type TraverserParams = {
  boardIndex: BoardIndex;
  rowDelta: number;
  colDelta: number;
  rowOutOfBounds: number;
  colOutOfBounds: number;
};

export default class ValidTileUtils {
  public static getDiagonalTileIndexes({
    boardIndex,
    rowDelta,
    colDelta,
    rowOutOfBounds,
    colOutOfBounds,
  }: TraverserParams): BoardIndex[] {
    const diagonalTiles = [];

    const currentIndex: BoardIndex = {
      row: boardIndex.row + rowDelta,
      col: boardIndex.col + colDelta,
    };

    while (
      currentIndex.row !== rowOutOfBounds &&
      currentIndex.col !== colOutOfBounds
    ) {
      diagonalTiles.push({ ...currentIndex });
      currentIndex.row += rowDelta;
      currentIndex.col += colDelta;
    }

    return diagonalTiles;
  }

  public static getVerticalTileIndexes(boardIndex: BoardIndex): BoardIndex[] {
    const verticalTiles = [];
    for (let i = 0; i < 8; i++) {
      if (i !== boardIndex.col)
        verticalTiles.push({ row: boardIndex.row, col: i });
    }

    return verticalTiles;
  }

  public static getHorizontalTileIndexes(boardIndex: BoardIndex): BoardIndex[] {
    const verticalTiles = [];
    for (let i = 0; i < 8; i++) {
      if (i !== boardIndex.row)
        verticalTiles.push({ row: i, col: boardIndex.col });
    }

    return verticalTiles;
  }
}
