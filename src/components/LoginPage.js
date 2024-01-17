// components/LoginPage.js
import React, { useState } from 'react';
import './LoginPage.css'; // Import your CSS file
const LoginPage = ({ onLogin }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      // Add your logic for making a request to the server to authenticate the user
      // For simplicity, assuming you have a /api/users/login endpoint on your server

      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // If login is successful, call the onLogin callback
        onLogin();
      } else {
        // Login failed, handle the error and display the message
        console.error('Login failed:', data.error);
        setError(data.error || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      // Handle login error
      console.error('An error occurred during login:', error);
      setError('An error occurred during login. Please try again.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <label>Phone Number: </label>
      <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      <br />
      <label>Password: </label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={handleLogin}>Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default LoginPage;
