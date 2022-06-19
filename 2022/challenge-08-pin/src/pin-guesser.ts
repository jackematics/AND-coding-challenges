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

  public calculatePossibilities(approximatePin: string): number[][] {
    const approximatePinArray: number[] = Array.from(
      String(approximatePin),
      Number
    );

    const permutations: number[][] = approximatePinArray.map(
      // @ts-ignore
      (digit: number) => this.POSSIBILITIES[digit]
    );
    const possibilities = this.getPossibilitiesFrom(permutations);

    return possibilities;
  }

  public getPossibilitiesFrom(permutations: number[][]) {
    const possibilities: number[][] = [];

    for (let i = 0; i < permutations[0].length; i++) {
      possibilities.push([permutations[0][i]]);
    }

    return possibilities;
  }

  // public recursivelyGetPossibilities(
  //   possibilities: number[][],
  //   permutations: number[][],
  //   currentPinIndex: number,
  //   currentPermutationIndex: number
  // ) {
  //   let possibility: number[] = [];

  //   //
  //   possibility.push(permutations[currentPinIndex][currentPermutationIndex]);
  //   currentPinIndex++;
  //   possibility.push(permutations[currentPinIndex][currentPermutationIndex]);
  //   currentPinIndex++;
  //   possibility.push(permutations[currentPinIndex][currentPermutationIndex]);

  //   // Reached last pin digit
  //   possibilities.push(possibility);
  //   possibility.pop();
  //   currentPermutationIndex++;

  //   possibility.push(permutations[currentPinIndex][currentPermutationIndex]);

  //   possibilities.push(possibility);
  //   possibility.pop();
  //   currentPermutationIndex++;

  //   possibility.push(permutations[currentPinIndex][currentPermutationIndex]);

  //   // Reached last permutation digit
  //   possibility.pop;
  // }
}
