import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

export function Game() {
  const [puzzle, setPuzzle] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [points, setPoints] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerOn, setTimerOn] = useState(false);
  const [startDialogOpen, setDialogOpen] = useState(true);
  const [endDialogOpen, setEndDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let interval = null;
    if (timerOn && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
    } else if (!timerOn || timeLeft <= 0) {
      clearInterval(interval);
      if (timeLeft <= 0) {
        setEndDialogOpen(true);
      }
    }
    return () => clearInterval(interval);
  }, [timerOn, timeLeft]);

  const startGame = () => {
    setTimerOn(true);
    getNewPuzzle();
  }

  const handleClose = () => {
    setDialogOpen(false);
    startGame();
  };

  const handleEndClose = () => {
    setEndDialogOpen(false);
    setPoints(0);
    setTimeLeft(30);
    setUserAnswer('');
    startGame();
  };

  const handleInputChange = (event) => {
    setUserAnswer(event.target.value);
  };

  const getNewPuzzle = () => {
    setLoading(true); // Show loading dialog
    fetch(`https://catch-phrase-t2wy.onrender.com/api/puzzles`)
      .then(response => response.json())
      .then(data => {
        setPuzzle(data);
        setLoading(false); // Hide loading dialog
      })
      .catch(error => {
        console.error('Error fetching puzzles:', error);
        setLoading(false); // Ensure loading dialog is hidden even on error
      });
  };

  const handlePoints = (additionalPoints) => {
    setPoints(prevPoints => prevPoints + additionalPoints);
  }

  const checkAnswer = () => {
    const trimmedUserAnswer = removeApostrophes(userAnswer).trim().toLowerCase();
    const trimmedPuzzleAnswer = removeApostrophes(puzzle.answer).trim().toLowerCase();

    if (trimmedUserAnswer === trimmedPuzzleAnswer) {
      handlePoints(1);  // Increment points by 1
      setTimeLeft(timeLeft + 3);  // Add 3 seconds to the timer
      setUserAnswer('');
      getNewPuzzle();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      checkAnswer();
    }
  };

  const removeApostrophes = (str) => {
    return str.replace(/'/g, '');
  };

  return (
    <div>
      <Dialog open={startDialogOpen}>
        <DialogTitle>
          Welcome to Guess the Phrase!
          <br />
          Please press start to begin.
          <br />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button color="inherit" onClick={handleClose}>Start</Button>
          </div>
        </DialogTitle>
      </Dialog>
      <Dialog open={endDialogOpen}>
        <DialogTitle>Great Job! You got {points} points!
          <br />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button color="inherit" onClick={handleEndClose}>Start Again</Button>
          </div>
        </DialogTitle>
      </Dialog>
      <Dialog open={loading}>
        <DialogTitle>
          Loading...
          <br />
          I'm currently using a backend service that is on the free tier,
          so it may take around 50 seconds or less to wake up. Please wait!
        </DialogTitle>
      </Dialog>
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
            onKeyDown={handleKeyDown} 
          />
          <Button
            variant="contained"
            style={{ height: '56px', marginLeft: '10px' }}
            onClick={checkAnswer} 
          >
            Submit
          </Button>
          <br />
          Points: {points}
          <br />
          Time Left: {timeLeft} seconds
        </>
      )}
    </div>
  );
}

export default Game;
