import React from "react";
import { useNavigate } from "react-router-dom";

const BookingSummary = ({ bus, seats }) => {
  const navigate = useNavigate();

  if (!bus) return null;

  const handleProceed = () => {
    if (seats.length === 0) return;

    navigate("/passenger", {
      state: { bus, seats }
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg mt-6">
      <h2 className="text-2xl font-bold mb-4">Booking Summary</h2>

      <p><b>Bus:</b> {bus.name}</p>
      <p><b>Route:</b> {bus.source} → {bus.destination}</p>
      <p><b>Seats:</b> {seats.join(", ")}</p>

      <div className="flex justify-between items-center mt-6">
        <p className="text-xl font-bold text-green-600">
          Total: ₹{seats.length * bus.price}
        </p>

        <button
          onClick={handleProceed}
          disabled={seats.length === 0}
          className={`px-6 py-3 rounded-lg font-semibold transition
            ${
              seats.length === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700"
            }
          `}
        >
          Confirm 
        </button>
      </div>
    </div>
  );
};

export default BookingSummary;
