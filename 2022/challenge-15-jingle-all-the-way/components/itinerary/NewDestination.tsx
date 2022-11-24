import { useState } from 'react';
import { DestinationData } from './SantaItinerary';

type NewDestinationProps = {
  destinationDataCallback: (destinationData: DestinationData) => void;
};

const NewDestination = ({ destinationDataCallback }: NewDestinationProps) => {
  const [destination, setDestination] = useState<string>('');
  const [eta, setEta] = useState<string>('20:00');

  const handleAddDestination = async () => {
    destinationDataCallback({ destination, eta });
    setDestination('');
    setEta('20:00');
  };

  return (
    <>
      <div className="flex">
        <div className="p-1">
          <input
            type="text"
            className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
            value={destination}
            onChange={(e) => setDestination(e.currentTarget.value)}
            placeholder="London"
          />
        </div>
        <div className="p-1">
          <input
            type="time"
            className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
            value={eta}
            onChange={(e) => setEta(e.currentTarget.value)}
          />
        </div>
        <div className="pt-2">
          <label>GMT</label>
        </div>
        <div className="p-2">
          <button
            onClick={handleAddDestination}
            className="bg-gray-50 border border-black text-gray-900 text-l font-bold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-7 h-7"
          >
            +
          </button>
        </div>
      </div>
    </>
  );
};

export default NewDestination;
