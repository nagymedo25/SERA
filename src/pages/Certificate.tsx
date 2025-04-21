import React, { useRef } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Divider,
  Grid,
  useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VerifiedIcon from '@mui/icons-material/Verified';

const Certificate: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const certificateRef = useRef<HTMLDivElement>(null);

  // Format current date
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const currentDate = formatDate(new Date());
  
  // Generate certificate ID
  const certificateId = `SERA-FE-${Math.floor(100000 + Math.random() * 900000)}`;

  // Handle certificate download
  const handleDownload = () => {
    // In a real application, this would generate a PDF or image file
    alert('Certificate download functionality would be implemented here');
  };

  // Handle certificate sharing
  const handleShare = () => {
    // In a real application, this would open a sharing dialog
    alert('Certificate sharing functionality would be implemented here');
  };

  // Navigate back to dashboard
  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  // If user hasn't passed assessment, redirect to dashboard
  if (!user?.assessmentScore || user.assessmentScore < 70) {
    return (
      <Layout>
        <Container maxWidth="md" sx={{ py: 10 }}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 3,
              textAlign: 'center',
              backdropFilter: 'blur(10px)',
              background: 'rgba(30, 30, 30, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
            }}
          >
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
              Certificate Not Available
            </Typography>
            <Typography variant="body1" paragraph color="text.secondary">
              You need to pass the Front-End assessment with a score of 70% or higher
              to receive your certificate.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/assessment')}
              sx={{ mt: 2 }}
            >
              Take Assessment
            </Button>
          </Paper>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box
        sx={{
          py: 8,
          background: 'linear-gradient(135deg, rgba(30,30,30,1) 0%, rgba(20,20,30,1) 100%)',
          minHeight: '90vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Background elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '10%',
            right: '5%',
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
            bottom: '10%',
            left: '5%',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245,0,87,0.1) 0%, rgba(245,0,87,0) 70%)',
            filter: 'blur(50px)',
            opacity: 0.4,
            zIndex: 0
          }}
        />
        
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
              Your Certificate of Achievement
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Congratulations on successfully completing the Front-End Development assessment.
            </Typography>
          </Box>
          
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 4 },
              borderRadius: 3,
              position: 'relative',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
              border: '2px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(5px)',
              overflow: 'hidden'
            }}
          >
            {/* Certificate watermark */}
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 0,
                opacity: 0.05,
                width: '80%',
                height: 'auto',
                pointerEvents: 'none'
              }}
            >
              <Typography variant="h1" sx={{ fontSize: '18rem', fontWeight: 900 }}>
                SERA
              </Typography>
            </Box>
            
            {/* Actual Certificate Content */}
            <Box 
              ref={certificateRef}
              sx={{ 
                p: { xs: 3, sm: 5 },
                position: 'relative',
                zIndex: 1
              }}
            >
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 800,
                    letterSpacing: 2,
                    fontSize: { xs: '1.2rem', sm: '1.5rem' },
                    background: 'linear-gradient(90deg, #3f51b5 0%, #f50057 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  SERA - AI-POWERED LEARNING PLATFORM
                </Typography>
                
                <Typography
                  variant="h3"
                  component="h2"
                  gutterBottom
                  sx={{ 
                    mt: 2, 
                    fontWeight: 700,
                    fontSize: { xs: '1.8rem', sm: '2.5rem' }
                  }}
                >
                  Certificate of Achievement
                </Typography>
                
                <Typography variant="body1" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
                  This certifies that
                </Typography>
              </Box>
              
              <Box sx={{ textAlign: 'center', my: 5 }}>
                <Typography
                  variant="h4"
                  sx={{ 
                    fontWeight: 700,
                    fontSize: { xs: '1.5rem', sm: '2rem' }
                  }}
                >
                  {user?.name || 'Student Name'}
                </Typography>
                <Divider sx={{ width: '60%', mx: 'auto', my: 2 }} />
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  has successfully completed the assessment and requirements for
                </Typography>
              </Box>
              
              <Box sx={{ textAlign: 'center', my: 5 }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 600,
                    fontSize: { xs: '1.4rem', sm: '1.8rem' }
                  }}
                >
                  Front-End Development Certification
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                  with a score of
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    mt: 1,
                    color: theme.palette.primary.main
                  }}
                >
                  {user?.assessmentScore}%
                </Typography>
              </Box>
              
              <Grid container spacing={2} sx={{ mt: 5 }}>
                <Grid item xs={6} sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Issue Date
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {currentDate}
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Certificate ID
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {certificateId}
                  </Typography>
                </Grid>
              </Grid>
              
              <Box sx={{ mt: 6, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <VerifiedIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  This certificate can be verified online at sera.com/verify
                </Typography>
              </Box>
            </Box>
          </Paper>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
            <Button 
              variant="outlined" 
              startIcon={<ArrowBackIcon />} 
              onClick={handleBackToDashboard}
            >
              Back to Dashboard
            </Button>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<DownloadIcon />} 
              onClick={handleDownload}
            >
              Download Certificate
            </Button>
            <Button 
              variant="outlined" 
              color="primary" 
              startIcon={<ShareIcon />} 
              onClick={handleShare}
            >
              Share
            </Button>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default Certificate; 