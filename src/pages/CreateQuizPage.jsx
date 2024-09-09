import React, { useState } from 'react';
import QuizForm from '../components/QuizForm';
import { saveQuizzesToLocalStorage, loadQuizzesFromLocalStorage } from '../features/storageUtils';

const CreateQuizPage = () => {
  const [quizzes, setQuizzes] = useState(() => loadQuizzesFromLocalStorage());

  const handleCreateQuiz = (quizData) => {
    const updatedQuizzes = [...quizzes, quizData];
    setQuizzes(updatedQuizzes);
    saveQuizzesToLocalStorage(updatedQuizzes);
  };

  const handleDeleteQuiz = (index) => {
    const updatedQuizzes = quizzes.filter((_, quizIndex) => quizIndex !== index);
    setQuizzes(updatedQuizzes);
    saveQuizzesToLocalStorage(updatedQuizzes);
  };

  return (
    <div>
      <h1>Create a New Quiz</h1>
      <QuizForm onCreate={handleCreateQuiz} />
      
      <h2>Created Quizzes</h2>
      {quizzes.length > 0 ? (
        <ul>
          {quizzes.map((quiz, index) => (
            <li key={index}>
              {quiz.title} - {quiz.questions.length} Questions
              <button onClick={() => handleDeleteQuiz(index)} style={{ marginLeft: '10px', color: 'red' }}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No quizzes created yet.</p>
      )}
    </div>
  );
};

export default CreateQuizPage;
