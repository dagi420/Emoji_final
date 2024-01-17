// App.js
import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import GamePage from './components/GamePage';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    //const loggedInPhoneNumber =   phoneNumber;

    //setUserPhoneNumber(loggedInPhoneNumber);
  };

  const handleRegister = () => {
    // Perform any necessary actions upon registration success
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        {isLoggedIn ? (
          <GamePage />
        ) : (
          <>
            <LoginPage onLogin={handleLogin} />
            <RegisterPage onRegister={handleRegister} />
          </>
        )}
      </header>
    </div>
  );
};

export default App;
