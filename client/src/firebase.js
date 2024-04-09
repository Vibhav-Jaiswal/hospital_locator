// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "hospital-locator-684ce.firebaseapp.com",
  projectId: "hospital-locator-684ce",
  storageBucket: "hospital-locator-684ce.appspot.com",
  messagingSenderId: "859107855383",
  appId: "1:859107855383:web:3a8240eb8a97a73ee42052"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);