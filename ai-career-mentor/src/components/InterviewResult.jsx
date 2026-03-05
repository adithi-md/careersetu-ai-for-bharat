import React from 'react';
import './InterviewResult.css';
import { evaluateAnswer } from '../utils/interviewQuestions';

function InterviewResult({ questions, answers, config, onClose, onRetry }) {
  // Evaluate all answers
  const evaluations = questions.map((q, index) => {
    const answer = answers[index] || '';
    return evaluateAnswer(q.question, answer, q.topic);
  });

  // Calculate overall score
  const totalScore = evaluations.reduce((sum, evaluation) => sum + evaluation.score, 0);
  const averageScore = Math.round(totalScore / evaluations.length);

  // Determine performance level
  const getPerformanceLevel = (score) => {
    if (score >= 80) return { label: 'Excellent', color: '#22c55e' };
    if (score >= 60) return { label: 'Good', color: '#3b82f6' };
    if (score >= 40) return { label: 'Average', color: '#f59e0b' };
    return { label: 'Needs Improvement', color: '#ef4444' };
  };

  const performance = getPerformanceLevel(averageScore);

  // Generate strengths and improvements
  const strengths = [];
  const improvements = [];

  if (averageScore >= 70) {
    strengths.push('Strong conceptual understanding');
    strengths.push('Clear and structured explanations');
  }
  if (averageScore >= 60) {
    strengths.push('Good technical knowledge');
  }
  if (averageScore < 70) {
    improvements.push('Provide more detailed explanations');
    improvements.push('Include practical examples in answers');
  }
  if (averageScore < 50) {
    improvements.push('Focus on fundamental concepts');
    improvements.push('Practice more technical questions');
  }

  // Get unique topics from questions
  const topics = [...new Set(questions.map(q => q.topic))];

  return (
    <div className="interview-result-overlay">
      <div className="interview-result-card">
        <div className="result-header">
          <h2>🎉 Interview Complete!</h2>
          <p className="result-subtitle">
            {config.interviewType} • {config.difficulty} Level • {questions.length} Questions
          </p>
        </div>

        <div className="score-display">
          <div 
            className="score-circle-large" 
            style={{ borderColor: performance.color }}
          >
            <span className="score-number-large">{averageScore}</span>
            <span className="score-label-large">Overall Score</span>
          </div>
          <div 
            className="performance-badge" 
            style={{ 
              background: `${performance.color}20`, 
              color: performance.color 
            }}
          >
            {performance.label} Performance
          </div>
        </div>

        <div className="result-sections">
          {strengths.length > 0 && (
            <div className="result-section strengths">
              <h3>✨ Strengths</h3>
              <ul className="result-list">
                {strengths.map((strength, idx) => (
                  <li key={idx}>{strength}</li>
                ))}
              </ul>
            </div>
          )}

          {improvements.length > 0 && (
            <div className="result-section improvements">
              <h3>📈 Areas to Improve</h3>
              <ul className="result-list improvements">
                {improvements.map((improvement, idx) => (
                  <li key={idx}>{improvement}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="result-section topics">
            <h3>📚 Recommended Study Topics</h3>
            <div className="topics-grid">
              {topics.map((topic, idx) => (
                <div key={idx} className="topic-badge">{topic}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="detailed-feedback">
          <h3>📝 Detailed Feedback</h3>
          {questions.map((question, index) => {
            const answer = answers[index] || 'No answer provided';
            const evaluation = evaluations[index];
            const scoreColor = evaluation.score >= 70 ? '#22c55e' : evaluation.score >= 50 ? '#f59e0b' : '#ef4444';

            return (
              <div key={index} className="feedback-item">
                <div className="feedback-question">
                  Q{index + 1}: {question.question}
                </div>
                <div className="feedback-answer">
                  {answer.length > 150 ? answer.substring(0, 150) + '...' : answer}
                </div>
                <div className="feedback-score">
                  <div className="score-bar">
                    <div 
                      className="score-bar-fill" 
                      style={{ 
                        width: `${evaluation.score}%`,
                        background: scoreColor
                      }}
                    ></div>
                  </div>
                  <span className="score-value">{evaluation.score}%</span>
                </div>
                <div className="feedback-text">
                  {evaluation.feedback}
                </div>
              </div>
            );
          })}
        </div>

        <div className="result-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          <button className="btn btn-primary" onClick={onRetry}>
            Try Another Interview
          </button>
        </div>
      </div>
    </div>
  );
}

export default InterviewResult;
