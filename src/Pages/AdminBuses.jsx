import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import toast from "react-hot-toast";

const AdminBuses = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  if (!user || user.role !== "admin") return <Navigate to="/" />;

  const [buses, setBuses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/buses")
      .then((res) => res.json())
      .then((data) => setBuses(data));
  }, []);

  const deleteBus = async (id) => {
    if (!window.confirm("Delete this bus?")) return;

    await fetch(`http://localhost:3000/buses/${id}`, {
      method: "DELETE",
    });

    setBuses((prev) => prev.filter((b) => b.id !== id));
    toast.success("Bus deleted");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 to-gray-200">
      <Navbar user={user} />

      <main className="flex-grow p-6 max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-800">
            🛠 Manage Buses
          </h2>

          <button
            onClick={() => navigate("/admin/add-bus")}
            className="bg-green-600 text-white px-5 py-2 rounded-lg font-semibold
                       hover:bg-green-700 transition shadow-md"
          >
            + Add New Bus
          </button>
        </div>

        {/* Bus List */}
        {buses.length === 0 ? (
          <p className="text-gray-500 text-center mt-20">
            No buses available.
          </p>
        ) : (
          <div className="grid gap-5">
            {buses.map((bus) => (
              <div
                key={bus.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl
                           transition-all duration-300 p-5 flex flex-col md:flex-row
                           md:items-center md:justify-between"
              >
                {/* Bus Info */}
                <div className="space-y-1">
                  <p className="text-xl font-bold text-gray-800">
                    {bus.name}
                  </p>

                  <p className="text-gray-600">
                    {bus.source} → {bus.destination}
                  </p>

                  <div className="flex flex-wrap gap-3 text-sm mt-2">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                      🚌 {bus.type}
                    </span>

                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">
                      💺 {bus.totalSeats} seats
                    </span>

                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                      ₹ {bus.price}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-4 md:mt-0">
                  <button
                    onClick={() =>
                      navigate(`/admin/edit-bus/${bus.id}`)
                    }
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg
                               font-semibold hover:bg-blue-700 transition shadow"
                  >
                    ✏ Edit
                  </button>

                  <button
                    onClick={() => deleteBus(bus.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg
                               font-semibold hover:bg-red-600 transition shadow"
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default AdminBuses;
