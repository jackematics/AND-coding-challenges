import SorobanCalculator from './soroban-calculator';

describe('SorobanCalculator', () => {
  describe('calculate()', () => {
    it.each([
      {
        input: [
          '||OO||O',
          'OO||OO|',
          '-------',
          'OO|OO||',
          'OOO|OOO',
          'OOOO|OO',
          '|OOOOOO',
          'O|OOOOO',
        ],
        result: 8901750,
      },
      {
        input: [
          'OOOO||O',
          '||||OO|',
          '-------',
          '||O|O|O',
          'OOOO|O|',
          'OOOOOOO',
          'OO|OOOO',
          'OOOOOOO',
        ],
        result: 30651,
      },
    ])('should return $result from $input', ({ input, result }) => {
      expect(SorobanCalculator.calculate(input)).toBe(result);
    });
  });

  describe('format()', () => {
    it('should output the soroban in a better format for performing operations', () => {
      const input = [
        '||OO||O',
        'OO||OO|',
        '-------',
        'OO|OO||',
        'OOO|OOO',
        'OOOO|OO',
        '|OOOOOO',
        'O|OOOOO',
      ];

      const result = [
        '|O-OOO|O',
        '|O-OOOO|',
        'O|-|OOOO',
        'O|-O|OOO',
        '|O-OO|OO',
        '|O-|OOOO',
        'O|-|OOOO',
      ];

      expect(SorobanCalculator.format(input)).toStrictEqual(result);
    });
  });

  describe('calculateWire()', () => {
    it.each([
      { input: '|O-OOO|O', result: '8' },
      { input: '|O-OOOO|', result: '9' },
      { input: 'O|-|OOOO', result: '0' },
      { input: 'O|-O|OOO', result: '1' },
      { input: '|O-OO|OO', result: '7' },
      { input: '|O-|OOOO', result: '5' },
      { input: 'O|-|OOOO', result: '0' },
    ])(
      'should return the sum of the bead values that are moved towards the deck divide',
      ({ input, result }) => {
        expect(SorobanCalculator.calculateWire(input)).toBe(result);
      }
    );
  });

  describe('calculateUpperDeckLine()', () => {
    it.each([
      { input: '|O', result: 5 },
      { input: 'O|', result: 0 },
    ])('should return $result from $input', ({ input, result }) => {
      expect(SorobanCalculator.calculateUpperDeck(input)).toBe(result);
    });
  });

  describe('calculateLowerDeckLine()', () => {
    it.each([
      { input: '|OOOO', result: 0 },
      { input: 'O|OOO', result: 1 },
      { input: 'OO|OO', result: 2 },
      { input: 'OOO|O', result: 3 },
      { input: 'OOOO|', result: 4 },
    ])('should return $result from $input', ({ input, result }) => {
      expect(SorobanCalculator.calculateLowerDeck(input)).toBe(result);
    });
  });
});
