import React, { useState, useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import ServiceCard from "./ServiceCard";
import CustomButton from "../button/CustomButton";
import { NavLink } from "react-router-dom";
import { fetchServices } from "../../helpers/api";

interface Service {
  id: number;
  name: string;
  description: string;
  price: string;
}

const ServiceList: React.FC = () => {
  const [servicesList, setServicesList] = useState<Service[]>([]);
  const [cart, setCart] = useState<Service[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch services on component mount
  useEffect(() => {
    const loadServices = async () => {
      try {
        const services = await fetchServices();
        setServicesList(services);
      } catch (err) {
        setError("Error fetching services. Please try again later.");
      }
    };

    loadServices();
  }, []);

  // Add service to the cart
  const addToCart = (service: Service) => {
    setCart((prevCart) => [...prevCart, service]);
    setServicesList((prevList) =>
      prevList.filter((item) => item.id !== service.id)
    );
  };

  // Remove service from the cart
  const removeFromCart = (service: Service) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== service.id));
    setServicesList((prevList) => [...prevList, service]);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold", mb: 4 }}>
        Our Services
      </Typography>

      {error && (
        <Typography variant="body1" color="error" sx={{ textAlign: "center", mb: 4 }}>
          {error}
        </Typography>
      )}

      <Grid container spacing={8}>
        {/* Service List */}
        <Grid item xs={12} md={8}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {servicesList.map((service) => (
              <ServiceCard key={service.id} service={service} onAdd={addToCart} />
            ))}
          </Box>
        </Grid>

        {/* Cart */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              position: "sticky",
              top: 20,
              height: "auto", // Adjust height dynamically based on content
              maxHeight: 700, // Optional: Set a max height for scrolling
              width: "100%", // Use full width of the column
              minWidth: 500, // Ensure a minimum width
              maxWidth: 600, // Optionally limit the max width
              bgcolor: "error.main",
              color: "white",
              borderRadius: 2,
              boxShadow: 3,
              p: 3,
              display: "flex",
              flexDirection: "column", // Stack items vertically
              gap: 2, // Add spacing between children
              overflowY: "auto", // Add scrolling for overflowing content
            }}
          >
            <Typography variant="h5" sx={{ mb: 2 }}>
              Cart
            </Typography>

            {cart.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onRemove={removeFromCart}
                isCartItem
              />
            ))}

            <NavLink
              to={{ pathname: "/contact" }}
              state={{ services: cart }}
              style={{ textDecoration: "none" }}
            >
              <CustomButton text="Continue" color="secondary" />
            </NavLink>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ServiceList;



























