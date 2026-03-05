import React, { useState } from 'react';
import './InterviewSetup.css';

function InterviewSetup({ formData, onStartInterview, onClose }) {
  const [interviewConfig, setInterviewConfig] = useState({
    interviewType: 'Technical Interview',
    difficulty: 'Medium',
    questionCount: 5
  });

  const handleChange = (field, value) => {
    setInterviewConfig({ ...interviewConfig, [field]: value });
  };

  const handleStart = () => {
    onStartInterview(interviewConfig);
  };

  return (
    <div className="interview-setup-overlay">
      <div className="interview-setup-card">
        <div className="setup-header">
          <h2>🎯 AI Interview Simulator</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="setup-info">
          <div className="info-item">
            <span className="info-label">Department:</span>
            <span className="info-value">{formData.department}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Target Company:</span>
            <span className="info-value">{formData.targetCompany}</span>
          </div>
        </div>

        <div className="setup-form">
          <div className="form-group">
            <label>Interview Type</label>
            <div className="radio-group">
              {['Technical Interview', 'HR Interview', 'Aptitude Round'].map(type => (
                <label key={type} className="radio-option">
                  <input
                    type="radio"
                    name="interviewType"
                    value={type}
                    checked={interviewConfig.interviewType === type}
                    onChange={(e) => handleChange('interviewType', e.target.value)}
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Difficulty Level</label>
            <div className="radio-group">
              {['Easy', 'Medium', 'Hard'].map(level => (
                <label key={level} className="radio-option">
                  <input
                    type="radio"
                    name="difficulty"
                    value={level}
                    checked={interviewConfig.difficulty === level}
                    onChange={(e) => handleChange('difficulty', e.target.value)}
                  />
                  <span>{level}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Number of Questions</label>
            <div className="radio-group">
              {[3, 5, 10].map(count => (
                <label key={count} className="radio-option">
                  <input
                    type="radio"
                    name="questionCount"
                    value={count}
                    checked={interviewConfig.questionCount === count}
                    onChange={(e) => handleChange('questionCount', parseInt(e.target.value))}
                  />
                  <span>{count} Questions</span>
                </label>
              ))}
            </div>
          </div>

          <button className="start-interview-btn" onClick={handleStart}>
            Start Interview
          </button>
        </div>
      </div>
    </div>
  );
}

export default InterviewSetup;
