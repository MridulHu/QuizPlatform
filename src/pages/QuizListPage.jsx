import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { loadQuizzesFromLocalStorage } from '../features/storageUtils';
import '../App.css';

const QuizListPage = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const loadedQuizzes = loadQuizzesFromLocalStorage();
    setQuizzes(loadedQuizzes || []);
  }, []);

  return (
    <div>
      <h1>Select a Quiz to Attempt</h1>
      <ul>
        {quizzes.length > 0 ? (
          quizzes.map((quiz, index) => (
            <li key={index}>
              <Link to={`/attempt/${index}`}>Attempt {quiz.title}</Link>
            </li>
          ))
        ) : (
          <p>No quizzes available.</p>
        )}
      </ul>
    </div>
  );
};

export default QuizListPage;
