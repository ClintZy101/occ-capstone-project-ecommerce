import React from "react";
import { handleLogin, handleLogout, handleSignup } from "../utils/useAuthHook";
import { useNavigate } from "react-router-dom";

const AuthActions = () => {
    const navigate = useNavigate();
  const signup = () => handleSignup("test@example.com", "password123");
  const login = () => {
    handleLogin("test@example.com", "password123");
    navigate("/")
  };
  const logout = () => handleLogout();

  return (
    <div className="grid gap-5">
      <button onClick={signup}>Signup</button>
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default AuthActions;
