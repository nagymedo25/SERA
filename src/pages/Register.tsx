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
import { Link as RouterLink } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';

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

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const { register, loading } = useAuth();

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

    // Validate inputs
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password should be at least 6 characters long');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      await register(name, email, password);
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
            top: '15%',
            right: '10%',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(63,81,181,0.15) 0%, rgba(63,81,181,0) 70%)',
            filter: 'blur(40px)',
            opacity: 0.5,
            zIndex: 0
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '15%',
            left: '10%',
            width: '250px',
            height: '250px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(64,224,208,0.15) 0%, rgba(245,0,87,0) 70%)',
            filter: 'blur(35px)',
            opacity: 0.4,
            zIndex: 0
          }}
        />
        
        {/* Flying Elements */}
        <FlyingElements />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            {/* Left side: Register form */}
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
                    Create an Account
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
                    id="name"
                    label="Full Name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ mb: 3, input: { color: '#FFFFFF' }, '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' } }}
                    className="form-element"
                  />
                  
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
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
                    autoComplete="new-password"
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
                  
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle confirm password visibility"
                            onClick={handleClickShowConfirmPassword}
                            edge="end"
                            sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mb: 2, input: { color: '#FFFFFF' }, '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' } }}
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
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Account'}
                  </Button>
                  
                  <Box sx={{ mt: 3, textAlign: 'center' }} className="form-element">
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Already have an account?{' '}
                      <Link component={RouterLink} to="/login" sx={{ color: '#3f51b5' }} underline="hover">
                        Login here
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
                  Hello To SERA
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
                  Start Your AI-Powered Learning Journey
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
                  SERA provides a personalized learning experience tailored to your goals. Our AI-powered platform adapts to your learning style to help you master front-end development skills efficiently.
                </Typography>
                
                <Box sx={{ pl: 2, borderLeft: '3px solid #40e0d0' }} className="welcome-text">
                  <Typography
                    variant="body1"
                    sx={{ 
                      fontStyle: 'italic',
                      color: '#FFFFFF'
                    }}
                  >
                    "The beautiful thing about learning is that nobody can take it away from you."
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ 
                      color: '#AAAAAA',
                      mt: 1
                    }}
                  >
                    — B.B. King
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
                      Personalized Learning Paths
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
                      Interactive Coding Challenges
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
                      Real-time Progress Tracking
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

export default Register; 