import { DestinationData } from '../Itinerary';

type ValidationResult = {
  isValid: boolean;
  message: string;
};

export default class ItineraryValidation {
  public static calculateValidationResult(
    newDestinationData: DestinationData,
    itinerary: DestinationData[]
  ): ValidationResult {
    if (this.isDuplicateDestination(newDestinationData.destination, itinerary))
      return {
        isValid: false,
        message: 'Error: duplicate destinations invalid',
      };

    if (
      itinerary.length > 0 &&
      this.notChronological(newDestinationData.eta, itinerary)
    )
      return {
        isValid: false,
        message: 'Error: itinerary must be in chronological order',
      };

    return { isValid: true, message: '' };
  }

  private static isDuplicateDestination(
    potentialDuplicate: string,
    itinerary: DestinationData[]
  ): boolean {
    return Boolean(
      itinerary.find(
        (destinationData) => destinationData.destination === potentialDuplicate
      )
    );
  }

  private static notChronological(
    nextEta: string,
    itinerary: DestinationData[]
  ): boolean {
    const nextEtaDate = this.etaAsDate(nextEta);
    const previousEtaDate = this.etaAsDate(itinerary[itinerary.length - 1].eta);

    return nextEtaDate.getTime() < previousEtaDate.getTime();
  }

  private static etaAsDate = (eta: string): Date => {
    const isAfterMidnight = (gmt: string) => {
      const hour = parseInt(gmt.split(':')[0]);
      return 0 <= hour && hour < 8;
    };

    const etaDay = isAfterMidnight(eta) ? '25' : '24';

    return new Date(`2022-12-${etaDay}T${eta}:00`);
  };
}
