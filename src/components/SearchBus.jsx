import React from "react";
import Bus from "../assets/Bus1.jpg";

const SearchBus = ({
  source,
  destination,
  travelDate, 
  setSource,
  setDestination,
  setTravelDate,
  onSearch,
  showFilters,
}) => {
  const swapLocations = () => {
    setSource(destination);
    setDestination(source);
  };

  return (
    <div
      className="relative w-full h-[calc(100vh-8rem)] bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${Bus})` }}
    >
      <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/60"></div>

      {/* Search form */}
      <div className="relative z-10 w-full max-w-xl px-6 flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-8 drop-shadow-lg">
          Find Your Bus
        </h2>

        <div className="flex flex-col gap-4 md:gap-6 w-full">
          <input
            type="text"
            placeholder="From"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="w-full px-5 py-3 rounded-xl bg-white/20 text-white placeholder-white focus:ring-2 focus:ring-blue-400 focus:outline-none  transition"
          />
          <input
            type="text"
            placeholder="To"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full px-5 py-3 rounded-xl bg-white/20 text-white placeholder-white focus:ring-2 focus:ring-blue-400 focus:outline-none  transition"
          />
          <input
            type="date"
            value={travelDate}
            onChange={(e) => setTravelDate(e.target.value)}
            className="w-full px-5 py-3 rounded-xl bg-white/20 text-white placeholder-white focus:ring-2 focus:ring-blue-400 focus:outline-none  transition"
          />
          <button
            onClick={onSearch}
            className="bg-blue-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300"
          >
            Search Buses
          </button>
        </div>

        <div className="flex justify-center mt-4">
          <button
            onClick={swapLocations}
            className="text-sm text-white hover:text-blue-300 hover:underline transition"
          >
            ⇄ Swap From & To
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SearchBus);
