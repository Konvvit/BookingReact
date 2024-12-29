import { Routes, Route, useLocation } from "react-router-dom";
import { Container, Box } from "@mui/material";
import Home from "./pages/homepage/Home";
import Booking from "./pages/booking/Booking";
import Admin from "./pages/admin/Admin";
import ServiceList from "./components/servicelist/ServiceList";
import { AnimatePresence } from "framer-motion";
import Login from "./pages/login/Login";
import ProtectedRoute from "./components/protectedroute/ProtectedRoute";

function App() {
  const location = useLocation();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <Container maxWidth="lg">
        {/* Wrap Routes with AnimatePresence for page animations */}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/service" element={<ServiceList />} />
            <Route path="/login" element={<Login />} />

            {/* Protected Admin Route */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AnimatePresence>
      </Container>
    </Box>
  );
}

export default App;




