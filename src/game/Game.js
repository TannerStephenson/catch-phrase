import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export function Game() {
  const [puzzle, setPuzzle] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/api/puzzles')
      .then(response => response.json())
      .then(data => setPuzzle(data))
      .catch(error => console.error('Error fetching puzzles:', error));
  }, []);

  
  const handleInputChange = (event) => {
    setUserAnswer(event.target.value);
  };

  
  const checkAnswer = () => {
    if (userAnswer.trim().toLowerCase() === puzzle.interpretation.toLowerCase()) {
      setFeedback('Correct! 🎉');
    } else {
      setFeedback('Oops! Try again. ❌');
    }
  };

  return (
    <div>
      <h1>Guess the Phrase</h1>
      {puzzle && (
        <>
          <h1>{puzzle.emoji}</h1>
          <TextField
            id="outlined-basic"
            label="Answer"
            variant="outlined"
            value={userAnswer} 
            onChange={handleInputChange} 
          />
          <Button
            variant="contained"
            style={{ height: '56px', marginLeft: '10px' }}
            onClick={checkAnswer} 
          >
            Submit
          </Button>
          {feedback && <p>{feedback}</p>} {/* Display feedback */}
        </>
      )}
    </div>
  );
}

export default Game;
