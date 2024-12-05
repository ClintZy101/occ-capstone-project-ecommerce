import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

// Listen for auth state changes
export const useAuthListener = () => {
  const { setUser, setIsLoading } = useAuthStore();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        setUser({ ...user, token }); // Store user and token in Zustand
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [setUser, setIsLoading]);
};

// Signup Function
export const handleSignup = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("User signed up:", user);

    // Optional: Retrieve token after signup
    const token = await user.getIdToken();
    console.log("Token:", token);
  } catch (error) {
    console.error("Error signing up:", error.message);
  }
};

// Login Function
export const handleLogin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Retrieve token upon successful login
    const token = await user.getIdToken();
    console.log("User logged in:", user);
    console.log("Token:", token);

    // Optional: Store token in Zustand or local storage if needed
    return { user, token };
  } catch (error) {
    console.error("Error logging in:", error.message);
    throw new Error(error.message);
  }
};

// Logout Function
export const handleLogout = async () => {
  try {
    await signOut(auth);
    console.log("User logged out");
  } catch (error) {
    console.error("Error logging out:", error.message);
  }
};
