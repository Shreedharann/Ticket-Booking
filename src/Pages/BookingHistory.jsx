import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  //  Logged-in user
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return <Navigate to="/login" />;

  //  Fetch booking history
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/bookings?user=${user.email}`
        );
        const data = await res.json();
        setBookings(data);
      } catch (error) {
        console.error("Failed to load bookings", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user.email]);

  // ❌ Cancel booking (DELETE)
  const cancelBooking = async (booking) => {
  const confirmCancel = window.confirm(
    "Are you sure you want to cancel this ticket?"
  );
  if (!confirmCancel) return;

  try {
    // 1️⃣ Fetch latest bus
    const busRes = await fetch(
      `http://localhost:3000/buses/${booking.busId}`
    );
    const bus = await busRes.json();

    const currentBookedSeats = bus.bookedSeats || [];

    // 2️⃣ Remove cancelled seats from bookedSeats
    const updatedBookedSeats = currentBookedSeats.filter(
      (seat) => !booking.seats.includes(seat)
    );

    // 3️⃣ Update bus seats
    await fetch(`http://localhost:3000/buses/${booking.busId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bookedSeats: updatedBookedSeats,
      }),
    });

    // 4️⃣ Delete booking
    await fetch(`http://localhost:3000/bookings/${booking.id}`, {
      method: "DELETE",
    });

    // 5️⃣ Update UI immediately
    setBookings((prev) =>
      prev.filter((b) => b.id !== booking.id)
    );

    toast.success("Ticket cancelled & seats released ✅");
  } catch (error) {
    console.error(error);
    toast.error("Failed to cancel ticket");
  }
};


  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar user={user} />

      <main className="grow p-6 max-w-5xl mx-auto w-full">
        <div className="flex gap-4 mb-4">
  <button
    onClick={() => navigate(-1)}
    className="text-blue-600 hover:underline"
  >
    ← Back
  </button>

  <button
    onClick={() => navigate("/")}
    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
  >
    Home
  </button>
</div>

        <h2 className="text-2xl font-bold mb-6">My Bookings</h2>

        {loading && (
          <p className="text-gray-500">Loading bookings...</p>
        )}

        {!loading && bookings.length === 0 && (
          <p className="text-gray-500">No bookings found.</p>
        )}

        {bookings.map((b) => (
          <div
            key={b.id}
            className="bg-white p-6 rounded-xl shadow mb-4"
          >
            <div className="flex justify-between items-start">
              {/* LEFT */}
              <div>
                <p className="font-bold text-lg">{b.busName}</p>
                <p className="text-gray-600">{b.route}</p>
                <p className="text-sm">
                  Passenger: <b>{b.passengerName}</b>
                </p>
                <p className="text-sm">
                  Seats: {b.seats.join(", ")}
                </p>
              </div>

              {/* RIGHT */}
              <div className="text-right">
                <p className="font-bold text-green-600">
                  ₹{b.totalPrice}
                </p>

                <button
                  onClick={() => cancelBooking(b)}
                  className="mt-2 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
                >
                  Cancel Ticket
                </button>
              </div>
            </div>
          </div>
        ))}
      </main>

      <Footer />
    </div>
  );
};

export default BookingHistory;
