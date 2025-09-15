// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// ⚡ Essas configs você pega no console Firebase (Configuração SDK)
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "alzhelp-471d0.firebaseapp.com",
  projectId: "alzhelp-471d0",
  storageBucket: "alzhelp-471d0.appspot.com",
  messagingSenderId: "603688747694",
  appId: "1:603688747694:web:xxxxx", 
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
