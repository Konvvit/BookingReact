import React, { useState } from 'react';
import { Box, Typography, Grid, Button} from '@mui/material';
import CustomButton from '../../components/button/CustomButton';

// Sample available slots
const availableSlots: { [key: string]: string[] } = {
  '2024-12-25': ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM'],
  '2024-12-26': ['10:00 AM', '12:00 PM', '2:00 PM'],
};

const getDaysInMonth = (month: number, year: number) => {
  const daysInMonth = new Date(year, month, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, i) => i + 1);
};

export default function Booking() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const month = selectedDate.getMonth();
  const year = selectedDate.getFullYear();
  const daysInMonth = getDaysInMonth(month + 1, year);

  const formattedDate = selectedDate.toISOString().split('T')[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTime) {
      alert('Please select a time slot');
      return;
    }
    console.log('Booking Details:', { selectedDate, selectedTime });
  };

  const handleDateChange = (day: number) => {
    setSelectedDate(new Date(year, month, day));
    setSelectedTime(null);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ color: '#white', fontWeight: 'bold' }}>
        Book an Appointment
      </Typography>
      <Grid container spacing={4}>
        {/* Calendar Section */}
        <Grid item xs={12} md={6}>
          <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
            <Typography variant="h6" sx={{ color: '#white', marginBottom: 2 }}>
              Select a Date
            </Typography>
            <Grid container spacing={1} justifyContent="center">
              {daysInMonth.map((day) => {
                const dayFormatted = new Date(year, month, day).toISOString().split('T')[0];
                return (
                  <Grid item key={day} xs={3} sm={2} md={1}>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        backgroundColor: availableSlots[dayFormatted] ? '#4caf50' : '#d3d3d3',
                        color: availableSlots[dayFormatted] ? '#fff' : '#888',
                        fontSize: '18px',
                        height: '60px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        '&:hover': {
                          backgroundColor: availableSlots[dayFormatted] ? '#388e3c' : '#bdbdbd',
                        },
                      }}
                      onClick={() => handleDateChange(day)}
                    >
                      {day}
                    </Button>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Grid>

        {/* Time Slot Selection */}
        <Grid item xs={12} md={6}>
          <form onSubmit={handleSubmit}>
            <Typography variant="h6" sx={{ color: '#555', marginBottom: 2 }}>
              Available Time Slots for {formattedDate}
            </Typography>
            {availableSlots[formattedDate] ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {availableSlots[formattedDate].map((timeSlot, index) => (
                  <Button
                    key={index}
                    variant="outlined"
                    fullWidth
                    sx={{
                      fontSize: '16px',
                      padding: '12px',
                      borderRadius: '8px',
                      backgroundColor: '#f5f5f5',
                      color: '#333',
                      border: '2px solid #ddd',
                      '&:hover': {
                        backgroundColor: '#eeeeee',
                        borderColor: '#ccc',
                      },
                    }}
                    onClick={() => handleTimeSelect(timeSlot)}
                  >
                    {timeSlot}
                  </Button>
                ))}
              </Box>
            ) : (
              <Typography variant="body1" color="text.secondary">
                No available slots for this date.
              </Typography>
            )}

            {selectedTime && (
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="h6" color="primary">
                  You have selected: {formattedDate} at {selectedTime}
                </Typography>
                <CustomButton text="Confirm Booking" type="submit" />
              </Box>
            )}
          </form>
        </Grid>
      </Grid>
    </Box>
  );
}


