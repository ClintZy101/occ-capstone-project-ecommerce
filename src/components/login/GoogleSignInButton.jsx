import React, { useEffect } from "react";
import { signInWithRedirect, getRedirectResult, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../../firebase";
import { useNavigate } from "react-router-dom";

const GoogleSignInButton = () => {
  const navigate = useNavigate();

  // Handle Google Sign-In using redirect
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider); // Redirects to Google sign-in
    } catch (error) {
      console.error("Error with Google Sign-In:", error);
    }
  };

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User already signed in:", user);
        navigate("/"); // Navigate to home page if user is signed in
      }
    });

    return () => unsubscribe(); // Cleanup listener on component unmount
  }, [navigate]);

  // Handle redirect result on mount
  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          const user = result.user;
          console.log("Google Sign-In successful!", user);
          navigate("/"); // Navigate to home page after successful sign-in
        }
      } catch (error) {
        console.error("Error handling redirect result:", error);
      }
    };

    handleRedirectResult();
  }, [navigate]);

  return (
    <button
      onClick={handleGoogleSignIn}
      className="w-full py-1 rounded-md bg-white flex justify-center items-center space-x-5 text-black text-center mx-auto border mt-5 hover:shadow-xl"
    >
      <img
        src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
        alt="Google Logo"
        className="w-10 h-10"
      />
      Sign in with Google
    </button>
  );
};

export default GoogleSignInButton;
