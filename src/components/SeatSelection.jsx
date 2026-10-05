import React from "react";
import { FaBus, FaStar } from "react-icons/fa";

const SeatSelection = ({ bus, selectedSeats, setSelectedSeats }) => {
  if (!bus) return null;

  // ✅ DYNAMIC booked seats from backend
  const bookedSeats = bus.bookedSeats || [];

  // ✅ Generate seats dynamically
  const seats = Array.from({ length: bus.totalSeats }, (_, i) => {
    const id = `S${i + 1}`;
    return {
      id,
      booked: bookedSeats.includes(id),
    };
  });

  const toggleSeat = (seatId, isBooked) => {
    if (isBooked) return;

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : [...prev, seatId]
    );
  };

  const isSleeper = bus.type?.toLowerCase().includes("sleeper");

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold">{bus.name}</h2>
          <p className="text-sm text-gray-500">{bus.type}</p>
          <div className="flex items-center gap-1 text-yellow-500 text-sm mt-1">
            <FaStar /> {bus.rating || "4.5"}
          </div>
        </div>

        {/* DRIVER */}
        <div className="flex flex-col items-center text-gray-500">
          <FaBus className="text-3xl" />
          <span className="text-xs">Driver</span>
        </div>
      </div>

      {/* SEAT GRID */}
      <div className="flex justify-center">
        <div
          className={`grid ${
            isSleeper ? "grid-cols-4" : "grid-cols-5"
          } gap-4`}
        >
          {seats.map((seat, index) => {
            const isSelected = selectedSeats.includes(seat.id);

            // 🧠 aisle gap after every 2 seats (real bus feel)
            const showAisle =
              !isSleeper && index % 4 === 2;

            return (
              <React.Fragment key={seat.id}>
                {showAisle && <div className="w-6"></div>}

                <button
                  disabled={seat.booked}
                  onClick={() =>
                    toggleSeat(seat.id, seat.booked)
                  }
                  className={`
                    ${
                      isSleeper ? "w-20 h-10" : "w-10 h-10"
                    }
                    rounded-lg text-xs font-semibold transition-all
                    ${
                      seat.booked
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : isSelected
                        ? "bg-green-500 text-white"
                        : "bg-white border border-gray-300 hover:border-blue-500 hover:bg-blue-50"
                    }
                  `}
                >
                  {seat.id}
                </button>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* LEGEND */}
      <div className="flex justify-center gap-8 mt-8 text-sm">
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 bg-gray-200 rounded"></span> Booked
        </span>
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 border border-gray-400 rounded"></span>{" "}
          Available
        </span>
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 bg-green-500 rounded"></span>{" "}
          Selected
        </span>
      </div>
    </div>
  );
};

export default SeatSelection;
