import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/4.jpeg";
import toast from "react-hot-toast";


const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  

  const { name, email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   

    //  Basic validation
    if (!name.trim() || !email.trim() || !password.trim()) {
       toast.error("All fields are required");
       return;

    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
     toast.error("Enter a valid email address");
      return ;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return ;
    }

    setLoading(true);

    try {
      //  Check existing user
      const res = await fetch(
        `http://localhost:3000/users?email=${email}`
      );
      const existingUsers = await res.json();

      if (existingUsers.length > 0) {
        toast.error("Email already exists");
         return
      }

      //  Create user
      await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
    name,
    email,
    password,
    role: "user" // 👈 default
  }),
});

       toast.success("Account created successfully 🎉");

      navigate("/login");
    } catch (err) {
     toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      

      <div className="relative z-10 p-0.5 rounded-2xl">
        <div className="relative z-10 w-full max-w-md p-8 rounded-3xl border font-medium border-white shadow-2xl transition-all duration-300 hover:scale-[1.06] ">
          <h2 className="text-3xl font-bold text-center text-black mb-6">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-transparent text-white border border-white/40 placeholder-white/70 focus:ring-2 focus:ring-indigo-500 outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-transparent text-white border border-white/40 placeholder-white/70 focus:ring-2 focus:ring-indigo-500 outline-none"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-transparent text-white border border-white/40 placeholder-white/70 focus:ring-2 focus:ring-indigo-500 outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-linear-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold transition hover:from-indigo-700 hover:to-purple-700 active:scale-95 disabled:opacity-60"
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center text-gray-200 mt-6">
            Already have an account?
            <button
              onClick={() => navigate("/login")}
              className="ml-2 text-white font-semibold hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
