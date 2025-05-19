// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWmH2DmIQ7iDzffzLYs2Wh8pISL1gPWJk",
  authDomain: "parcial-903df.firebaseapp.com",
  projectId: "parcial-903df",
  storageBucket: "parcial-903df.firebasestorage.app",
  messagingSenderId: "725288764631",
  appId: "1:725288764631:web:7b4f76c49e769212f2dc92",
  measurementId: "G-BD59RPQ8DC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export { db };