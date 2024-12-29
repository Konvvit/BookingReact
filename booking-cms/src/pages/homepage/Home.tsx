import { Typography, Box } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import motion

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -200 }} // Initial position to the left
      animate={{ opacity: 1, x: 0 }} // Animate to full opacity and center
      exit={{ opacity: 0, x: 200 }} // Exit with a slide to the right
      transition={{ duration: 0.5 }} // Duration of the animation
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', textAlign: 'center' }}>
        <Box>
          <Typography variant="h3" gutterBottom>
            Welcome to Our HSalon
          </Typography>
          <Typography variant="h6" paragraph>
            Book your appointment now!
          </Typography>

          <Typography variant="h5" gutterBottom>
            Available Services:
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
            {/* Login Card */}
            <NavLink to="/login" style={{ textDecoration: 'none' }}>
              <Box
                sx={{
                  width: 250,
                  height: 150,
                  bgcolor: 'white',
                  color: 'black',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  boxShadow: 3,
                  borderRadius: 2,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 6,
                  },
                }}
              >
                <Typography variant="h6">Login</Typography>
              </Box>
            </NavLink>

            {/* Our Services Card */}
            <NavLink to="/service" style={{ textDecoration: 'none' }}>
              <Box
                sx={{
                  width: 250,
                  height: 150,
                  bgcolor: 'white',
                  color: 'black',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  boxShadow: 3,
                  borderRadius: 2,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 6,
                  },
                }}
              >
                <Typography variant="h6">Our Services</Typography>
              </Box>
            </NavLink>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
}


