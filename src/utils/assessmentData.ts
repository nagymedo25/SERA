// Question types for front-end assessment
export enum QuestionType {
  MULTIPLE_CHOICE = 'multiple_choice',
  TRUE_FALSE = 'true_false',
  CODE_COMPLETION = 'code_completion',
  BUG_FIX = 'bug_fix',
  SHORT_ANSWER = 'short_answer',
  DRAG_DROP = 'drag_drop',
  MATCHING = 'matching'
}

export enum Difficulty {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced'
}

export enum Category {
  HTML = 'HTML',
  CSS = 'CSS',
  JAVASCRIPT = 'JavaScript',
  REACT = 'React',
  TYPESCRIPT = 'TypeScript',
  ACCESSIBILITY = 'Accessibility',
  PERFORMANCE = 'Performance'
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  category: string;
  difficulty: Difficulty;
  points: number;
  imageUrl?: string;
  correctFeedback?: string;
  incorrectFeedback?: string;
}

export interface MultipleChoiceQuestion extends Question {
  type: QuestionType.MULTIPLE_CHOICE;
  options: string[];
  correctOptionIndex: number;
}

export interface TrueFalseQuestion extends Question {
  type: QuestionType.TRUE_FALSE;
  correctAnswer: boolean;
}

export interface CodeCompletionQuestion extends Question {
  type: QuestionType.CODE_COMPLETION;
  codeSnippet: string;
  validateAnswer: (answer: string) => boolean;
}

export interface BugFixQuestion extends Question {
  type: QuestionType.BUG_FIX;
  buggyCode: string;
  validateAnswer: (answer: string) => boolean;
}

export interface ShortAnswerQuestion extends Question {
  type: QuestionType.SHORT_ANSWER;
  validateAnswer: (answer: string) => boolean;
}

export interface DragDropItem {
  id: string;
  content: string;
}

export interface DragDropQuestion extends Question {
  type: QuestionType.DRAG_DROP;
  items: string[];
  correctOrder: number[];
  validateAnswer: (answer: any) => boolean;
}

export interface MatchingItem {
  id: string;
  left: string;
  right: string;
}

export interface MatchingQuestion extends Question {
  type: QuestionType.MATCHING;
  leftItems: string[];
  rightItems: string[];
  correctPairs: [number, number][];
  validateAnswer: (answer: any) => boolean;
}

export interface Assessment {
  id: string;
  title: string;
  description: string;
  timeLimit?: number; // in minutes
  passingScore: number;
  questions: Question[];
}

// Helper function for case-insensitive string comparison
export const compareStrings = (str1: string, str2: string): boolean => {
  return str1.toLowerCase().trim() === str2.toLowerCase().trim();
};

// Helper function to check if arrays contain the same elements (order doesn't matter)
export const compareArrays = (arr1: string[], arr2: string[]): boolean => {
  if (arr1.length !== arr2.length) return false;
  
  const normalizedArr1 = arr1.map(item => item.toLowerCase().trim()).sort();
  const normalizedArr2 = arr2.map(item => item.toLowerCase().trim()).sort();
  
  return normalizedArr1.every((item, index) => item === normalizedArr2[index]);
};

// Helper function to calculate score based on answers
export const calculateScore = (
  questions: Question[],
  answers: Record<string, any>
): { 
  score: number; 
  correctAnswers: number; 
  totalAnswers: number;
  strengths: Category[];
  weaknesses: Category[];
} => {
  const categoryResults: Record<Category, { correct: number; total: number }> = {
    [Category.HTML]: { correct: 0, total: 0 },
    [Category.CSS]: { correct: 0, total: 0 },
    [Category.JAVASCRIPT]: { correct: 0, total: 0 },
    [Category.REACT]: { correct: 0, total: 0 },
    [Category.TYPESCRIPT]: { correct: 0, total: 0 },
    [Category.ACCESSIBILITY]: { correct: 0, total: 0 },
    [Category.PERFORMANCE]: { correct: 0, total: 0 }
  };

  let correctAnswers = 0;

  questions.forEach((question) => {
    const questionId = question.id;
    const userAnswer = answers[questionId];
    let isCorrect = false;

    // Skip if user didn't answer
    if (userAnswer === undefined) return;

    // Increment category total
    categoryResults[question.category as Category].total += 1;

    // Check answer based on question type
    switch (question.type) {
      case QuestionType.MULTIPLE_CHOICE:
        const multipleChoiceQ = question as MultipleChoiceQuestion;
        isCorrect = multipleChoiceQ.correctOptionIndex === userAnswer;
        break;
      case QuestionType.CODE_COMPLETION:
        const codeQ = question as CodeCompletionQuestion;
        isCorrect = codeQ.validateAnswer(userAnswer);
        break;
      case QuestionType.BUG_FIX:
        const bugQ = question as BugFixQuestion;
        isCorrect = bugQ.validateAnswer(userAnswer);
        break;
      case QuestionType.DRAG_DROP:
        const dragQ = question as DragDropQuestion;
        isCorrect = dragQ.correctOrder.every((idx: number) => 
          idx === userAnswer[dragQ.items.findIndex(item => item.content === idx)?.id]
        );
        break;
      case QuestionType.TRUE_FALSE:
        const trueFalseQ = question as TrueFalseQuestion;
        isCorrect = trueFalseQ.correctAnswer === userAnswer;
        break;
      case QuestionType.MATCHING:
        const matchQ = question as MatchingQuestion;
        isCorrect = matchQ.correctPairs.every(([leftIdx, rightIdx]) => 
          rightIdx === userAnswer[leftIdx]
        );
        break;
      case QuestionType.SHORT_ANSWER:
        const shortQ = question as ShortAnswerQuestion;
        const userText = shortQ.caseSensitive ? userAnswer : userAnswer.toLowerCase();
        isCorrect = shortQ.correctAnswer.some(answer => {
          const correctAnswer = shortQ.caseSensitive ? answer : answer.toLowerCase();
          return userText === correctAnswer;
        });
        break;
    }

    if (isCorrect) {
      correctAnswers += 1;
      categoryResults[question.category as Category].correct += 1;
    }
  });

  // Determine strengths and weaknesses
  const strengths: Category[] = [];
  const weaknesses: Category[] = [];

  Object.entries(categoryResults).forEach(([category, data]) => {
    if (data.total > 0) {
      const percentage = (data.correct / data.total) * 100;
      if (percentage >= 80) {
        strengths.push(category as Category);
      } else if (percentage < 60 && data.total >= 2) {
        weaknesses.push(category as Category);
      }
    }
  });

  // Calculate total score
  const totalAnswers = Object.keys(answers).length;
  const score = Math.round((correctAnswers / questions.length) * 100);

  return {
    score,
    correctAnswers,
    totalAnswers,
    strengths,
    weaknesses
  };
};

// Sample question creators
export const createMultipleChoiceQuestion = (
  id: string,
  text: string,
  options: string[],
  correctOptionIndex: number,
  category: string,
  difficulty: Difficulty,
  points: number,
  imageUrl?: string,
  correctFeedback?: string,
  incorrectFeedback?: string
): MultipleChoiceQuestion => ({
  id,
  text,
  type: QuestionType.MULTIPLE_CHOICE,
  options,
  correctOptionIndex,
  category,
  difficulty,
  points,
  imageUrl,
  correctFeedback,
  incorrectFeedback
});

export const createTrueFalseQuestion = (
  id: string,
  text: string,
  correctAnswer: boolean,
  category: string,
  difficulty: Difficulty,
  points: number,
  imageUrl?: string,
  correctFeedback?: string,
  incorrectFeedback?: string
): TrueFalseQuestion => ({
  id,
  text,
  type: QuestionType.TRUE_FALSE,
  correctAnswer,
  category,
  difficulty,
  points,
  imageUrl,
  correctFeedback,
  incorrectFeedback
});

export const createCodeCompletionQuestion = (
  id: string,
  text: string,
  codeSnippet: string,
  validateAnswer: (answer: string) => boolean,
  category: string,
  difficulty: Difficulty,
  points: number,
  imageUrl?: string,
  correctFeedback?: string,
  incorrectFeedback?: string
): CodeCompletionQuestion => ({
  id,
  text,
  type: QuestionType.CODE_COMPLETION,
  codeSnippet,
  validateAnswer,
  category,
  difficulty,
  points,
  imageUrl,
  correctFeedback,
  incorrectFeedback
});

// Sample data
export const sampleJavaScriptQuestions: Question[] = [
  createMultipleChoiceQuestion(
    'js-001',
    'Which of the following is not a JavaScript data type?',
    ['String', 'Boolean', 'Float', 'Symbol'],
    2,
    'JavaScript Fundamentals',
    Difficulty.BEGINNER,
    5,
    undefined,
    'Correct! Float is not a primitive data type in JavaScript. The primitive types are String, Number, Boolean, Undefined, Null, Symbol, and BigInt.',
    'JavaScript does not have a Float type. It has Number which handles both integers and floating-point numbers.'
  ),
  
  createTrueFalseQuestion(
    'js-002',
    'In JavaScript, the === operator checks for both value and type equality.',
    true,
    'JavaScript Operators',
    Difficulty.BEGINNER,
    5
  ),
  
  {
    id: 'js-003',
    text: 'Complete the following function to return the sum of all numbers in an array:',
    type: QuestionType.CODE_COMPLETION,
    codeSnippet: `function sumArray(numbers) {
  // Your code here
}`,
    validateAnswer: (answer: string) => {
      // This is a simplified validation - in a real app, you might use a more sophisticated approach
      const correctPatterns = [
        /return\s+numbers\.reduce\s*\(\s*\(\s*sum\s*,\s*num\s*\)\s*=>\s*sum\s*\+\s*num\s*,\s*0\s*\)/,
        /let\s+sum\s*=\s*0.*for\s*\(.*\)\s*\{\s*sum\s*\+=\s*numbers\s*\[.*\]\s*;?\s*\}.*return\s+sum/s
      ];
      return correctPatterns.some(pattern => pattern.test(answer));
    },
    category: 'JavaScript Functions',
    difficulty: Difficulty.INTERMEDIATE,
    points: 10
  },
  
  {
    id: 'js-004',
    text: 'Fix the bug in the following function that should filter out even numbers:',
    type: QuestionType.BUG_FIX,
    buggyCode: `function filterOddNumbers(numbers) {
  return numbers.filter(num => {
    num % 2 === 0;
  });
}`,
    validateAnswer: (answer: string) => {
      // Again, this is simplified
      return answer.includes('return num % 2 !== 0') || 
             answer.includes('return num % 2 === 1') ||
             answer.includes('return num & 1');
    },
    category: 'JavaScript Debugging',
    difficulty: Difficulty.INTERMEDIATE,
    points: 10
  }
];

export const sampleReactQuestions: Question[] = [
  createMultipleChoiceQuestion(
    'react-001',
    'Which hook would you use to perform side effects in a functional component?',
    ['useState', 'useEffect', 'useContext', 'useReducer'],
    1,
    'React Hooks',
    Difficulty.BEGINNER,
    5
  ),
  
  createTrueFalseQuestion(
    'react-002',
    'In React, components must always return a single root element.',
    true,
    'React Components',
    Difficulty.BEGINNER,
    5
  ),
  
  {
    id: 'react-003',
    text: 'Explain the difference between state and props in React.',
    type: QuestionType.SHORT_ANSWER,
    validateAnswer: (answer: string) => {
      const keyTerms = ['mutable', 'immutable', 'internal', 'passed', 'parent', 'component'];
      return keyTerms.filter(term => answer.toLowerCase().includes(term)).length >= 3;
    },
    category: 'React Fundamentals',
    difficulty: Difficulty.INTERMEDIATE,
    points: 10
  }
];

export const createSampleAssessment = (): Assessment => ({
  id: 'frontend-basics',
  title: 'Frontend Development Basics',
  description: 'Test your knowledge of JavaScript, React, and other frontend technologies.',
  timeLimit: 30,
  passingScore: 70,
  questions: [...sampleJavaScriptQuestions, ...sampleReactQuestions]
}); 