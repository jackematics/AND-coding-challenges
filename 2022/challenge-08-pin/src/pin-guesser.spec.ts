import PinGuesser from "./pin-guesser";

describe("Pin Guesser", () => {
  describe("When calculating all pin possibilities", () => {
    it("should return an array of all possible combinations for a 1 digit pin", () => {
      const input = "5";
      const expected = [[2], [5], [6], [8], [4]];

      expect(PinGuesser.calculatePossibilities(input)).toStrictEqual(expected);
    });

    it("should return an array of all possible combinations for a simple 2 digit pin", () => {
      const input = "00";
      const expected = [
        [0, 0],
        [0, 8],
        [8, 0],
        [8, 8],
      ];

      expect(PinGuesser.calculatePossibilities(input)).toStrictEqual(expected);
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

      expect(PinGuesser.calculatePossibilities(input)).toStrictEqual(expected);
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

      expect(PinGuesser.calculatePossibilities(input)).toStrictEqual(expected);
    });
  });

  describe("When sorting pin possibilities by order of likelihood", () => {
    it("should return a sorted array of all possible combinations for a 1 digit pin", () => {
      const input = "5";
      const expected = [[5], [2], [8], [4], [6]];

      expect(
        PinGuesser.calculatePossibilitiesByLikelihood(input)
      ).toStrictEqual(expected);
    });

    it("should return an array of all possible combinations for a simple 2 digit pin", () => {
      const input = "00";
      const expected = [
        [8, 8],
        [0, 8],
        [8, 0],
        [0, 0],
      ];

      expect(
        PinGuesser.calculatePossibilitiesByLikelihood(input)
      ).toStrictEqual(expected);
    });

    it("should return an array of all possible combinations for a more complex 2 digit pin", () => {
      const input = "46";
      const expected = [
        [5, 5], // 20
        [1, 5], // 19
        [7, 5], // 16
        [4, 5], // 15
        [5, 3], // 13
        [1, 3], // 12
        [5, 6], // 12
        [1, 6], // 11
        [5, 9], // 11
        [1, 9], // 10
        [7, 3], // 9
        [4, 3], // 8
        [7, 6], // 8
        [4, 6], // 7
        [7, 9], // 7
        [4, 9], // 6
      ];

      expect(
        PinGuesser.calculatePossibilitiesByLikelihood(input)
      ).toStrictEqual(expected);
    });

    it("should return an array of all possible combinations for a 3 digit pin", () => {
      const input = "379";
      const expected = [
        [2, 8, 8], // 22
        [2, 7, 8], // 22
        [2, 4, 8], // 20
        [2, 8, 6], // 17
        [3, 8, 8], // 17
        [2, 7, 6], // 16
        [2, 8, 9], // 16
        [3, 7, 8], // 16
        [6, 8, 8], // 16
        [2, 4, 6], // 15
        [2, 7, 9], // 15
        [3, 4, 8], // 15
        [6, 7, 8], // 15
        [2, 4, 9], // 14
        [6, 4, 8], // 14
        [3, 8, 6], // 12
        [3, 7, 6], // 11
        [3, 8, 9], // 11
        [6, 8, 6], // 11
        [3, 4, 6], // 10
        [3, 7, 9], // 10
        [6, 7, 6], // 10
        [6, 8, 9], // 10
        [3, 4, 9], // 9
        [6, 4, 6], // 9
        [6, 7, 9], // 9
        [6, 4, 9], // 8
      ];

      expect(
        PinGuesser.calculatePossibilitiesByLikelihood(input)
      ).toStrictEqual(expected);
    });
  });
});
