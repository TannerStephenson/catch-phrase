// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPkIyfcggAQUYIjxMinw1r1mnnUftkiaA",
  authDomain: "catch-phrase-2467f.firebaseapp.com",
  projectId: "catch-phrase-2467f",
  storageBucket: "catch-phrase-2467f.appspot.com",
  messagingSenderId: "402991650383",
  appId: "1:402991650383:web:342dcbccbec7c97bc8bc3a",
  measurementId: "G-GY8S9K1RGP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);