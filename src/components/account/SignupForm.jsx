import { useState } from "react";
import Input from "./Input";
import { handleLogin, handleSignup } from "../../utils/useAuthHook";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password === formData.confirmPassword) {
      handleSignup(formData.email, formData.password);
    }
    handleLogin(formData.email, formData.password)
    navigate("/");
    console.log(formData)
  
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
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
      <Input
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        placeholder="Re-enter your password"
        value={formData.confirmPassword}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="w-full bg-customBrown-dark text-white py-2 rounded-md hover:bg-customBrown"
      >
        Signup
      </button>
    </form>
  );
};

export default Signup;
