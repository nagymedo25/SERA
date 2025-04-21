// @ts-nocheck to avoid TypeScript errors with Material UI
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  Link,
  InputAdornment,
  IconButton,
  Alert,
  Grid,
  Divider,
  Stack
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';

// Simple animation function to avoid GSAP dependency
function animate(element, properties, duration = 1000, delay = 0) {
  if (!element) return;
  
  const start = performance.now();
  const initialStyles = {};
  const targetStyles = {};
  
  // Get initial styles and set targets
  for (const prop in properties) {
    initialStyles[prop] = parseFloat(window.getComputedStyle(element)[prop]) || 0;
    targetStyles[prop] = properties[prop];
  }
  
  // Animation function
  function step(timestamp) {
    if (timestamp < start + delay) {
      window.requestAnimationFrame(step);
      return;
    }
    
    const elapsed = timestamp - start - delay;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2; // Sine easing
    
    for (const prop in properties) {
      const currentValue = initialStyles[prop] + (targetStyles[prop] - initialStyles[prop]) * easeProgress;
      element.style[prop] = `${currentValue}${prop === 'opacity' ? '' : 'px'}`;
    }
    
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  }
  
  window.requestAnimationFrame(step);
}

// Flying Elements Component
const FlyingElements = () => {
  useEffect(() => {
    const elements = document.querySelectorAll('.flying-element');
    
    elements.forEach((el, index) => {
      // Initial position and properties
      el.style.opacity = '0';
      el.style.transform = `translate(${Math.random() * window.innerWidth}px, ${Math.random() * window.innerHeight}px) rotate(${Math.random() * 360}deg)`;
      
      // Animation delay based on index
      const delay = 100 + index * 200;
      
      // Make element visible with animation
      setTimeout(() => {
        el.style.opacity = '0.7';
        el.style.transition = 'transform 20s ease-in-out, opacity 1s ease-in-out';
        
        // Move elements slowly across the screen
        setInterval(() => {
          el.style.transform = `translate(${Math.random() * window.innerWidth}px, ${Math.random() * window.innerHeight}px) rotate(${Math.random() * 360}deg)`;
        }, 20000);
      }, delay);
    });
  }, []);
  
  return (
    <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
      {[...Array(12)].map((_, index) => (
        <Box
          key={index}
          className="flying-element"
          sx={{
            position: 'absolute',
            width: 24 + Math.random() * 24,
            height: 24 + Math.random() * 24,
            fontSize: 24 + Math.random() * 24,
            color: 'rgba(255, 255, 255, 0.6)',
            filter: 'drop-shadow(0 0 4px rgba(64, 224, 208, 0.4))',
            zIndex: 0,
            pointerEvents: 'none'
          }}
        >
          {['⚙️', '💻', '⚛️', '🌐', '📱', '📊', '💡', '🚀'][Math.floor(Math.random() * 8)]}
        </Box>
      ))}
    </Box>
  );
};

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Animate welcome text and form elements
    const welcomeElements = document.querySelectorAll('.welcome-text');
    const formElements = document.querySelectorAll('.form-element');
    
    welcomeElements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      
      setTimeout(() => {
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 500 + index * 150);
    });
    
    formElements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 800 + index * 100);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message || 'Failed to login. Please try again.');
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Layout>
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 8,
          position: 'relative',
          background: 'linear-gradient(135deg, rgba(30,30,30,1) 0%, rgba(20,20,30,1) 100%)',
          overflow: 'hidden',
        }}
      >
        {/* Background shapes */}
        <Box
          sx={{
            position: 'absolute',
            top: '10%',
            left: '5%',
            width: '250px',
            height: '250px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(63,81,181,0.15) 0%, rgba(63,81,181,0) 70%)',
            filter: 'blur(30px)',
            opacity: 0.5,
            zIndex: 0
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '10%',
            right: '5%',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(64,224,208,0.15) 0%, rgba(245,0,87,0) 70%)',
            filter: 'blur(40px)',
            opacity: 0.4,
            zIndex: 0
          }}
        />
        
        {/* Flying Elements */}
        <FlyingElements />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            {/* Left side: Login form */}
            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{
                  p: 5,
                  borderRadius: 3,
                  backdropFilter: 'blur(10px)',
                  background: 'rgba(30, 30, 30, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
                }}
              >
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                  <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    align="center"
                    className="form-element"
                    sx={{
                      fontWeight: 700,
                      mb: 3,
                      color: '#FFFFFF'
                    }}
                  >
                    Login to SERA
                  </Typography>
                  
                  {error && (
                    <Alert severity="error" sx={{ mb: 3 }} className="form-element">
                      {error}
                    </Alert>
                  )}
                  
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ mb: 3, input: { color: '#FFFFFF' }, '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' } }}
                    className="form-element"
                  />
                  
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                            sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mb: 3, input: { color: '#FFFFFF' }, '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' } }}
                    className="form-element"
                  />
                  
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    className="form-element"
                    sx={{
                      mt: 3,
                      mb: 2,
                      py: 1.5,
                      fontWeight: 600,
                      fontSize: '1rem',
                      backgroundColor: '#3f51b5',
                      background: 'linear-gradient(135deg, #3f51b5 0%, #303f9f 100%)',
                      boxShadow: '0 4px 12px rgba(63, 81, 181, 0.4)',
                      transition: '1s ease',
                      border: '2px solid #303f9f',
                      '&:hover': { 
                        backgroundColor: 'rgba(63, 81, 181, 0)',
                        background: 'rgba(63, 81, 181, 0)',
                        color: '#303f9f',
                      }
                    }}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
                  </Button>
                  
                  <Box sx={{ mt: 3, textAlign: 'center' }} className="form-element">
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Don't have an account?{' '}
                      <Link component={RouterLink} to="/register" sx={{ color: '#3f51b5' }} underline="hover">
                        Register here
                      </Link>
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
            
            {/* Right side: Welcome text */}
            <Grid item xs={12} md={6}>
              <Stack spacing={4} sx={{ p: 3 }}>
                <Typography
                  variant="h1"
                  component="h2"
                  className="welcome-text"
                  sx={{
                    fontWeight: 900,
                    fontSize: { xs: '3.5rem', md: '4rem' },
                    lineHeight: 1,
                    fontFamily: "'Montserrat', sans-serif",
                    color: '#FFFFFF',
                    mb: 2,
                    textShadow: '0 0 15px rgba(64, 224, 208, 0.6)',
                    letterSpacing: '-1px',
                    paddingBottom: '10px',
                    position: 'relative',
                    textAlign: 'center',
                  }}
                >
                  Welcome Back
                </Typography>
                
                <Typography
                  variant="h5"
                  className="welcome-text"
                  sx={{
                    color: '#40e0d0',
                    fontWeight: 600,
                    mb: 3
                  }}
                >
                  Your AI-Powered Learning Journey Continues
                </Typography>
                
                <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.2)' }} className="welcome-text" />
                
                <Typography
                  variant="body1"
                  className="welcome-text"
                  sx={{ 
                    color: '#FFFFFF', 
                    lineHeight: 1.8,
                    mb: 2 
                  }}
                >
                  SERA provides personalized learning paths and adaptive assessments to help you master front-end development skills at your own pace.
                </Typography>
                
                <Box sx={{ pl: 2, borderLeft: '3px solid #40e0d0' }} className="welcome-text">
                  <Typography
                    variant="body1"
                    sx={{ 
                      fontStyle: 'italic',
                      color: '#FFFFFF'
                    }}
                  >
                    "Technology is best when it brings people together."
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ 
                      color: '#AAAAAA',
                      mt: 1
                    }}
                  >
                    — Matt Mullenweg, Developer
                  </Typography>
                </Box>

                <Box sx={{ mt: 4 }} className="welcome-text">
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        bgcolor: '#4eca90',
                        boxShadow: '0 0 8px rgba(78, 202, 144, 0.7)'
                      }}
                    />
                    <Typography
                      variant="body1"
                      sx={{ color: '#FFFFFF' }}
                    >
                      Skill Assessment
                    </Typography>
                  </Stack>
                  
                  <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 1.5 }}>
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        bgcolor: '#4086FF',
                        boxShadow: '0 0 8px rgba(64, 134, 255, 0.7)'
                      }}
                    />
                    <Typography
                      variant="body1"
                      sx={{ color: '#FFFFFF' }}
                    >
                      AI-Powered Learning Paths
                    </Typography>
                  </Stack>
                  
                  <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 1.5 }}>
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        bgcolor: '#a450ff',
                        boxShadow: '0 0 8px rgba(164, 80, 255, 0.7)'
                      }}
                    />
                    <Typography
                      variant="body1"
                      sx={{ color: '#FFFFFF' }}
                    >
                      Industry-Recognized Certifications
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
};

export default Login; 