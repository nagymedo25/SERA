import React from 'react';
import { Box, Button, Container, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HomeIcon from '@mui/icons-material/Home';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Layout>
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 10,
          background: 'linear-gradient(135deg, rgba(30,30,30,1) 0%, rgba(20,20,30,1) 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Background elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '15%',
            right: '10%',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(63,81,181,0.1) 0%, rgba(63,81,181,0) 70%)',
            filter: 'blur(60px)',
            opacity: 0.5,
            zIndex: 0
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '15%',
            left: '10%',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245,0,87,0.1) 0%, rgba(245,0,87,0) 70%)',
            filter: 'blur(50px)',
            opacity: 0.4,
            zIndex: 0
          }}
        />
        
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <ErrorOutlineIcon 
            sx={{ 
              fontSize: 100, 
              color: 'text.secondary',
              opacity: 0.7,
              mb: 3
            }} 
          />
          
          <Typography
            variant="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '6rem', md: '10rem' },
              background: 'linear-gradient(90deg, #3f51b5 0%, #f50057 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2
            }}
          >
            404
          </Typography>
          
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: 700, mb: 3 }}
          >
            Page Not Found
          </Typography>
          
          <Typography
            variant="body1"
            color="text.secondary"
            paragraph
            sx={{ maxWidth: '600px', mx: 'auto', mb: 5 }}
          >
            Oops! The page you are looking for doesn't exist or has been moved.
            Let's get you back on track.
          </Typography>
          
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<HomeIcon />}
            onClick={() => navigate('/')}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 600,
              borderRadius: 2
            }}
          >
            Back to Home
          </Button>
        </Container>
      </Box>
    </Layout>
  );
};

export default NotFound; 