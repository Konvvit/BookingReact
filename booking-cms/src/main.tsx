// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';  // Import ThemeProvider
import { BrowserRouter } from 'react-router-dom';  // Import BrowserRouter
import './index.css';
import App from './App.tsx';
import theme from './helpers/theme.ts';  // Import your custom theme

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Wrap your app with ThemeProvider and BrowserRouter here */}
    <ThemeProvider theme={theme}>
      <BrowserRouter> {/* Add BrowserRouter here */}
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);


