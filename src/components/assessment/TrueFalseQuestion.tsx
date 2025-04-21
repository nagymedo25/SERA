import React from 'react';
import {
  Box,
  Typography,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { TrueFalseQuestion as TrueFalseQuestionType } from '../../utils/assessmentData';

interface TrueFalseQuestionProps {
  question: TrueFalseQuestionType;
  answer?: boolean;
  onAnswerSelect: (answer: boolean) => void;
}

const TrueFalseQuestion: React.FC<TrueFalseQuestionProps> = ({
  question,
  answer,
  onAnswerSelect
}) => {
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 4 }}>
        {question.statement}
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <ToggleButtonGroup
          value={answer}
          exclusive
          onChange={(_, newValue) => {
            if (newValue !== null) {
              onAnswerSelect(newValue);
            }
          }}
          aria-label="true or false"
          sx={{ width: '100%', maxWidth: 400, mx: 'auto' }}
        >
          <ToggleButton 
            value={true}
            aria-label="true"
            sx={{ 
              py: 3,
              flex: 1,
              borderRadius: '8px 0 0 8px',
              bgcolor: answer === true ? 'rgba(76, 175, 80, 0.1)' : 'transparent',
              borderColor: answer === true ? 'primary.main' : 'divider',
              color: answer === true ? 'primary.main' : 'text.primary',
              '&.Mui-selected': {
                bgcolor: 'rgba(76, 175, 80, 0.1)',
                '&:hover': {
                  bgcolor: 'rgba(76, 175, 80, 0.2)',
                }
              }
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <CheckIcon sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">True</Typography>
            </Box>
          </ToggleButton>
          
          <ToggleButton 
            value={false}
            aria-label="false"
            sx={{ 
              py: 3,
              flex: 1,
              borderRadius: '0 8px 8px 0',
              bgcolor: answer === false ? 'rgba(244, 67, 54, 0.1)' : 'transparent',
              borderColor: answer === false ? 'error.main' : 'divider',
              color: answer === false ? 'error.main' : 'text.primary',
              '&.Mui-selected': {
                bgcolor: 'rgba(244, 67, 54, 0.1)',
                '&:hover': {
                  bgcolor: 'rgba(244, 67, 54, 0.2)',
                }
              }
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <CloseIcon sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">False</Typography>
            </Box>
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Box>
  );
};

export default TrueFalseQuestion; 