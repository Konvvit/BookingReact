import React, { useState } from "react";
import { TextField, Button, Box, Typography, Container, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../helpers/api"; 
import { LoginError } from "../../helpers/types";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Both fields are required");
      return;
    }

    setError(""); // Clear any existing errors

    try {
      const data = await loginUser(email, password); // Call the centralized API function
      console.log("Response from backend:", data);

      // Store the JWT token and user information
      localStorage.setItem("token", data.token); // Save JWT token
      sessionStorage.setItem("user", JSON.stringify({ email })); // Save user email

      // Redirect to the admin panel
      navigate("/admin");
    } catch (err) {
      const loginError = err as LoginError;
      setError(loginError.error || "Login failed. Please try again.");
      console.error("Login error:", loginError);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ padding: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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


