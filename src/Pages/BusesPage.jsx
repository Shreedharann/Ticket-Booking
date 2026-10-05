import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BusList from "../components/BusList";

const BusesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  //  Auth check
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return <Navigate to="/login" />;

  //  Search params from HomePage
  const { source = "", destination = "", travelDate } = location.state || {};

  //  Bus data
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);

  //  Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  //  Fetch buses (ONCE)
  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const res = await fetch("http://localhost:3000/buses");
        const data = await res.json();
        setBuses(data);
      } catch (err) {
        console.error("Error fetching buses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBuses();
  }, []);

  //  Optimized filtering
  const filteredBuses = useMemo(() => {
    return buses.filter(
      (bus) =>
        bus.source.toLowerCase().includes(source.toLowerCase()) &&
        bus.destination.toLowerCase().includes(destination.toLowerCase())
    );
  }, [buses, source, destination]);

  //  Select bus → go to SeatPage
  const handleSelect = (bus) => {
    navigate("/seats", {
      state: { bus, travelDate },
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar user={user} onLogout={handleLogout} />

      <main className="grow p-6 max-w-6xl mx-auto w-full">
        {loading ? (
          <div className="text-center text-gray-600 mt-20">
            Loading buses...
          </div>
        ) : filteredBuses.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            No buses found for your route.
          </div>
        ) : (
          <BusList buses={filteredBuses} onSelect={handleSelect} />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default BusesPage;
