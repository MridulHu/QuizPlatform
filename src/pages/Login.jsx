import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize registered users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    if (storedUsers.length > 0) {
      // Update state with stored users
      setRegisteredUsers(storedUsers);
    }
  }, []);

  const [registeredUsers, setRegisteredUsers] = useState([]);

  const handleLogin = (e) => {
    e.preventDefault();

    // Check if user is registered
    const user = registeredUsers.find(user => user.username === username && user.password === password);

    if (user) {
      setIsAuthenticated(true);
      navigate('/');  // Redirect to homepage
    } else {
      setError('Invalid username or password');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();

    // Check if user already exists
    const userExists = registeredUsers.some(user => user.username === newUsername);

    if (userExists) {
      setError('Username already exists');
      return;
    }

    // Register the new user
    const newUsersList = [...registeredUsers, { username: newUsername, password: newPassword }];
    setRegisteredUsers(newUsersList);
    localStorage.setItem('registeredUsers', JSON.stringify(newUsersList));
    setIsRegistering(false); // Switch back to login view
    setError(''); // Clear error message
  };

  return (
    <div style={loginStyles.container}>
      {isRegistering ? (
        <form onSubmit={handleRegister}>
          <div>
            <input
              type="text"
              placeholder="New Username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              style={loginStyles.input}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={loginStyles.input}
            />
          </div>
          <div className="login-button-container">
            <button type="submit" className="login-button">Create Account</button>
          </div>
          <p onClick={() => setIsRegistering(false)} style={loginStyles.toggleLink}>
            Already have an account? Login
          </p>
        </form>
      ) : (
        <form onSubmit={handleLogin}>
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={loginStyles.input}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={loginStyles.input}
            />
          </div>
          <div className="login-button-container">
            <button type="submit" className="login-button">Login</button>
          </div>
          <p onClick={() => setIsRegistering(true)} style={loginStyles.toggleLink}>
            Don't have an account? Create one
          </p>
        </form>
      )}
      {error && <p style={loginStyles.error}>{error}</p>}
    </div>
  );
};

const loginStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  input: {
    width: '300px',
    padding: '12px',
    margin: '10px 0',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  error: {
    color: 'red',
  },
  toggleLink: {
    color: 'white',
    cursor: 'pointer',
    marginTop: '10px',
    textAlign: 'center',
    fontSize: '16px',
  },
};

export default LoginPage;
