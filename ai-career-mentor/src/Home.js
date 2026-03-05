import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    department: "",
    year: "",
    targetCompany: "",
    hoursPerDay: "",
    monthsAvailable: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate AI processing time
    setTimeout(() => {
      navigate("/report", { state: formData });
    }, 2000);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
        <h2>AI is analyzing your profile...</h2>
        <p>Evaluating readiness • Comparing with company standards • Generating roadmap</p>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-title">Career Readiness AI</h1>
        <p className="hero-subtitle">
          AI-powered platform that evaluates your readiness for top tech companies
        </p>
      </div>

      <div className="form-card">
        <h2 className="form-title">Build Your Career Intelligence Report</h2>
        <p className="form-description">
          Answer a few questions and let AI create your personalized preparation roadmap
        </p>

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label>Department / Degree</label>
            <select name="department" onChange={handleChange} required>
              <option value="">Select your department</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Electronics">Electronics & Communication</option>
              <option value="Mechanical">Mechanical Engineering</option>
              <option value="Civil">Civil Engineering</option>
              <option value="Other Engineering">Other Engineering</option>
            </select>
          </div>

          <div className="form-group">
            <label>Year of Study</label>
            <select name="year" onChange={handleChange} required>
              <option value="">Select year</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
              <option value="Graduate">Graduate</option>
            </select>
          </div>

          <div className="form-group">
            <label>Target Company</label>
            <select name="targetCompany" onChange={handleChange} required>
              <option value="">Select target company</option>
              <option value="Amazon">Amazon</option>
              <option value="Google">Google</option>
              <option value="Microsoft">Microsoft</option>
              <option value="Infosys">Infosys</option>
              <option value="TCS">TCS</option>
              <option value="Wipro">Wipro</option>
              <option value="Startup">Tech Startup</option>
            </select>
          </div>

          <div className="form-group">
            <label>Study Hours Per Day</label>
            <input
              type="number"
              name="hoursPerDay"
              min="1"
              max="12"
              placeholder="e.g., 4"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Months Available for Preparation</label>
            <input
              type="number"
              name="monthsAvailable"
              min="1"
              max="24"
              placeholder="e.g., 6"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Generate Intelligent Report
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;