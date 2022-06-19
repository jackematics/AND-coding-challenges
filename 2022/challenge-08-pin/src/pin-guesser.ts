export default class PinGuesser {
  private readonly POSSIBILITIES = {
    0: [0, 8],
    1: [1, 2, 4],
    2: [1, 2, 3, 5],
    3: [2, 3, 6],
    4: [1, 4, 5, 7],
    5: [2, 5, 6, 8, 4],
    6: [3, 5, 6, 9],
    7: [4, 7, 8],
    8: [0, 5, 7, 8, 9],
    9: [6, 8, 9],
  };

  public calculatePossibilitiesByLikelihood(approximatePin: string) {}

  public calculatePossibilities(approximatePin: string): number[][] {
    const approximatePinArray: number[] = Array.from(
      String(approximatePin),
      Number
    );

    const permutations: number[][] = approximatePinArray.map(
      // @ts-ignore
      (digit: number) => this.POSSIBILITIES[digit]
    );

    return this.recursivelyGetPossibilitiesFrom(permutations);
  }

  private recursivelyGetPossibilitiesFrom(
    permutations: number[][]
  ): number[][] {
    if (permutations.length === 1) {
      return permutations[0].map((x) => [x]);
    }

    const a = permutations[0];
    const b = permutations.slice(1);
    const possibilities: number[][] = [];

    a.forEach((elementA) => {
      this.recursivelyGetPossibilitiesFrom(b).forEach((elementB) => {
        possibilities.push([elementA, ...elementB]);
      });
    });

    return possibilities;
  }
}
