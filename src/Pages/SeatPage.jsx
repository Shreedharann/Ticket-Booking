import React, { useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SeatSelection from "../components/SeatSelection";
import BookingSummary from "../components/BookingSummary";

const SeatPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔐 Logged-in user check
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return <Navigate to="/login" />;

  // ❌ Admin cannot book seats
  if (user.role === "admin") return <Navigate to="/" />;

  // 🚌 Bus data from previous page
  const { bus } = location.state || {};
  const [selectedSeats, setSelectedSeats] = useState([]);

  if (!bus) return <Navigate to="/buses" />;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar user={user} />

      <main className="grow p-6 max-w-5xl mx-auto w-full">
        <SeatSelection
          bus={bus}
          selectedSeats={selectedSeats}
          setSelectedSeats={setSelectedSeats}
        />

        <div className="bg-white p-6 rounded-2xl shadow-lg mt-6">
          <BookingSummary bus={bus} seats={selectedSeats} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SeatPage;
