import TreasureTroveAnalyser from './treasure-trove-analyser.js';

describe('TreasureTroveAnalyser()', () => {
  let analyser;

  beforeEach(async () => {
    analyser = await TreasureTroveAnalyser.initialiseWithChests(
      'https://e0f5e8673c64491d8cce34f5.z35.web.core.windows.net/treasure.json',
    );
  });

  it('should store json and all other referenced jsons in an accessible field from a url', async () => {
    const treasureTrove = analyser.getChests();

    expect(treasureTrove[0].note).toBe(
      'Minim do ex ex dolore. Magna nisi officia anim id reprehenderit.',
    );
    expect(treasureTrove.length).toBe(410);
  });

  it('should return the coordinates of the holy grail', async () => {
    expect(analyser.getAnalysisResults().holyGrailCoordinates).toBe(
      '31.01 -106.88',
    );
  });

  it('should return the total value of all the chests', async () => {
    expect(analyser.getAnalysisResults().totalChestValue).toBe(561115);
  });

  it('should return the total number of dead spiders', async () => {
    expect(analyser.getAnalysisResults().deadSpiders).toBe(119);
  });

  it('should return the modal boot size', async () => {
    expect(analyser.getAnalysisResults().mostCommonBootSize).toBe(6);
  });
});
