import React, { useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import toast from "react-hot-toast";

const PassengerDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // 🔐 Logged-in user
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return <Navigate to="/login" />;

  // ❌ No navigation state
  if (!state) return <Navigate to="/" />;

  // ❌ Admin cannot book tickets
  if (user.role === "admin") return <Navigate to="/" />;

  const { bus, seats } = state;
  if (!bus || !seats || seats.length === 0) return <Navigate to="/" />;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleConfirm = async () => {
    if (!name.trim() || phone.length !== 10) {
      toast.error("Enter valid passenger details");
      return;
    }

    try {
      // 1️⃣ Fetch latest bus data
      const busRes = await fetch(
        `http://localhost:3000/buses/${bus.id}`
      );
      const latestBus = await busRes.json();

      const alreadyBooked = latestBus.bookedSeats || [];

      // 2️⃣ Prevent double booking
      const seatConflict = seats.some((seat) =>
        alreadyBooked.includes(seat)
      );

      if (seatConflict) {
        toast.error("Some selected seats were already booked!");
        return;
      }

      // 3️⃣ Update booked seats in bus
      const updatedBookedSeats = [...alreadyBooked, ...seats];

      await fetch(`http://localhost:3000/buses/${bus.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookedSeats: updatedBookedSeats,
        }),
      });

      // 4️⃣ Save booking
      const booking = {
        busId: bus.id,
        busName: bus.name,
        source: bus.source,
        destination: bus.destination,
        route: `${bus.source} → ${bus.destination}`,
        seats,
        totalPrice: seats.length * bus.price,
        passengerName: name,
        phone,
        user: user.email,
        status: "CONFIRMED",
        createdAt: new Date().toISOString(),
      };

      await fetch("http://localhost:3000/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking),
      });

      toast.success("Booking Successful 🎉");
      navigate("/success", { state: booking });
    } catch (error) {
      console.error(error);
      toast.error("Booking failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar user={user} />

      <main className="grow p-6 max-w-md mx-auto">
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4">
            Passenger Details
          </h2>

          <input
            type="text"
            placeholder="Passenger Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg mb-4"
          />

          <input
            type="tel"
            placeholder="Mobile Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg mb-4"
          />

          <button
            onClick={handleConfirm}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
          >
            Confirm Ticket
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PassengerDetails;
