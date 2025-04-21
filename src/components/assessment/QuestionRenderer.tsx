import React from 'react';
import { Box } from '@mui/material';
import { Question, QuestionType } from '../../utils/assessmentData';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import CodeCompletionQuestion from './CodeCompletionQuestion';
import BugFixQuestion from './BugFixQuestion';
import TrueFalseQuestion from './TrueFalseQuestion';
import ShortAnswerQuestion from './ShortAnswerQuestion';
import DragDropQuestion from './DragDropQuestion';
import MatchingQuestion from './MatchingQuestion';

interface QuestionRendererProps {
  question: Question;
  answer?: any;
  onAnswerChange: (answer: any) => void;
}

const QuestionRenderer: React.FC<QuestionRendererProps> = ({
  question,
  answer,
  onAnswerChange
}) => {
  switch (question.type) {
    case QuestionType.MULTIPLE_CHOICE:
      return (
        <MultipleChoiceQuestion
          question={question}
          selectedAnswer={answer}
          onAnswerSelect={onAnswerChange}
        />
      );
      
    case QuestionType.CODE_COMPLETION:
      return (
        <CodeCompletionQuestion
          question={question}
          answers={answer || []}
          onAnswerChange={onAnswerChange}
        />
      );
      
    case QuestionType.BUG_FIX:
      return (
        <BugFixQuestion
          question={question}
          answer={answer || ''}
          onAnswerChange={onAnswerChange}
        />
      );
      
    case QuestionType.TRUE_FALSE:
      return (
        <TrueFalseQuestion
          question={question}
          answer={answer}
          onAnswerSelect={onAnswerChange}
        />
      );
      
    case QuestionType.SHORT_ANSWER:
      return (
        <ShortAnswerQuestion
          question={question}
          answer={answer || ''}
          onAnswerChange={onAnswerChange}
        />
      );
      
    case QuestionType.DRAG_DROP:
      return (
        <DragDropQuestion
          question={question}
          answer={answer || []}
          onAnswerChange={onAnswerChange}
        />
      );
      
    case QuestionType.MATCHING:
      return (
        <MatchingQuestion
          question={question}
          answer={answer || []}
          onAnswerChange={onAnswerChange}
        />
      );
      
    default:
      return (
        <Box>
          Unsupported question type: {question.type}
        </Box>
      );
  }
};

export default QuestionRenderer; 