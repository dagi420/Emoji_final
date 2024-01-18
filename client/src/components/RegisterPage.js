// components/RegisterPage.js
import React, { useState } from 'react';

const RegisterPage = ({ onRegister }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // If registration is successful, call the onRegister callback
        onRegister();
      } else {
        // If registration fails, display an error message
        setError(data.error);
      }
    } catch (error) {
      console.error('An error occurred during registration:', error);
      setError('An error occurred during registration.');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <label>Phone Number: </label>
      <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      <br />
      <label>Password: </label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={handleRegister}>Register</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default RegisterPage;
