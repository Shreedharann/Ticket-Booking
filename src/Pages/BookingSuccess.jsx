import React from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";

const BookingSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center w-full max-w-md">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Booking Successful 🎉
        </h1>

        <p className="text-gray-700 mb-2">
          <b>Bus:</b> {state.busName}
        </p>

        <p className="text-gray-700 mb-2">
          <b>Route:</b> {state.route}
        </p>

        <p className="text-gray-700 mb-2">
          <b>Passenger:</b> {state.passengerName}
        </p>

        <p className="text-gray-700 mb-2">
          <b>Seats:</b> {state.seats.join(", ")}
        </p>

        <p className="text-gray-900 font-bold mb-6">
          Total Paid: ₹{state.totalPrice}
        </p>

        <button
          onClick={() => navigate("/bookings")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          View My Bookings
        </button>
      </div>
    </div>
  );
};

export default BookingSuccess;
