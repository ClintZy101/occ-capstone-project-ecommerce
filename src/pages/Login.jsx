import { useState } from "react";
import Signup from "../components/account/SignupForm";
import Signin from "../components/account/SigninForm";

const LoginPage = () => {
  const [isSignup, setIsSignup] = useState(false);

  const handleFormToggle = () => {
    setIsSignup(!isSignup);
  };



  return (
    <div className="md:flex justify-center items-center  bg-white p-5">
      <div className="md:w-1/2 grid place-items-center">
      <img src="/cookie.png" alt=""  className="w-[200px] h-[200px] bg-transparent"/>
     <h1 className="text-2xl font-extrabold text-customBrown-dark">Crumblite</h1>
      </div>
      <div className="md:w-1/2 p-5 pt-[100px]">
        {isSignup ? (
          <Signup  />
        ) : (
          <Signin />
        )}
        <button
          onClick={handleFormToggle}
          className="mt-4 text-customBrown hover:underline text-center w-full"
        >
          {isSignup ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
        </button>
      </div>
      
    </div>
  );
};

export default LoginPage;
