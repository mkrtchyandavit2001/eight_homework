import { useState } from "react";
import "./BodyMeasurements.css";

export default function BodyMeasurements() {
  const [sex, setSex] = useState<string>("");
  const [year, setYear] = useState<string>(""); 
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async () => {
    if (!sex || !year || !weight || !height) {
      setMessage("⚠️ Please fill in all fields");
      return;
    }

    const birthDate = `1-1-${year}`;

    try {
      const response = await fetch(
        "http://localhost:8000/health/update-measurements/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer wN2pABoKYr4k7LsgaaCZX8-QgG0tnoKWAw0DaIbbpzF6xk_C--zyFALBbTT9gj1P",
          },
          body: JSON.stringify({
            height: parseInt(height, 10),
            sex,
            birth_date: birthDate,
            weight: parseFloat(weight),
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.done) {
        setMessage("Measurements successfully updated!");
      } else {
        setMessage("Failed to update measurements");
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong");
    }
  };

  return (
    <>
      {/* <div className="measurements-card"> */}
        <h2>Body Measurements</h2>

        <div className="measurements-form">
          <div className="form-group">
            <label htmlFor="sex">Sex</label>
            <select
              id="sex"
              value={sex}
              onChange={(e) => setSex(e.target.value)}
            >
              <option value="" disabled>
                Select your sex
              </option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="year">Year of birth</label>
            <select
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              {Array.from({ length: 30 }, (_, i) => 2008 - i).map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="weight">Weight (kg)</label>
            <input
              type="number"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="height">Height (cm)</label>
            <input
              type="number"
              id="height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="submit-btn"
            onClick={handleSubmit}
          >
            Continue
          </button>

          {message && <p className="message">{message}</p>}
        </div>
      {/* </div> */}
    </>
  );
}
