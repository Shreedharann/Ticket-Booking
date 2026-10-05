import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/4.jpeg";
import toast from "react-hot-toast";

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Email and password are required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:3000/users?email=${email}&password=${password}`
      );
      const users = await res.json();

      if (users.length === 0) {
        toast.error("Invalid email or password");
        return;
      }

      // ✅ LOGGED-IN USER
      const loggedUser = users[0];

      // ✅ SAVE USER
      localStorage.setItem("user", JSON.stringify(loggedUser));

      toast.success("Login successful 🎉");

      // ✅ ROLE-BASED REDIRECT (NO SEPARATE ADMIN FOLDER)
      if (loggedUser.role === "admin") {
        navigate("/"); // admin stays on home, sees admin options
      } else {
        navigate("/");
      }

    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* LOGIN CARD */}
      <div className="relative z-10 w-full max-w-md p-8 rounded-3xl border border-white shadow-2xl  hover:scale-[1.05] transition">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/40 text-white placeholder-white/70 focus:ring-2 focus:ring-indigo-500 outline-none"/>

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/40 text-white placeholder-white/70 focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition active:scale-95 disabled:opacity-60"
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        <p className="text-center text-white mt-6">
          Don’t have an account?
          <button
            onClick={() => navigate("/signup")}
            className="ml-2 font-semibold hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
