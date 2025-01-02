import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, Grid, IconButton } from '@mui/material';
import CustomButton from '../button/CustomButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

interface Service {
  id: number;
  name: string;
  description: string;
  price: string;
}

const ServiceList: React.FC = () => {
  const [cart, setCart] = useState<Service[]>([]);
  const [servicesList, setServicesList] = useState<Service[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/services');
        setServicesList(response.data);
      } catch (error) {
        setError('Error fetching services. Please try again later.');
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  const addToCart = (service: Service) => {
    setCart((prevCart) => {
      if (!prevCart.find((item) => item.id === service.id)) {
        return [...prevCart, service];
      }
      return prevCart;
    });

    setServicesList((prevList) => prevList.filter((item) => item.id !== service.id));
  };

  const removeFromCart = (service: Service) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== service.id));
    setServicesList((prevList) => [...prevList, service]);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 4 }}>
        Our Services
      </Typography>

      {error && (
        <Typography variant="body1" color="error" sx={{ textAlign: 'center', mb: 4 }}>
          {error}
        </Typography>
      )}

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {servicesList.map((service) => (
              <Card
                key={service.id}
                sx={{
                  boxShadow: 3,
                  transition: 'transform 0.2s, opacity 0.2s',
                  '&:hover': { transform: 'scale(1.05)', boxShadow: 6 },
                  position: 'relative',
                }}
              >
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                    {service.name}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {service.description}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Price: {service.price}
                  </Typography>

                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      backgroundColor: 'white',
                      '&:hover': { backgroundColor: 'grey.200' },
                    }}
                    onClick={() => addToCart(service)}
                  >
                    <AddIcon />
                  </IconButton>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box
            sx={{
              position: 'sticky',
              top: 20,
              height: 700,
              width: '100%',
              minWidth: 400,
              maxWidth: 600,
              bgcolor: 'error.main',
              color: 'white',
              borderRadius: 2,
              boxShadow: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              p: 3,
            }}
          >
            <Typography variant="h5" sx={{ mb: 2 }}>
              Cart
            </Typography>

            {cart.map((service) => (
              <Card
                key={service.id}
                sx={{
                  marginBottom: 2,
                  width: '100%',
                  boxShadow: 2,
                  opacity: 1,
                  position: 'relative',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': { transform: 'scale(1.05)', boxShadow: 6 },
                }}
              >
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                    {service.name}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {service.description}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Price: {service.price}
                  </Typography>

                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      backgroundColor: 'white',
                      '&:hover': { backgroundColor: 'grey.200' },
                    }}
                    onClick={() => removeFromCart(service)}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </CardContent>
              </Card>
            ))}

            <NavLink
              to={{ pathname: '/contact' }}
              state={{ services: cart }}
              style={{ textDecoration: 'none' }}
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


























