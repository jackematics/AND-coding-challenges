import ScrollCharacter from '../scroll-character';

type ModifierResult = {
  modifier: string;
  colour?: string;
};

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

    return text.indexOf('[') === 0
      ? this.handleSpecialCharacters(text, modifiers, result)
      : this.processIntoScrollCharacterArray(text.slice(1), modifiers, [
          ...result,
          new ScrollCharacter(text[0], modifiers),
        ]);
  }

  private static handleSpecialCharacters(
    text: string,
    modifiers: Modifiers,
    result: ScrollCharacter[]
  ) {
    const nextModifierStart = text.indexOf('[');
    const nextModifierEnd = text.indexOf(']') + 1;

    const modifierResult = this.processModifier(
      text.slice(nextModifierStart, nextModifierEnd)
    );
    const updatedModifiers = this.updateModifiers(modifiers, modifierResult);

    return this.processIntoScrollCharacterArray(
      text.slice(nextModifierEnd),
      updatedModifiers,
      result
    );
  }

  private static updateModifiers(
    modifiers: Modifiers,
    modifierResult: ModifierResult
  ): Modifiers {
    const updatedModifiers = {
      '[B]': { ...modifiers, bold: true },
      '[/B]': { ...modifiers, bold: false },
      '[U]': { ...modifiers, underlined: true },
      '[/U]': { ...modifiers, underlined: false },
      '[C]': {
        ...modifiers,
        colours: [modifierResult.colour, ...modifiers.colours],
      },
      '[/C]': { ...modifiers, colours: modifiers.colours.slice(1) },
    }[modifierResult.modifier] as Modifiers;

    if (!updatedModifiers) {
      throw new Error('invalid modifier');
    }

    return updatedModifiers;
  }

  private static processModifier(modifier: string): ModifierResult {
    if (modifier.includes('[C')) {
      return {
        modifier: '[C]',
        colour: this.extractColour(modifier),
      };
    }

    return { modifier };
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
