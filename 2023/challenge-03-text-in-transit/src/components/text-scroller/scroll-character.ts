export default class ScrollCharacter {
  private readonly character: string;
  private readonly modifiers: Modifiers;

  constructor(
    character: string,
    modifiers: Modifiers = { bold: false, underlined: false }
  ) {
    this.character = character;
    this.modifiers = modifiers;
  }

  public toString() {
    let result = this.character;
    if (this.modifiers.bold) {
      result = this.applyBold(result);
    }

    if (this.modifiers.underlined) {
      result = this.applyUnderline(result);
    }

    return result;
  }

  private applyBold(result: string): string {
    return `<b>${result}</b>`;
  }

  private applyUnderline(result: string): string {
    return `<u>${result}</u>`;
  }
}
