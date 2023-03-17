export default class ScrollCharacter {
  private readonly character: string;
  private readonly modifiers: Modifiers;

  constructor(
    character: string,
    modifiers: Modifiers = { bold: false, underlined: false, colours: [] }
  ) {
    this.character = character;
    this.modifiers = modifiers;
  }

  public toString() {
    const boldApplied = this.applyBold(this.character);
    const underlineApplied = this.applyUnderline(boldApplied);
    const colourApplied = this.applyColour(underlineApplied);

    return colourApplied;
  }

  private applyBold(result: string): string {
    return this.modifiers.bold ? `<b>${result}</b>` : result;
  }

  private applyUnderline(result: string): string {
    return this.modifiers.underlined ? `<u>${result}</u>` : result;
  }

  private applyColour(result: string): string {
    return this.modifiers.colours.length !== 0
      ? `<span className="text-[${this.modifiers.colours[0]}]">${result}</span>`
      : result;
  }
}
