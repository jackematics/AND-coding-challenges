export type ValidationResultData = {
  isValid: boolean;
  message: string;
};

export default class ValidationResult {
  private static readonly duplicateMessage =
    'Error: duplicate destinations invalid';

  private static readonly chronologicallyDisorderedMessage =
    'Error: itinerary must be in chronological order';

  public static duplicateDestinationResult() {
    return { isValid: false, message: this.duplicateMessage };
  }

  public static chronilogicallyDisorderedResult() {
    return {
      isValid: false,
      message: this.chronologicallyDisorderedMessage,
    };
  }

  public static validResult() {
    return {
      isValid: true,
      message: '',
    };
  }
}
