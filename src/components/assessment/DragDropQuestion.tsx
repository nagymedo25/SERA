import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  IconButton,
  useTheme
} from '@mui/material';
import { DragDropQuestion as DragDropQuestionType } from '../../utils/assessmentData';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

interface DragDropQuestionProps {
  question: DragDropQuestionType;
  answer: number[];
  onAnswerChange: (answer: number[]) => void;
}

const DragDropQuestion: React.FC<DragDropQuestionProps> = ({
  question,
  answer = [],
  onAnswerChange
}) => {
  const theme = useTheme();
  // Initialize items if no answer is provided
  const [items, setItems] = useState<number[]>(() => {
    if (answer && answer.length === question.items.length) {
      return [...answer];
    }
    
    // Create a shuffled array of indices
    const indices = question.items.map((_, i) => i);
    // Fisher-Yates shuffle
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
  });

  // Update answer when items change
  useEffect(() => {
    onAnswerChange(items);
  }, [items, onAnswerChange]);

  // Move an item up in the list
  const moveUp = (index: number) => {
    if (index <= 0) return;
    
    const newItems = [...items];
    [newItems[index], newItems[index - 1]] = [newItems[index - 1], newItems[index]];
    setItems(newItems);
  };

  // Move an item down in the list
  const moveDown = (index: number) => {
    if (index >= items.length - 1) return;
    
    const newItems = [...items];
    [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
    setItems(newItems);
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
        Arrange the items in the correct order by using the up and down arrows.
      </Typography>
      
      <Box sx={{ mb: 4 }}>
        {items.map((itemIndex, arrayIndex) => (
          <Paper
            key={itemIndex}
            sx={{
              p: 2,
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              bgcolor: (theme) => 
                theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: 1,
              transition: 'all 0.2s',
              '&:hover': {
                bgcolor: (theme) => 
                  theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
              }
            }}
          >
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                px: 1,
                color: 'text.secondary'
              }}
            >
              <DragIndicatorIcon />
            </Box>
            
            <Typography 
              variant="body1" 
              sx={{ 
                flex: 1,
                mx: 2
              }}
            >
              {question.items[itemIndex]}
            </Typography>
            
            <Box>
              <IconButton 
                size="small"
                onClick={() => moveUp(arrayIndex)}
                disabled={arrayIndex === 0}
                sx={{ 
                  color: theme.palette.primary.main,
                  opacity: arrayIndex === 0 ? 0.5 : 1
                }}
              >
                <ArrowUpwardIcon fontSize="small" />
              </IconButton>
              
              <IconButton 
                size="small"
                onClick={() => moveDown(arrayIndex)}
                disabled={arrayIndex === items.length - 1}
                sx={{ 
                  color: theme.palette.primary.main,
                  opacity: arrayIndex === items.length - 1 ? 0.5 : 1
                }}
              >
                <ArrowDownwardIcon fontSize="small" />
              </IconButton>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default DragDropQuestion; 