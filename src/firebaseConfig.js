import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "partlist-e9fc0.firebaseapp.com",
  projectId: "partlist-e9fc0",
  storageBucket: "partlist-e9fc0.appspot.com",
  messagingSenderId: "689126598338",
  appId: "1:689126598338:web:702c511cc615afd655bd5b",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export { app, db, auth };
