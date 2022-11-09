import TreasureTroveAnalyser from './treasure-trove-analyser.js';

describe('TreasureTroveAnalyser()', () => {
  it('should store json and all other referenced in accessible field from a url', async () => {
    const analyser = await TreasureTroveAnalyser.initialiseWithChests(
      'https://e0f5e8673c64491d8cce34f5.z35.web.core.windows.net/treasure.json',
    );

    const treasureTrove = analyser.getChests();

    expect(treasureTrove[0].note).toBe(
      'Minim do ex ex dolore. Magna nisi officia anim id reprehenderit.',
    );
    expect(treasureTrove.length).toBe(42);
  });
});
