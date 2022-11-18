const Itinerary = () => {
  return (
    <>
      <div className="flex-col">
        <div className="flex">
          <div className="p-1 basis-1/2">
            <label className="bg-yellow-300 text-gray-900 text-sm text-center rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1">
              Destination
            </label>
          </div>
          <div className="p-1 pl-2 basis-1/3">
            <label className="bg-yellow-300 text-gray-900 text-sm text-center rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1">
              Time
            </label>
          </div>
        </div>
        <div className="flex">
          <div className="p-1">
            <input
              type="text"
              className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
              placeholder="London"
            />
          </div>
          <div className="p-1">
            <input
              type="time"
              className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
              defaultValue="00:00"
            />
          </div>
          <div className="pt-2">
            <label>GMT</label>
          </div>
          <div className="p-2">
            <button className="bg-gray-50 border border-black text-gray-900 text-l font-bold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-7 h-7">
              +
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Itinerary;
