import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Select, 
  MenuItem, 
  FormControl,
  FormHelperText,
  Grid,
  useTheme
} from '@mui/material';
import { MatchingQuestion as MatchingQuestionType } from '../../utils/assessmentData';

interface MatchingQuestionProps {
  question: MatchingQuestionType;
  answer: number[];
  onAnswerChange: (answer: number[]) => void;
}

const MatchingQuestion: React.FC<MatchingQuestionProps> = ({
  question,
  answer = [],
  onAnswerChange
}) => {
  const theme = useTheme();
  
  // Initialize matches if no answer provided
  const [matches, setMatches] = useState<(number | null)[]>(() => {
    if (answer && answer.length === question.terms.length) {
      return [...answer];
    }
    return Array(question.terms.length).fill(null);
  });

  // Handle selection change for a term
  const handleSelectChange = (index: number, value: number | null) => {
    const newMatches = [...matches];

    // If this definition is already matched to another term, clear that match
    const existingMatchIndex = newMatches.findIndex(match => match === value);
    if (existingMatchIndex !== -1 && existingMatchIndex !== index) {
      newMatches[existingMatchIndex] = null;
    }

    // Set the new match
    newMatches[index] = value;
    setMatches(newMatches);
    onAnswerChange(newMatches.map(m => m === null ? -1 : m));
  };

  // Check if a definition is already selected
  const isDefinitionSelected = (defIndex: number) => {
    return matches.includes(defIndex);
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 3 }}>
        {question.question}
      </Typography>
      
      <Typography 
        variant="body2"
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        Match each term on the left with its correct definition on the right.
      </Typography>
      
      <Box sx={{ mb: 4 }}>
        {question.terms.map((term, index) => (
          <Paper
            key={index}
            sx={{
              p: 2,
              mb: 2,
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: 1,
              overflow: 'hidden'
            }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={5}>
                <Typography 
                  variant="body1" 
                  fontWeight="medium"
                  sx={{ 
                    p: 1,
                    borderRadius: 1,
                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'
                  }}
                >
                  {term}
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={2} sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  matches with
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={5}>
                <FormControl fullWidth>
                  <Select
                    value={matches[index] === null ? '' : matches[index]}
                    onChange={(e) => handleSelectChange(index, e.target.value as number)}
                    displayEmpty
                    sx={{
                      '& .MuiSelect-select': {
                        py: 1,
                      }
                    }}
                  >
                    <MenuItem value="">
                      <em>Select a definition</em>
                    </MenuItem>
                    {question.definitions.map((definition, defIndex) => (
                      <MenuItem 
                        key={defIndex} 
                        value={defIndex}
                        disabled={isDefinitionSelected(defIndex) && matches[index] !== defIndex}
                      >
                        {definition}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    {matches[index] !== null 
                      ? 'Selected definition' 
                      : 'Choose the matching definition'
                    }
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default MatchingQuestion; 