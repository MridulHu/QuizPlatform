import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import About from './pages/About';
import CreateQuiz from './pages/CreateQuizPage';
import AttemptQuizPage from './pages/AttemptQuizPage';
import QuizListPage from './pages/QuizListPage';
import Login from './pages/Login';
import { loadQuizzesFromLocalStorage } from './features/storageUtils';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Initially null to indicate loading state
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    // Check localStorage for authentication status
    const checkAuthStatus = () => {
      const authStatus = localStorage.getItem('isAuthenticated') === 'true';
      setIsAuthenticated(authStatus); // Set authentication status based on localStorage
    };
    checkAuthStatus();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      // Load quizzes to check if there's more than one
      const loadedQuizzes = loadQuizzesFromLocalStorage();
      setQuizzes(loadedQuizzes || []);
    }
  }, [isAuthenticated]);

  // While checking authentication status, don't render anything
  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Placeholder for authentication check
  }

  return (
    <Router>
      <div>
        <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} quizzes={quizzes} />
        <Routes>
          {/* Redirect to appropriate pages based on authentication */}
          <Route path="/" element={isAuthenticated ? <Navigate to="/about" /> : <Navigate to="/login" />} />
          <Route path="/about" element={isAuthenticated ? <About /> : <Navigate to="/login" />} />
          <Route path="/create-quiz" element={isAuthenticated ? <CreateQuiz /> : <Navigate to="/login" />} />
          <Route path="/quizzes" element={isAuthenticated ? <QuizListPage /> : <Navigate to="/login" />} />
          <Route path="/attempt/:quizIndex" element={isAuthenticated ? <AttemptQuizPage /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
