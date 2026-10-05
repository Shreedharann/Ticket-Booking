import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import toast from "react-hot-toast";

const AddBus = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  //  Protect page
  if (!user || user.role !== "admin") {
    return <Navigate to="/" />;
  }

  const [bus, setBus] = useState({
    name: "",
    type: "",
    source: "",
    destination: "",
    time: "",
    price: "",
    totalSeats: "",
    rating: 4.5
  });

  const handleChange = (e) => {
    setBus({ ...bus, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch("http://localhost:3000/buses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...bus,
          price: Number(bus.price),
          totalSeats: Number(bus.totalSeats)
        }),
      });

      toast.success("Bus added successfully 🚍");
      navigate("/admin/buses");
    } catch {
      toast.error("Failed to add bus");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar user={user} />

      <main className="flex-grow p-6 max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Add New Bus</h2>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-4">
          {["name","type","source","destination","time","price","totalSeats"].map((f) => (
            <input
              key={f}
              name={f}
              placeholder={f.toUpperCase()}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
          ))}

          <button className="w-full bg-indigo-600 text-white py-2 rounded">
            Add Bus
          </button>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default AddBus;
