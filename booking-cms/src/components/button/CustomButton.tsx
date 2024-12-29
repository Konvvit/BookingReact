// src/components/CustomButton.tsx
import React from 'react';
import { Button, ButtonProps } from '@mui/material';

// Define a custom button component using Material UI's Button
interface CustomButtonProps extends ButtonProps {
  text: string;
  color?: 'primary' | 'secondary'; 
}

const CustomButton: React.FC<CustomButtonProps> = ({ text, color = 'primary', ...props }) => {
  return (
    <Button variant="contained" color={color} {...props}>
      {text}
    </Button>
  );
};

export default CustomButton;
