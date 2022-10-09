import Tile from './tile';

export default interface IAssigner {
  assign: () => Tile[][];
}
