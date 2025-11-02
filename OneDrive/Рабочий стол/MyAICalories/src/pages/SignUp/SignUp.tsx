import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Registration: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d._%+-]{8,}$/.test(password);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      setSuccess("");
      return;
    }
    if (!validateEmail(email)) {
      setError("Invalid email address.");
      setSuccess("");
      return;
    }
    if (!validatePassword(password)) {
      setError(
        "Password must contain at least 8 chars, one uppercase, one lowercase, and one number."
      );
      setSuccess("");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setSuccess("");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/auth/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json",
          
         },
        body: JSON.stringify({
          email,
          full_name: name,
          password1: password,
          password2: confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data?.message || "Registration failed");

      setSuccess("✅ Registration successful! Confirmation email sent.");
      setError("");

      navigate("/verify", { state: { email } });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed';
      setError(errorMessage);
      setSuccess("");
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {error && <span className="error">{error}</span>}
      {success && <span className="success">{success}</span>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <button type="submit">SIGN UP</button>
      </form>
      
      <div className="or">
        <span>OR</span>
      </div>
      
      <button className="google" type="button">
        <span>
          <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" />
          Login with Google
        </span>
      </button>
      
      <div className="signin">
        <span>Already have an account? <Link to="/changepassword">Signin</Link></span>
      </div>
    </div>
  );
};

export default Registration;
