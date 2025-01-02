import React, { useState } from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import axios from 'axios'; // Import axios
import CustomButton from '../../components/button/CustomButton';
import { useLocation } from 'react-router-dom';

// Dynamic slots for example purposes
const generateAvailableSlots = () => {
  const today = new Date();
  const slots: { [key: string]: string[] } = {};

  for (let i = 0; i < 10; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);
    const formattedDate = date.toISOString().split('T')[0];

    // Make some days available randomly
    if (i % 2 === 0) {
      slots[formattedDate] = ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM'];
    }
  }
  return slots;
};

const availableSlots: { [key: string]: string[] } = generateAvailableSlots();

const Booking = () => {
  const location = useLocation();
  const { selectedServices, contactInfo } = location.state || {};

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleDateChange = (date: string) => {
    setSelectedDate(new Date(date));
    setSelectedTime(null); // Reset time selection when the date changes
    setIsBookingConfirmed(false); // Reset confirmation status
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

     // Log selectedServices to see its current state
  console.log("Selected Services:", selectedServices);

    // Validate if services are selected
    if (!selectedServices || selectedServices.length === 0) {
      
      setError("Please select at least one service.");
      return;
    }

    // Log selectedDate and selectedTime to see their current state
  console.log("Selected Date:", selectedDate);
  console.log("Selected Time:", selectedTime);

    // Validate if date and time are selected
    if (!selectedDate || !selectedTime) {
      alert('Please select a date and time.');
      return;
    }

    

    const formattedDate = selectedDate.toISOString().split('T')[0];
    const bookingDetails = {
      date: formattedDate,
      time: selectedTime,
      customerName: contactInfo?.name,
      customerEmail: contactInfo?.email,
      customerPhone: contactInfo?.phone,
      selectedServices: selectedServices,
    };

    try {
      console.log("Sending booking details:", bookingDetails);
      const response = await axios.post('http://localhost:5001/api/bookings', bookingDetails, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      console.log('Booking Response:', response.data);
      setIsBookingConfirmed(true);
      setError(null);  // Clear error after successful booking
    } catch (err) {
      console.error('Error confirming booking:', err);
      setError('Failed to confirm the booking. Please try again.');
    }
  };

  const formattedDate = selectedDate?.toISOString().split('T')[0];
  const availableTimes = formattedDate ? availableSlots[formattedDate] : [];

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ color: '#fff', fontWeight: 'bold' }}>
        Book an Appointment
      </Typography>
      <Grid container spacing={4}>
        {/* Date Selection */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ color: '#fff', marginBottom: 2 }}>
            Select a Date
          </Typography>
          <Grid container spacing={2}>
            {Object.keys(availableSlots).map((date) => (
              <Grid item key={date} xs={4} sm={3} md={2}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleDateChange(date)}
                  sx={{
                    backgroundColor: selectedDate?.toISOString().split('T')[0] === date ? '#388e3c' : '#4caf50',
                    color: '#fff',
                    '&:hover': { backgroundColor: '#388e3c' },
                  }}
                >
                  {date}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Time Selection */}
        <Grid item xs={12} md={6}>
          <form onSubmit={handleSubmit}>
            <Typography variant="h6" sx={{ color: '#555', marginBottom: 2 }}>
              Available Time Slots for {formattedDate || 'Selected Date'}
            </Typography>
            {availableTimes?.length > 0 ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {availableTimes.map((time) => (
                  <Button
                    key={time}
                    variant="outlined"
                    fullWidth
                    onClick={() => handleTimeSelect(time)}
                    sx={{
                      backgroundColor: selectedTime === time ? '#388e3c' : '#f5f5f5',
                      color: selectedTime === time ? '#fff' : '#333',
                      '&:hover': { backgroundColor: selectedTime === time ? '#388e3c' : '#eeeeee' },
                    }}
                  >
                    {time}
                  </Button>
                ))}
              </Box>
            ) : (
              <Typography>No available time slots for this date.</Typography>
            )}
            {selectedTime && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" color="primary">
                  Selected: {formattedDate} at {selectedTime}
                </Typography>
                <CustomButton text="Confirm Booking" type="submit" />
              </Box>
            )}
          </form>
        </Grid>
      </Grid>

      {/* Confirmation and Error Messages */}
      {isBookingConfirmed && (
        <Typography variant="h6" color="primary" align="center" sx={{ mt: 3 }}>
          Booking confirmed for {formattedDate} at {selectedTime}.
        </Typography>
      )}
      {error && (
        <Typography variant="h6" color="error" align="center" sx={{ mt: 3 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default Booking;








