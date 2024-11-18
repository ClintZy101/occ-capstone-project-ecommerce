import { useState } from "react";
import Input from "./Input";
import { handleLogin } from "../../utils/useAuthHook";
import { useNavigate } from "react-router-dom";
import GoogleSignInButton from "./GoogleSignInButton";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(formData.email, formData.password)
    navigate("/")
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Sign In</h2>
      <Input
        label="Email"
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
      />
      <Input
        label="Password"
        type="password"
        name="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="w-full bg-customBrown-dark hover:bg-customBrown-light text-white py-2 rounded-md "
      >
        Signin
      </button>
      <GoogleSignInButton />
    </form>
  );
};

export default Signin;
