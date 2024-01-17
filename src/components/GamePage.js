import React, { useState, useEffect, useRef} from 'react';
import './App.css';
const GamePage= () => {
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  const [emojis, setEmojis] = useState([]);
  const [selectedEmojis, setSelectedEmojis] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [started, setStarted] = useState(false);
  const initialTimeLeft = 60;
  const timerInterval = useRef(null);
  const [showStartButton, setShowStartButton] = useState(true);

  const startGame = () => {
    initializeGame();
    setTimeLeft(initialTimeLeft);
    setShowStartButton(false);
  };

  const handleStartButtonClick = () => {
    setStarted(true);
    startGame();
  };

  useEffect(() => {
    if (started) {
      initializeGame();
      timerInterval.current = setInterval(() => {
        setTimeLeft(prevTime => prevTime > 0 ? prevTime - 1 : 0);
      }, 1000);

      return () => clearInterval(timerInterval.current);
    }
  }, [started]);

  useEffect(() => {
    if (timeLeft === 0) {
      endGame();
      setShowStartButton(true);
    }
  }, [timeLeft]);

  const initializeGame = () => {
    const emojiSet = ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍"];
    let randomEmojis = [...emojiSet];
    const duplicatedEmoji = randomEmojis[Math.floor(Math.random() * randomEmojis.length)];
    randomEmojis.push(duplicatedEmoji);
    randomEmojis.sort(() => Math.random() - 0.5);
    randomEmojis = randomEmojis.slice(0, 16);

    setEmojis(randomEmojis);
    setSelectedEmojis([]);
  };

  const handleEmojiClick = (index) => {
    if (selectedEmojis.length < 2 && !selectedEmojis.includes(index)) {
      setSelectedEmojis([...selectedEmojis, index]);

      if (selectedEmojis.length === 1) {
        const firstEmoji = emojis[selectedEmojis[0]];
        const secondEmoji = emojis[index];
        if (firstEmoji === secondEmoji) {
          setScore(score + 1);
          initializeGame(); // Reset game for next round
        }
      }
    } else if (selectedEmojis.length === 2) {
      setSelectedEmojis([index]);
    }
  };

  const endGame = () => {
    setStarted(false);
    setScore(0);
    setTimeLeft(60);
    clearInterval(timerInterval.current); // Clear the timerInterval
  };
const updateScore = async (newScore) => {
  try {
    const response = await fetch('http://localhost:5000/api/users/update-score', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phoneNumber: userPhoneNumber,
        score: newScore,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Score updated successfully');
    } else {
      console.error('Error updating score:', data.error);
    }
  } catch (error) {
    console.error('An error occurred during score update:', error);
  }
};
const handleSuccessfulMatch = () => {
  setScore((prevScore) => prevScore + 1);
  updateScore(score + 1); // Call the updateScore function
};
  return (
    <div className="App">
      <header className="App-header">
        <h1>Emoji Matching Game</h1>
        <div>Score: {score}</div>
        <div>Time Left: {timeLeft}</div>
        {showStartButton && (
          <button onClick={handleStartButtonClick}>Start Game</button>
        )}
        <div className="emoji-grid">
          {emojis.map((emoji, index) => (
            <button
              key={index}
              className={selectedEmojis.includes(index) ? 'selected' : ''}
              onClick={() => handleEmojiClick(index)}
            >
              {emoji}
            </button>
          ))}
        </div>
      </header>
    </div>
  );
};

export default GamePage;