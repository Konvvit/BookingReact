
import { RouteObject } from "react-router-dom";
import Home from "./pages/homepage/Home";
import Booking from "./pages/booking/Booking";
import Admin from "./pages/admin/Admin";
import ServiceList from "./components/servicelist/ServiceList";
import Login from "./pages/login/Login";
import ContactForm from "./pages/contactForm/ContactForm";
import ProtectedRoute from "./components/protectedroute/ProtectedRoute";

export const routes: RouteObject[] = [
  { path: "/", element: <Home /> },
  { path: "/booking", element: <Booking /> },
  { path: "/service", element: <ServiceList /> },
  { path: "/contact", element: <ContactForm /> },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <Admin />
      </ProtectedRoute>
    ),
  },
  { path: "/login", element: <Login /> },
];
