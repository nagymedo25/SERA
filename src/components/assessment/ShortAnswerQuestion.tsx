import React from 'react';
import { Box, Typography, TextField, Paper } from '@mui/material';
import { ShortAnswerQuestion as ShortAnswerQuestionType } from '../../utils/assessmentData';

interface ShortAnswerQuestionProps {
  question: ShortAnswerQuestionType;
  answer: string;
  onAnswerChange: (answer: string) => void;
}

const ShortAnswerQuestion: React.FC<ShortAnswerQuestionProps> = ({
  question,
  answer,
  onAnswerChange
}) => {
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 4 }}>
        {question.question}
      </Typography>
      
      <Paper
        elevation={2}
        sx={{ 
          p: 2, 
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
          backgroundColor: (theme) => 
            theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'
        }}
      >
        <TextField
          fullWidth
          multiline
          minRows={2}
          maxRows={4}
          variant="outlined"
          placeholder="Type your answer here..."
          value={answer || ''}
          onChange={(e) => onAnswerChange(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'transparent'
              },
              '&:hover fieldset': {
                borderColor: 'transparent'
              },
              '&.Mui-focused fieldset': {
                borderColor: 'transparent'
              }
            }
          }}
        />
      </Paper>
      
      <Typography 
        variant="body2" 
        color="text.secondary" 
        sx={{ mt: 2, fontStyle: 'italic' }}
      >
        {question.caseSensitive 
          ? 'Note: Your answer is case-sensitive.' 
          : 'Note: Your answer is not case-sensitive.'}
      </Typography>
    </Box>
  );
};

export default ShortAnswerQuestion; 