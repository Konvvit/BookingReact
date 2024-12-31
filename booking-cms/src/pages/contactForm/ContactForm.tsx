import React, { useState } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import CustomButton from '../../components/button/CustomButton';
import { useNavigate, useLocation } from 'react-router-dom';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const navigate = useNavigate();
  const location = useLocation();
  const selectedServices = location.state?.selectedServices || [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation to ensure all fields are filled
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
        maxWidth: '600px',
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
        <Box sx={{ textAlign: 'center', marginTop: 2 }}>
          <CustomButton type="submit" text="Continue" color="primary" />
        </Box>
      </form>
    </Box>
  );
};

export default ContactForm;
