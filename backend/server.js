const express = require('express');
const app = express();
const PORT = 8080;

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/api/puzzles', (req, res) => {
  const randomIndex = Math.floor(Math.random() * puzzles.length);
  const randomPuzzle = puzzles[randomIndex];
  res.json(randomPuzzle);
});

const puzzles = [
    { id: 1, emoji: "🚶🙅‍♂️🏃", answer: "Walk don't run" },
    { id: 2, emoji: "🦇 🇷 👆", answer: "Batter up" },
    { id: 3, emoji: "🙅‍♂️⛏️🫵👃", answer: "Don't pick your nose" },
    { id: 4, emoji: "🙅‍♂️🤝👶", answer: "Don't shake the baby"}
  ];
