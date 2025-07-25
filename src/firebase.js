import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBpny_oojDEMJKz1jm8pUsYNXe8RNtwLug",
  authDomain: "my-fire-10ebd.firebaseapp.com",
  projectId: "my-fire-10ebd",
  storageBucket: "my-fire-10ebd.firebasestorage.app",
  messagingSenderId: "410354742899",
  appId: "1:410354742899:web:c526b19aa698351b8cdc06"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);