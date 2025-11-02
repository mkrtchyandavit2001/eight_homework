import { useState } from "react";
import "./CangePassword.css";

export default function ChangePassword() {
  const [formData, setFormData] = useState({
    old_password: "",
    password1: "",
    password2: "",
  });

  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (formData.password1 !== formData.password2) {
      setMessage("New passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/auth/change-password/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Token wN2pABoKYr4k7LsgaaCZX8-QgG0tnoKWAw0DaIbbpzF6xk_C--zyFALBbTT9gj1P",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.done) {
        setMessage("Password successfully changed!");
        setFormData({ old_password: "", password1: "", password2: "" });
      } else {
        setMessage("Failed to change password. Check your credentials.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="change-password-container">
      <div className="change-password-card">
        <h2>Change Password</h2>

        <form onSubmit={handleSubmit} className="change-password-form">
          <div className="form-group">
            <label htmlFor="old_password">Current password</label>
            <input
              type="password"
              id="old_password"
              name="old_password"
              value={formData.old_password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password1">New password</label>
            <input
              type="password"
              id="password1"
              name="password1"
              value={formData.password1}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password2">Confirm new password</label>
            <input
              type="password"
              id="password2"
              name="password2"
              value={formData.password2}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Processing..." : "Submit"}
          </button>
        </form>

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}
