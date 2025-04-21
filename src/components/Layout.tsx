import React, { ReactNode } from 'react';
import { Box } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
  hideFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, hideFooter = false }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'background.default'
      }}
    >
      <Navbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: '100%',
          mt: '64px', // Compensate for fixed navbar (increase to 70px on higher resolutions)
          '@media (max-width: 600px)': {
            mt: '56px' // For mobile screens
          }
        }}
      >
        {children}
      </Box>
      {!hideFooter && <Footer />}
    </Box>
  );
};

export default Layout; 