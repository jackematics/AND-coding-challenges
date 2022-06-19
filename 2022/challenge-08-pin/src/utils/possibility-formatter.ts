export default class PossibilityFormatter {
  public static formatPossibilities(possibilities: number[][]): string[] {
    return possibilities.map((possibility) => possibility.join(""));
  }
}
