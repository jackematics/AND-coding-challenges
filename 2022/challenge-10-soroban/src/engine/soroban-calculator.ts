export default class SorobanCalculator {
  static calculate(input: string[]): number {
    const formatted = this.format(input);
    let result = '';
    formatted.forEach((wire) => {
      result += this.calculateWire(wire);
    });

    return parseInt(result);
  }

  static format(input: string[]): string[] {
    const result = [];

    for (let i = 0; i < input[0].length; i++) {
      let row = '';

      for (let j = 0; j < input.length; j++) {
        row += input[j].charAt(i);
      }

      result.push(row);
    }

    return result;
  }

  static calculateWire(input: string): string {
    const decks = input.split('-');

    return (
      this.calculateUpperDeck(decks[0]) + this.calculateLowerDeck(decks[1])
    ).toString();
  }

  static calculateUpperDeck(input: string): number {
    return input === '|O' ? 5 : 0;
  }

  static calculateLowerDeck(input: string): number {
    return input.indexOf('|');
  }
}
