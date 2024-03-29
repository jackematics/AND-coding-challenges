import TileType from '../enums/tile-type';
import GridIndex from '../types/grid-index';
import MinesweeperMetadata from '../types/minesweeper-metadata';
import IAssigner from './iassigner';
import Tile from './tile';
import GridOperations from './utils/grid-operations';

export default class GameAssigner implements IAssigner {
  private readonly metadata: MinesweeperMetadata;

  constructor(metadata: MinesweeperMetadata) {
    this.metadata = metadata;
  }

  public assign(): Tile[][] {
    const mineCoordinateSet = this.generateMineCoordinates();
    const grid: Tile[][] = this.initialiseGrid(mineCoordinateSet);
    this.setSurroundingMineCounts(grid);

    return grid;
  }

  private generateMineCoordinates(): GridIndex[] {
    const mineCoordinates: GridIndex[] = [];
    for (let i = 0; i < this.metadata.mines; i++) {
      mineCoordinates.push(this.generateUniqueMineCoordinate(mineCoordinates));
    }

    return mineCoordinates;
  }

  private generateUniqueMineCoordinate(
    usedCoordinates: GridIndex[]
  ): GridIndex {
    const generatedCoordinate = {
      row: this.getRandomInt(this.metadata.rows),
      col: this.getRandomInt(this.metadata.cols),
    };

    if (
      usedCoordinates.find(
        (coord) =>
          coord.row === generatedCoordinate.row &&
          coord.col === generatedCoordinate.col
      )
    )
      return this.generateUniqueMineCoordinate(usedCoordinates);

    return generatedCoordinate;
  }

  private getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  private initialiseGrid(mineCoordinateSet: GridIndex[]) {
    const grid: Tile[][] = [];

    for (let row = 0; row < this.metadata.rows; row++) {
      let currentRow = [];
      for (let col = 0; col < this.metadata.cols; col++) {
        const tileType = mineCoordinateSet.find(
          (coord) => coord.row === row && coord.col === col
        )
          ? TileType.Mine
          : TileType.Empty;

        currentRow.push(new Tile(tileType, { row, col }));
      }

      grid.push(currentRow);
    }

    return grid;
  }

  private setSurroundingMineCounts(grid: Tile[][]): void {
    grid.forEach((row) =>
      row.forEach((tile) => {
        this.setSurroundingMineCount(tile, grid);
      })
    );
  }

  private setSurroundingMineCount(tile: Tile, grid: Tile[][]): void {
    const centre = tile.getGridIndex();
    let count = 0;

    for (let row = centre.row - 1; row <= centre.row + 1; row++) {
      for (let col = centre.col - 1; col <= centre.col + 1; col++) {
        count += this.incrementCountWhenMineAdjacent(
          { row, col },
          centre,
          grid
        );
      }
    }

    tile.setSurroundingMineCount(count);
  }

  private incrementCountWhenMineAdjacent(
    gridIndex: GridIndex,
    centreTileIndex: GridIndex,
    grid: Tile[][]
  ): number {
    return this.tileQualifies(gridIndex, centreTileIndex, grid) &&
      grid[gridIndex.row][gridIndex.col].getType() === TileType.Mine
      ? 1
      : 0;
  }

  private tileQualifies(
    gridIndex: GridIndex,
    centreTileIndex: GridIndex,
    grid: Tile[][]
  ) {
    return (
      !GridOperations.tilesHaveSameIndex(gridIndex, centreTileIndex) &&
      !GridOperations.indexOutOfBounds(gridIndex, grid)
    );
  }
}
