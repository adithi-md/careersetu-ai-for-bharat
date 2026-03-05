import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Report.css";

function Report() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state || {};

  const [animatedScore, setAnimatedScore] = useState(0);
  const [projectedScore, setProjectedScore] = useState(0);
  const [aiAnalysis, setAiAnalysis] = useState(null);

  // AI Logic - Calculate readiness score
  const calculateReadiness = () => {
    const yearScore = {
      "1": 20,
      "2": 35,
      "3": 50,
      "4": 65,
      "Graduate": 70
    };

    const companyDifficulty = {
      "Amazon": 90,
      "Google": 95,
      "Microsoft": 92,
      "Infosys": 70,
      "TCS": 65,
      "Wipro": 68,
      "Startup": 75
    };

    const baseScore = yearScore[data.year] || 30;
    const hoursBonus = Math.min(Number(data.hoursPerDay) * 3, 20);
    const timeBonus = Math.min(Number(data.monthsAvailable) * 2, 15);
    
    const currentScore = Math.min(baseScore + hoursBonus + timeBonus, 100);
    const targetScore = companyDifficulty[data.targetCompany] || 75;
    
    const improvement = Math.min(
      Number(data.hoursPerDay) * Number(data.monthsAvailable) * 0.8,
      30
    );
    
    const futureScore = Math.min(currentScore + improvement, 100);

    return {
      current: Math.round(currentScore),
      projected: Math.round(futureScore),
      target: targetScore,
      gap: Math.max(targetScore - currentScore, 0)
    };
  };

  const generateAIAnalysis = () => {
    const scores = calculateReadiness();
    
    const companyData = {
      "Amazon": {
        overview: "Amazon seeks candidates with strong problem-solving skills, system design knowledge, and leadership principles alignment.",
        requirements: ["Data Structures & Algorithms", "System Design", "Behavioral (Leadership Principles)", "Coding Proficiency"],
        interviewPattern: "2 Online Assessments → Phone Screen → 4-5 Onsite Rounds (Coding + System Design + Behavioral)",
        skills: { dsa: 90, systemDesign: 85, problemSolving: 88, projects: 75 }
      },
      "Google": {
        overview: "Google emphasizes algorithmic thinking, scalability, and innovation. Candidates must excel in coding and system design.",
        requirements: ["Advanced Algorithms", "Distributed Systems", "Code Optimization", "Product Sense"],
        interviewPattern: "Phone Screen → 4-5 Technical Rounds (Algorithms + System Design + Googleyness)",
        skills: { dsa: 95, systemDesign: 90, problemSolving: 92, projects: 80 }
      },
      "Microsoft": {
        overview: "Microsoft values technical depth, collaboration, and growth mindset. Strong coding and design skills required.",
        requirements: ["Data Structures", "Object-Oriented Design", "Cloud Technologies", "Problem Solving"],
        interviewPattern: "Phone Screen → Onsite (Coding + Design + Behavioral)",
        skills: { dsa: 88, systemDesign: 85, problemSolving: 85, projects: 78 }
      },
      "Infosys": {
        overview: "Infosys focuses on foundational programming, aptitude, and communication skills for entry-level roles.",
        requirements: ["Programming Basics", "Aptitude", "Communication", "Domain Knowledge"],
        interviewPattern: "Online Test → Technical Interview → HR Round",
        skills: { dsa: 65, systemDesign: 50, problemSolving: 70, projects: 60 }
      },
      "TCS": {
        overview: "TCS evaluates candidates on programming fundamentals, logical reasoning, and communication.",
        requirements: ["C/Java/Python", "Aptitude & Reasoning", "Communication", "Basic CS Concepts"],
        interviewPattern: "National Qualifier Test → Technical + HR Interview",
        skills: { dsa: 60, systemDesign: 45, problemSolving: 65, projects: 55 }
      },
      "Wipro": {
        overview: "Wipro assesses coding ability, problem-solving, and communication for campus placements.",
        requirements: ["Programming", "Logical Reasoning", "Verbal Ability", "Technical Knowledge"],
        interviewPattern: "Online Test → Technical Interview → HR Round",
        skills: { dsa: 68, systemDesign: 50, problemSolving: 70, projects: 58 }
      },
      "Startup": {
        overview: "Startups seek versatile engineers with hands-on experience, quick learning ability, and ownership mindset.",
        requirements: ["Full-Stack Skills", "Problem Solving", "Real Projects", "Adaptability"],
        interviewPattern: "Take-home Assignment → Technical Discussion → Culture Fit",
        skills: { dsa: 70, systemDesign: 65, problemSolving: 75, projects: 85 }
      }
    };

    const company = companyData[data.targetCompany] || companyData["Startup"];
    
    // Calculate candidate skills based on year and preparation
    const candidateSkills = {
      dsa: Math.min(scores.current - 5, 100),
      systemDesign: Math.min(scores.current - 15, 100),
      problemSolving: Math.min(scores.current, 100),
      projects: Math.min(scores.current - 10, 100)
    };

    // Generate skill gaps
    const skillGaps = Object.keys(company.skills).map(skill => ({
      name: skill,
      candidate: candidateSkills[skill],
      required: company.skills[skill],
      gap: Math.max(company.skills[skill] - candidateSkills[skill], 0)
    }));

    // Generate AI recommendations
    const weaknesses = skillGaps
      .filter(s => s.gap > 10)
      .map(s => s.name)
      .join(", ");

    const aiExplanation = scores.gap > 20
      ? `Significant preparation needed. Focus on ${weaknesses || "core fundamentals"}. Your current readiness is ${scores.current}% but ${data.targetCompany} expects ${scores.target}%.`
      : scores.gap > 10
      ? `You're on the right track but need focused improvement in ${weaknesses || "key areas"}. Bridge the ${scores.gap}% gap with consistent practice.`
      : `Strong profile! You're ${scores.current}% ready. Fine-tune your skills and you'll be competitive for ${data.targetCompany}.`;

    // Generate roadmap
    const roadmap = generateRoadmap(scores, skillGaps);

    return {
      scores,
      company,
      candidateSkills,
      skillGaps,
      aiExplanation,
      roadmap
    };
  };

  const generateRoadmap = (scores, skillGaps) => {
    const months = Number(data.monthsAvailable);
    const hoursPerDay = Number(data.hoursPerDay);

    if (months <= 3) {
      return [
        { phase: "Month 1", focus: "DSA Fundamentals", tasks: ["Arrays, Strings, Linked Lists", "Basic sorting & searching", "Solve 50 easy problems"] },
        { phase: "Month 2", focus: "Advanced DSA", tasks: ["Trees, Graphs, DP", "Solve 40 medium problems", "Mock interviews"] },
        { phase: "Month 3", focus: "System Design & Projects", tasks: ["Design patterns", "Build 1 full-stack project", "Final preparation"] }
      ];
    } else if (months <= 6) {
      return [
        { phase: "Month 1-2", focus: "DSA Foundation", tasks: ["Master all data structures", "100 LeetCode problems", "Time complexity analysis"] },
        { phase: "Month 3-4", focus: "Advanced Problem Solving", tasks: ["Dynamic Programming", "Graph algorithms", "System design basics"] },
        { phase: "Month 5-6", focus: "Interview Prep", tasks: ["Mock interviews", "Build 2 projects", "Company-specific preparation"] }
      ];
    } else {
      return [
        { phase: "Month 1-3", focus: "Strong Foundation", tasks: ["Complete DSA course", "150 problems", "CS fundamentals"] },
        { phase: "Month 4-6", focus: "Intermediate Skills", tasks: ["Advanced algorithms", "System design", "Open source contributions"] },
        { phase: "Month 7+", focus: "Expert Level", tasks: ["Competitive programming", "Multiple projects", "Interview mastery"] }
      ];
    }
  };

  useEffect(() => {
    if (!data.targetCompany) return;

    const analysis = generateAIAnalysis();
    setAiAnalysis(analysis);

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

  if (!aiAnalysis) {
    return <div className="loading-screen"><div className="loader"></div></div>;
  }

  const { scores, company, skillGaps, aiExplanation, roadmap } = aiAnalysis;

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

          {/* 3-Month Projection */}
          <div className="analysis-card projection">
            <h3>📈 3-Month Readiness Projection</h3>
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

          {/* Recommended Topics */}
          <div className="company-card">
            <h3>Recommended Study Topics</h3>
            <div className="topics-grid">
              <span className="topic-tag">Arrays & Strings</span>
              <span className="topic-tag">Dynamic Programming</span>
              <span className="topic-tag">System Design</span>
              <span className="topic-tag">Trees & Graphs</span>
              <span className="topic-tag">Object-Oriented Design</span>
              <span className="topic-tag">Databases</span>
              <span className="topic-tag">Behavioral Questions</span>
              <span className="topic-tag">Mock Interviews</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Report;
