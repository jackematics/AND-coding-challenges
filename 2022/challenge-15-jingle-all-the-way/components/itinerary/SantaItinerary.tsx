import { useState } from 'react';
import { CityGpsData } from '../../types/city-data';
import AddedDestination from './AddedDestination';
import ItineraryHeadings from './ItineraryHeadings';
import NewDestination from './NewDestination';
import ItineraryValidation from './utils/itinerary-validation';

export type DestinationData = {
  destination: string;
  eta: string;
};

type SantaItineraryProps = {
  cityData: CityGpsData[];
  itineraryCallback: (itinerary: DestinationData[]) => void;
};

const SantaItinerary = ({
  cityData,
  itineraryCallback,
}: SantaItineraryProps) => {
  const [itinerary, setItinerary] = useState<DestinationData[]>([]);
  const [validationMessage, setValidationMessage] = useState<string>('');

  const formatDestinationData = (
    destinationData: DestinationData
  ): DestinationData => {
    const formatted = destinationData.destination
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.toLowerCase().slice(1))
      .join(' ');

    return {
      ...destinationData,
      destination: formatted,
    };
  };

  const handleNewDestination = (destinationData: DestinationData) => {
    const formattedDestinationData = formatDestinationData(destinationData);
    const validationResult = ItineraryValidation.calculateValidationResult({
      destinationData: formattedDestinationData,
      itinerary,
      cityData,
    });
    setValidationMessage(validationResult.message);

    if (validationResult.isValid) {
      const updatedItinerary = [...itinerary, formattedDestinationData];

      itineraryCallback(updatedItinerary);
      setItinerary(updatedItinerary);
    }
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
          <AddedDestination
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

export default SantaItinerary;
