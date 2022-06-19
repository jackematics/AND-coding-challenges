import PinGuesser from "./pin-guesser";

describe("Pin Guesser", () => {
  describe("When calculating all pin possibilities", () => {
    it("should return an array of all possible combinations for a 1 digit pin", () => {
      const input = "5";
      const expected = [[2], [5], [6], [8], [4]];

      const pinGuesser = new PinGuesser();

      expect(pinGuesser.calculatePossibilities(input)).toStrictEqual(expected);
    });

    it("should return an array of all possible combinations for a simple 2 digit pin", () => {
      const input = "00";
      const expected = [
        [0, 0],
        [0, 8],
        [8, 0],
        [8, 8],
      ];

      const pinGuesser = new PinGuesser();

      expect(pinGuesser.calculatePossibilities(input)).toStrictEqual(expected);
    });

    it("should return an array of all possible combinations for a more complex 2 digit pin", () => {
      const input = "46";
      const expected = [
        [1, 3],
        [1, 5],
        [1, 6],
        [1, 9],
        [4, 3],
        [4, 5],
        [4, 6],
        [4, 9],
        [5, 3],
        [5, 5],
        [5, 6],
        [5, 9],
        [7, 3],
        [7, 5],
        [7, 6],
        [7, 9],
      ];

      const pinGuesser = new PinGuesser();

      expect(pinGuesser.calculatePossibilities(input)).toStrictEqual(expected);
    });

    it("should return an array of all possible combinations for a 3 digit pin", () => {
      const input = "379";
      const expected = [
        [2, 4, 6],
        [2, 4, 8],
        [2, 4, 9],
        [2, 7, 6],
        [2, 7, 8],
        [2, 7, 9],
        [2, 8, 6],
        [2, 8, 8],
        [2, 8, 9],
        [3, 4, 6],
        [3, 4, 8],
        [3, 4, 9],
        [3, 7, 6],
        [3, 7, 8],
        [3, 7, 9],
        [3, 8, 6],
        [3, 8, 8],
        [3, 8, 9],
        [6, 4, 6],
        [6, 4, 8],
        [6, 4, 9],
        [6, 7, 6],
        [6, 7, 8],
        [6, 7, 9],
        [6, 8, 6],
        [6, 8, 8],
        [6, 8, 9],
      ];

      const pinGuesser = new PinGuesser();

      expect(pinGuesser.calculatePossibilities(input)).toStrictEqual(expected);
    });
  });
});
