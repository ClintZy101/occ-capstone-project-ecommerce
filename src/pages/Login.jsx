import { useState } from "react";
import Signup from "../components/account/SignupForm";
import Signin from "../components/account/SigninForm";

const LoginPage = () => {
  const [isSignup, setIsSignup] = useState(false);

  const handleFormToggle = () => {
    setIsSignup(!isSignup);
  };

  return (
    <div className="md:flex  relative justify-center items-center  bg-white ">
      {/* <div className="md:w-1/2 grid place-items-center">
      <img src="/cookie.png" alt=""  className="w-[200px] h-[200px] bg-transparent"/>
     <h1 className="text-2xl font-extrabold text-customBrown-dark">Crumblite</h1>
      </div> */}
      <div className="md:w-1/2 ">
        <img
          src="https://images.pexels.com/photos/28480668/pexels-photo-28480668/free-photo-of-relaxing-coffee-break-with-cookies.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt=""
          className="w-full h-full "
        />
      </div>

      <div className="md:w-1/2 w-full h-full p-10 absolute md:relative bg-black md:bg-white bg-opacity-50 top-0 ml-auto mr-auto z-50  ">
        <div className="my-4 text-white md:text-black ">
          {isSignup ? (
            <div className="w-full grid gap-2 justify-center">
              <img src="/logo.png" alt="" className="mx-auto" />
              <h1 className="text-3xl font-bold">Create an Account</h1>
              <p className="text-center">Please Enter your details</p>
            </div>
          ) : (
            <div className="w-full grid gap-2 justify-center">
              <img src="/logo.png" alt="" className="mx-auto" />
              <h1 className="text-3xl font-bold">Welcome Back!</h1>
              <p className="text-center">Please Enter your details</p>
            </div>
          )}
        </div>

        {isSignup ? <Signup /> : <Signin />}
        <button
          onClick={handleFormToggle}
          className="mt-4 text-customBrown hover:underline text-center w-full"
        >
          {isSignup
            ? "Already have an account? Sign in"
            : "Don't have an account? Sign up"}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
