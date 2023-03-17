export default class TextScrollerOperations {
  public static initialiseOffScreenText(text: string): string[] {
    return text.split('');
  }

  public static scrollLeft(scrollLeftArray: string[], storageArray: string[]) {
    return scrollLeftArray.slice(1).concat([storageArray[0]]);
  }
}
