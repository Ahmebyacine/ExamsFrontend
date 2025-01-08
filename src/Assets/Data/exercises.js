import img from '../Images/examimg.webp'
const exercises = [
    {
      id: 1,
      title: "JavaScript",
      exercise:[
       { 
          content: "Master the flexbox layout model for creating flexible and responsive designs.",
          questions:[{question:'Explain the purpose of the useEffect hook in React.'},
          {question:'Explain the purpose of the useEffect hook in React.'}],
          image: img,
          imagePosition: 'bottom',
       },
       { 
          content: "Master the flexbox layout model for creating flexible and responsive designs.",
          questions:[{question:'Explain the purpose of the useEffect hook in React.'},
          {question:'Explain the purpose of the useEffect hook in React.'}],
          image: img,
          imagePosition: 'right',
       }
       ],
       level: "Primary 1",
       Trimester:'Trimester 1',
       difficulty: '1',
       material:'chemical',
       unit:'unit 3'
    },
    {
      id: 2,
      title: "React Hooks",
      exercise:[
          { 
           content: "Master the flexbox layout model for creating flexible and responsive designs.",
           questions:[{question:'Explain the purpose of the useEffect hook in React.'},
           {question:'Explain the purpose of the useEffect hook in React.'}],
           image: img,
           imagePosition: 'top',
       }
       ],
       level: "Primary 2",
       Trimester:'Trimester 1',
       difficulty: '2',
       material:'physique',
       unit:'unit 1'
    },
    {
      id: 3,
      title: "CSS Flexbox",
      exercise:[
         { 
          content: "Master the flexbox layout model for creating flexible and responsive designs.",
          questions:[{question:'Explain the purpose of the useEffect hook in React.'},
          {question:'Explain the purpose of the useEffect hook in React.'}],
          image: img,
          imagePosition: 'left',
      }
      ],
      level: "Primary 3",
      Trimester:'Trimester 2',
      difficulty: '1',
      material:'physique',
      unit:'unit 2'
    },
    {
      id: 4,
      title: "GraphQL Queries",
      exercise:[
          { 
           content: "Master the flexbox layout model for creating flexible and responsive designs.",
           questions:[{question:'Explain the purpose of the useEffect hook in React.'},
           {question:'Explain the purpose of the useEffect hook in React.'}],
           image: null,
           imagePosition: 'top-left',
       }
       ],
       level: "Primary 4",
       Trimester:'Trimester 3',
       difficulty: '1',
       material:'math',
       unit:'unit 1'
    }
  ]
export default exercises;