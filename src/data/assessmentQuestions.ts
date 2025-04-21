import { 
  Question, 
  QuestionType, 
  Category, 
  Difficulty 
} from '../utils/assessmentData';

// Sample questions for the front-end assessment
export const frontEndQuestions: Question[] = [
  // Multiple Choice Questions - HTML
  {
    id: 1,
    question: "What does the `srcset` attribute do in an `<img>` element?",
    type: QuestionType.MULTIPLE_CHOICE,
    category: Category.HTML,
    difficulty: Difficulty.MEDIUM,
    options: [
      "Specifies an alternative image if the main image fails to load",
      "Defines different image sources for different screen sizes and resolutions",
      "Sets multiple sources for an audio file",
      "Adds image filters and effects"
    ],
    answer: 1,
    explanation: "The `srcset` attribute allows you to specify different images for different viewport sizes and screen resolutions, which is important for responsive web design and performance optimization."
  },
  {
    id: 2,
    question: "Which HTML5 element should be used to represent the main content area of a document?",
    type: QuestionType.MULTIPLE_CHOICE,
    category: Category.HTML,
    difficulty: Difficulty.EASY,
    options: [
      "<content>",
      "<section>",
      "<main>",
      "<article>"
    ],
    answer: 2,
    explanation: "The <main> element represents the main content of the <body> of a document. It should only be used once in a document and should not be nested within other semantic elements like <article>, <aside>, <header>, <footer>, or <nav>."
  },
  
  // Multiple Choice Questions - CSS
  {
    id: 3,
    question: "Which CSS property creates smooth transitions between two states of an element?",
    type: QuestionType.MULTIPLE_CHOICE,
    category: Category.CSS,
    difficulty: Difficulty.EASY,
    options: [
      "transform",
      "animation",
      "transition",
      "keyframes"
    ],
    answer: 2,
    explanation: "The 'transition' property creates smooth transitions between two states of an element. It allows you to define the duration, timing function, and which properties to animate."
  },
  {
    id: 4,
    question: "What is the correct way to apply a flexbox layout to a container?",
    type: QuestionType.MULTIPLE_CHOICE,
    category: Category.CSS,
    difficulty: Difficulty.MEDIUM,
    options: [
      "display: flex-container;",
      "display: flexbox;",
      "display: flex;",
      "flex: display;"
    ],
    answer: 2,
    explanation: "The correct property to enable a flexbox layout is 'display: flex;'. This turns the element into a flex container and its direct children into flex items."
  },
  
  // Multiple Choice Questions - JavaScript
  {
    id: 5,
    question: "What will be the output of the following code?\n```javascript\nconst arr = [1, 2, 3];\nconst [a, ...rest] = arr;\nconsole.log(rest);\n```",
    type: QuestionType.MULTIPLE_CHOICE,
    category: Category.JAVASCRIPT,
    difficulty: Difficulty.MEDIUM,
    options: [
      "[2, 3]",
      "[1]",
      "[1, 2, 3]",
      "SyntaxError"
    ],
    answer: 0,
    explanation: "This code uses array destructuring with the rest operator (...). 'a' will be assigned the first value (1), and 'rest' will contain the remaining values [2, 3]."
  },
  {
    id: 6,
    question: "Which of the following is NOT a JavaScript primitive type?",
    type: QuestionType.MULTIPLE_CHOICE,
    category: Category.JAVASCRIPT,
    difficulty: Difficulty.EASY,
    options: [
      "String",
      "Number",
      "Array",
      "Boolean"
    ],
    answer: 2,
    explanation: "Array is not a primitive type in JavaScript. The primitive types are String, Number, Boolean, Undefined, Null, Symbol, and BigInt. Arrays are object types."
  },
  
  // Multiple Choice Questions - React
  {
    id: 7,
    question: "What is the purpose of React keys?",
    type: QuestionType.MULTIPLE_CHOICE,
    category: Category.REACT,
    difficulty: Difficulty.MEDIUM,
    options: [
      "To encrypt React components for security",
      "To uniquely identify elements in a list for efficient updates",
      "To provide access to third-party libraries",
      "To connect React components to a database"
    ],
    answer: 1,
    explanation: "React keys are used to uniquely identify elements in a list. They help React identify which items have changed, been added, or been removed, making the rendering process more efficient."
  },
  {
    id: 8,
    question: "Which hook would you use to perform side effects in a function component?",
    type: QuestionType.MULTIPLE_CHOICE,
    category: Category.REACT,
    difficulty: Difficulty.EASY,
    options: [
      "useState",
      "useReducer",
      "useEffect",
      "useContext"
    ],
    answer: 2,
    explanation: "useEffect is the hook used for performing side effects in function components. It replaces lifecycle methods like componentDidMount, componentDidUpdate, and componentWillUnmount."
  },
  
  // Code Completion Questions
  {
    id: 9,
    question: "Complete the following JavaScript function that converts a temperature from Celsius to Fahrenheit:",
    type: QuestionType.CODE_COMPLETION,
    category: Category.JAVASCRIPT,
    difficulty: Difficulty.EASY,
    code: `function celsiusToFahrenheit(celsius) {\n  // Formula: F = C × 9/5 + 32\n  return _______;\n}`,
    blanks: ["_______"],
    answers: ["celsius * 9/5 + 32"]
  },
  {
    id: 10,
    question: "Complete the React function component that renders a button which counts the number of times it's been clicked:",
    type: QuestionType.CODE_COMPLETION,
    category: Category.REACT,
    difficulty: Difficulty.MEDIUM,
    code: `import React, { _______ } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = _______;\n  \n  const handleClick = () => {\n    _______;\n  };\n  \n  return (\n    <button onClick={_______}>\n      Clicked {count} times\n    </button>\n  );\n}`,
    blanks: ["_______", "_______", "_______", "_______"],
    answers: ["useState", "useState(0)", "setCount(count + 1)", "handleClick"]
  },
  
  // Bug Fix Questions
  {
    id: 11,
    question: "Fix the bug in the following JavaScript code that is supposed to filter an array of numbers to get only even numbers:",
    type: QuestionType.BUG_FIX,
    category: Category.JAVASCRIPT,
    difficulty: Difficulty.MEDIUM,
    buggyCode: `function getEvenNumbers(numbers) {\n  return numbers.filter(num => num / 2 === 0);\n}`,
    fixedCode: `function getEvenNumbers(numbers) {\n  return numbers.filter(num => num % 2 === 0);\n}`,
    hints: ["Check the operator used to determine if a number is even"]
  },
  {
    id: 12,
    question: "Fix the bug in the following CSS code for centering an element horizontally and vertically:",
    type: QuestionType.BUG_FIX,
    category: Category.CSS,
    difficulty: Difficulty.MEDIUM,
    buggyCode: `.centered {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  margin-top: 50px;\n  margin-left: 50px;\n}`,
    fixedCode: `.centered {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}`,
    hints: ["Instead of fixed margins, you need to use a percentage-based approach"]
  },
  
  // True/False Questions
  {
    id: 13,
    question: "In CSS, the 'z-index' property only works on positioned elements (position: relative, absolute, fixed, or sticky).",
    type: QuestionType.TRUE_FALSE,
    category: Category.CSS,
    difficulty: Difficulty.MEDIUM,
    statement: "In CSS, the 'z-index' property only works on positioned elements (position: relative, absolute, fixed, or sticky).",
    answer: true
  },
  {
    id: 14,
    question: "In JavaScript, arrays are primitive data types.",
    type: QuestionType.TRUE_FALSE,
    category: Category.JAVASCRIPT,
    difficulty: Difficulty.EASY,
    statement: "In JavaScript, arrays are primitive data types.",
    answer: false
  },
  
  // Short Answer Questions
  {
    id: 15,
    question: "What CSS property would you use to create a flexible grid layout?",
    type: QuestionType.SHORT_ANSWER,
    category: Category.CSS,
    difficulty: Difficulty.EASY,
    acceptableAnswers: ["display: grid", "grid", "display:grid"]
  },
  {
    id: 16,
    question: "What React hook would you use to store state that persists across renders?",
    type: QuestionType.SHORT_ANSWER,
    category: Category.REACT,
    difficulty: Difficulty.EASY,
    acceptableAnswers: ["useState", "usestate"]
  },
  
  // Bug Fix Questions for React
  {
    id: 17,
    question: "Fix the bug in the following React component that causes an infinite rendering loop:",
    type: QuestionType.BUG_FIX,
    category: Category.REACT,
    difficulty: Difficulty.HARD,
    buggyCode: `function Counter() {\n  const [count, setCount] = useState(0);\n  \n  // This causes a problem\n  setCount(count + 1);\n  \n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>Increment</button>\n    </div>\n  );\n}`,
    fixedCode: `function Counter() {\n  const [count, setCount] = useState(0);\n  \n  // Use useEffect for side effects\n  useEffect(() => {\n    // Any side effects can go here\n  }, []);\n  \n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>Increment</button>\n    </div>\n  );\n}`,
    hints: ["Think about the React component lifecycle", "Where should state updates happen?"]
  },
  
  // Drag and Drop Questions
  {
    id: 18,
    question: "Arrange the following steps in the correct order for the React component lifecycle (functional components with hooks):",
    type: QuestionType.DRAG_DROP,
    category: Category.REACT,
    difficulty: Difficulty.MEDIUM,
    items: [
      "Component function is called",
      "useState initializers run",
      "JSX is rendered to the DOM",
      "useEffect callbacks run",
      "Cleanup functions from useEffect run on unmount"
    ],
    correctOrder: [0, 1, 2, 3, 4]
  },
  
  // Matching Questions
  {
    id: 19,
    question: "Match each HTTP status code with its correct meaning:",
    type: QuestionType.MATCHING,
    category: Category.JAVASCRIPT,
    difficulty: Difficulty.MEDIUM,
    terms: ["200", "201", "400", "404", "500"],
    definitions: [
      "OK - Request succeeded",
      "Created - Resource successfully created",
      "Bad Request - Server couldn't understand the request",
      "Not Found - Resource not found",
      "Internal Server Error - Server encountered an error"
    ],
    correctPairs: [0, 1, 2, 3, 4]
  },
  
  // More advanced questions here...
  {
    id: 20,
    question: "What will be the output of the following code?\n```javascript\nfunction createMultiplier(factor) {\n  return function(number) {\n    return number * factor;\n  };\n}\n\nconst double = createMultiplier(2);\nconst triple = createMultiplier(3);\n\nconsole.log(double(5) + triple(5));\n```",
    type: QuestionType.MULTIPLE_CHOICE,
    category: Category.JAVASCRIPT,
    difficulty: Difficulty.HARD,
    options: [
      "10",
      "15",
      "25",
      "30"
    ],
    answer: 2,
    explanation: "This demonstrates closures in JavaScript. The 'double' function multiplies by 2, and the 'triple' function multiplies by 3. So double(5) is 10, and triple(5) is 15. The sum is 25."
  },
  
  // Accessibility Questions
  {
    id: 21,
    question: "Which attribute should be used on an <input> element to make it accessible with screen readers?",
    type: QuestionType.MULTIPLE_CHOICE,
    category: Category.ACCESSIBILITY,
    difficulty: Difficulty.MEDIUM,
    options: [
      "alt",
      "title",
      "aria-label",
      "description"
    ],
    answer: 2,
    explanation: "The aria-label attribute provides a text alternative for screen readers when there is no visible text label."
  },
  
  // Performance Questions
  {
    id: 22,
    question: "Which technique is NOT effective for improving website loading performance?",
    type: QuestionType.MULTIPLE_CHOICE,
    category: Category.PERFORMANCE,
    difficulty: Difficulty.MEDIUM,
    options: [
      "Using a Content Delivery Network (CDN)",
      "Implementing lazy loading for images",
      "Using multiple small CSS files instead of one combined file",
      "Optimizing image sizes"
    ],
    answer: 2,
    explanation: "Using multiple small CSS files instead of one combined file increases HTTP requests, which slows down loading. Bundling CSS files into one reduces requests and improves performance."
  },
  
  // Advanced React
  {
    id: 23,
    question: "What is the purpose of React.memo?",
    type: QuestionType.MULTIPLE_CHOICE,
    category: Category.REACT,
    difficulty: Difficulty.HARD,
    options: [
      "To memoize values in a component",
      "To prevent a functional component from re-rendering if its props haven't changed",
      "To keep track of previous state values",
      "To memorize user input in forms"
    ],
    answer: 1,
    explanation: "React.memo is a higher-order component that prevents unnecessary re-renders of functional components by memoizing the result. It performs a shallow comparison of props and only re-renders if props have changed."
  },
  
  // TypeScript Questions
  {
    id: 24,
    question: "What does the 'readonly' modifier do in TypeScript?",
    type: QuestionType.MULTIPLE_CHOICE,
    category: Category.TYPESCRIPT,
    difficulty: Difficulty.MEDIUM,
    options: [
      "Makes properties or arrays immutable",
      "Restricts access to private members",
      "Creates a read-only file",
      "Prevents variable initialization"
    ],
    answer: 0,
    explanation: "The 'readonly' modifier in TypeScript makes properties or array elements immutable, meaning they can only be assigned a value when the object is created and cannot be changed afterward."
  },
  
  // Code Completion for TypeScript
  {
    id: 25,
    question: "Complete the TypeScript interface for a User object:",
    type: QuestionType.CODE_COMPLETION,
    category: Category.TYPESCRIPT,
    difficulty: Difficulty.MEDIUM,
    code: `interface User {\n  id: _______;\n  name: _______;\n  email?: _______;\n  readonly createdAt: _______;\n}`,
    blanks: ["_______", "_______", "_______", "_______"],
    answers: ["number", "string", "string", "Date"]
  }
];

// Generate more questions up to 50 by duplicating and modifying some of the existing ones
// These are just placeholders - in a real app you would have unique questions
for (let i = 26; i <= 50; i++) {
  const baseQuestion = frontEndQuestions[i % 25]; // Use existing questions as templates
  const newQuestion = {...baseQuestion, id: i};
  
  // Modify the question slightly to make it different
  if (newQuestion.type === QuestionType.MULTIPLE_CHOICE) {
    newQuestion.question = `[Q${i}] ${newQuestion.question}`;
  } else if (newQuestion.type === QuestionType.BUG_FIX) {
    newQuestion.question = `[Q${i}] ${newQuestion.question}`;
  }
  
  frontEndQuestions.push(newQuestion);
} 