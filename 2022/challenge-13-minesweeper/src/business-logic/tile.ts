import TileType from '../enums/tile-type';
import GridIndex from '../types/grid-index';

export default class Tile {
  private hidden = true;
  private type: TileType;
  private readonly gridIndex: GridIndex;

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

  public setType(type: TileType) {
    this.type = type;
  }

  public getGridIndex() {
    return this.gridIndex;
  }
}
