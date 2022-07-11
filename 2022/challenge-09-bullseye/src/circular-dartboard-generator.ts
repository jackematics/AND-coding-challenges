export default class CircularDartboardGenerator {
  public static generate(n: number): (number | null)[][] {
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

  private static generateTopLeftQuadrant(n: number): (number | null)[][] {
    const topLeftQuadrant: (number | null)[][] = [];
    const rowLength = Math.ceil(n / 2);

    for (let i = rowLength - 1; i >= 0; i--) {
      topLeftQuadrant.push(
        this.recursivelyGenerateRow([i === 0 ? 1 : null], i, rowLength)
      );
    }

    return topLeftQuadrant;
  }

  private static recursivelyGenerateRow(
    row: (number | null)[],
    firstIntegerIndex: number,
    rowLength: number
  ): (number | null)[] {
    if (row.length === firstIntegerIndex) {
      row.push(1);
    }

    if (row.length === rowLength) {
      return row;
    }

    const lastElement = row[row.length - 1];
    row.push(lastElement ? lastElement + 1 : null);

    return this.recursivelyGenerateRow(row, firstIntegerIndex, rowLength);
  }
}
