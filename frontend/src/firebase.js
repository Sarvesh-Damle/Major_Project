// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "buddies-a8869.firebaseapp.com",
  projectId: "buddies-a8869",
  storageBucket: "buddies-a8869.appspot.com",
  messagingSenderId: "940968865314",
  appId: "1:940968865314:web:cfe88c2c063f7d85ce247b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);