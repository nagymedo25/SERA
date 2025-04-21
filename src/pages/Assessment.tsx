import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Divider,
  CircularProgress,
  LinearProgress,
  Grid,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Card,
  CardContent,
  IconButton,
  Tooltip
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TimerIcon from '@mui/icons-material/Timer';
import FlagIcon from '@mui/icons-material/Flag';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Confetti from 'react-confetti';
import gsap from 'gsap';
import assessmentQuestions from '../mock/assessmentQuestions';
import QuestionRenderer from '../components/assessment/QuestionRenderer';
import { Question } from '../utils/assessmentData';
import QuestionCard from '../components/QuestionCard';
import { createSampleAssessment, Assessment as AssessmentType } from '../utils/assessmentData';

const Assessment: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [flaggedQuestions, setFlaggedQuestions] = useState<number[]>([]);
  const [openHelpDialog, setOpenHelpDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [assessment, setAssessment] = useState<AssessmentType | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, any>>({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  
  const questions = assessmentQuestions;
  const totalQuestions = questions.length;
  
  // Format time remaining
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitAssessment();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Animation for score reveal
  useEffect(() => {
    if (isCompleted) {
      const scoreElement = document.getElementById('score-display');
      if (scoreElement) {
        gsap.fromTo(
          scoreElement,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 1, ease: "elastic.out(1, 0.3)" }
        );
      }
      setShowConfetti(true);
      const confettiTimer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(confettiTimer);
    }
  }, [isCompleted]);
  
  // Load assessment data
  useEffect(() => {
    const loadedAssessment = createSampleAssessment();
    setAssessment(loadedAssessment);
    
    if (loadedAssessment.timeLimit) {
      setTimeRemaining(loadedAssessment.timeLimit * 60); // Convert to seconds
    }
  }, []);
  
  // Timer countdown
  useEffect(() => {
    if (!assessment || timeRemaining <= 0 || isCompleted) return;
    
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitAssessment();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [assessment, timeRemaining, isCompleted]);
  
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };
  
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };
  
  const handleAnswerChange = (answer: any) => {
    setAnswers(prev => ({ ...prev, [activeStep]: answer }));
  };
  
  const handleFlagQuestion = () => {
    setFlaggedQuestions(prev => 
      prev.includes(activeStep) 
        ? prev.filter(q => q !== activeStep)
        : [...prev, activeStep]
    );
  };
  
  const calculateScore = () => {
    let correctAnswers = 0;
    
    questions.forEach((question, index) => {
      const userAnswer = answers[index];
      
      if (userAnswer !== undefined) {
        // Each question type has its own scoring logic
        if (question.validateAnswer && question.validateAnswer(userAnswer)) {
          correctAnswers++;
        }
      }
    });
    
    return Math.round((correctAnswers / totalQuestions) * 100);
  };
  
  const handleSubmitAssessment = () => {
    setIsSubmitting(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      const finalScore = calculateScore();
      setScore(finalScore);
      setIsCompleted(true);
      setIsSubmitting(false);
    }, 1500);
  };
  
  const handleConfirmSubmit = () => {
    setOpenConfirmDialog(false);
    handleSubmitAssessment();
  };
  
  const handleAnswerSubmit = (questionId: string, answer: any, isCorrect: boolean) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: { answer, isCorrect }
    }));
  };
  
  const handleNextQuestion = () => {
    if (!assessment) return;
    
    if (currentQuestionIndex < assessment.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  // Render the assessment result
  if (isCompleted) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper 
            elevation={6} 
            sx={{ 
              p: 4, 
              textAlign: 'center',
              borderRadius: 2,
              background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
              boxShadow: `0 10px 40px -10px ${theme.palette.primary.main}40`
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom color="primary">
              Assessment Completed!
            </Typography>
            
            <Box sx={{ my: 4 }}>
              <Typography variant="h2" id="score-display" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                {score}%
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
                Your Score
              </Typography>
            </Box>
            
            <Box sx={{ mb: 4 }}>
              <Typography variant="body1" paragraph>
                You've completed the Front-End Developer assessment. Your results and personalized feedback will be available in your dashboard.
              </Typography>
              
              <Grid container spacing={3} sx={{ mt: 2, justifyContent: 'center' }}>
                <Grid item xs={12} sm={6} md={4}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>Questions Answered</Typography>
                      <Typography variant="h4" color="primary">
                        {Object.keys(answers).length}/{totalQuestions}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12} sm={6} md={4}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>Time Taken</Typography>
                      <Typography variant="h4" color="primary">
                        {formatTime(3600 - timeLeft)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12} sm={6} md={4}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>Performance</Typography>
                      <Typography variant="h4" color={score >= 70 ? 'success.main' : score >= 50 ? 'warning.main' : 'error.main'}>
                        {score >= 80 ? 'Excellent' : score >= 70 ? 'Good' : score >= 50 ? 'Average' : 'Needs Improvement'}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
            
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/dashboard')}
              sx={{ mr: 2 }}
            >
              Go to Dashboard
            </Button>
            
            <Button
              variant="outlined"
              size="large"
              onClick={() => {
                setActiveStep(0);
                setIsCompleted(false);
                setShowConfetti(false);
              }}
            >
              Review Answers
            </Button>
          </Paper>
        </motion.div>
      </Container>
    );
  }
  
  if (!assessment) {
    return (
      <Container>
        <Box sx={{ my: 4, display: 'flex', justifyContent: 'center' }}>
          <Typography variant="h4">Loading assessment...</Typography>
        </Box>
      </Container>
    );
  }
  
  const currentQuestion = assessment.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / assessment.questions.length) * 100;
  const questionAnswered = userAnswers[currentQuestion.id] !== undefined;
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper 
        elevation={3}
        sx={{ 
          p: isMobile ? 2 : 4, 
          borderRadius: 2,
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header with progress and timer */}
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" component="h1">
            Front-End Developer Assessment
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Assessment Help">
              <IconButton onClick={() => setOpenHelpDialog(true)} size="small" sx={{ mr: 1 }}>
                <HelpOutlineIcon />
              </IconButton>
            </Tooltip>
            
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              bgcolor: 'action.hover', 
              px: 2, 
              py: 0.5, 
              borderRadius: 2 
            }}>
              <TimerIcon sx={{ mr: 1, color: timeRemaining < 60 ? 'error' : 'inherit' }} />
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: 'medium',
                  color: timeRemaining < 60 ? 'error' : 'inherit'
                }}
              >
                {formatTime(timeRemaining)}
              </Typography>
            </Box>
          </Box>
        </Box>
        
        {/* Progress bar */}
        <Box sx={{ width: '100%', mb: 3 }}>
          <LinearProgress 
            variant="determinate" 
            value={progress} 
            sx={{ height: 8, borderRadius: 4 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Question {currentQuestionIndex + 1} of {assessment.questions.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {Math.round(progress)}% Complete
            </Typography>
          </Box>
        </Box>
        
        {/* Question area */}
        <Box sx={{ flexGrow: 1, mb: 4 }}>
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" component="h2" color="primary" sx={{ display: 'flex', alignItems: 'center' }}>
                <Box component="span" sx={{ 
                  bgcolor: 'primary.main', 
                  color: 'primary.contrastText',
                  borderRadius: '50%',
                  width: 28,
                  height: 28,
                  display: 'inline-flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mr: 1,
                  fontSize: '0.875rem'
                }}>
                  {currentQuestionIndex + 1}
                </Box>
                {currentQuestion.category} - {currentQuestion.difficulty}
              </Typography>
              
              <Tooltip title={flaggedQuestions.includes(currentQuestionIndex) ? "Unflag Question" : "Flag Question for Review"}>
                <IconButton 
                  onClick={() => handleFlagQuestion()}
                  color={flaggedQuestions.includes(currentQuestionIndex) ? "primary" : "default"}
                  aria-label="flag question"
                >
                  {flaggedQuestions.includes(currentQuestionIndex) ? <FlagIcon /> : <FlagIcon />}
                </IconButton>
              </Tooltip>
            </Box>
            
            <QuestionCard
              question={currentQuestion}
              onSubmitAnswer={handleAnswerSubmit}
              previousAnswer={userAnswers[currentQuestion.id]?.answer}
            />
          </motion.div>
        </Box>
        
        {/* Navigation buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 2, borderTop: 1, borderColor: 'divider' }}>
          <Button
            color="inherit"
            disabled={currentQuestionIndex === 0}
            onClick={handlePreviousQuestion}
            startIcon={<ArrowBackIcon />}
          >
            Previous
          </Button>
          
          <Box>
            {currentQuestionIndex === assessment.questions.length - 1 ? (
              <Button
                variant="contained"
                color="primary"
                endIcon={<CheckCircleIcon />}
                onClick={() => setOpenConfirmDialog(true)}
              >
                Submit Assessment
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNextQuestion}
                endIcon={<ArrowForwardIcon />}
              >
                Next
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
      
      {/* Navigation stepper for desktop */}
      {!isMobile && (
        <Paper elevation={2} sx={{ mt: 2, p: 2, borderRadius: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>Question Navigation</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {assessment.questions.map((_, index) => (
              <Button
                key={index}
                size="small"
                variant={index === currentQuestionIndex ? "contained" : "outlined"}
                color={
                  flaggedQuestions.includes(index) 
                    ? "warning" 
                    : userAnswers[assessment.questions[index].id] !== undefined 
                      ? "success" 
                      : index === currentQuestionIndex 
                        ? "primary" 
                        : "inherit"
                }
                onClick={() => setCurrentQuestionIndex(index)}
                sx={{ 
                  minWidth: 36, 
                  height: 36,
                  borderRadius: '50%',
                  p: 0
                }}
              >
                {index + 1}
              </Button>
            ))}
          </Box>
        </Paper>
      )}
      
      {/* Help Dialog */}
      <Dialog
        open={openHelpDialog}
        onClose={() => setOpenHelpDialog(false)}
        aria-labelledby="help-dialog-title"
      >
        <DialogTitle id="help-dialog-title">Assessment Help</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="subtitle1" paragraph>How to use the assessment interface:</Typography>
            <Typography paragraph>• Use the Next and Previous buttons to navigate between questions.</Typography>
            <Typography paragraph>• Flag questions for review by clicking the flag icon.</Typography>
            <Typography paragraph>• Your answers are automatically saved as you progress.</Typography>
            <Typography paragraph>• The timer in the top right shows your remaining time.</Typography>
            <Typography paragraph>• You can navigate directly to any question using the number buttons at the bottom.</Typography>
            <Typography paragraph>• Different question types have different interaction methods - follow the instructions for each question.</Typography>
            <Typography paragraph>• Submit your assessment when you are finished, or it will be automatically submitted when the timer runs out.</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenHelpDialog(false)} color="primary">
            Got it
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Confirmation Dialog */}
      <Dialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        aria-labelledby="confirm-dialog-title"
      >
        <DialogTitle id="confirm-dialog-title">Submit Assessment?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are about to submit your assessment. You have answered {Object.keys(userAnswers).length} out of {assessment.questions.length} questions.
            {Object.keys(userAnswers).length < assessment.questions.length && 
              ` There are ${assessment.questions.length - Object.keys(userAnswers).length} unanswered questions.`
            }
            {flaggedQuestions.length > 0 && 
              ` You have flagged ${flaggedQuestions.length} question(s) for review.`
            }
            
            Are you sure you want to submit?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)} color="inherit">
            Cancel
          </Button>
          <Button 
            onClick={handleSubmitAssessment} 
            color="primary" 
            disabled={isSubmitting}
            startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Assessment; 