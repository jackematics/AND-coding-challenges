import { useState } from 'react';
import CityData from '../../types/city-data';
import EstablishedDestination from './EstablishedDestination';
import ItineraryHeadings from './ItineraryHeadings';
import NewDestination from './NewDestination';
import ItineraryValidation from './utils/itinerary-validation';

export type DestinationData = {
  destination: string;
  eta: string;
};

type ItineraryProps = {
  cityData: CityData[];
};

const Itinerary = ({ cityData }: ItineraryProps) => {
  const [itinerary, setItinerary] = useState<DestinationData[]>([]);
  const [validationMessage, setValidationMessage] = useState<string>('');

  const formatDestinationData = (
    destinationData: DestinationData
  ): DestinationData => {
    return {
      ...destinationData,
      destination:
        destinationData.destination.charAt(0).toUpperCase() +
        destinationData.destination.toLowerCase().slice(1),
    };
  };

  const handleNewDestination = (destinationData: DestinationData) => {
    const validationResult = ItineraryValidation.calculateValidationResult({
      destinationData,
      itinerary,
      cityData,
    });
    setValidationMessage(validationResult.message);

    if (validationResult.isValid) {
      setItinerary([...itinerary, formatDestinationData(destinationData)]);
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
