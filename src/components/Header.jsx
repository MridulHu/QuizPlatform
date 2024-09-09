import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Header.css'; // Assuming you'll style your Header with a CSS file
import turnOffLogo from '../assets/turn-off-logo.svg'; // Import the turn-off logo image

const Header = ({ isAuthenticated, setIsAuthenticated, quizzes }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/login");
  };

  const isLoginPage = location.pathname === "/login";
  const attemptQuizLink = quizzes.length > 0 ? '/quizzes' : '#';

  return (
    <header className="header">
      <nav className="nav-bar">
        {isLoginPage ? (
          <div className="login-header">
            <h1 className="login-header-title">Login</h1>
          </div>
        ) : (
          <>
            <ul className="nav-links">
              {isAuthenticated && (
                <>
                  <li><Link to="/about">About</Link></li>
                  <li><Link to="/create-quiz">Create Quiz</Link></li>
                  <li><Link to={attemptQuizLink}>Attempt Quiz</Link></li>
                </>
              )}
            </ul>
            {isAuthenticated && (
              <>
                <div className="logout-container">
                  <button className="logout-button" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
                <img
                  src={turnOffLogo}
                  alt="Turn Off"
                  className="turn-off-logo"
                />
              </>
            )}
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
