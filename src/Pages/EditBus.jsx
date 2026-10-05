import React, { useEffect, useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import toast from "react-hot-toast";

const EditBus = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || user.role !== "admin") return <Navigate to="/" />;

  const [bus, setBus] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch bus by ID
  useEffect(() => {
    const fetchBus = async () => {
      try {
        const res = await fetch(`http://localhost:3000/buses/${id}`);
        const data = await res.json();
        setBus(data);
      } catch (err) {
        toast.error("Failed to load bus");
      } finally {
        setLoading(false);
      }
    };

    fetchBus();
  }, [id]);

  const handleChange = (e) => {
    setBus({ ...bus, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await fetch(`http://localhost:3000/buses/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bus),
      });

      toast.success("Bus updated successfully");
      navigate("/admin/buses");
    } catch (err) {
      toast.error("Failed to update bus");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!bus) return <Navigate to="/admin/buses" />;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar user={user} />

      <main className="grow p-6 max-w-xl mx-auto">
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Edit Bus</h2>

          <form onSubmit={handleUpdate} className="space-y-4">
            <input
              name="name"
              value={bus.name}
              onChange={handleChange}
              placeholder="Bus Name"
              className="w-full px-4 py-3 border rounded-lg"
            />

            <input
              name="source"
              value={bus.source}
              onChange={handleChange}
              placeholder="Source"
              className="w-full px-4 py-3 border rounded-lg"
            />

            <input
              name="destination"
              value={bus.destination}
              onChange={handleChange}
              placeholder="Destination"
              className="w-full px-4 py-3 border rounded-lg"
            />

            <input
              name="type"
              value={bus.type}
              onChange={handleChange}
              placeholder="Bus Type (Sleeper / Seater)"
              className="w-full px-4 py-3 border rounded-lg"
            />

            <input
              type="number"
              name="price"
              value={bus.price}
              onChange={handleChange}
              placeholder="Price"
              className="w-full px-4 py-3 border rounded-lg"
            />

            <input
              type="number"
              name="totalSeats"
              value={bus.totalSeats}
              onChange={handleChange}
              placeholder="Total Seats"
              className="w-full px-4 py-3 border rounded-lg"
            />

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
            >
              Update Bus
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EditBus;
