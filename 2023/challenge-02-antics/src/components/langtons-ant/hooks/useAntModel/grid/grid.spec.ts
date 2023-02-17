import { Colour } from '../enums/enums';
import Grid from './grid';

describe('grid', () => {
  it('should initialise a grid of specified height and width populated with white squares', () => {
    expect(new Grid({ width: 5, height: 5 }).getState()).toStrictEqual([
      [Colour.White, Colour.White, Colour.White, Colour.White, Colour.White],
      [Colour.White, Colour.White, Colour.White, Colour.White, Colour.White],
      [Colour.White, Colour.White, Colour.White, Colour.White, Colour.White],
      [Colour.White, Colour.White, Colour.White, Colour.White, Colour.White],
      [Colour.White, Colour.White, Colour.White, Colour.White, Colour.White],
    ]);
  });
});
