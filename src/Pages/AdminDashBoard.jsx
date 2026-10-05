import React from "react";
import Navbar from "../components/Navbar";

const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar user={user} />

      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-bold text-lg">Add Bus</h2>
            <p>Admin can add new buses here</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-bold text-lg">Manage Buses</h2>
            <p>Edit / Delete buses</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
