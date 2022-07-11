export default class SquareDartboardGenerator {
  public static generate(n: number): number[][] {
    if (n <= 0) throw new Error('n must be at least 1');

    const topHalf = this.generateTopLeftQuadrant(n).map((x) =>
      n % 2 === 0 ? [...x, ...x.reverse()] : [...x, ...x.reverse().slice(1)]
    );
    const bottomHalf =
      n % 2 === 0
        ? Array.from(topHalf).reverse()
        : Array.from(topHalf).reverse().slice(1);

    return [...topHalf, ...bottomHalf];
  }

  private static generateTopLeftQuadrant(n: number): number[][] {
    const topLeftQuadrant: number[][] = [];
    const rowLength = Math.ceil(n / 2);

    for (let i = 1; i <= rowLength; i++) {
      topLeftQuadrant.push(this.recursivelyGenerateRow([1], i, rowLength));
    }

    return topLeftQuadrant;
  }

  private static recursivelyGenerateRow(
    row: number[],
    recurringElement: number,
    rowLength: number
  ): number[] {
    if (row.length === rowLength) {
      return row;
    }

    const lastElement = row[row.length - 1];
    row.push(
      lastElement < recurringElement ? lastElement + 1 : recurringElement
    );

    return this.recursivelyGenerateRow(row, recurringElement, rowLength);
  }
}
