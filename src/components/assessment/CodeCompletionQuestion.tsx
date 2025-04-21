import React from 'react';
import { Box, Typography, TextField } from '@mui/material';
import CodeEditor from '../CodeEditor';
import { CodeCompletionQuestion as CodeCompletionQuestionType } from '../../utils/assessmentData';

interface CodeCompletionQuestionProps {
  question: CodeCompletionQuestionType;
  answers: string[];
  onAnswerChange: (answers: string[]) => void;
}

const CodeCompletionQuestion: React.FC<CodeCompletionQuestionProps> = ({
  question,
  answers = [],
  onAnswerChange
}) => {
  // Initialize answers array if not provided
  const initialAnswers = React.useMemo(() => {
    return Array(question.blanks.length).fill('');
  }, [question.blanks.length]);

  const [currentAnswers, setCurrentAnswers] = React.useState<string[]>(
    answers.length ? answers : initialAnswers
  );

  // Get code with blanks replaced by input fields
  const getCodeWithInputs = () => {
    let code = question.code;
    const blanks = [...question.blanks]; // Make a copy to avoid modifying the original
    
    // Replace blanks with input field placeholders
    blanks.forEach((blank, index) => {
      code = code.replace(blank, `___BLANK_${index}___`);
    });
    
    // Split by blank placeholders
    const codeParts = code.split(/___BLANK_\d+___/);
    
    return (
      <Box sx={{ fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: 1.5 }}>
        {codeParts.map((part, index) => (
          <React.Fragment key={index}>
            {part}
            {index < codeParts.length - 1 && (
              <TextField
                variant="outlined"
                size="small"
                value={currentAnswers[index] || ''}
                onChange={(e) => handleInputChange(index, e.target.value)}
                sx={{
                  width: 'auto',
                  minWidth: '120px',
                  mx: 1,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '& fieldset': {
                      borderColor: (theme) => theme.palette.primary.main,
                    },
                    '&:hover fieldset': {
                      borderColor: (theme) => theme.palette.primary.light,
                    },
                    fontFamily: 'monospace',
                    fontSize: '0.9rem',
                  },
                }}
                InputProps={{
                  sx: { py: 0.5 }
                }}
              />
            )}
          </React.Fragment>
        ))}
      </Box>
    );
  };

  const handleInputChange = (index: number, value: string) => {
    const newAnswers = [...currentAnswers];
    newAnswers[index] = value;
    setCurrentAnswers(newAnswers);
    onAnswerChange(newAnswers);
  };

  // Determine code language from the question
  const getLanguage = () => {
    const code = question.code.toLowerCase();
    if (code.includes('function') || code.includes('const') || code.includes('var')) {
      return 'javascript';
    }
    if (code.includes('<') && code.includes('>')) {
      if (code.includes('react')) {
        return 'jsx';
      }
      return 'html';
    }
    if (code.includes('interface') || code.includes('type ')) {
      return 'typescript';
    }
    return 'javascript'; // Default
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 3 }}>
        {question.question}
      </Typography>
      
      <Box 
        sx={{ 
          bgcolor: (theme) => theme.palette.mode === 'dark' ? '#1e1e1e' : '#f5f5f5',
          p: 3,
          borderRadius: 2,
          mb: 4,
          position: 'relative',
          overflow: 'auto'
        }}
      >
        {getCodeWithInputs()}
      </Box>
    </Box>
  );
};

export default CodeCompletionQuestion; 