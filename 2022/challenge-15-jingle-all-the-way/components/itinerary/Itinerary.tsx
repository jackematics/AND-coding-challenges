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

  const handleNewDestination = (destinationData: DestinationData) => {
    setItinerary([...itinerary, destinationData]);
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
      </div>
    </>
  );
};

export default Itinerary;
