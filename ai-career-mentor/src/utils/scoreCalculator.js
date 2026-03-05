import { getDepartmentSkills } from './departmentSkills';

// Calculate base readiness score with department-specific logic
export const calculateReadiness = (data, department) => {
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

// Generate skill scores for department
export const generateSkillScores = (department, baseScore) => {
  const deptData = getDepartmentSkills(department);
  const skills = {};
  
  deptData.skills.forEach((skill, index) => {
    // Add some variance to make it realistic
    const variance = (Math.random() - 0.5) * 20;
    skills[skill] = Math.max(10, Math.min(100, Math.round(baseScore + variance)));
  });
  
  return skills;
};

// Generate company requirements based on department
export const getCompanyRequirements = (company, department) => {
  const deptData = getDepartmentSkills(department);
  const requirements = {};
  
  const companyLevel = {
    "Amazon": 90,
    "Google": 95,
    "Microsoft": 92,
    "Infosys": 70,
    "TCS": 65,
    "Wipro": 68,
    "Startup": 75
  };
  
  const baseRequirement = companyLevel[company] || 75;
  
  deptData.skills.forEach((skill, index) => {
    const variance = (Math.random() - 0.5) * 15;
    requirements[skill] = Math.max(50, Math.min(100, Math.round(baseRequirement + variance)));
  });
  
  return requirements;
};

// Calculate skill gaps
export const calculateSkillGaps = (candidateSkills, companyRequirements) => {
  return Object.keys(candidateSkills).map(skill => ({
    name: skill,
    candidate: candidateSkills[skill],
    required: companyRequirements[skill] || 70,
    gap: Math.max((companyRequirements[skill] || 70) - candidateSkills[skill], 0)
  }));
};
