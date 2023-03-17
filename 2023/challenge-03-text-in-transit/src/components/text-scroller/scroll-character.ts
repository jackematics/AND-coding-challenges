export default class ScrollCharacter {
  private readonly character: string;
  private readonly modifiers: Modifiers;

  constructor(character: string, modifiers: Modifiers = { bold: false }) {
    this.character = character;
    this.modifiers = modifiers;
  }

  public toString() {
    let result = this.character;
    if (this.modifiers.bold) {
      result = this.applyBold(result);
    }

    return result;
  }

  private applyBold(result: string): string {
    return `<b>${result}</b>`;
  }
}
