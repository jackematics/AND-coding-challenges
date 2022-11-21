import { useState } from 'react';
import { DestinationData } from './Itinerary';

type EstablishedDestinationProps = {
  destinationData: DestinationData;
  deleteDestinationCallback: (destinationData: DestinationData) => void;
};

const EstablishedDestination = ({
  destinationData,
  deleteDestinationCallback,
}: EstablishedDestinationProps) => {
  return (
    <>
      <div className="flex">
        <div className="p-1">
          <input
            type="text"
            className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
            value={destinationData.destination}
            readOnly={true}
          />
        </div>
        <div className="p-1">
          <input
            type="time"
            className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
            value={destinationData.eta}
            readOnly={true}
          />
        </div>
        <div className="pt-2">
          <label>GMT</label>
        </div>
        <div className="p-2">
          <button
            onClick={() => deleteDestinationCallback(destinationData)}
            className="bg-gray-50 border border-black text-gray-900 text-l font-bold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-7 h-7"
          >
            x
          </button>
        </div>
      </div>
    </>
  );
};

export default EstablishedDestination;
