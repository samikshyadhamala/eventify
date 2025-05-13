import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyApRCYknWn-rQKC8KbC2o9tlDlePaZXnbo",
    authDomain: "eventify-11de8.firebaseapp.com",
    projectId: "eventify-11de8",
    storageBucket: "eventify-11de8.firebasestorage.app",
    messagingSenderId: "69099719412",
    appId: "1:69099719412:web:b940b72776edbf16e7aca1",
    measurementId: "G-GZR283VDWL"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };