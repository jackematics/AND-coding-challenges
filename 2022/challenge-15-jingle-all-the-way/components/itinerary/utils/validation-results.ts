export type ValidationResultData = {
  isValid: boolean;
  message: string;
};

export default class ValidationResult {
  public static duplicateDestinationResult: ValidationResultData = {
    isValid: false,
    message: 'Error: duplicate destinations invalid',
  };

  public static cityNotAvailableResult: ValidationResultData = {
    isValid: false,
    message: 'Error: invalid city',
  };

  public static chronilogicallyDisorderedResult: ValidationResultData = {
    isValid: false,
    message: 'Error: itinerary must be in chronological order',
  };

  public static destinationEtaOutOfBoundsResult: ValidationResultData = {
    isValid: false,
    message: 'Error: destination ETA out of bounds',
  };

  public static validResult: ValidationResultData = {
    isValid: true,
    message: '',
  };
}
