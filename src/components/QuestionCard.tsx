import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Radio, 
  RadioGroup, 
  FormControlLabel, 
  FormControl, 
  FormLabel,
  TextField,
  Button,
  Chip,
  Divider,
  styled
} from '@mui/material';
import CodeEditor from './CodeEditor';
import { Question, QuestionType } from '../utils/assessmentData';

interface QuestionCardProps {
  question: Question;
  onSubmitAnswer: (questionId: string, answer: any, isCorrect: boolean) => void;
  previousAnswer?: any;
}

const StyledQuestionPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
}));

const QuestionHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const QuestionCard: React.FC<QuestionCardProps> = ({ 
  question, 
  onSubmitAnswer,
  previousAnswer
}) => {
  const [answer, setAnswer] = useState<any>(previousAnswer || null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  
  useEffect(() => {
    if (previousAnswer) {
      setAnswer(previousAnswer);
      setIsSubmitted(true);
    } else {
      setAnswer(null);
      setIsSubmitted(false);
    }
  }, [previousAnswer, question.id]);
  
  const handleSubmit = () => {
    if (!answer) return;
    
    let correct = false;
    
    switch (question.type) {
      case QuestionType.MULTIPLE_CHOICE:
        correct = answer === question.correctAnswer;
        break;
      case QuestionType.TRUE_FALSE:
        correct = answer === question.correctAnswer;
        break;
      case QuestionType.CODE_COMPLETION:
        // For simplicity, we'll check if the code contains certain keywords
        // In a real app, you might want to run tests against the code
        correct = question.validateAnswer(answer);
        break;
      case QuestionType.BUG_FIX:
        correct = question.validateAnswer(answer);
        break;
      default:
        break;
    }
    
    setIsCorrect(correct);
    setIsSubmitted(true);
    onSubmitAnswer(question.id, answer, correct);
  };
  
  const renderQuestionContent = () => {
    switch (question.type) {
      case QuestionType.MULTIPLE_CHOICE:
        return (
          <FormControl component="fieldset" sx={{ width: '100%' }}>
            <FormLabel component="legend" sx={{ mb: 2 }}>Select the correct answer:</FormLabel>
            <RadioGroup
              value={answer || ''}
              onChange={(e) => setAnswer(e.target.value)}
            >
              {question.options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option}
                  control={<Radio />}
                  label={option}
                  disabled={isSubmitted}
                  sx={{ 
                    mb: 1, 
                    p: 1, 
                    borderRadius: 1,
                    backgroundColor: isSubmitted && option === question.correctAnswer 
                      ? 'rgba(76, 175, 80, 0.1)' 
                      : isSubmitted && option === answer && option !== question.correctAnswer
                      ? 'rgba(244, 67, 54, 0.1)'
                      : 'transparent'
                  }}
                />
              ))}
            </RadioGroup>
          </FormControl>
        );
        
      case QuestionType.TRUE_FALSE:
        return (
          <FormControl component="fieldset" sx={{ width: '100%' }}>
            <FormLabel component="legend" sx={{ mb: 2 }}>True or False:</FormLabel>
            <RadioGroup
              value={answer !== null ? answer.toString() : ''}
              onChange={(e) => setAnswer(e.target.value === 'true')}
            >
              <FormControlLabel
                value="true"
                control={<Radio />}
                label="True"
                disabled={isSubmitted}
                sx={{ 
                  mb: 1, 
                  p: 1, 
                  borderRadius: 1,
                  backgroundColor: isSubmitted && question.correctAnswer === true
                    ? 'rgba(76, 175, 80, 0.1)' 
                    : isSubmitted && answer === true && question.correctAnswer !== true
                    ? 'rgba(244, 67, 54, 0.1)'
                    : 'transparent'
                }}
              />
              <FormControlLabel
                value="false"
                control={<Radio />}
                label="False"
                disabled={isSubmitted}
                sx={{ 
                  mb: 1, 
                  p: 1, 
                  borderRadius: 1,
                  backgroundColor: isSubmitted && question.correctAnswer === false
                    ? 'rgba(76, 175, 80, 0.1)' 
                    : isSubmitted && answer === false && question.correctAnswer !== false
                    ? 'rgba(244, 67, 54, 0.1)'
                    : 'transparent'
                }}
              />
            </RadioGroup>
          </FormControl>
        );
        
      case QuestionType.CODE_COMPLETION:
        return (
          <Box>
            <Typography variant="body1" gutterBottom>
              Complete the following code:
            </Typography>
            <Box sx={{ mb: 3, p: 2, backgroundColor: 'rgba(0, 0, 0, 0.04)', borderRadius: 1 }}>
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                <code>{question.codeSnippet}</code>
              </pre>
            </Box>
            <CodeEditor
              initialValue={answer || question.starterCode || ''}
              onChange={(code) => setAnswer(code)}
              readOnly={isSubmitted}
              language="javascript"
            />
          </Box>
        );
        
      case QuestionType.BUG_FIX:
        return (
          <Box>
            <Typography variant="body1" gutterBottom>
              Fix the bug in the following code:
            </Typography>
            <Box sx={{ mb: 3, p: 2, backgroundColor: 'rgba(0, 0, 0, 0.04)', borderRadius: 1 }}>
              <Typography variant="body2" color="error" gutterBottom>
                {question.bugDescription}
              </Typography>
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                <code>{question.buggyCode}</code>
              </pre>
            </Box>
            <CodeEditor
              initialValue={answer || question.buggyCode || ''}
              onChange={(code) => setAnswer(code)}
              readOnly={isSubmitted}
              language="javascript"
            />
          </Box>
        );
        
      default:
        return <Typography>Unsupported question type</Typography>;
    }
  };
  
  return (
    <StyledQuestionPaper>
      <QuestionHeader>
        <Box>
          <Chip 
            label={`${question.points} points`} 
            size="small" 
            color="primary" 
            variant="outlined" 
            sx={{ mr: 1 }} 
          />
          <Chip 
            label={question.difficulty} 
            size="small" 
            color={
              question.difficulty === 'BEGINNER' ? 'success' : 
              question.difficulty === 'INTERMEDIATE' ? 'warning' : 'error'
            }
            variant="outlined"
            sx={{ mr: 1 }}
          />
          <Chip 
            label={question.category} 
            size="small" 
            color="default" 
            variant="outlined" 
          />
        </Box>
        
        {isSubmitted && (
          <Chip 
            label={isCorrect ? 'Correct' : 'Incorrect'} 
            color={isCorrect ? 'success' : 'error'} 
          />
        )}
      </QuestionHeader>
      
      <Typography variant="h6" component="h2" gutterBottom>
        {question.text}
      </Typography>
      
      <Box sx={{ my: 3 }}>
        {renderQuestionContent()}
      </Box>
      
      {!isSubmitted && (
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSubmit}
          disabled={answer === null || answer === ''}
          fullWidth
        >
          Submit Answer
        </Button>
      )}
      
      {isSubmitted && question.feedback && (
        <Box sx={{ mt: 3, p: 2, backgroundColor: 'rgba(0, 0, 0, 0.04)', borderRadius: 1 }}>
          <Typography variant="subtitle1" gutterBottom>
            Feedback:
          </Typography>
          <Typography variant="body2">
            {question.feedback}
          </Typography>
        </Box>
      )}
    </StyledQuestionPaper>
  );
};

export default QuestionCard; 