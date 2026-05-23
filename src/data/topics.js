export const TOPICS = [
  {
    id: 'arrays',
    label: 'Arrays',
    icon: '⬡',
    difficulty: 'fresher',
    subtopics: ['map', 'filter', 'reduce', 'flat & flatMap', 'sorting patterns', 'find & findIndex'],
  },
  {
    id: 'closures',
    label: 'Closures & Scope',
    icon: '◎',
    difficulty: 'mid',
    subtopics: ['lexical scope', 'closure basics', 'IIFE', 'module pattern', 'common gotchas'],
  },
  {
    id: 'async',
    label: 'Async JS',
    icon: '⟳',
    difficulty: 'mid',
    subtopics: ['callbacks', 'promises', 'async/await', 'Promise.all', 'error handling'],
  },
  {
    id: 'this',
    label: 'this & Prototypes',
    icon: '⬢',
    difficulty: 'tricky',
    subtopics: ['this context', 'call/apply/bind', 'prototype chain', 'class vs prototype'],
  },
  {
    id: 'eventloop',
    label: 'Event Loop',
    icon: '↺',
    difficulty: 'tricky',
    subtopics: ['call stack', 'task queue', 'microtask queue', 'setTimeout 0', 'promises order'],
  },
  {
    id: 'dom',
    label: 'DOM & Browser',
    icon: '◫',
    difficulty: 'fresher',
    subtopics: ['event delegation', 'bubbling vs capture', 'debounce & throttle', 'Web APIs'],
  },
]

export const QUIZ_QUESTIONS = [
  {
    topicId: 'arrays',
    q: 'What does [1,2,3].map(x => x * 2) return?',
    options: ['[2,4,6]', '[1,2,3]', '6', 'undefined'],
    answer: 0,
    explanation: 'map() transforms every element and returns a new array of the same length.',
  },
  {
    topicId: 'arrays',
    q: 'Which method returns the FIRST matching element?',
    options: ['filter()', 'find()', 'map()', 'some()'],
    answer: 1,
    explanation: 'find() returns the first element that passes the test, or undefined. filter() returns all matches.',
  },
  {
    topicId: 'closures',
    q: 'What will this log?\nlet x = 10;\nfunction foo() { console.log(x); }\nfunction bar() { let x = 20; foo(); }\nbar();',
    options: ['20', '10', 'undefined', 'ReferenceError'],
    answer: 1,
    explanation: 'Lexical scope — foo() closes over the x where it was DEFINED (outer scope x=10), not where it\'s called.',
  },
  {
    topicId: 'async',
    q: 'Which executes first?\n(A) setTimeout(fn, 0)\n(B) Promise.resolve().then(fn)',
    options: ['A — setTimeout', 'B — Promise', 'Same time', 'Depends on browser'],
    answer: 1,
    explanation: 'Promises go into the microtask queue, which is always drained BEFORE the macrotask queue where setTimeout lives.',
  },
  {
    topicId: 'this',
    q: "What is 'this' inside an arrow function?",
    options: ['The function itself', 'window/global', 'Inherited from enclosing scope', 'undefined'],
    answer: 2,
    explanation: "Arrow functions don't have their own 'this'. They capture 'this' from the lexical (enclosing) scope at the time they are defined.",
  },
]