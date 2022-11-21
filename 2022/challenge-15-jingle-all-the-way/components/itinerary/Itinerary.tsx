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

  const handleNewDestination = (destinationData: DestinationData) => {
    setValidationMessage('');

    if (isDuplicateDestination(destinationData.destination)) {
      setValidationMessage('Error: duplicate destinations invalid');
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
