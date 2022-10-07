import TileType from '../enums/tile-type';

export default class Tile {
  private hidden = true;
  private type: TileType;

  constructor(type: TileType) {
    this.type = type;
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
}
