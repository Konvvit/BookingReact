import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, Card, CardContent } from '@mui/material';
import CustomButton from '../../components/button/CustomButton';
import { useNavigate, useLocation } from 'react-router-dom';
import { Service } from "../../helpers/types";


const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const navigate = useNavigate();
  const location = useLocation();

  const [selectedServices, setSelectedServices] = useState<Service[]>([]);

  // Extract services from location state when component mounts
  useEffect(() => {
    if (location.state?.services) {
      setSelectedServices(location.state.services);
    } else {
      console.warn('No services passed to ContactForm.');
    }
  }, [location.state]);

  // Handle changes in the form fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill out all fields');
      return;
    }

    // Navigate to the booking page with form data and selected services
    navigate('/booking', {
      state: {
        selectedServices,
        contactInfo: formData,
      },
    });
  };

  return (
    <Box
      sx={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: 4,
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Contact Us
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          required
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          fullWidth
          required
          sx={{ marginBottom: 2 }}
        />

        {/* Selected Services Summary */}
        {selectedServices.length > 0 && (
          <Box sx={{ marginBottom: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Selected Services:
            </Typography>
            {selectedServices.map((service) => (
              <Card key={service.id} sx={{ marginBottom: 2 }}>
                <CardContent>
                  <Typography variant="h6">{service.name}</Typography>
                  <Typography variant="body2">{service.description}</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    Price: {service.price}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}

        <Box sx={{ textAlign: 'center', marginTop: 2 }}>
          <CustomButton type="submit" text="Continue" color="primary" />
        </Box>
      </form>
    </Box>
  );
};

export default ContactForm;


