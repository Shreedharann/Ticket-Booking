import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../Pages/LoginPage";
import HomePage from "../pages/HomePage";
import BookingSuccess from "../pages/BookingSuccess";
import BusesPage from "../pages/BusesPage";
import SeatPage from "../Pages/SeatPage";
import PassengerDetails from "../Pages/PassengerDetails";
import BookingHistory from "../Pages/BookingHistory";
import SignupPage from "../Pages/SignUpPage";
import AddBus from "../Pages/AddBus";
import AdminBuses from "../Pages/AdminBuses";
import AdminDashboard from "../Pages/AdminDashBoard";
import EditBus from "../Pages/EditBus";


const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  { path: "/buses", element: <BusesPage /> },
  { path: "/signup", element: <SignupPage /> },
  { path: "/", element: <HomePage /> },
  { path: "/seats", element: <SeatPage /> },
  { path: "/success", element: <BookingSuccess /> },
  { path: "/history", element: <BookingHistory /> },
  { path: "/bookings", element: <BookingHistory /> },
  { path: "/passenger",element: <PassengerDetails />},
  { path: "/admin/add-bus",element: <AddBus />},
  {
  path: "/admin/buses",
  element: <AdminBuses />
},
 { path: "/dashboard", element: <AdminDashboard /> },
 {
  path: "/admin/edit-bus/:id",
  element: <EditBus />,
}

  
]);


export default router;
