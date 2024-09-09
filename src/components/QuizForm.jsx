import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';

const formStyles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    position: 'relative',
    paddingTop: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '400px',
    paddingBottom: '20px',
  },
  input: {
    width: '300px',
    padding: '12px',
    margin: '10px 0',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 15px',
    fontSize: '16px',
    margin: '10px 5px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  questionList: {
    position: 'relative',
    margin: '0 auto',
    maxHeight: '80vh',
    overflowY: 'auto',
    width: '300px',
    padding: '10px',
    backgroundColor: '#e0e0e0',
    color: '#000000',
    borderRadius: '8px',
  },
  questionListItem: {
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#007bff',
    marginLeft: '10px',
  },
  correctButton: {
    backgroundColor: 'green',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
    marginLeft: '10px',
  },
};

const QuizForm = ({ onCreate }) => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);

  const handleAddQuestion = () => {
    setCurrentIndex(questions.length);
    setQuestions([...questions, { question: '', options: ['', ''], correctOption: 0 }]);
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[optIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleAddOption = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options.push('');
    setQuestions(updatedQuestions);
  };

  const handleCorrectOptionChange = (qIndex, optIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].correctOption = optIndex;
    setQuestions(updatedQuestions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '' || questions.length === 0) {
      alert('Please enter a quiz title and add at least one question.');
      return;
    }
    onCreate({ title, questions });
    setTitle('');
    setQuestions([]);
    setCurrentIndex(null);
  };

  const handleEditQuestion = (index) => {
    setCurrentIndex(index);
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
    if (currentIndex === index) {
      setCurrentIndex(null);
    } else if (currentIndex > index) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div style={formStyles.container}>
      <form onSubmit={handleSubmit} style={formStyles.form}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Quiz Title"
          required
          style={formStyles.input}
        />
        {currentIndex !== null && (
          <div>
            <input
              type="text"
              value={questions[currentIndex]?.question || ''}
              onChange={(e) => handleQuestionChange(currentIndex, e.target.value)}
              placeholder="Question"
              required
              style={formStyles.input}
            />
            {questions[currentIndex]?.options.map((opt, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="text"
                  value={opt}
                  onChange={(e) => handleOptionChange(currentIndex, i, e.target.value)}
                  placeholder={`Option ${i + 1}`}
                  required
                  style={formStyles.input}
                />
                <button
                  type="button"
                  onClick={() => handleCorrectOptionChange(currentIndex, i)}
                  style={formStyles.correctButton}
                >
                  {questions[currentIndex]?.correctOption === i ? '✔️ Correct' : 'Mark as Correct'}
                </button>
              </div>
            ))}
            <button type="button" onClick={() => handleAddOption(currentIndex)} style={formStyles.button}>
              Add Option
            </button>
          </div>
        )}
        <button type="button" onClick={handleAddQuestion} style={formStyles.button}>
          Add Question
        </button>
        <button type="submit" style={formStyles.button}>
          Create Quiz
        </button>
      </form>
      <div style={formStyles.questionList}>
        <h4>Questions</h4>
        {questions.length > 0 ? (
          <ul>
            {questions.map((q, index) => (
              <li key={index} style={formStyles.questionListItem}>
                {q.question}
                <button
                  type="button"
                  onClick={() => handleEditQuestion(index)}
                  style={formStyles.iconButton}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(index)}
                  style={formStyles.iconButton}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No questions added yet.</p>
        )}
      </div>
    </div>
  );
};

export default QuizForm;
