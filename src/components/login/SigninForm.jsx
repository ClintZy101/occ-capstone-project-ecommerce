import { useState } from "react";
import Input from "./Input";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase" 
import { useNavigate } from "react-router-dom";
import GoogleSignInButton from "./GoogleSignInButton";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(""); // Clear error on input change
  };

  const validateInput = () => {
    const { email, password } = formData;
    if (!email || !password) return "Email and password are required.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Invalid email format.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateInput(); // Validate input fields
    if (validationError) {
      setError(validationError);
      return;
    }
  
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      
      // Only navigate if login is successful
      if (userCredential?.user) {
        navigate("/"); 
      }
    } catch (err) {
      setError("Failed to sign in. Please check your credentials.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };
  

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4">Sign In</h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
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
        className="w-full bg-customBrown-dark hover:bg-customBrown-light text-white py-2 rounded-md"
        disabled={loading}
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
      <GoogleSignInButton />
    </form>
  );
};

export default Signin;
