const Itinerary = () => {
  return (
    <>
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
    </>
  );
};

export default Itinerary;
