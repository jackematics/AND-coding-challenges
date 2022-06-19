import PinGuesser from "./pin-guesser";

describe("Pin Guesser", () => {
  it("should return an array of all possible combinations for a 1 digit pin", () => {
    const input = "5";
    const expected = [[2], [5], [6], [8], [4]];

    const pinGuesser = new PinGuesser();

    expect(pinGuesser.calculatePossibilities(input)).toStrictEqual(expected);
  });

  // it("should return an array of all possible combinations for a simple 2 digit pin", () => {
  //   const input = "00";
  //   const expected = [
  //     [0, 0],
  //     [0, 8],
  //     [8, 0],
  //     [8, 8],
  //   ];

  //   const pinGuesser = new PinGuesser();

  //   expect(pinGuesser.calculatePossibilities(input)).toStrictEqual(expected);
  // });

  // it("should return an array of all possible combinations", () => {
  //   const input = 46;
  //   const expected = [
  //     13, 15, 16, 19, 43, 45, 46, 49, 53, 55, 56, 59, 73, 75, 76, 79,
  //   ];

  //   const pinGuesser = new PinGuesser();

  //   expect(pinGuesser.calculatePossibilities(input)).toBe(expected);
  // });
});
