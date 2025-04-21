import React, { useState } from 'react';
import { Box, Paper, Typography, Stepper, Step, StepLabel, Button, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import QuestionCard from './QuestionCard';
import { Question } from '../utils/assessmentData';

interface AssessmentContainerProps {
  title: string;
  description?: string;
  questions: Question[];
  onComplete: (results: AssessmentResult) => void;
}

export interface AssessmentResult {
  totalPoints: number;
  earnedPoints: number;
  percentage: number;
  answeredQuestions: {
    questionId: string;
    correct: boolean;
    earnedPoints: number;
  }[];
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
}));

const AssessmentContainer: React.FC<AssessmentContainerProps> = ({
  title,
  description,
  questions,
  onComplete,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [results, setResults] = useState<AssessmentResult>({
    totalPoints: questions.reduce((sum, q) => sum + q.points, 0),
    earnedPoints: 0,
    percentage: 0,
    answeredQuestions: [],
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleQuestionSubmit = (questionId: string, correct: boolean, pointsEarned: number) => {
    setSubmitting(true);
    
    // Update results
    const updatedAnsweredQuestions = [
      ...results.answeredQuestions.filter(aq => aq.questionId !== questionId),
      { questionId, correct, earnedPoints: pointsEarned }
    ];
    
    const earnedPoints = updatedAnsweredQuestions.reduce((sum, aq) => sum + aq.earnedPoints, 0);
    const percentage = (earnedPoints / results.totalPoints) * 100;
    
    setResults({
      ...results,
      earnedPoints,
      percentage,
      answeredQuestions: updatedAnsweredQuestions,
    });
    
    // Simulate network delay
    setTimeout(() => {
      setSubmitting(false);
      if (activeStep < questions.length - 1) {
        handleNext();
      }
    }, 800);
  };

  const handleComplete = () => {
    onComplete(results);
  };

  const isLastQuestion = activeStep === questions.length - 1;
  const currentQuestion = questions[activeStep];

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        {title}
      </Typography>
      
      {description && (
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          {description}
        </Typography>
      )}
      
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4, mt: 3 }}>
        {questions.map((question, index) => (
          <Step key={question.id}>
            <StepLabel>Question {index + 1}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      <StyledPaper>
        {activeStep < questions.length ? (
          <QuestionCard
            question={currentQuestion}
            onSubmit={(answer, correct, pointsEarned) => handleQuestionSubmit(currentQuestion.id, correct, pointsEarned)}
          />
        ) : (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h5" gutterBottom>
              Assessment Complete!
            </Typography>
            <Typography variant="h4" color="primary" sx={{ mb: 2 }}>
              Score: {results.earnedPoints} / {results.totalPoints} ({Math.round(results.percentage)}%)
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleComplete}
              size="large"
            >
              View Detailed Results
            </Button>
          </Box>
        )}
      </StyledPaper>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button
          variant="outlined"
          disabled={activeStep === 0 || submitting}
          onClick={handleBack}
        >
          Back
        </Button>
        
        {!isLastQuestion && activeStep < questions.length && (
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={
              !results.answeredQuestions.some(aq => aq.questionId === currentQuestion.id) ||
              submitting
            }
          >
            {submitting ? <CircularProgress size={24} /> : 'Next'}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default AssessmentContainer; 