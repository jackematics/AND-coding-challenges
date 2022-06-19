export default class PinGuesser {
  private static readonly POSSIBILITIES = {
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

  // Weighting from 1 - 10 based on how likely the digit will be pressed, 10 being most likely
  private static readonly LIKELIHOOD_WEIGHTINGS = {
    0: 4,
    1: 9,
    2: 8,
    3: 3,
    4: 5,
    5: 10,
    6: 2,
    7: 6,
    8: 7,
    9: 1,
  };

  public static calculatePossibilitiesByLikelihood(
    approximatePin: string
  ): number[][] {
    const unsortedPossibilities = this.calculatePossibilities(approximatePin);

    return unsortedPossibilities.sort((a, b) => {
      return this.countWeightings(b) - this.countWeightings(a);
    });
  }

  private static countWeightings(pinPossibility: number[]): number {
    return pinPossibility.reduce(
      // @ts-ignore
      (acc, currentValue) => acc + this.LIKELIHOOD_WEIGHTINGS[currentValue],
      0
    );
  }

  public static calculatePossibilities(approximatePin: string): number[][] {
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

  private static recursivelyGetPossibilitiesFrom(
    permutations: number[][]
  ): number[][] {
    if (permutations.length === 1) {
      return permutations[0].map((x) => [x]);
    }

    const fixed = permutations[0];
    const unfixed = permutations.slice(1);
    const possibilities: number[][] = [];

    fixed.forEach((fixedElement) => {
      this.recursivelyGetPossibilitiesFrom(unfixed).forEach(
        (unfixedElements) => {
          possibilities.push([fixedElement, ...unfixedElements]);
        }
      );
    });

    return possibilities;
  }
}
