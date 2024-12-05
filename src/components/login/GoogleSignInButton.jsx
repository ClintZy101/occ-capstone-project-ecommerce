import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from  "../../../firebase"
import { useNavigate } from "react-router-dom";

const GoogleSignInButton = () => {
  const navigate = useNavigate();
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("Google Sign-In successful!", user);
      if(user) {
        navigate('/')
      }
    } catch (error) {
      console.error("Error with Google Sign-In:", error);
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="w-full py-1 rounded-md bg-white flex justify-center items-center space-x-5 text-black text-center mx-auto border  mt-5 hover:shadow-xl"
    >
        <img src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt=""  className="w-10 h-10"/>
      Sign in with Google
    </button>
  );
};

export default GoogleSignInButton;
