import { useState } from "react";
import "./ResetPassword.css";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email address.");
      setMessage("");
      return;
    }

    try {
  const response = await fetch("http://localhost:8000/auth/reset-password/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();

  if (response.ok) {
    setMessage(data.message || `Password reset link sent to ${email}`);
    setError("");
    setEmail("");
  } else {
    setError(data.message || "Failed to send reset link.");
    setMessage("");
  }
} catch (error) {
  console.error(error);
  setError("Something went wrong.");
  setMessage("");
}
  };

  return (
    <>
      <>
        <h2>Reset Password</h2>
        <p>Please enter your email address to request a password reset</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="abc@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="send-btn">
            Send
          </button>
        </form>

        {error && <span className="error">{error}</span>}
        {message && <span className="success">{message}</span>}
      </>
    </>
  );
}
