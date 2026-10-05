import React from "react";

const BusList = ({ buses, onSelect, onEdit }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="space-y-6">
      {buses.map((bus) => {
        const isSoldOut = bus.totalSeats === 0;
        const fewSeatsLeft = bus.totalSeats > 0 && bus.totalSeats <= 5;

        return (
          <div
            key={bus.id}
            className={`group bg-white p-6 rounded-2xl border
              flex flex-col md:flex-row md:items-center md:justify-between
              transition-all duration-300
              ${
                isSoldOut
                  ? "opacity-60 cursor-not-allowed"
                  : "hover:shadow-2xl hover:-translate-y-1"
              }`}
          >
            {/* 🚌 BUS DETAILS */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition">
                  {bus.name}
                </h3>

                <span className="bg-green-100 text-green-700 px-2 py-1 text-sm rounded-full font-semibold">
                  ⭐ {bus.rating || "4.5"}
                </span>
              </div>

              <p className="text-gray-600 font-medium">
                {bus.source} <span className="mx-1">→</span> {bus.destination}
              </p>

              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <span>🕒 {bus.time}</span>
                <span>💺 {bus.totalSeats} seats</span>

                <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium">
                  🚌 {bus.type}
                </span>
              </div>

              {/* SEAT STATUS */}
              {isSoldOut ? (
                <span className="text-red-600 font-semibold text-sm">
                  ❌ Sold Out
                </span>
              ) : fewSeatsLeft ? (
                <span className="text-orange-600 font-semibold text-sm animate-pulse">
                  ⚠ Few seats left!
                </span>
              ) : (
                <span className="text-green-600 font-semibold text-sm">
                  ✅ Seats Available
                </span>
              )}
            </div>

            {/* 💰 PRICE + ACTION */}
            <div className="mt-6 md:mt-0 flex flex-col items-end gap-3">
              <p className="text-2xl font-extrabold text-green-600">
                ₹{bus.price}
              </p>

              {/* 👤 USER ACTION */}
              {user?.role === "user" && (
                <button
                  disabled={isSoldOut}
                  onClick={() => !isSoldOut && onSelect(bus)}
                  className={`px-8 py-2 rounded-xl font-semibold
                    transition-all duration-300
                    ${
                      isSoldOut
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg active:scale-95"
                    }`}
                >
                  Select Seats
                </button>
              )}

              {/* 🛠 ADMIN ACTION */}
              {user?.role === "admin" && (
                <button
                  onClick={() => onEdit?.(bus)}
                  className="px-8 py-2 rounded-xl font-semibold
                             bg-yellow-500 text-white hover:bg-yellow-600
                             hover:shadow-lg transition active:scale-95"
                >
                  Edit Bus
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BusList;
