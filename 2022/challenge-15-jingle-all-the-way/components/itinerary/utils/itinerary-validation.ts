import { DestinationData } from '../Itinerary';
import ValidationResult, { ValidationResultData } from './validation-results';

type ValidationData = {
  destinationData: DestinationData;
  itinerary: DestinationData[];
};

export default class ItineraryValidation {
  public static calculateValidationResult(
    validationData: ValidationData
  ): ValidationResultData {
    if (this.isDuplicateDestination(validationData))
      return ValidationResult.duplicateDestinationResult();

    if (this.populatedAndChronologicallyDisordered(validationData))
      return ValidationResult.chronilogicallyDisorderedResult();

    if (this.destinationEtaOutOfBounds(validationData))
      return ValidationResult.destinationEtaOutOfBoundsResult();

    return ValidationResult.validResult();

    // // prettier-ignore
    // return (
    //   this.isDuplicateDestination(validationData)                ? ValidationResult.duplicateDestinationResult()      :
    //   this.populatedAndChronologicallyDisordered(validationData) ? ValidationResult.chronilogicallyDisorderedResult() :
    //   this.destinationEtaOutOfBounds(validationData)             ? ValidationResult.destinationEtaOutOfBoundsResult() :
    //                                                                ValidationResult.validResult()
    // )
  }

  private static isDuplicateDestination(
    validationData: ValidationData
  ): boolean {
    return Boolean(
      validationData.itinerary.find(
        (destinationData) =>
          destinationData.destination ===
          validationData.destinationData.destination
      )
    );
  }

  private static populatedAndChronologicallyDisordered(
    validationData: ValidationData
  ) {
    return (
      validationData.itinerary.length > 0 &&
      this.chronologicallyDisordered(
        validationData.destinationData.eta,
        validationData.itinerary
      )
    );
  }

  private static chronologicallyDisordered(
    nextEta: string,
    itinerary: DestinationData[]
  ): boolean {
    const nextEtaDate = this.etaAsDate(nextEta);
    const previousEtaDate = this.etaAsDate(itinerary[itinerary.length - 1].eta);

    return nextEtaDate.getTime() <= previousEtaDate.getTime();
  }

  private static etaAsDate = (eta: string): Date => {
    const isAfterMidnight = (gmt: string) => {
      const hour = parseInt(gmt.split(':')[0]);
      return 0 <= hour && hour < 8;
    };

    const etaDay = isAfterMidnight(eta) ? '25' : '24';

    return new Date(`2022-12-${etaDay}T${eta}:00`);
  };

  private static destinationEtaOutOfBounds(validationData: ValidationData) {
    const hour = parseInt(validationData.destinationData.eta.split(':')[0]);

    return 8 <= hour && hour < 20;
  }
}
