import TileType from '../enums/tile-type';
import GridIndex from '../types/grid-index';

export default class Tile {
  private hidden = true;
  private type: TileType;
  private readonly gridIndex: GridIndex;
  private surroundingMineCount: number = 0;
  private mineFlag = false;

  constructor(type: TileType, gridIndex: GridIndex) {
    this.type = type;
    this.gridIndex = gridIndex;
  }

  public isHidden(): boolean {
    return this.hidden;
  }

  public reveal(): void {
    this.hidden = false;
  }

  public getType(): TileType {
    return this.type;
  }

  public getGridIndex() {
    return this.gridIndex;
  }

  public getSurroundingMineCount() {
    return this.surroundingMineCount;
  }

  public setSurroundingMineCount(count: number) {
    this.surroundingMineCount = count;
  }

  public toggleMineFlag() {
    this.mineFlag = !this.mineFlag;
  }

  public mineFlagged() {
    return this.mineFlag;
  }
}
