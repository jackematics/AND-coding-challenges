import fetch from 'node-fetch';

export default class TreasureTroveAnalyser {
  private treasureChests: any;

  private constructor() {}

  public static async initialiseWithChests(
    jsonUrl: string,
  ): Promise<TreasureTroveAnalyser> {
    const analyser = new TreasureTroveAnalyser();
    analyser.treasureChests = await analyser.fetchChests(jsonUrl);

    return analyser;
  }

  private async fetchChests(jsonUrl: string): Promise<any> {
    // @ts-ignore
    const response = await fetch(jsonUrl);
    const trove = await response.json();
    const treasureTroveUrls = this.getOtherTreasureTroveUrls(trove);
    console.log(treasureTroveUrls);

    return trove;
  }

  private getOtherTreasureTroveUrls(trove: any): string[] {
    console.log('first object', Object.entries(trove[0]));
    console.log('length', Object.entries(trove[0]).length);
    const urls: string[] = [];

    for (const chest of trove) {
      this.searchNextLayerForUrls(chest, urls);
    }

    return urls;
  }

  private searchNextLayerForUrls(object: any, urls: string[]) {
    for (const [key, value] of Object.entries(object)) {
      if (typeof value === 'string') {
        const urlStartIndex = value.indexOf('http');
        if (urlStartIndex === -1) continue;

        const nextWhitespaceIndex = value.indexOf(' ', urlStartIndex);
        const urlEndIndex =
          nextWhitespaceIndex === -1 ? value.length : nextWhitespaceIndex;

        urls.push(value.substring(urlStartIndex, urlEndIndex));
        continue;
      }

      if (typeof value === 'number') {
        continue;
      }

      this.searchNextLayerForUrls(value, urls);
    }

    return urls;
  }

  public getChests(): any {
    return this.treasureChests;
  }
}
