import CircularDartboardGenerator from './circular-dartboard-generator';

describe('CircularDartboardGenerator()', () => {
  const _ = null;

  it('should throw an exception for n <= 0', () => {
    const exception = () => CircularDartboardGenerator.generate(0);

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
        [_, 1, _],
        [1, 2, 1],
        [_, 1, _],
      ],
    },
    {
      n: 4,
      expected: [
        [_, 1, 1, _],
        [1, 2, 2, 1],
        [1, 2, 2, 1],
        [_, 1, 1, _],
      ],
    },
    {
      n: 5,
      expected: [
        [_, _, 1, _, _],
        [_, 1, 2, 1, _],
        [1, 2, 3, 2, 1],
        [_, 1, 2, 1, _],
        [_, _, 1, _, _],
      ],
    },
    {
      n: 6,
      expected: [
        [_, _, 1, 1, _, _],
        [_, 1, 2, 2, 1, _],
        [1, 2, 3, 3, 2, 1],
        [1, 2, 3, 3, 2, 1],
        [_, 1, 2, 2, 1, _],
        [_, _, 1, 1, _, _],
      ],
    },
    {
      n: 7,
      expected: [
        [_, _, _, 1, _, _, _],
        [_, _, 1, 2, 1, _, _],
        [_, 1, 2, 3, 2, 1, _],
        [1, 2, 3, 4, 3, 2, 1],
        [_, 1, 2, 3, 2, 1, _],
        [_, _, 1, 2, 1, _, _],
        [_, _, _, 1, _, _, _],
      ],
    },
    {
      n: 8,
      expected: [
        [_, _, _, 1, 1, _, _, _],
        [_, _, 1, 2, 2, 1, _, _],
        [_, 1, 2, 3, 3, 2, 1, _],
        [1, 2, 3, 4, 4, 3, 2, 1],
        [1, 2, 3, 4, 4, 3, 2, 1],
        [_, 1, 2, 3, 3, 2, 1, _],
        [_, _, 1, 2, 2, 1, _, _],
        [_, _, _, 1, 1, _, _, _],
      ],
    },
  ])(
    'should return a valid $n x $n circular board when generating a board of size $n',
    ({ n, expected }) => {
      expect(CircularDartboardGenerator.generate(n)).toStrictEqual(expected);
    }
  );
});
