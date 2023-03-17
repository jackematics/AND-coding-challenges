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
    const boldApplied = this.applyBold(this.character);
    const underlineApplied = this.applyUnderline(boldApplied);

    return underlineApplied;
  }

  private applyBold(result: string): string {
    return this.modifiers.bold ? `<b>${result}</b>` : result;
  }

  private applyUnderline(result: string): string {
    return this.modifiers.underlined ? `<u>${result}</u>` : result;
  }
}
