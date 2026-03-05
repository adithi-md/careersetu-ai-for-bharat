import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Report.css";
import { generateAIAnalysis } from "./utils/aiLogic";

function Report() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state || {};

  const [animatedScore, setAnimatedScore] = useState(0);
  const [projectedScore, setProjectedScore] = useState(0);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    if (!data.targetCompany) return;

    // Simulate AI processing
    setTimeout(() => {
      const analysis = generateAIAnalysis(data);
      setAiAnalysis(analysis);
      setLoading(false);

      // Animate score
      let current = 0;
      const target = analysis.scores.current;
      const increment = target / 50;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setAnimatedScore(Math.floor(current));
      }, 20);

      setTimeout(() => {
        setProjectedScore(analysis.scores.projected);
      }, 1000);

      return () => clearInterval(timer);
    }, 1500);
  }, [data]);

  if (!data.targetCompany) {
    return (
      <div className="error-container">
        <h2>No Data Found</h2>
        <p>Please fill out the form first</p>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  if (loading || !aiAnalysis) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
        <h2>Analyzing your profile using AI...</h2>
        <p>Evaluating {data.department} skills • Comparing with {data.targetCompany} standards • Generating roadmap</p>
      </div>
    );
  }

  const { scores, company, skillGaps, aiExplanation, roadmap, studyTopics } = aiAnalysis;

  const getScoreColor = (score) => {
    if (score >= 75) return "#22c55e";
    if (score >= 50) return "#f59e0b";
    return "#ef4444";
  };

  const getConfidenceLevel = (score) => {
    if (score >= 80) return "Strong Candidate";
    if (score >= 60) return "Moderate Alignment";
    return "Needs Improvement";
  };

  return (
    <div className="report-container">
      <div className="report-header">
        <button className="back-btn" onClick={() => navigate("/")}>← New Analysis</button>
        <h1>Career Readiness Intelligence Report</h1>
      </div>

      <div className="dashboard">
        {/* LEFT PANEL - Candidate Analysis */}
        <div className="panel left-panel">
          <div className="panel-header">
            <h2>Your Readiness Profile</h2>
            <span className="badge">{data.department} • Year {data.year}</span>
          </div>

          {/* Readiness Score */}
          <div className="score-card">
            <div className="score-circle" style={{ borderColor: getScoreColor(animatedScore) }}>
              <span className="score-number">{animatedScore}</span>
              <span className="score-label">Current Readiness</span>
            </div>
            <div className="score-status">
              <span className="status-badge" style={{ background: getScoreColor(animatedScore) }}>
                {getConfidenceLevel(animatedScore)}
              </span>
            </div>
          </div>

          {/* AI Explanation */}
          <div className="analysis-card">
            <h3>🤖 AI Analysis</h3>
            <p className="ai-text">{aiExplanation}</p>
          </div>

          {/* Skill Gaps */}
          <div className="analysis-card">
            <h3>📊 Skill Gap Analysis</h3>
            {skillGaps.map((skill, idx) => (
              <div key={idx} className="skill-item">
                <div className="skill-header">
                  <span className="skill-name">{skill.name.toUpperCase()}</span>
                  <span className={`gap-badge ${skill.gap <= 5 ? 'good' : skill.gap <= 15 ? 'moderate' : 'critical'}`}>
                    {skill.gap > 0 ? `-${skill.gap}%` : "✓ Aligned"}
                  </span>
                </div>
                <div className="skill-bars">
                  <div className="skill-bar">
                    <div className="skill-fill" style={{ width: `${skill.candidate}%`, background: "#667eea" }}></div>
                  </div>
                  <div className="skill-bar target">
                    <div className="skill-fill" style={{ width: `${skill.required}%`, background: "#f59e0b" }}></div>
                  </div>
                </div>
                <div className="skill-legend">
                  <span>You: {skill.candidate}%</span>
                  <span>Required: {skill.required}%</span>
                </div>
              </div>
            ))}
          </div>

          {/* Dynamic Month Readiness Projection */}
          <div className="analysis-card projection">
            <h3>📈 {data.monthsAvailable}-Month Readiness Projection</h3>
            <div className="projection-score">
              <span className="projected-number">{projectedScore}%</span>
              <span className="improvement">+{projectedScore - scores.current}% improvement</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${projectedScore}%`, background: "#22c55e" }}></div>
            </div>
            <p className="projection-note">
              With {data.hoursPerDay} hours/day over {data.monthsAvailable} months
            </p>
          </div>

          {/* Preparation Roadmap */}
          <div className="analysis-card">
            <h3>🗺️ Personalized Preparation Roadmap</h3>
            {roadmap.map((phase, idx) => (
              <div key={idx} className="roadmap-phase">
                <div className="phase-header">
                  <span className="phase-number">{idx + 1}</span>
                  <div>
                    <h4>{phase.phase}</h4>
                    <p className="phase-focus">{phase.focus}</p>
                  </div>
                </div>
                <ul className="phase-tasks">
                  {phase.tasks.map((task, i) => (
                    <li key={i}>{task}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL - Company Intelligence */}
        <div className="panel right-panel">
          <div className="panel-header">
            <h2>{data.targetCompany} Intelligence</h2>
            <span className="target-badge">Target Company</span>
          </div>

          {/* Company Overview */}
          <div className="company-card">
            <h3>Company Overview</h3>
            <p>{company.overview}</p>
          </div>

          {/* Hiring Requirements */}
          <div className="company-card">
            <h3>Key Requirements</h3>
            <ul className="requirements-list">
              {company.requirements.map((req, idx) => (
                <li key={idx}>
                  <span className="check-icon">✓</span>
                  {req}
                </li>
              ))}
            </ul>
          </div>

          {/* Interview Pattern */}
          <div className="company-card">
            <h3>Interview Process</h3>
            <p className="interview-pattern">{company.interviewPattern}</p>
          </div>

          {/* Alignment Comparison */}
          <div className="company-card">
            <h3>Candidate vs Company Expectations</h3>
            <div className="comparison-chart">
              {skillGaps.map((skill, idx) => (
                <div key={idx} className="comparison-item">
                  <span className="comparison-label">{skill.name}</span>
                  <div className="comparison-bars">
                    <div className="comparison-bar candidate">
                      <div style={{ width: `${skill.candidate}%` }}></div>
                      <span>{skill.candidate}%</span>
                    </div>
                    <div className="comparison-bar company">
                      <div style={{ width: `${skill.required}%` }}></div>
                      <span>{skill.required}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Topics - Dynamic based on department */}
          <div className="company-card">
            <h3>Recommended Study Topics</h3>
            <div className="topics-grid">
              {studyTopics.map((topic, idx) => (
                <span key={idx} className="topic-tag">{topic}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Report;
