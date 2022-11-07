import fetch from 'node-fetch';

export default class TreasureTroveAnalyser {
  private treasureChests: any;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static async initialiseWithChests(
    jsonUrl: string,
  ): Promise<TreasureTroveAnalyser> {
    const analyser = new TreasureTroveAnalyser();
    analyser.treasureChests = await analyser.fetchChests(jsonUrl);

    return analyser;
  }

  private async fetchChests(jsonUrl: string): Promise<any> {
    const response = await fetch(jsonUrl);
    return await response.json();
  }

  public getChests() {
    return this.treasureChests;
  }
}
