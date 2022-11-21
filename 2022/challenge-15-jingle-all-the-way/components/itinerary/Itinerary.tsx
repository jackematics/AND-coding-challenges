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

  return (
    <>
      <div className="flex-col">
        <ItineraryHeadings />
        {itinerary.map((destination: DestinationData) => (
          <EstablishedDestination
            key={destination.destination}
            destinationData={destination}
          />
        ))}
        <NewDestination destinationDataCallback={handleNewDestination} />
      </div>
    </>
  );
};

export default Itinerary;
