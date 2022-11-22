export type ValidationResultData = {
  isValid: boolean;
  message: string;
};

export default class ValidationResult {
  private static readonly duplicateMessage =
    'Error: duplicate destinations invalid';

  private static readonly chronologicallyDisorderedMessage =
    'Error: itinerary must be in chronological order';

  private static readonly destinationEtaOutOfBoundsMessage =
    'Error: destination ETA out of bounds';

  public static duplicateDestinationResult(): ValidationResultData {
    return { isValid: false, message: this.duplicateMessage };
  }

  public static chronilogicallyDisorderedResult(): ValidationResultData {
    return {
      isValid: false,
      message: this.chronologicallyDisorderedMessage,
    };
  }

  public static destinationEtaOutOfBoundsResult(): ValidationResultData {
    return {
      isValid: false,
      message: this.destinationEtaOutOfBoundsMessage,
    };
  }

  public static validResult(): ValidationResultData {
    return {
      isValid: true,
      message: '',
    };
  }
}
