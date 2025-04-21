import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  TextField,
  Chip,
  CircularProgress,
  useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import ChatIcon from '@mui/icons-material/Chat';
import InterestsIcon from '@mui/icons-material/Interests';
import AssignmentIcon from '@mui/icons-material/Assignment';

const steps = ['Welcome', 'Your Interests', 'Learning Goals'];

const Onboarding: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [experience, setExperience] = useState<string>('');
  const [interests, setInterests] = useState<string[]>([]);
  const [goal, setGoal] = useState<string>('');
  const [interestInput, setInterestInput] = useState<string>('');
  const [loading, setLoading] = useState(false);
  
  const { user, completeOnboarding } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  
  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleComplete = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      completeOnboarding();
      setLoading(false);
      navigate('/assessment');
    }, 1500);
  };

  const handleAddInterest = () => {
    if (interestInput && !interests.includes(interestInput)) {
      setInterests([...interests, interestInput]);
      setInterestInput('');
    }
  };

  const handleDeleteInterest = (interestToDelete: string) => {
    setInterests(interests.filter((interest) => interest !== interestToDelete));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && interestInput) {
      e.preventDefault();
      handleAddInterest();
    }
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ textAlign: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mb: 4,
                mt: 2,
              }}
            >
              <ChatIcon color="primary" sx={{ fontSize: 80, opacity: 0.8 }} />
            </Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
              Welcome to SERA, {user?.name}!
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph sx={{ maxWidth: '600px', mx: 'auto', mb: 4 }}>
              We're excited to have you join our AI-powered learning platform. Let's take a moment to understand
              your background and interests so we can personalize your experience.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleNext}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600
              }}
            >
              Let's Get Started
            </Button>
          </Box>
        );
      case 1:
        return (
          <Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mb: 4,
                mt: 2,
              }}
            >
              <InterestsIcon color="primary" sx={{ fontSize: 60, opacity: 0.8 }} />
            </Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, textAlign: 'center' }}>
              Tell Us About Yourself
            </Typography>
            
            <FormControl component="fieldset" sx={{ width: '100%', mb: 4 }}>
              <FormLabel component="legend" sx={{ mb: 2, color: 'text.primary', fontSize: '1.1rem', fontWeight: 500 }}>
                Your experience level in front-end development?
              </FormLabel>
              <RadioGroup
                aria-label="experience"
                name="experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              >
                <FormControlLabel
                  value="beginner"
                  control={<Radio />}
                  label="Beginner - I'm just starting my journey"
                />
                <FormControlLabel
                  value="intermediate"
                  control={<Radio />}
                  label="Intermediate - I have some experience but want to improve"
                />
                <FormControlLabel
                  value="advanced"
                  control={<Radio />}
                  label="Advanced - I have solid experience and looking to specialize"
                />
              </RadioGroup>
            </FormControl>

            <FormControl sx={{ width: '100%', mb: 4 }}>
              <FormLabel sx={{ mb: 2, color: 'text.primary', fontSize: '1.1rem', fontWeight: 500 }}>
                What technologies are you interested in learning?
              </FormLabel>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="E.g., React, TypeScript, CSS"
                  value={interestInput}
                  onChange={(e) => setInterestInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <Button
                  variant="contained"
                  onClick={handleAddInterest}
                  disabled={!interestInput}
                  sx={{ ml: 1, height: 56 }}
                >
                  Add
                </Button>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {interests.map((interest, index) => (
                  <Chip
                    key={index}
                    label={interest}
                    onDelete={() => handleDeleteInterest(interest)}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
            </FormControl>
          </Box>
        );
      case 2:
        return (
          <Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mb: 4,
                mt: 2,
              }}
            >
              <AssignmentIcon color="primary" sx={{ fontSize: 60, opacity: 0.8 }} />
            </Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, textAlign: 'center' }}>
              Your Learning Goals
            </Typography>
            
            <FormControl component="fieldset" sx={{ width: '100%', mb: 4 }}>
              <FormLabel component="legend" sx={{ mb: 2, color: 'text.primary', fontSize: '1.1rem', fontWeight: 500 }}>
                What's your primary goal with SERA?
              </FormLabel>
              <RadioGroup
                aria-label="goal"
                name="goal"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
              >
                <FormControlLabel
                  value="career"
                  control={<Radio />}
                  label="Career advancement - I want to improve my job prospects"
                />
                <FormControlLabel
                  value="skills"
                  control={<Radio />}
                  label="Skill building - I want to become better at what I do"
                />
                <FormControlLabel
                  value="project"
                  control={<Radio />}
                  label="Project completion - I'm working on a specific project"
                />
                <FormControlLabel
                  value="curiosity"
                  control={<Radio />}
                  label="Curiosity - I'm learning for fun and personal growth"
                />
              </RadioGroup>
            </FormControl>

            <FormControl sx={{ width: '100%', mb: 4 }}>
              <FormLabel sx={{ mb: 2, color: 'text.primary', fontSize: '1.1rem', fontWeight: 500 }}>
                Any specific challenges you're facing in your learning journey?
              </FormLabel>
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="Share any challenges or specific areas you'd like to focus on..."
              />
            </FormControl>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Layout hideFooter>
      <Box
        sx={{
          minHeight: '100vh',
          py: 8,
          background: 'linear-gradient(135deg, rgba(20,20,30,1) 0%, rgba(30,30,50,1) 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Background decorative elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '5%',
            right: '3%',
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(63,81,181,0.15) 0%, rgba(63,81,181,0) 70%)',
            filter: 'blur(50px)',
            opacity: 0.6,
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
            filter: 'blur(45px)',
            opacity: 0.5,
            zIndex: 0
          }}
        />

        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 5 },
              borderRadius: 3,
              backdropFilter: 'blur(10px)',
              background: 'rgba(30, 30, 30, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
            }}
          >
            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <Box>
              {getStepContent(activeStep)}
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Button
                  variant="outlined"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box>
                  {activeStep === steps.length - 1 ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleComplete}
                      disabled={loading || !goal}
                      sx={{
                        px: 4,
                        py: 1.2,
                        fontWeight: 600,
                        minWidth: '150px'
                      }}
                    >
                      {loading ? <CircularProgress size={24} color="inherit" /> : 'Complete'}
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      disabled={
                        (activeStep === 1 && (!experience || interests.length === 0))
                      }
                      sx={{
                        px: 4,
                        py: 1.2,
                        fontWeight: 600
                      }}
                    >
                      Next
                    </Button>
                  )}
                </Box>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Layout>
  );
};

export default Onboarding; 