export type ValidationResultData = {
  isValid: boolean;
  message: string;
};

export default class ValidationResult {
  public static readonly duplicateDestinationResult: ValidationResultData = {
    isValid: false,
    message: 'Error: duplicate destinations invalid',
  };

  public static readonly cityNotAvailableResult: ValidationResultData = {
    isValid: false,
    message: 'Error: invalid city',
  };

  public static readonly chronilogicallyDisorderedResult: ValidationResultData =
    {
      isValid: false,
      message: 'Error: itinerary must be in chronological order',
    };

  public static readonly destinationEtaOutOfBoundsResult: ValidationResultData =
    {
      isValid: false,
      message: 'Error: destination ETA out of bounds',
    };

  public static readonly validResult: ValidationResultData = {
    isValid: true,
    message: '',
  };
}
