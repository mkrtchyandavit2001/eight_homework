      
import "./HomePage.css";
import { GoBell } from "react-icons/go";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

export default function HomePage() {
  const goal = 1600;
  const food = 1600;
  const exercise = 1600;
  const remaining = 250;
  const percent = (remaining / goal) * 100;

  const data = {
    labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL"],
    datasets: [
      {
        label: "Weight",
        data: [100, 200, 300, 280, 500, 700, 1000],
        fill: true,
        borderColor: "#2563eb",
        backgroundColor: "rgba(37,99,235,0.15)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: { display: false },
      x: { grid: { display: false } },
    },
    plugins: { legend: { display: false } },
  };

  return (
    <>
        <header className="dashboard-header">
        <div className="logo"><img src="../../../public/images/photo_2025-10-14_19-41-08.jpg" alt="" /></div>
        <button className="premium-btn">Get Premium</button>
        <div className="notification"><GoBell /></div>
      </header>
      <h2 className="section-title">Today</h2>

      {/* Calories Card */}
      <div className="card calories-card">
        <div className="left">
          <h3>Calories</h3>
          <p className="formula">Remaining = Goal − Food + Exercise</p>

          <div className="progress-ring">
            <div
              className="circle"
              style={{
                background: `conic-gradient(#22c55e ${percent * 3.6}deg, #e5e7eb ${percent * 3.6}deg)`,
              }}
            >
              <div className="inner">
                <p className="value">{remaining}</p>
                <p className="label">Remaining</p>
              </div>
            </div>
          </div>
        </div>

        <div className="right">
          <div className="stat">
            <span className="icon">🏆</span>
            <div>
              <p className="label">Base Goal</p>
              <p className="value">{goal.toLocaleString()}</p>
            </div>
          </div>
          <div className="stat">
            <span className="icon">🥕</span>
            <div>
              <p className="label">Food</p>
              <p className="value">{food.toLocaleString()}</p>
            </div>
          </div>
          <div className="stat">
            <span className="icon">🔥</span>
            <div>
              <p className="label">Exercise</p>
              <p className="value">{exercise.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Steps & Exercise Section */}
      <div className="stats-row">
        <div className="card mini-card">
          <h4>Steps</h4>
          <p className="highlight">🥾 </p>
          <p className="sub">Goal: 10,000 steps</p>
          <div className="progress-bar">
            <div className="progress" style={{ width: "16%" }}></div>
          </div>
        </div>

        <div className="card mini-card">
          <h4>Exercise</h4>
          <p className="highlight">🔥 1,600 cal</p>
          <p className="sub">⏱ 00:25 hr</p>
        </div>
      </div>

      <div className="card weight-card">
        <h4>Weight</h4>
        <div className="chart-container">
          <Line data={data} options={options} />
        </div>
      </div>
    </>
  );
}
