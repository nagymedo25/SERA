import React, { useState } from 'react';
import { Box, Typography, Button, Chip } from '@mui/material';
import CodeEditor from '../CodeEditor';
import { BugFixQuestion as BugFixQuestionType } from '../../utils/assessmentData';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

interface BugFixQuestionProps {
  question: BugFixQuestionType;
  answer: string;
  onAnswerChange: (answer: string) => void;
}

const BugFixQuestion: React.FC<BugFixQuestionProps> = ({
  question,
  answer,
  onAnswerChange
}) => {
  const [showHint, setShowHint] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);

  // Determine the programming language
  const getLanguage = () => {
    const code = question.buggyCode.toLowerCase();
    if (code.includes('class') || code.includes('function') || code.includes('const') || code.includes('var')) {
      if (code.includes('react') || code.includes('jsx') || code.includes('<div>')) {
        return 'jsx';
      }
      return 'javascript';
    }
    if (code.includes('{') && code.includes('}') && 
        (code.includes('.') || code.includes('#') || code.includes('position'))) {
      return 'css';
    }
    if (code.includes('<') && code.includes('>')) {
      return 'html';
    }
    return 'javascript'; // Default
  };

  const handleCodeChange = (newCode: string) => {
    onAnswerChange(newCode);
  };

  const showNextHint = () => {
    if (question.hints && hintIndex < question.hints.length - 1) {
      setHintIndex(hintIndex + 1);
    }
    setShowHint(true);
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 3 }}>
        {question.question}
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
          Buggy Code:
        </Typography>
        <CodeEditor
          initialCode={question.buggyCode}
          language={getLanguage() as any}
          readOnly={true}
          height={200}
        />
      </Box>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
          Your Fix:
        </Typography>
        <CodeEditor
          initialCode={answer || question.buggyCode}
          language={getLanguage() as any}
          readOnly={false}
          onChange={handleCodeChange}
          height={200}
        />
      </Box>
      
      {question.hints && question.hints.length > 0 && (
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'flex-start', gap: 2 }}>
          <Button
            variant="text" 
            color="secondary"
            startIcon={<LightbulbIcon />}
            onClick={showNextHint}
            disabled={showHint && hintIndex >= question.hints.length - 1}
            sx={{ mt: 1 }}
          >
            {showHint ? 'Next Hint' : 'Show Hint'}
          </Button>
          
          {showHint && (
            <Box 
              sx={{ 
                flex: 1,
                p: 2, 
                borderRadius: 2, 
                bgcolor: 'rgba(255, 217, 0, 0.1)', 
                border: '1px solid rgba(255, 217, 0, 0.3)'
              }}
            >
              <Typography variant="body2">
                <Typography component="span" fontWeight="bold" sx={{ mr: 1 }}>
                  Hint {hintIndex + 1}/{question.hints.length}:
                </Typography>
                {question.hints[hintIndex]}
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default BugFixQuestion; 