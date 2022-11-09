import fetch from 'node-fetch';

type AnalysisResults = {
  holyGrailCoordinates: string;
  totalChestValue: number;
  deadSpiders: number;
  mostCommonBootSize: number;
};

export default class TreasureTroveAnalyser {
  private treasureTrove: any;
  private analysisResults: AnalysisResults = {
    holyGrailCoordinates: '',
    totalChestValue: 0,
    deadSpiders: 0,
    mostCommonBootSize: -1,
  };
  private bootSizes: number[] = [];

  private constructor() {}

  public static async initialiseWithChests(
    jsonUrl: string,
  ): Promise<TreasureTroveAnalyser> {
    const analyser = new TreasureTroveAnalyser();
    analyser.treasureTrove = await analyser.fetchChests(jsonUrl);
    analyser.analyseTrove();

    return analyser;
  }

  public getChests(): any {
    return this.treasureTrove;
  }

  public getAnalysisResults(): AnalysisResults {
    return this.analysisResults;
  }

  private async fetchChests(jsonUrl: string): Promise<any> {
    // @ts-ignore
    const response = await fetch(jsonUrl);
    const trove = await response.json();
    const treasureTroveUrls = this.getOtherTreasureTroveUrls(trove);

    for (const url of treasureTroveUrls) {
      const newTroves = await this.fetchChests(url);

      trove.push(...newTroves);
    }

    return trove;
  }

  private getOtherTreasureTroveUrls(trove: any): string[] {
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

      if (typeof value === 'number') continue;

      this.searchNextLayerForUrls(value, urls);
    }

    return urls;
  }

  private analyseTrove(): void {
    for (const chest of this.treasureTrove) {
      this.analyseNextLayer(chest, chest.location);
    }
    this.analysisResults.mostCommonBootSize = this.calculateMode(
      this.bootSizes,
    );
  }

  private analyseNextLayer(object: any, currentChestLocation: string): void {
    for (const [key, value] of Object.entries(object)) {
      if (key === 'holy-grail') {
        this.analysisResults.holyGrailCoordinates = currentChestLocation;
        continue;
      }

      if (typeof value === 'string') {
        continue;
      }

      if (typeof value === 'number' && object.value) {
        this.analysisResults.totalChestValue += value;
        continue;
      }

      if (key === 'sapphire') {
        this.analysisResults.totalChestValue += 200 * object.sapphire.count;
        continue;
      }

      if (key === 'ruby') {
        this.analysisResults.totalChestValue += 250 * object.ruby.count;
        continue;
      }

      if (key === 'diamond') {
        this.analysisResults.totalChestValue += 400 * object.diamond.count;
        continue;
      }

      if (key === 'spider' && !object.spider.alive) {
        this.analysisResults.deadSpiders++;
        continue;
      }

      if (key === 'boots') {
        this.bootSizes.push(object.boots.size);
        continue;
      }

      this.analyseNextLayer(value, currentChestLocation);
    }

    return;
  }

  private calculateMode(numArray: number[]): number {
    return Object.values(
      numArray.reduce((count, number) => {
        if (!(number in count)) {
          count[number] = [0, number];
        }

        count[number][0]++;
        return count;
      }, {}),
    ).reduce(
      (current, value) => (value[0] < current[0] ? current : value),
      [0, null],
    )[1];
  }
}
