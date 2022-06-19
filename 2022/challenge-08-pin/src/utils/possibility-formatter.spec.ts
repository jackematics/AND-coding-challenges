import PossibilityFormatter from "./possibility-formatter";

describe("PossibilityFormatter", () => {
  it("should format an array of numbers into one string", () => {
    const input = [
      [1, 4, 5, 7],
      [5, 3, 5, 9],
      [3, 2, 1, 4],
      [7, 8, 4, 3],
    ];
    const expected = ["1457", "5359", "3214", "7843"];

    expect(PossibilityFormatter.formatPossibilities(input)).toStrictEqual(
      expected
    );
  });
});
