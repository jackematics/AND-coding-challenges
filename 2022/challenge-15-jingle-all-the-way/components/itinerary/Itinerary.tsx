import { useState } from 'react';
import EstablishedDestination from './EstablishedDestination';
import ItineraryHeadings from './ItineraryHeadings';
import NewDestination from './NewDestination';

export type DestinationData = {
  destination: string;
  eta: string;
};

const Itinerary = () => {
  const [itinerary, setItinerary] = useState<DestinationData[]>([]);
  const [validationMessage, setValidationMessage] = useState<string>('');

  const isDuplicateDestination = (potentialDuplicate: string): boolean =>
    Boolean(
      itinerary.find(
        (destinationData) => destinationData.destination === potentialDuplicate
      )
    );

  const etaAsDate = (eta: string): Date => {
    const isAfterMidnight = (gmt: string) => {
      const hour = parseInt(gmt.split(':')[0]);
      return 0 <= hour && hour < 8;
    };

    const etaDay = isAfterMidnight(eta) ? '25' : '24';

    return new Date(`2022-12-${etaDay}T${eta}:00`);
  };

  const notChronological = (nextEta: string): boolean => {
    const nextEtaDate = etaAsDate(nextEta);
    const previousEtaDate = etaAsDate(itinerary[itinerary.length - 1].eta);

    return nextEtaDate.getTime() < previousEtaDate.getTime();
  };

  const handleNewDestination = (destinationData: DestinationData) => {
    setValidationMessage('');

    if (isDuplicateDestination(destinationData.destination)) {
      setValidationMessage('Error: duplicate destinations invalid');
      return;
    }

    if (itinerary.length > 0 && notChronological(destinationData.eta)) {
      setValidationMessage('Error: itinerary must be in chronological order');
      return;
    }

    const formattedData = {
      ...destinationData,
      destination:
        destinationData.destination.charAt(0).toUpperCase() +
        destinationData.destination.toLowerCase().slice(1),
    };

    setItinerary([...itinerary, formattedData]);
  };

  const handleDeleteDestination = (
    destinationDataToDelete: DestinationData
  ) => {
    setItinerary(() =>
      itinerary.filter(
        (destinationData) => destinationData !== destinationDataToDelete
      )
    );
  };

  return (
    <>
      <div className="flex-col">
        <ItineraryHeadings />
        {itinerary.map((destination: DestinationData) => (
          <EstablishedDestination
            key={destination.destination}
            destinationData={destination}
            deleteDestinationCallback={handleDeleteDestination}
          />
        ))}
        <NewDestination destinationDataCallback={handleNewDestination} />
        <label id="validation-message">{validationMessage}</label>
      </div>
    </>
  );
};

export default Itinerary;
