// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GithubAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAmBr0GbQzfA7DgoYm_gcbskln58iuYLqI",
  authDomain: "codespace-23fd0.firebaseapp.com",
  projectId: "codespace-23fd0",
  storageBucket: "codespace-23fd0.firebasestorage.app",
  messagingSenderId: "407205572806",
  appId: "1:407205572806:web:933de27dff79844b22e7c7",
  measurementId: "G-WL394V6ZRB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GithubAuthProvider();
export {auth,provider};