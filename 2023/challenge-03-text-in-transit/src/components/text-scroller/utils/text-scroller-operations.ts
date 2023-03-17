import ScrollCharacter from '../scroll-character';

export default class TextScrollerOperations {
  public static initialiseScrollCharacters(text: string): ScrollCharacter[] {
    let modifiers = {
      bold: false,
      underlined: false,
      colours: [],
    };
    return this.processIntoScrollCharacterArray(text, modifiers, []);
  }

  private static processIntoScrollCharacterArray(
    text: string,
    modifiers: Modifiers,
    result: ScrollCharacter[]
  ): ScrollCharacter[] {
    if (text.length === 0) {
      return result;
    }

    const nextModifierStart = text.indexOf('[');
    const nextModifierEnd = text.indexOf(']') + 1;

    if (nextModifierStart !== 0) {
      result.push(new ScrollCharacter(text[0], modifiers));

      return this.processIntoScrollCharacterArray(
        text.slice(1),
        modifiers,
        result
      );
    }

    const nextModifier = text.slice(nextModifierStart, nextModifierEnd);
    const updatedModifiers = this.updateModifiers(modifiers, nextModifier);

    return this.processIntoScrollCharacterArray(
      text.slice(nextModifierEnd),
      updatedModifiers,
      result
    );
  }

  private static updateModifiers(
    modifiers: Modifiers,
    nextModifier: string
  ): Modifiers {
    let modifier = nextModifier;
    let colour;
    if (modifier.includes('[C')) {
      colour = this.extractColour(modifier);
      modifier = '[C]';
    }

    const updatedModifiers = {
      '[B]': { ...modifiers, bold: true },
      '[/B]': { ...modifiers, bold: false },
      '[U]': { ...modifiers, underlined: true },
      '[/U]': { ...modifiers, underlined: false },
      '[C]': {
        ...modifiers,
        colours: [colour, ...modifiers.colours],
      },
      '[/C]': { ...modifiers, colours: modifiers.colours.slice(1) },
    }[modifier] as Modifiers;

    if (!updatedModifiers) {
      throw new Error('invalid modifier');
    }

    return updatedModifiers;
  }

  private static extractColour(modifier: string) {
    const hexCodeLength = 7;
    return modifier.split(':')[1].slice(0, hexCodeLength);
  }

  public static scrollLeft(
    scrollLeftArray: ScrollCharacter[],
    storageArray: ScrollCharacter[]
  ) {
    return scrollLeftArray.slice(1).concat([storageArray[0]]);
  }

  public static convertToString(scrollCharacters: ScrollCharacter[]): string {
    return scrollCharacters.map((char) => char.toString()).join('');
  }
}
