import { Question, QuestionType } from '../utils/assessmentData';

const assessmentQuestions: Question[] = [
  {
    id: 'q1',
    type: 'MULTIPLE_CHOICE',
    question: 'Which of the following is NOT a JavaScript data type?',
    points: 10,
    category: 'JavaScript',
    difficulty: 'Easy',
    options: ['String', 'Boolean', 'Float', 'Object'],
    correctAnswer: 'Float',
    validateAnswer: (answer) => answer === 'Float'
  },
  {
    id: 'q2',
    type: 'MULTIPLE_CHOICE',
    question: 'Which hooks are provided by React?',
    points: 15,
    category: 'React',
    difficulty: 'Medium',
    options: ['useState', 'useEffect', 'useContext', 'useHistory', 'useReducer'],
    correctAnswer: ['useState', 'useEffect', 'useContext', 'useReducer'],
    isMultiSelect: true,
    validateAnswer: (answer) => {
      const correctAnswers = ['useState', 'useEffect', 'useContext', 'useReducer'];
      return Array.isArray(answer) && 
        answer.length === correctAnswers.length && 
        answer.every(item => correctAnswers.includes(item));
    }
  },
  {
    id: 'q3',
    type: 'TRUE_FALSE',
    question: 'In JavaScript, the === operator checks for both value and type equality.',
    points: 5,
    category: 'JavaScript',
    difficulty: 'Easy',
    correctAnswer: true,
    validateAnswer: (answer) => answer === true
  },
  {
    id: 'q4',
    type: 'CODE_COMPLETION',
    question: 'Complete the function to return the sum of two numbers:',
    points: 10,
    category: 'JavaScript',
    difficulty: 'Easy',
    language: 'javascript',
    codeSnippet: 'function sum(a, b) {\n  // Your code here\n}',
    correctAnswer: 'return a + b;',
    validateAnswer: (answer) => {
      // This is simplified; in a real app, you might use a more sophisticated validation
      return answer.includes('return') && answer.includes('a + b');
    }
  },
  {
    id: 'q5',
    type: 'BUG_FIX',
    question: 'Fix the bug in the following code that should filter for even numbers:',
    points: 20,
    category: 'JavaScript',
    difficulty: 'Medium',
    language: 'javascript',
    buggyCode: 'function filterEvenNumbers(numbers) {\n  return numbers.filter(num => num % 2);\n}',
    hints: ['Check the modulo condition', 'Even numbers have a remainder of 0 when divided by 2'],
    correctAnswer: 'return numbers.filter(num => num % 2 === 0);',
    validateAnswer: (answer) => {
      return answer.includes('num % 2 === 0') || answer.includes('num % 2 == 0');
    }
  },
  {
    id: 'q6',
    type: 'SHORT_ANSWER',
    question: 'What does the "D" stand for in SOLID principles?',
    points: 10,
    category: 'Software Design',
    difficulty: 'Medium',
    correctAnswer: 'Dependency Inversion Principle',
    caseSensitive: false,
    validateAnswer: (answer) => {
      return answer.toLowerCase().includes('dependency') && 
             answer.toLowerCase().includes('inversion');
    }
  },
  {
    id: 'q7',
    type: 'DRAG_DROP',
    question: 'Arrange the following steps in the correct order for the git workflow:',
    points: 15,
    category: 'Git',
    difficulty: 'Medium',
    items: [
      { id: 'item1', content: 'git add .' },
      { id: 'item2', content: 'git commit -m "message"' },
      { id: 'item3', content: 'Make changes to files' },
      { id: 'item4', content: 'git push origin branch' }
    ],
    correctOrder: ['item3', 'item1', 'item2', 'item4'],
    validateAnswer: (answer) => {
      if (!Array.isArray(answer)) return false;
      return answer.join(',') === 'item3,item1,item2,item4';
    }
  },
  {
    id: 'q8',
    type: 'MATCHING',
    question: 'Match each HTTP status code with its meaning:',
    points: 20,
    category: 'Web Development',
    difficulty: 'Hard',
    items: [
      { id: 'code1', left: '200', right: 'OK' },
      { id: 'code2', left: '404', right: 'Not Found' },
      { id: 'code3', left: '500', right: 'Internal Server Error' },
      { id: 'code4', left: '301', right: 'Moved Permanently' }
    ],
    correctPairs: {
      'code1': 'OK',
      'code2': 'Not Found',
      'code3': 'Internal Server Error',
      'code4': 'Moved Permanently'
    },
    validateAnswer: (answer) => {
      if (typeof answer !== 'object' || answer === null) return false;
      
      const correctPairs = {
        'code1': 'OK',
        'code2': 'Not Found',
        'code3': 'Internal Server Error',
        'code4': 'Moved Permanently'
      };
      
      for (const [key, value] of Object.entries(answer)) {
        if (correctPairs[key] !== value) return false;
      }
      
      return Object.keys(answer).length === Object.keys(correctPairs).length;
    }
  },
  {
    id: 'q9',
    type: 'MULTIPLE_CHOICE',
    question: 'Which CSS property is used to change the text color?',
    points: 5,
    category: 'CSS',
    difficulty: 'Easy',
    options: ['color', 'text-color', 'font-color', 'text-style'],
    correctAnswer: 'color',
    validateAnswer: (answer) => answer === 'color'
  },
  {
    id: 'q10',
    type: 'CODE_COMPLETION',
    question: 'Complete the React functional component to display a button that increments a counter:',
    points: 20,
    category: 'React',
    difficulty: 'Medium',
    language: 'jsx',
    codeSnippet: 'function Counter() {\n  // Your code here\n\n  return (\n    <div>\n      <p>Count: {count}</p>\n      {/* Add button here */}\n    </div>\n  );\n}',
    correctAnswer: 'const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>Increment</button>\n    </div>\n  );',
    validateAnswer: (answer) => {
      return answer.includes('useState') && 
             answer.includes('setCount') &&
             answer.includes('onClick') &&
             answer.includes('button');
    }
  }
];

export default assessmentQuestions; 