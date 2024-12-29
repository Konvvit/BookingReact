import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle form submission
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  console.log('Form submitted', { email, password });

  if (!email || !password) {
    setError('Both fields are required');
    return;
  }

  setError(''); // Clear previous error

  // Send a POST request to the backend login route
  try {
const response = await fetch('http://localhost:5001/api/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email, password }),
});

    const data = await response.json();
    console.log('Response from backend:', data);

    if (response.ok) {
      // Store user info in sessionStorage
      sessionStorage.setItem("user", JSON.stringify(data));
      // Redirect to dashboard or home page
      navigate("/admin");
    } else {
      setError(data.error || "Login failed");
    }
  } catch (err) {
    setError("An error occurred. Please try again.");
    console.error('Error during request:', err);
  }
};

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ padding: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
            />
            {error && (
              <Typography color="error" variant="body2" align="center">
                {error}
              </Typography>
            )}
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
