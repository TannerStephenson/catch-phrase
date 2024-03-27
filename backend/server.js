const express = require('express');
const app = express();
const PORT = 8080;
const Player = require('./Player');

app.use(express.json());

const createPlayer = (username) => {
  return new Player(username);
};

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') {
      res.sendStatus(200);
  } else {
      next();
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/api/puzzles', (req, res) => {
  const randomIndex = Math.floor(Math.random() * puzzles.length);
  const randomPuzzle = puzzles[randomIndex];
  res.json(randomPuzzle);
});

app.post('/api/createplayer', (req, res) => {
  const { username } = req.body;
  const player = createPlayer(username);
  res.json(player);
});

app.post('api/getplayer', (req, res) => {
  res.json(player);
});

const puzzles = [
    { id: 1, emoji: "🚶🙅‍♂️🏃", answer: "Walk don't run" },
    { id: 2, emoji: "🦇 🇷 👆", answer: "Batter up" },
    { id: 3, emoji: "🙅‍♂️⛏️🫵👃", answer: "Don't pick your nose" },
    { id: 4, emoji: "🙅‍♂️🤝👶", answer: "Don't shake the baby"}
  ];