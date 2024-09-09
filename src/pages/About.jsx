import React from 'react';
import quizImage from '../assets/quiz-platform.png';
import '../App.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Quiz Platform</h1>
      <img src={quizImage} alt="Quiz Platform" className="home-image" />
      <p>This app is created by Mridul Das. Questions can be added and deleted from the Create Quiz page.</p>
      <p>Available Quizzes will be displayed on Attempt Quiz page from which any one can be selected</p>
      <p>After submitting your marks will also be displayed.</p>
    </div>
  );
};

export default Home;
