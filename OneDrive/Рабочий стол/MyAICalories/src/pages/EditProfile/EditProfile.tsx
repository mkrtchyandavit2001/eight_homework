import { useState } from "react";
import "./UpdateProfile.css";

export default function UpdateProfile() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
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

    try {
      const response = await fetch("http://localhost:8000/auth/update-profile/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Token wN2pABoKYr4k7LsgaaCZX8-QgG0tnoKWAw0DaIbbpzF6xk_C--zyFALBbTT9gj1P",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "✅ Profile updated successfully!");
        setFormData({ full_name: "", email: "" });
      } else {
        setMessage(data.message || "❌ Failed to update profile.");
      }
    } catch (error) {
      setMessage("⚠️ Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-profile-container">
      <div className="update-profile-card">
        <h2>Update Profile</h2>

        <form onSubmit={handleSubmit} className="update-profile-form">
          <div className="form-group">
            <label htmlFor="full_name">Full name</label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              placeholder="Anna Adams"
              value={formData.full_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="youremail@domain.com"
              value={formData.email}
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
 