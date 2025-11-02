import { useState, type FormEvent } from "react";
import "./SignIn.css";
import { Link } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields.");
      setSuccess("");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setSuccess("");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        setSuccess("Successfully signed in!");
        setError("");
      } else {
        setError(data?.message || "Invalid email or password.");
        setSuccess("");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Login failed. Please try again later.");
      setSuccess("");
    }
  };

  return (
    <>
      <h2>Sign In</h2>

      {error && <span className="error">{error}</span>}
      {success && <span className="success">{success}</span>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="remember">
          <input type="checkbox" id="remember" /> <span>Remember me</span>
        </div>

        <span className="forgot">
          <Link to="/resetpassword">Forgot password?</Link>
        </span>

        <button type="submit">SIGN IN</button>
      </form>

      <div className="separator">OR</div>

      <button className="google">
        <img src="../../../public/images/images.png" alt="Google logo" />
        <span>Login with Google</span>
      </button>

      <span className="signin">
        Don’t have an account? <Link to="/signup">Sign Up</Link>
      </span>
      <span className="signin">
        Try? <Link to="/homepage">Try</Link>
      </span>
    </>
  );
}

export default SignIn;
