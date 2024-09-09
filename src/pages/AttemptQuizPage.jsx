import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loadQuizzesFromLocalStorage } from '../features/storageUtils';
import './AttemptQuizPage.css';
import '../App.css';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import { FaFacebook } from 'react-icons/fa';

const AttemptQuizPage = () => {
  const { quizIndex } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState([]);
  const [score, setScore] = useState(0);
  const [error, setError] = useState(null);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const quizzes = loadQuizzesFromLocalStorage();
    const index = parseInt(quizIndex, 10);

    if (quizzes && !isNaN(index) && quizzes[index]) {
      setQuiz(quizzes[index]);
      setError(null);
    } else {
      setError('Invalid quiz index or no quizzes found');
      navigate('/quizzes'); 
    }
  }, [quizIndex, navigate]);

  const handleAnswerChange = (questionIndex, selectedOption) => {
    setAnswers({
      ...answers,
      [questionIndex]: selectedOption,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const feedbackArray = quiz.questions.map((question, index) => ({
      questionIndex: index,
      selectedOption: answers[index],
      isCorrect: question.correctOption === question.options.indexOf(answers[index]),
    }));

    setFeedback(feedbackArray);
    const totalCorrect = feedbackArray.filter((item) => item.isCorrect).length;
    setScore(totalCorrect); 
    setShowShareOptions(true); 
  };

  const shareMessage = `I scored ${score} out of ${quiz?.questions?.length || 0} on "${quiz?.title}" quiz! Try it out, It is developed by Mridul Das`;

  if (error) {
    return <div className="container">{error}</div>;
  }

  if (!quiz) {
    return <div className="container">Loading quiz...</div>;
  }

  return (
    <div className="container">
      <div className="quiz-content">
        <h1>Attempt Quiz: {quiz.title}</h1>
        <form onSubmit={handleSubmit}>
          {quiz.questions && quiz.questions.length > 0 ? (
            quiz.questions.map((question, index) => (
              <div key={index} className="question-container">
                <h2>Question {index + 1}</h2>
                <p>{question.question}</p>
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="option-container">
                    <input
                      type="radio"
                      id={`question-${index}-option-${optionIndex}`}
                      name={`question-${index}`}
                      value={option}
                      checked={answers[index] === option}
                      onChange={() => handleAnswerChange(index, option)}
                    />
                    <label htmlFor={`question-${index}-option-${optionIndex}`}>{option}</label>
                  </div>
                ))}
                {feedback.length > 0 && (
                  <p className={`feedback ${feedback[index]?.isCorrect ? 'correct' : 'incorrect'}`}>
                    {feedback[index]?.isCorrect ? 'Correct!' : 'Incorrect.'}
                  </p>
                )}
              </div>
            ))
          ) : (
            <p>No questions available.</p>
          )}
          <button type="submit">Submit Answers</button>
        </form>
        {feedback.length > 0 && (
          <div className="result-summary">
            <p>Total Correct Answers: {feedback.filter(item => item.isCorrect).length} / {quiz.questions.length}</p>
            <p>Your Score: {score}</p>

            {/* Share buttons */}
            {showShareOptions && (
              <div className="share-options">
                <h3>Share your score!</h3>
                <div className="share-button">
                  <FacebookShareButton url={window.location.href} quote={shareMessage}>
                    <div className="share-icon">
                      <FaFacebook size={32} />
                    </div>
                    <span>Share on Facebook</span>
                  </FacebookShareButton>
                </div>
                <div className="share-button">
                  <TwitterShareButton url={window.location.href} title={shareMessage}>
                    <div className="share-icon">
                      <img src="/XIcon.svg" alt="Share on X" style={{ width: '50px', height: '50px' }} />
                    </div>
                    <span>Share on X</span>
                  </TwitterShareButton>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AttemptQuizPage;
