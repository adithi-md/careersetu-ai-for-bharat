# AI Prompt Template for Career Readiness Analysis

## Purpose
This prompt template is used to generate comprehensive career readiness analyses using AI models like Amazon Bedrock (Claude), OpenAI GPT, or similar LLMs.

## Prompt Structure

### System Prompt
```
You are an expert career counselor and technical recruiter with 15+ years of experience in tech hiring. You have deep knowledge of:
- Technical interview processes at FAANG and top tech companies
- Software engineering skill requirements
- Career development strategies
- Industry hiring standards and trends

Your role is to provide honest, actionable, and encouraging career guidance to students and professionals preparing for tech careers.
```

### User Prompt Template

```
Analyze this candidate profile and provide a comprehensive career readiness assessment:

CANDIDATE PROFILE:
- Department/Degree: {department}
- Year of Study: {year}
- Target Company: {targetCompany}
- Daily Study Commitment: {hoursPerDay} hours
- Preparation Timeline: {monthsAvailable} months

ANALYSIS REQUIREMENTS:

1. READINESS SCORE (0-100)
Calculate a realistic readiness score based on:
- Academic year and experience level
- Preparation time and daily commitment
- Target company difficulty and standards
- Industry benchmarks

Provide the score with clear reasoning.

2. SKILL GAP ANALYSIS
Evaluate the candidate's likely proficiency in:
- Data Structures & Algorithms (DSA)
- System Design
- Problem Solving & Coding
- Project Experience & Portfolio

For each skill:
- Estimate current level (0-100)
- Compare against {targetCompany} requirements
- Identify specific gaps
- Prioritize improvement areas

3. COMPANY ALIGNMENT ASSESSMENT
Compare the candidate profile against {targetCompany}'s expectations:
- Technical requirements
- Interview difficulty level
- Typical successful candidate profile
- Cultural fit considerations

Provide a realistic assessment of alignment.

4. PERSONALIZED PREPARATION ROADMAP
Create a {monthsAvailable}-month preparation plan with:

Phase-wise breakdown:
- Monthly milestones and goals
- Specific topics to study
- Practice problem targets (LeetCode, HackerRank)
- Project recommendations
- Mock interview schedule

Make it realistic and achievable with {hoursPerDay} hours/day commitment.

5. 3-MONTH READINESS PROJECTION
Predict the candidate's readiness improvement after 3 months of consistent preparation:
- Projected readiness score
- Expected skill improvements
- Hiring probability estimate
- Key achievements expected

6. ACTIONABLE RECOMMENDATIONS
Provide 5-7 specific, actionable recommendations:
- What to focus on immediately
- Resources to use
- Common pitfalls to avoid
- Success strategies
- Mindset and motivation tips

TONE & STYLE:
- Be honest but encouraging
- Provide specific, actionable advice
- Use data and benchmarks where relevant
- Acknowledge challenges while showing path forward
- Be realistic about timelines and expectations

OUTPUT FORMAT:
Provide structured JSON response with all sections clearly organized.
```

## Example Usage

### Input
```json
{
  "department": "Computer Science",
  "year": "3",
  "targetCompany": "Amazon",
  "hoursPerDay": 4,
  "monthsAvailable": 6
}
```

### Expected AI Output Structure
```json
{
  "readinessScore": {
    "current": 68,
    "reasoning": "As a 3rd year CS student with 4 hours daily commitment over 6 months, you have a solid foundation. Your academic year provides good theoretical knowledge, and your commitment level is strong.",
    "target": 90,
    "gap": 22
  },
  "skillGaps": {
    "dsa": {
      "current": 65,
      "required": 90,
      "gap": 25,
      "priority": "HIGH",
      "details": "Need to strengthen advanced algorithms, dynamic programming, and graph problems"
    },
    "systemDesign": {
      "current": 50,
      "required": 85,
      "gap": 35,
      "priority": "HIGH",
      "details": "Limited experience with distributed systems and scalability concepts"
    },
    "problemSolving": {
      "current": 70,
      "required": 88,
      "gap": 18,
      "priority": "MEDIUM",
      "details": "Good foundation but need to improve speed and optimization"
    },
    "projects": {
      "current": 60,
      "required": 75,
      "gap": 15,
      "priority": "MEDIUM",
      "details": "Need 1-2 substantial projects demonstrating system design"
    }
  },
  "companyAlignment": {
    "technicalFit": 65,
    "experienceFit": 60,
    "overallAlignment": 62,
    "assessment": "Moderate alignment. You have the foundation but need focused preparation in DSA and system design to meet Amazon's high bar.",
    "hiringProbability": "40-50% with current skills, 70-80% after 6 months of focused preparation"
  },
  "roadmap": [
    {
      "phase": "Month 1-2: Foundation Building",
      "focus": "Data Structures & Algorithms Mastery",
      "goals": [
        "Complete comprehensive DSA course",
        "Solve 100 LeetCode problems (60 easy, 40 medium)",
        "Master arrays, strings, linked lists, trees, graphs",
        "Learn time/space complexity analysis"
      ],
      "resources": [
        "LeetCode Premium",
        "Cracking the Coding Interview book",
        "NeetCode roadmap"
      ],
      "weeklySchedule": {
        "dsaPractice": "20 hours",
        "theoryLearning": "8 hours"
      }
    },
    {
      "phase": "Month 3-4: Advanced Problem Solving",
      "focus": "Complex Algorithms & System Design Basics",
      "goals": [
        "Solve 80 medium + 20 hard LeetCode problems",
        "Master dynamic programming and graph algorithms",
        "Learn system design fundamentals",
        "Study Amazon's Leadership Principles"
      ],
      "resources": [
        "System Design Primer",
        "Grokking System Design",
        "Amazon Leadership Principles guide"
      ],
      "weeklySchedule": {
        "dsaPractice": "16 hours",
        "systemDesign": "8 hours",
        "behavioralPrep": "4 hours"
      }
    },
    {
      "phase": "Month 5-6: Interview Ready",
      "focus": "Mock Interviews & Project Building",
      "goals": [
        "Complete 2 substantial projects",
        "Participate in 8-10 mock interviews",
        "Solve company-specific problems",
        "Perfect behavioral responses"
      ],
      "resources": [
        "Pramp for mock interviews",
        "interviewing.io",
        "Amazon interview experiences on Glassdoor"
      ],
      "weeklySchedule": {
        "mockInterviews": "6 hours",
        "projectWork": "12 hours",
        "problemSolving": "10 hours"
      }
    }
  ],
  "projection": {
    "threeMonthScore": 85,
    "improvement": 17,
    "expectedSkills": {
      "dsa": 85,
      "systemDesign": 70,
      "problemSolving": 82,
      "projects": 75
    },
    "hiringProbability": "70-80%",
    "confidence": "HIGH",
    "reasoning": "With consistent 4 hours daily practice over 6 months, you can realistically bridge most skill gaps and become a competitive candidate for Amazon."
  },
  "recommendations": [
    {
      "priority": 1,
      "action": "Start with LeetCode Easy problems",
      "details": "Build confidence and speed by solving 50 easy problems in the first 2 weeks. Focus on arrays, strings, and hash tables.",
      "timeframe": "Weeks 1-2"
    },
    {
      "priority": 2,
      "action": "Create a study schedule and stick to it",
      "details": "Dedicate 4 hours daily: 2 hours DSA practice, 1 hour theory, 1 hour review. Consistency beats intensity.",
      "timeframe": "Ongoing"
    },
    {
      "priority": 3,
      "action": "Join a study group or find an accountability partner",
      "details": "Peer learning accelerates progress. Share solutions, discuss approaches, and motivate each other.",
      "timeframe": "Week 1"
    },
    {
      "priority": 4,
      "action": "Build one substantial project",
      "details": "Create a full-stack application demonstrating system design, scalability, and clean code. This will be crucial for behavioral rounds.",
      "timeframe": "Months 4-5"
    },
    {
      "priority": 5,
      "action": "Study Amazon's Leadership Principles deeply",
      "details": "Prepare STAR format stories for each principle. Amazon heavily emphasizes cultural fit.",
      "timeframe": "Months 3-6"
    },
    {
      "priority": 6,
      "action": "Practice mock interviews regularly",
      "details": "Start mock interviews from month 3. Get comfortable with interview pressure and time constraints.",
      "timeframe": "Months 3-6"
    },
    {
      "priority": 7,
      "action": "Track your progress weekly",
      "details": "Maintain a log of problems solved, concepts learned, and mock interview performance. Adjust strategy based on weak areas.",
      "timeframe": "Ongoing"
    }
  ],
  "motivationalMessage": "You're in a strong position with 6 months of preparation time. Many successful Amazon engineers started exactly where you are. The key is consistent, focused effort. Your 4 hours daily commitment is excellent - maintain it, follow the roadmap, and you'll see significant improvement. Remember: Amazon values growth mindset and perseverance, qualities you're already demonstrating by preparing systematically. You've got this!"
}
```

## Integration with Lambda

### Code Example
```javascript
const generateAIPrompt = (userData) => {
  return `
Analyze this candidate profile and provide a comprehensive career readiness assessment:

CANDIDATE PROFILE:
- Department/Degree: ${userData.department}
- Year of Study: ${userData.year}
- Target Company: ${userData.targetCompany}
- Daily Study Commitment: ${userData.hoursPerDay} hours
- Preparation Timeline: ${userData.monthsAvailable} months

[... rest of prompt template ...]
`;
};

// Amazon Bedrock Integration
const callBedrockAI = async (prompt) => {
  const bedrock = new AWS.BedrockRuntime();
  
  const response = await bedrock.invokeModel({
    modelId: 'anthropic.claude-v2',
    contentType: 'application/json',
    accept: 'application/json',
    body: JSON.stringify({
      prompt: `\n\nHuman: ${prompt}\n\nAssistant:`,
      max_tokens_to_sample: 4000,
      temperature: 0.7,
      top_p: 0.9
    })
  }).promise();
  
  const responseBody = JSON.parse(new TextDecoder().decode(response.body));
  return JSON.parse(responseBody.completion);
};

// OpenAI Integration Alternative
const callOpenAI = async (prompt) => {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert career counselor...'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 4000
    })
  });
  
  const data = await response.json();
  return JSON.parse(data.choices[0].message.content);
};
```

## Prompt Engineering Best Practices

1. **Be Specific**: Clearly define expected output format
2. **Provide Context**: Include all relevant candidate information
3. **Set Constraints**: Specify score ranges, timeframes, priorities
4. **Request Structure**: Ask for JSON or structured output
5. **Define Tone**: Specify encouraging, honest, actionable
6. **Include Examples**: Show desired output format
7. **Iterate**: Test and refine based on actual outputs

## Testing the Prompt

### Test Cases

**Test 1: Beginner Student**
```json
{
  "department": "Computer Science",
  "year": "1",
  "targetCompany": "Google",
  "hoursPerDay": 2,
  "monthsAvailable": 12
}
```
Expected: Lower readiness score, longer roadmap, foundational focus

**Test 2: Advanced Student**
```json
{
  "department": "Computer Science",
  "year": "4",
  "targetCompany": "Infosys",
  "hoursPerDay": 6,
  "monthsAvailable": 3
}
```
Expected: Higher readiness score, interview-focused roadmap

**Test 3: Graduate**
```json
{
  "department": "Information Technology",
  "year": "Graduate",
  "targetCompany": "Amazon",
  "hoursPerDay": 8,
  "monthsAvailable": 4
}
```
Expected: High readiness, intensive preparation, system design focus

## Monitoring AI Quality

### Metrics to Track
- Response time
- Token usage
- Output consistency
- User satisfaction
- Accuracy of predictions

### Quality Checks
- Validate JSON structure
- Check score ranges (0-100)
- Verify roadmap completeness
- Ensure recommendations are actionable
- Confirm tone is appropriate

## Cost Optimization

### Token Management
- Average prompt: ~1,500 tokens
- Average response: ~2,500 tokens
- Total per request: ~4,000 tokens

### Pricing (Amazon Bedrock Claude v2)
- Input: $0.008 per 1K tokens
- Output: $0.024 per 1K tokens
- Cost per analysis: ~$0.07

### Optimization Strategies
1. Cache common responses
2. Use smaller models for simple queries
3. Implement response streaming
4. Batch similar requests
5. Set token limits

## Conclusion

This AI prompt template provides a comprehensive framework for generating personalized career readiness analyses. It balances technical assessment with actionable guidance, ensuring students receive valuable, realistic feedback for their career preparation journey.
