import { Card, CardContent, Typography, Box, Grid, IconButton } from '@mui/material';
import CustomButton from '../button/CustomButton';
import AddIcon from '@mui/icons-material/Add'; // Import Add icon
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'; // Import Delete icon
import { NavLink } from 'react-router-dom';
import { useState } from 'react'; // Import useState for state management

interface Service {
  id: number;
  name: string;
  description: string;
  price: string;
}

// Sample services data
const services: Service[] = [
  { id: 1, name: 'Haircut', description: 'A stylish haircut', price: '$25' },
  { id: 2, name: 'Shampoo', description: 'Refreshing shampoo wash', price: '$10' },
  { id: 3, name: 'Hair Coloring', description: 'Beautiful color for your hair', price: '$40' },
  { id: 4, name: 'Hair Styling', description: 'Professional styling for any event', price: '$30' },
];

export default function ServiceList() {
  // State to keep track of added services in the cart
  const [cart, setCart] = useState<Service[]>([]);
  const [servicesList, setServicesList] = useState<Service[]>(services); // Initial list of services

  // Function to add a service to the cart and remove from the available services
  const addToCart = (service: Service) => {
    setCart((prevCart) => [...prevCart, service]);
    setServicesList((prevList) => prevList.filter((item) => item.id !== service.id));
  };

  // Function to remove a service from the cart and add it back to the available services
  const removeFromCart = (service: Service) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== service.id)); // Remove from cart
    setServicesList((prevList) => [...prevList, service]); // Add back to available services
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 4 }}>
        Our Services
      </Typography>
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
                  opacity: 1, // Initially fully visible
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

                  {/* Add Icon button */}
                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      backgroundColor: 'white',
                      '&:hover': { backgroundColor: 'grey.200' },
                    }}
                    onClick={() => addToCart(service)} // Add service to cart
                  >
                    <AddIcon />
                  </IconButton>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Grid>

        {/* Cart Box */}
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

            {/* Render added service cards inside the cart */}
            {cart.map((service, index) => (
              <Card
                key={index}
                sx={{
                  marginBottom: 2,
                  width: '100%',
                  boxShadow: 2,
                  opacity: 1, // Initially fully visible
                  position: 'relative',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': { transform: 'scale(1.05)', boxShadow: 6 }, // Hover effect for cards in cart
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

                  {/* Delete Icon button */}
                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      backgroundColor: 'white',
                      '&:hover': { backgroundColor: 'grey.200' },
                    }}
                    onClick={() => removeFromCart(service)} // Remove service from cart
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </CardContent>
              </Card>
            ))}

            {/* Book Now Button */}
             <NavLink
              to={{
                pathname: '/contact',
                state: { services: cart }, // Passing the selected services to the booking page
              }}
            >
              <CustomButton text="Continue" color="secondary" />
            </NavLink>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

















