import { useState } from "react";
import Input from "./Input";
import { handleSignup } from "../../utils/useAuthHook";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (!formData.email) {
      return "Email is required.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return "Please enter a valid email address.";
    }
    if (!formData.password) {
      return "Password is required.";
    }
    if (formData.password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match.";
    }
    return null; // No errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setError(null);
      await handleSignup(formData.email, formData.password);
      navigate("/");
    } catch (err) {
      setError("Failed to sign up. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4">Signup</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

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
