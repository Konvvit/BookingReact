import React, { useState, useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import ServiceCard from "./ServiceCard";
import CustomButton from "../button/CustomButton";
import { NavLink } from "react-router-dom";
import { fetchServices } from "../../helpers/api";
import { Service } from "../../helpers/types";



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
    } catch {
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
              height: "auto", 
              maxHeight: 700, 
              width: "100%", 
              minWidth: 500, 
              maxWidth: 600, 
              bgcolor: "White",
              color: "white",
              borderRadius: 2,
              boxShadow: 3,
              p: 3,
              display: "flex",
              flexDirection: "column", 
              gap: 2, 
              overflowY: "auto", 
            }}
          >
            <Typography variant="h5" sx={{ mb: 2, color: "black" }}>
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



























