import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
  Paper,
  SelectChangeEvent
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';

const ContactSection: React.FC = () => {
  const theme = useTheme();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    submitted: false,
    loading: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    setFormState(prev => ({ ...prev, subject: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState(prev => ({ ...prev, loading: true }));
    
    // Simulate form submission
    setTimeout(() => {
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: '',
        submitted: true,
        loading: false
      });
      
      // Reset submitted state after 5 seconds
      setTimeout(() => {
        setFormState(prev => ({ ...prev, submitted: false }));
      }, 5000);
    }, 1500);
  };

  return (
    <Box
      id="contact"
      sx={{
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
        zIndex: 2
      }}
    >
      <Container maxWidth="lg">
        {/* Section header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h3" component="h2" className="section-title">
            Get In Touch
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              maxWidth: '700px',
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.1rem' }
            }}
          >
            Have questions or feedback? We'd love to hear from you.
          </Typography>
        </Box>

        <Grid container spacing={6} alignItems="center">
          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <Paper
              elevation={0}
              sx={{
                background: 'rgba(30, 30, 40, 0.75)',
                backdropFilter: 'blur(10px)',
                borderRadius: 4,
                border: '1px solid rgba(255, 255, 255, 0.07)',
                p: { xs: 3, md: 5 },
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
                }
              }}
            >
              {/* Decorative elements */}
              <Box
                sx={{
                  position: 'absolute',
                  top: -100,
                  right: -100,
                  width: 200,
                  height: 200,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(63,81,181,0.1) 0%, rgba(63,81,181,0) 70%)',
                  filter: 'blur(40px)',
                  zIndex: 0
                }}
              />
              
              <Box
                sx={{
                  position: 'absolute',
                  bottom: -80,
                  left: -80,
                  width: 160,
                  height: 160,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(245,0,87,0.1) 0%, rgba(245,0,87,0) 70%)',
                  filter: 'blur(30px)',
                  zIndex: 0
                }}
              />
              
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Typography variant="h5" fontWeight="bold" mb={3}>
                  Send us a message
                </Typography>
                
                {formState.submitted ? (
                  <Box
                    sx={{
                      textAlign: 'center',
                      py: 6,
                      animation: 'fadeIn 0.5s'
                    }}
                  >
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        background: theme.palette.primary.main,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 20px',
                        boxShadow: `0 0 0 10px ${theme.palette.primary.main}20`
                      }}
                    >
                      <SendIcon
                        sx={{
                          color: 'white',
                          fontSize: 40,
                          transform: 'rotate(-30deg)'
                        }}
                      />
                    </Box>
                    <Typography variant="h5" gutterBottom>
                      Message Sent!
                    </Typography>
                    <Typography color="text.secondary">
                      Thank you for reaching out. We'll get back to you shortly.
                    </Typography>
                  </Box>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Your Name"
                          name="name"
                          variant="outlined"
                          fullWidth
                          required
                          value={formState.name}
                          onChange={handleChange}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: 'rgba(255,255,255,0.1)'
                              },
                              '&:hover fieldset': {
                                borderColor: 'rgba(255,255,255,0.2)'
                              }
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Email Address"
                          name="email"
                          type="email"
                          variant="outlined"
                          fullWidth
                          required
                          value={formState.email}
                          onChange={handleChange}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: 'rgba(255,255,255,0.1)'
                              },
                              '&:hover fieldset': {
                                borderColor: 'rgba(255,255,255,0.2)'
                              }
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl
                          fullWidth
                          variant="outlined"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: 'rgba(255,255,255,0.1)'
                              },
                              '&:hover fieldset': {
                                borderColor: 'rgba(255,255,255,0.2)'
                              }
                            }
                          }}
                        >
                          <InputLabel>Subject</InputLabel>
                          <Select
                            value={formState.subject}
                            onChange={handleSelectChange}
                            label="Subject"
                            name="subject"
                            required
                          >
                            <MenuItem value="general">General Inquiry</MenuItem>
                            <MenuItem value="support">Technical Support</MenuItem>
                            <MenuItem value="billing">Billing Question</MenuItem>
                            <MenuItem value="partnership">Partnership Opportunity</MenuItem>
                            <MenuItem value="feedback">Feedback</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Your Message"
                          name="message"
                          variant="outlined"
                          multiline
                          rows={5}
                          fullWidth
                          required
                          value={formState.message}
                          onChange={handleChange}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: 'rgba(255,255,255,0.1)'
                              },
                              '&:hover fieldset': {
                                borderColor: 'rgba(255,255,255,0.2)'
                              }
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          size="large"
                          disabled={formState.loading}
                          endIcon={<SendIcon />}
                          sx={{
                            py: 1.5,
                            px: 4,
                            position: 'relative',
                            overflow: 'hidden',
                            '&::after': {
                              content: '""',
                              position: 'absolute',
                              top: 0,
                              left: '-100%',
                              width: '100%',
                              height: '100%',
                              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                              animation: formState.loading ? 'none' : 'shimmer 2s infinite'
                            }
                          }}
                        >
                          {formState.loading ? 'Sending...' : 'Send Message'}
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                )}
              </Box>
            </Paper>
          </Grid>

          {/* Contact Info + SERA Logo */}
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                justifyContent: 'space-between'
              }}
            >
              {/* SERA Logo */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mb: 6
                }}
              >
                <Box
                  sx={{
                    width: 280,
                    height: 280,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    animation: 'float 6s ease-in-out infinite'
                  }}
                >
                  {/* Glow effect */}
                  <Box
                    sx={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(63,81,181,0.2) 0%, rgba(63,81,181,0) 70%)',
                      filter: 'blur(20px)',
                      animation: 'pulse 4s ease-in-out infinite'
                    }}
                  />
                  
                  {/* SERA Logo */}
                  <Typography
                    variant="h1"
                    sx={{
                      fontWeight: 900,
                      fontSize: '5rem',
                      background: 'linear-gradient(135deg, #3f51b5 0%, #f50057 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      filter: 'drop-shadow(0 0 20px rgba(63,81,181,0.4))',
                      letterSpacing: '3px'
                    }}
                  >
                    SERA
                  </Typography>
                </Box>
              </Box>

              {/* Contact Info */}
              <Paper
                elevation={0}
                sx={{
                  background: 'rgba(30, 30, 40, 0.6)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 4,
                  border: '1px solid rgba(255, 255, 255, 0.07)',
                  p: 4,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 15px 30px rgba(0,0,0,0.2)'
                  }
                }}
              >
                <Typography variant="h5" fontWeight="bold" mb={3}>
                  Contact Information
                </Typography>

                <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      background: 'rgba(63,81,181,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2
                    }}
                  >
                    <EmailIcon color="primary" />
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Email
                    </Typography>
                    <Typography variant="body1">
                      <a 
                        href="nagymedo25@gmail.com"
                        style={{ 
                          color: theme.palette.primary.main,
                          textDecoration: 'none'
                        }}
                      >
                        nagymedo25@gmail.com
                      </a>
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      background: 'rgba(233,30,99,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2
                    }}
                  >
                    <PhoneIcon sx={{ color: theme.palette.secondary.main }} />
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Phone
                    </Typography>
                    <Typography variant="body1">
                      <a 
                        href="tel:+201091506554"
                        style={{ 
                          color: theme.palette.text.primary,
                          textDecoration: 'none'
                        }}
                      >
                        +20 1091506554
                      </a>
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      background: 'rgba(76,175,80,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2
                    }}
                  >
                    <LocationOnIcon sx={{ color: '#4CAF50' }} />
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Address
                    </Typography>
                    <Typography variant="body1">
                      Dakahlya , Mansoura
                      <br />
                      Iprahim Elhagrasy Street
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactSection; 