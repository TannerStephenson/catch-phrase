/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const {onDocumentCreated} = require("firebase-functions/v2/firestore");

// The Firebase Admin SDK to access Firestore.
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");

initializeApp();

const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const app = express();
//const PORT = 8080;
const Player = require('./Player');

app.use(cors);
app.use(express.json());

const puzzles = [
  { id: 1, emoji: "🚶🅱️🕓🫵🏃", answer: "Walk before you run" },
  { id: 2, emoji: "🦇 🇷 👆", answer: "Batter up" },
  { id: 3, emoji: "🙅‍♂️⛏️🫵👃", answer: "Don't pick your nose" },
  { id: 4, emoji: "🙅‍♂️🤝👶", answer: "Don't shake the baby"},
  { id: 5, emoji: "🎥 🏫", answer: "Film school"},
  { id: 6, emoji: "🦶 🏁", answer: "Foot race"},
  { id: 7, emoji: "👨‍👩‍👧‍👦 🏠", answer: "Family home"},
  { id: 8, emoji: "🏠 🏃", answer: "Home run"},
  { id: 9, emoji: "🦇👨‍🦰", answer: "Batman"},
  { id: 10, emoji: "✋ 💡", answer: "Stop light"},
  { id: 11, emoji: "☎️ #️⃣", answer: "Phone Number"},
  { id: 12, emoji: "🐴👟", answer: "Horseshoe"},
  { id: 13, emoji: "🏁 🚗", answer: "Race car"},
];


const createPlayer = (username) => {
  return new Player(username);
};

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
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

app.get('/api/getplayer', (req, res) => {
  try {
    if (!player) {
      throw new Error('Player not found');
    }
    console.log('Player:', player);
    res.json(player);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/setpoints', (req, res) => {
  const { points } = req.body;
  player.setPoints(points);
  res.json(player);
});

exports.app = functions.https.onRequest(app);

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
