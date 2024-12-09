import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, setPersistence, browserSessionPersistence } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfWcthO2M9XNLMZsDNzo-7khWTEP978GM",
  authDomain: "ecom-auth-zustand.firebaseapp.com",
  projectId: "ecom-auth-zustand",
  storageBucket: "ecom-auth-zustand.appspot.com",
  messagingSenderId: "827751651610",
  appId: "1:827751651610:web:952eb57048794a07df34a3",
  measurementId: "G-8XFQL08K8G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);

// Set session persistence
setPersistence(auth, browserSessionPersistence).catch((error) => {
  console.error("Error setting persistence:", error);
});

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
