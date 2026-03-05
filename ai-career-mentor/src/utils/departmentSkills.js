// Department-specific skill frameworks
export const departmentSkills = {
  "Computer Science": {
    skills: [
      "Data Structures & Algorithms",
      "Problem Solving",
      "System Design",
      "Programming",
      "Projects",
      "Communication"
    ],
    weights: {
      "Data Structures & Algorithms": 0.30,
      "Problem Solving": 0.20,
      "System Design": 0.15,
      "Programming": 0.15,
      "Projects": 0.15,
      "Communication": 0.05
    },
    studyTopics: [
      "Arrays & Strings",
      "Dynamic Programming",
      "System Design",
      "Trees & Graphs",
      "Object-Oriented Design",
      "Databases",
      "Behavioral Questions",
      "Mock Interviews"
    ]
  },
  "Information Technology": {
    skills: [
      "Data Structures & Algorithms",
      "Problem Solving",
      "Web Development",
      "Database Management",
      "Projects",
      "Communication"
    ],
    weights: {
      "Data Structures & Algorithms": 0.25,
      "Problem Solving": 0.20,
      "Web Development": 0.20,
      "Database Management": 0.15,
      "Projects": 0.15,
      "Communication": 0.05
    },
    studyTopics: [
      "Full-Stack Development",
      "REST APIs",
      "Database Design",
      "Cloud Technologies",
      "DevOps Basics",
      "Security Fundamentals",
      "Agile Methodologies",
      "System Integration"
    ]
  },
  "Mechanical": {
    skills: [
      "Engineering Mechanics",
      "Thermodynamics",
      "Manufacturing Processes",
      "CAD / SolidWorks / AutoCAD",
      "Material Science",
      "Domain Knowledge"
    ],
    weights: {
      "Engineering Mechanics": 0.20,
      "Thermodynamics": 0.20,
      "Manufacturing Processes": 0.20,
      "CAD / SolidWorks / AutoCAD": 0.20,
      "Material Science": 0.10,
      "Domain Knowledge": 0.10
    },
    studyTopics: [
      "Thermodynamics",
      "CAD Modeling",
      "Manufacturing Processes",
      "Fluid Mechanics",
      "Heat Transfer",
      "Machine Design",
      "Quality Control",
      "Industrial Automation"
    ]
  },
  "Civil": {
    skills: [
      "Structural Engineering",
      "Construction Management",
      "Surveying",
      "AutoCAD / Design Tools",
      "Environmental Engineering",
      "Domain Knowledge"
    ],
    weights: {
      "Structural Engineering": 0.25,
      "Construction Management": 0.20,
      "Surveying": 0.15,
      "AutoCAD / Design Tools": 0.20,
      "Environmental Engineering": 0.10,
      "Domain Knowledge": 0.10
    },
    studyTopics: [
      "Structural Analysis",
      "Surveying Techniques",
      "Construction Planning",
      "AutoCAD Design",
      "Building Codes",
      "Project Management",
      "Concrete Technology",
      "Geotechnical Engineering"
    ]
  },
  "Electronics": {
    skills: [
      "Circuit Design",
      "Signal Processing",
      "Embedded Systems",
      "Communication Systems",
      "Programming",
      "Domain Knowledge"
    ],
    weights: {
      "Circuit Design": 0.20,
      "Signal Processing": 0.20,
      "Embedded Systems": 0.20,
      "Communication Systems": 0.15,
      "Programming": 0.15,
      "Domain Knowledge": 0.10
    },
    studyTopics: [
      "Digital Electronics",
      "Microcontrollers",
      "Signal Processing",
      "VLSI Design",
      "Communication Protocols",
      "Embedded C",
      "PCB Design",
      "IoT Systems"
    ]
  },
  "Other Engineering": {
    skills: [
      "Core Engineering Concepts",
      "Problem Solving",
      "Technical Skills",
      "Domain Knowledge",
      "Projects",
      "Communication"
    ],
    weights: {
      "Core Engineering Concepts": 0.25,
      "Problem Solving": 0.20,
      "Technical Skills": 0.20,
      "Domain Knowledge": 0.15,
      "Projects": 0.15,
      "Communication": 0.05
    },
    studyTopics: [
      "Engineering Fundamentals",
      "Problem Solving",
      "Technical Documentation",
      "Project Management",
      "Industry Standards",
      "Software Tools",
      "Communication Skills",
      "Domain Expertise"
    ]
  }
};

// Calculate weighted readiness score
export const calculateWeightedScore = (department, skillScores) => {
  const deptData = departmentSkills[department];
  if (!deptData) return 0;

  let totalScore = 0;
  Object.keys(deptData.weights).forEach(skill => {
    const weight = deptData.weights[skill];
    const score = skillScores[skill] || 0;
    totalScore += score * weight;
  });

  return Math.round(totalScore);
};

// Get department-specific skills
export const getDepartmentSkills = (department) => {
  return departmentSkills[department] || departmentSkills["Other Engineering"];
};

// Get study topics for department
export const getStudyTopics = (department) => {
  const deptData = departmentSkills[department] || departmentSkills["Other Engineering"];
  return deptData.studyTopics;
};
