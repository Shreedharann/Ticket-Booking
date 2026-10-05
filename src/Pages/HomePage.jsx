import { useState, useMemo } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBus from "../components/SearchBus";

const HomePage = () => {
  const navigate = useNavigate();

  // ✅ Memoized user
  const user = useMemo(() => {
    return JSON.parse(localStorage.getItem("user"));
  }, []);

  // 🔐 Not logged in → login
  if (!user) return <Navigate to="/login" replace />;

  // ✅ Search state (USER only)
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [travelDate, setTravelDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const handleSearch = () => {
    if (!source.trim() || !destination.trim()) return;

    navigate("/buses", {
      state: { source, destination, travelDate },
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar user={user} onLogout={handleLogout} />

      <main className="grow flex items-center justify-center">
        {/* ❌ ADMIN VIEW */}
        {user.role === "admin" ? (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">
              Welcome Admin 👋
            </h2>
            <p className="text-gray-600">
              Use <b>Manage Buses</b> from the menu to continue
            </p>
          </div>
        ) : (
          /* ✅ USER VIEW */
          <SearchBus
            source={source}
            destination={destination}
            travelDate={travelDate}
            setSource={setSource}
            setDestination={setDestination}
            setTravelDate={setTravelDate}
            onSearch={handleSearch}
            showFilters={false}
          />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
