import React from 'react';
import {
  Box,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Paper
} from '@mui/material';
import { MultipleChoiceQuestion as MultipleChoiceQuestionType } from '../../utils/assessmentData';

interface MultipleChoiceQuestionProps {
  question: MultipleChoiceQuestionType;
  selectedAnswer?: number;
  onAnswerSelect: (answerIndex: number) => void;
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  question,
  selectedAnswer,
  onAnswerSelect
}) => {
  // Handle newlines in the question text
  const formattedQuestion = question.question
    .replace(/```.*?```/gs, (match) => {
      return `<div class="code-block">${match.substring(3, match.length - 3)}</div>`;
    });

  return (
    <Box>
      <Typography 
        variant="h6" 
        dangerouslySetInnerHTML={{ __html: formattedQuestion }} 
        sx={{ 
          mb: 4,
          '& .code-block': {
            fontFamily: 'monospace',
            bgcolor: (theme) => theme.palette.mode === 'dark' ? '#2d2d2d' : '#f5f5f5',
            p: 2,
            borderRadius: 1,
            overflowX: 'auto',
            my: 2
          }
        }}
      />
      
      <FormControl component="fieldset" sx={{ width: '100%' }}>
        <RadioGroup
          value={selectedAnswer !== undefined ? selectedAnswer : ''}
          onChange={(e) => onAnswerSelect(parseInt(e.target.value))}
        >
          {question.options.map((option, index) => (
            <Paper
              key={index}
              elevation={selectedAnswer === index ? 2 : 0}
              sx={{ 
                mb: 2, 
                borderRadius: 2,
                border: '1px solid',
                borderColor: (theme) => 
                  selectedAnswer === index
                    ? theme.palette.primary.main
                    : 'rgba(255, 255, 255, 0.1)',
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: (theme) => theme.palette.primary.main,
                  backgroundColor: 'rgba(255, 255, 255, 0.05)'
                }
              }}
            >
              <FormControlLabel
                value={index}
                control={
                  <Radio 
                    color="primary" 
                    sx={{ 
                      color: (theme) => 
                        selectedAnswer === index ? theme.palette.primary.main : undefined
                    }}
                  />
                }
                label={
                  <Typography 
                    variant="body1"
                    sx={{ py: 1 }}
                  >
                    {option}
                  </Typography>
                }
                sx={{ 
                  px: 2, 
                  py: 1,
                  width: '100%',
                  margin: 0,
                }}
              />
            </Paper>
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default MultipleChoiceQuestion; 