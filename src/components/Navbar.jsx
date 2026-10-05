import React from "react";
import { useNavigate } from "react-router-dom";
import busImg from "../assets/bus.png";
import logo from "../assets/redbus-logo.png";

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  return (
    <nav className="relative overflow-hidden bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 text-white px-6 py-4 flex justify-between items-center">
      
      {/* 🚍 Moving Bus + Sale Tag */}
      <div className="absolute bottom-1 left-0 flex items-center animate-bus pointer-events-none">
        <img src={busImg} alt="Bus" className="h-12 object-contain" />
        <span className="ml-2 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse">
          🎉 New Year Sale – 20% OFF
        </span>
      </div>

      {/* 🔰 Logo + Title */}
      <div
        className="flex items-center gap-3 z-10 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={logo} alt="Logo" className="h-9 object-contain" />
        <h1 className="text-xl font-bold">Bus Booking</h1>
      </div>

      {/* 👉 Right Side */}
      {user && (
        <div className="flex items-center gap-6 z-10">

          {/* 🛠 ADMIN ONLY */}
          {user.role === "admin" && (
            <>
              {/* <button
                onClick={() => navigate("/admin/add-bus")}
                className="font-medium hover:underline"
              >
                Add Bus
              </button> */}

              <button
                onClick={() => navigate("/admin/buses")}
                className="font-medium hover:underline"
              >
                Manage Buses
              </button>
            </>
          )}

          {/* 📜 USER ONLY */}
          {user.role === "user" && (
            <button
              onClick={() => navigate("/bookings")}
              className="font-medium hover:underline"
            >
              My Bookings
            </button>
          )}

          {/* 👋 COMMON */}
          <span className="font-medium">Hi, {user.name}</span>

          <button
            onClick={onLogout}
            className="bg-white text-indigo-700 px-4 py-1 rounded-md font-semibold hover:bg-gray-100 transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
