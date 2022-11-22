const ItineraryHeadings = () => {
  return (
    <>
      <div className="flex">
        <div className="p-1 basis-1/2">
          <label className="bg-yellow-300 text-gray-900 text-sm text-center rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 pb-3 pt-3">
            Destination
          </label>
        </div>
        <div className="p-1 pl-2 basis-1/3">
          <label className="bg-yellow-300 text-gray-900 text-sm text-center rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1">
            Time
            <p className="text-xs">(20:00 - 07:59)</p>
          </label>
        </div>
      </div>
    </>
  );
};

export default ItineraryHeadings;
