// AWS Lambda Function for Career Readiness AI Analysis
// This function processes user input and generates AI-powered career readiness reports

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

// AI Prompt Template for Amazon Bedrock or OpenAI
const generateAIPrompt = (userData) => {
  return `You are an expert career counselor and technical recruiter with deep knowledge of tech company hiring standards.

Analyze this candidate profile:
- Department: ${userData.department}
- Year of Study: ${userData.year}
- Target Company: ${userData.targetCompany}
- Study Hours Per Day: ${userData.hoursPerDay}
- Preparation Timeline: ${userData.monthsAvailable} months

Generate a comprehensive career readiness analysis including:

1. READINESS SCORE (0-100): Calculate based on:
   - Academic year and experience level
   - Preparation time and daily commitment
   - Target company difficulty level
   - Industry standards

2. SKILL GAP ANALYSIS: Identify gaps in:
   - Data Structures & Algorithms
   - System Design
   - Problem Solving
   - Project Experience

3. COMPANY ALIGNMENT: Compare candidate profile against ${userData.targetCompany}'s expectations:
   - Technical requirements
   - Interview difficulty
   - Typical candidate profile

4. PERSONALIZED ROADMAP: Create a ${userData.monthsAvailable}-month preparation plan with:
   - Monthly milestones
   - Specific topics to study
   - Practice problem targets
   - Project recommendations

5. 3-MONTH PROJECTION: Predict readiness improvement with consistent ${userData.hoursPerDay} hours/day study.

Provide actionable, realistic, and encouraging guidance. Be specific about weaknesses and concrete about improvement steps.`;
};

// Main Lambda Handler
exports.handler = async (event) => {
  console.log('Received event:', JSON.stringify(event, null, 2));

  try {
    // Parse request body
    const body = JSON.parse(event.body || '{}');
    const { department, year, targetCompany, hoursPerDay, monthsAvailable, userId } = body;

    // Validate input
    if (!department || !year || !targetCompany || !hoursPerDay || !monthsAvailable) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          error: 'Missing required fields'
        })
      };
    }

    // Calculate base readiness score
    const readinessScore = calculateReadinessScore({
      year,
      hoursPerDay: parseInt(hoursPerDay),
      monthsAvailable: parseInt(monthsAvailable),
      targetCompany
    });

    // Generate AI analysis (integrate with Amazon Bedrock or OpenAI)
    const aiAnalysis = await generateAIAnalysis({
      department,
      year,
      targetCompany,
      hoursPerDay,
      monthsAvailable,
      readinessScore
    });

    // Store in DynamoDB
    if (userId) {
      await storeAnalysis(userId, {
        department,
        year,
        targetCompany,
        hoursPerDay,
        monthsAvailable,
        readinessScore,
        timestamp: new Date().toISOString()
      });
    }

    // Return response
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: true,
        data: {
          readinessScore,
          aiAnalysis,
          timestamp: new Date().toISOString()
        }
      })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: 'Internal server error',
        message: error.message
      })
    };
  }
};

// Calculate readiness score based on input parameters
function calculateReadinessScore({ year, hoursPerDay, monthsAvailable, targetCompany }) {
  const yearScores = {
    '1': 20,
    '2': 35,
    '3': 50,
    '4': 65,
    'Graduate': 70
  };

  const companyDifficulty = {
    'Amazon': 90,
    'Google': 95,
    'Microsoft': 92,
    'Infosys': 70,
    'TCS': 65,
    'Wipro': 68,
    'Startup': 75
  };

  const baseScore = yearScores[year] || 30;
  const hoursBonus = Math.min(hoursPerDay * 3, 20);
  const timeBonus = Math.min(monthsAvailable * 2, 15);
  
  const currentScore = Math.min(baseScore + hoursBonus + timeBonus, 100);
  const targetScore = companyDifficulty[targetCompany] || 75;
  const gap = Math.max(targetScore - currentScore, 0);

  return {
    current: Math.round(currentScore),
    target: targetScore,
    gap: gap,
    projected: Math.min(currentScore + (hoursPerDay * monthsAvailable * 0.8), 100)
  };
}

// Generate AI analysis using Amazon Bedrock or external LLM
async function generateAIAnalysis(userData) {
  // Option 1: Amazon Bedrock Integration
  // const bedrock = new AWS.BedrockRuntime();
  // const prompt = generateAIPrompt(userData);
  // const response = await bedrock.invokeModel({
  //   modelId: 'anthropic.claude-v2',
  //   body: JSON.stringify({
  //     prompt: prompt,
  //     max_tokens_to_sample: 2000
  //   })
  // }).promise();

  // Option 2: OpenAI Integration (via HTTPS)
  // const openaiResponse = await callOpenAI(generateAIPrompt(userData));

  // For hackathon demo, return structured analysis
  return {
    skillGaps: generateSkillGaps(userData),
    roadmap: generateRoadmap(userData),
    companyIntel: getCompanyIntelligence(userData.targetCompany),
    recommendations: generateRecommendations(userData)
  };
}

// Generate skill gap analysis
function generateSkillGaps(userData) {
  const companyRequirements = {
    'Amazon': { dsa: 90, systemDesign: 85, problemSolving: 88, projects: 75 },
    'Google': { dsa: 95, systemDesign: 90, problemSolving: 92, projects: 80 },
    'Microsoft': { dsa: 88, systemDesign: 85, problemSolving: 85, projects: 78 },
    'Infosys': { dsa: 65, systemDesign: 50, problemSolving: 70, projects: 60 },
    'TCS': { dsa: 60, systemDesign: 45, problemSolving: 65, projects: 55 },
    'Wipro': { dsa: 68, systemDesign: 50, problemSolving: 70, projects: 58 },
    'Startup': { dsa: 70, systemDesign: 65, problemSolving: 75, projects: 85 }
  };

  const required = companyRequirements[userData.targetCompany];
  const current = userData.readinessScore.current;

  return {
    dsa: { current: Math.min(current - 5, 100), required: required.dsa },
    systemDesign: { current: Math.min(current - 15, 100), required: required.systemDesign },
    problemSolving: { current: Math.min(current, 100), required: required.problemSolving },
    projects: { current: Math.min(current - 10, 100), required: required.projects }
  };
}

// Generate personalized roadmap
function generateRoadmap(userData) {
  const months = parseInt(userData.monthsAvailable);
  
  if (months <= 3) {
    return [
      {
        phase: 'Month 1',
        focus: 'DSA Fundamentals',
        tasks: ['Master arrays, strings, linked lists', 'Learn basic sorting algorithms', 'Solve 50 easy LeetCode problems']
      },
      {
        phase: 'Month 2',
        focus: 'Advanced DSA',
        tasks: ['Trees, graphs, dynamic programming', 'Solve 40 medium problems', 'Start mock interviews']
      },
      {
        phase: 'Month 3',
        focus: 'System Design & Projects',
        tasks: ['Learn design patterns', 'Build 1 full-stack project', 'Company-specific preparation']
      }
    ];
  } else if (months <= 6) {
    return [
      {
        phase: 'Month 1-2',
        focus: 'Strong Foundation',
        tasks: ['Complete DSA course', 'Solve 100 problems', 'Time complexity mastery']
      },
      {
        phase: 'Month 3-4',
        focus: 'Advanced Topics',
        tasks: ['Dynamic programming deep dive', 'Graph algorithms', 'System design basics']
      },
      {
        phase: 'Month 5-6',
        focus: 'Interview Ready',
        tasks: ['Mock interviews weekly', 'Build 2 projects', 'Company research']
      }
    ];
  } else {
    return [
      {
        phase: 'Month 1-3',
        focus: 'Comprehensive Foundation',
        tasks: ['Complete CS fundamentals', '150 problems', 'Open source contributions']
      },
      {
        phase: 'Month 4-6',
        focus: 'Intermediate Mastery',
        tasks: ['Advanced algorithms', 'System design', 'Build 2-3 projects']
      },
      {
        phase: 'Month 7+',
        focus: 'Expert Level',
        tasks: ['Competitive programming', 'Multiple projects', 'Interview mastery']
      }
    ];
  }
}

// Get company intelligence
function getCompanyIntelligence(company) {
  const intel = {
    'Amazon': {
      overview: 'Amazon seeks strong problem solvers with leadership principles alignment',
      interviewPattern: '2 OAs → Phone Screen → 4-5 Onsite (Coding + Design + Behavioral)',
      keySkills: ['DSA', 'System Design', 'Leadership Principles', 'Scalability']
    },
    'Google': {
      overview: 'Google emphasizes algorithmic thinking and innovation',
      interviewPattern: 'Phone Screen → 4-5 Technical Rounds (Algorithms + Design)',
      keySkills: ['Advanced Algorithms', 'Distributed Systems', 'Code Quality', 'Innovation']
    },
    'Microsoft': {
      overview: 'Microsoft values technical depth and growth mindset',
      interviewPattern: 'Phone Screen → Onsite (Coding + Design + Behavioral)',
      keySkills: ['DSA', 'OOP Design', 'Cloud Technologies', 'Collaboration']
    }
  };

  return intel[company] || {
    overview: 'Focus on strong fundamentals and practical skills',
    interviewPattern: 'Technical rounds + HR discussion',
    keySkills: ['Programming', 'Problem Solving', 'Communication', 'Projects']
  };
}

// Generate recommendations
function generateRecommendations(userData) {
  return [
    `Dedicate ${userData.hoursPerDay} hours daily to structured learning`,
    `Focus on ${userData.targetCompany}-specific interview patterns`,
    'Practice coding problems on LeetCode, HackerRank',
    'Build at least 2 substantial projects',
    'Participate in mock interviews',
    'Study system design fundamentals',
    'Maintain consistency over intensity'
  ];
}

// Store analysis in DynamoDB
async function storeAnalysis(userId, data) {
  const params = {
    TableName: process.env.DYNAMODB_TABLE || 'CareerReadinessAnalyses',
    Item: {
      userId: userId,
      analysisId: `${userId}-${Date.now()}`,
      ...data
    }
  };

  try {
    await dynamodb.put(params).promise();
    console.log('Analysis stored successfully');
  } catch (error) {
    console.error('Error storing analysis:', error);
    throw error;
  }
}
