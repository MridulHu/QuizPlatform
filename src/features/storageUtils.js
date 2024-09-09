// Save quizzes to localStorage
export const saveQuizzesToLocalStorage = (quizzes) => {
    localStorage.setItem('quizzes', JSON.stringify(quizzes));
  };
  
  // Load quizzes from localStorage
  export const loadQuizzesFromLocalStorage = () => {
    const quizzes = localStorage.getItem('quizzes');
    return quizzes ? JSON.parse(quizzes) : []; // Parse JSON or return empty array
  };
  