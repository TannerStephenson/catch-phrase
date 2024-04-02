import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

export function Game() {
  const [puzzle, setPuzzle] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  let [points, setPoints] = useState(0);
  const [timeLeft, setTimeLeft] = useState(25);
  const [timerOn, setTimerOn] = useState(false);
  let [dialogOpen, setDialogOpen] = useState(true);
  //const [player, setPlayer] = useState(null);

  useEffect(() => {
    getNewPuzzle();
  }, []);

  const startGame = () => {
    setTimerOn(true);
  }

  const handleClose = () => {
    setDialogOpen(false);
  };

  let handlePoints = (points) => {
    setPoints(points);
  }

  const handleInputChange = (event) => {
    setUserAnswer(event.target.value);
  };

  const getNewPuzzle = () => {
    fetch('http://localhost:8080/api/puzzles')
      .then(response => response.json())
      .then(data => {
        setPuzzle(data)
        setTimeLeft(timeLeft + 5);
      })
      .catch(error => console.error('Error fetching puzzles:', error));
  }

  
  const checkAnswer = () => {
    const trimmedUserAnswer = removeApostrophes(userAnswer).trim().toLowerCase();
    const trimmedPuzzleAnswer = removeApostrophes(puzzle.answer).trim().toLowerCase();
  
    if (trimmedUserAnswer === trimmedPuzzleAnswer) {
      handlePoints(points + 1);
      setUserAnswer('');
      getNewPuzzle();
    }
    console.log('Points:', points);
  };
  
  const removeApostrophes = (str) => {
    return str.replace(/'/g, '');
  };
  
  return (
    <div>
      <Dialog open={dialogOpen} onClose={handleClose}>
        <DialogTitle>Press the button to start the Game
          <br/>
          <Button class="StartButton" color="inherit" onClick={startGame}>Start</Button>
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
