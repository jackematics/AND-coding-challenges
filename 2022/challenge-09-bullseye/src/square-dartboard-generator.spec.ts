import SquareDartboardGenerator from "./square-dartboard-generator";

describe("SquareDartboardGenerator()", () => {
  it("should throw an exception for n <= 0", () => {
    const exception = () => SquareDartboardGenerator.generate(0);

    expect(exception).toThrowError();
  });

  it.each([
    { n: 1, expected: [[1]] },
    {
      n: 2,
      expected: [
        [1, 1],
        [1, 1],
      ],
    },
    {
      n: 3,
      expected: [
        [1, 1, 1],
        [1, 2, 1],
        [1, 1, 1],
      ],
    },
    {
      n: 4,
      expected: [
        [1, 1, 1, 1],
        [1, 2, 2, 1],
        [1, 2, 2, 1],
        [1, 1, 1, 1],
      ],
    },
    {
      n: 5,
      expected: [
        [1, 1, 1, 1, 1],
        [1, 2, 2, 2, 1],
        [1, 2, 3, 2, 1],
        [1, 2, 2, 2, 1],
        [1, 1, 1, 1, 1],
      ],
    },
    {
      n: 6,
      expected: [
        [1, 1, 1, 1, 1, 1],
        [1, 2, 2, 2, 2, 1],
        [1, 2, 3, 3, 2, 1],
        [1, 2, 3, 3, 2, 1],
        [1, 2, 2, 2, 2, 1],
        [1, 1, 1, 1, 1, 1],
      ],
    },
    {
      n: 7,
      expected: [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 2, 2, 2, 2, 2, 1],
        [1, 2, 3, 3, 3, 2, 1],
        [1, 2, 3, 4, 3, 2, 1],
        [1, 2, 3, 3, 3, 2, 1],
        [1, 2, 2, 2, 2, 2, 1],
        [1, 1, 1, 1, 1, 1, 1],
      ],
    },
    {
      n: 8,
      expected: [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 3, 3, 3, 3, 2, 1],
        [1, 2, 3, 4, 4, 3, 2, 1],
        [1, 2, 3, 4, 4, 3, 2, 1],
        [1, 2, 3, 3, 3, 3, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
      ],
    },
  ])(
    "should return a valid $n x $n board when generating a board of size $n",
    ({ n, expected }) => {
      expect(SquareDartboardGenerator.generate(n)).toStrictEqual(expected);
    }
  );
});
