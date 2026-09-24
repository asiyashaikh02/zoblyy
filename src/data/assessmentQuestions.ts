export interface AssessmentOption {
  id: 'a' | 'b' | 'c' | 'd';
  title: string;
  supporting: string;
  iconType: 'ai' | 'software' | 'data' | 'process' | 'experiment' | 'lightbulb' | 'monitor' | 'trend';
  scores: {
    ai: number;
    software: number;
    data: number;
  };
}

export interface AssessmentQuestion {
  id: number;
  stageIndex: number; // 0 to 4 (0: Interests, 1: Thinking Style, 2: Skills & Exposure, 3: Goals, 4: Your Path)
  stageLabel: string;
  badge: string;
  scenario: string;
  question: string;
  options: AssessmentOption[];
}

export interface AssessmentStageInfo {
  index: number;
  label: string;
  title: string;
  contextMessage: string;
}

export const ASSESSMENT_STAGES: AssessmentStageInfo[] = [
  {
    index: 0,
    label: 'Interests',
    title: 'Getting to know what excites you',
    contextMessage: "Let's start with what naturally interests you."
  },
  {
    index: 1,
    label: 'Thinking Style',
    title: 'Understanding your approach',
    contextMessage: "Now let's understand how you approach problems."
  },
  {
    index: 2,
    label: 'Skills & Exposure',
    title: 'Exploring your build style',
    contextMessage: "Let's explore how you like to learn and build."
  },
  {
    index: 3,
    label: 'Goals',
    title: 'Aligning with your motivation',
    contextMessage: "Almost there. Let's understand what kind of work excites you."
  },
  {
    index: 4,
    label: 'Your Path',
    title: 'Connecting to your future',
    contextMessage: "One last step. Let's connect your interests with your future."
  }
];

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  // =========================================================================
  // QUESTIONS 1–3: STAGE 1 — INTERESTS
  // =========================================================================
  {
    id: 1,
    stageIndex: 0,
    stageLabel: 'Interests',
    badge: 'Real-World Scenario',
    scenario: 'A small business gets hundreds of customer messages every day. The team spends hours replying to similar questions.',
    question: 'What would you be most interested in doing?',
    options: [
      {
        id: 'a',
        title: 'Find a way to automatically handle the repetitive conversations.',
        supporting: '“I\'d like to explore AI or automation to save time.”',
        iconType: 'ai',
        scores: { ai: 5, software: 1, data: 0 }
      },
      {
        id: 'b',
        title: 'Build a system where the team can manage all customer interactions.',
        supporting: '“I\'d like to design and build a proper application for this.”',
        iconType: 'monitor',
        scores: { ai: 1, software: 5, data: 0 }
      },
      {
        id: 'c',
        title: 'Study the conversations to understand what customers ask most.',
        supporting: '“I\'d like to analyse the data and find useful insights.”',
        iconType: 'data',
        scores: { ai: 1, software: 0, data: 5 }
      },
      {
        id: 'd',
        title: 'First understand the complete process and figure out where the biggest problem is.',
        supporting: '“I\'d like to understand the problem deeply before deciding.”',
        iconType: 'lightbulb',
        scores: { ai: 2, software: 2, data: 2 }
      }
    ]
  },
  {
    id: 2,
    stageIndex: 0,
    stageLabel: 'Interests',
    badge: 'Real-World Scenario',
    scenario: 'A college wants to improve the way students discover internships.',
    question: 'Which part would interest you most?',
    options: [
      {
        id: 'a',
        title: 'Create an intelligent system that recommends internships automatically.',
        supporting: '“I\'d like the system to make smarter recommendations.”',
        iconType: 'ai',
        scores: { ai: 5, software: 2, data: 1 }
      },
      {
        id: 'b',
        title: 'Build a platform where students can search and apply for internships.',
        supporting: '“I\'d like to build the actual product.”',
        iconType: 'software',
        scores: { ai: 1, software: 5, data: 1 }
      },
      {
        id: 'c',
        title: 'Analyse student and internship data to discover useful patterns.',
        supporting: '“I\'d like to understand what the data tells us.”',
        iconType: 'data',
        scores: { ai: 1, software: 1, data: 5 }
      },
      {
        id: 'd',
        title: 'Talk to students and understand what makes internship discovery difficult.',
        supporting: '“I\'d like to understand the people and the problem first.”',
        iconType: 'process',
        scores: { ai: 1, software: 3, data: 2 }
      }
    ]
  },
  {
    id: 3,
    stageIndex: 0,
    stageLabel: 'Interests',
    badge: 'Creative Challenge',
    scenario: 'You are given one week to create something useful using technology.',
    question: 'What would you most enjoy creating?',
    options: [
      {
        id: 'a',
        title: 'An AI assistant that can perform a useful task.',
        supporting: '“I\'d like to create an automated intelligent helper.”',
        iconType: 'ai',
        scores: { ai: 5, software: 2, data: 0 }
      },
      {
        id: 'b',
        title: 'A website or application that people can actually use.',
        supporting: '“I\'d like to build and ship a working product.”',
        iconType: 'monitor',
        scores: { ai: 1, software: 5, data: 0 }
      },
      {
        id: 'c',
        title: 'A dashboard that turns information into useful insights.',
        supporting: '“I\'d like to bring numbers and metrics to life.”',
        iconType: 'trend',
        scores: { ai: 1, software: 1, data: 5 }
      },
      {
        id: 'd',
        title: 'Something experimental that solves a problem in a new way.',
        supporting: '“I\'d like to test creative, unconventional ideas.”',
        iconType: 'experiment',
        scores: { ai: 3, software: 3, data: 1 }
      }
    ]
  },

  // =========================================================================
  // QUESTIONS 4–6: STAGE 2 — THINKING STYLE
  // =========================================================================
  {
    id: 4,
    stageIndex: 1,
    stageLabel: 'Thinking Style',
    badge: 'Problem Solving',
    scenario: 'You are given a problem you’ve never seen before.',
    question: 'What do you naturally do first?',
    options: [
      {
        id: 'a',
        title: 'Break the problem into smaller parts and understand how everything connects.',
        supporting: '“I look for systematic architecture and logical flow.”',
        iconType: 'software',
        scores: { ai: 2, software: 4, data: 3 }
      },
      {
        id: 'b',
        title: 'Start experimenting with possible solutions.',
        supporting: '“I learn fastest by directly trying things out.”',
        iconType: 'experiment',
        scores: { ai: 4, software: 3, data: 1 }
      },
      {
        id: 'c',
        title: 'Look for information, examples or data that can help explain it.',
        supporting: '“I gather evidence, background records, and patterns.”',
        iconType: 'data',
        scores: { ai: 1, software: 2, data: 5 }
      },
      {
        id: 'd',
        title: 'Think about how the process could be improved or made easier.',
        supporting: '“I look at the whole workflow to eliminate friction.”',
        iconType: 'process',
        scores: { ai: 5, software: 2, data: 2 }
      }
    ]
  },
  {
    id: 5,
    stageIndex: 1,
    stageLabel: 'Thinking Style',
    badge: 'Trial & Error',
    scenario: 'You build something, but the result isn’t what you expected.',
    question: 'What would you most likely do?',
    options: [
      {
        id: 'a',
        title: 'Check the logic and data to find where the result went wrong.',
        supporting: '“I audit inputs, formulas, and data consistency.”',
        iconType: 'data',
        scores: { ai: 1, software: 2, data: 5 }
      },
      {
        id: 'b',
        title: 'Try different approaches until I find one that works.',
        supporting: '“I enjoy rapid iteration and trying fresh techniques.”',
        iconType: 'experiment',
        scores: { ai: 4, software: 3, data: 1 }
      },
      {
        id: 'c',
        title: 'Break the system into smaller parts and debug it.',
        supporting: '“I systematically trace the code line by line.”',
        iconType: 'software',
        scores: { ai: 2, software: 5, data: 2 }
      },
      {
        id: 'd',
        title: 'Look for a way to redesign or automate the process.',
        supporting: '“I step back to see if the whole pipeline needs re-engineering.”',
        iconType: 'process',
        scores: { ai: 4, software: 3, data: 2 }
      }
    ]
  },
  {
    id: 6,
    stageIndex: 1,
    stageLabel: 'Thinking Style',
    badge: 'Efficiency & Workflow',
    scenario: 'A process at a company takes an employee three hours every day.',
    question: 'What’s your first thought?',
    options: [
      {
        id: 'a',
        title: '“Can we automate this?”',
        supporting: '“Repetitive manual work should be handled by smart workflows.”',
        iconType: 'ai',
        scores: { ai: 5, software: 2, data: 1 }
      },
      {
        id: 'b',
        title: '“Can we build a better software system for this?”',
        supporting: '“A dedicated application would streamline the task permanently.”',
        iconType: 'software',
        scores: { ai: 2, software: 5, data: 1 }
      },
      {
        id: 'c',
        title: '“Why does this take three hours? What does the data show?”',
        supporting: '“Let\'s measure where the bottlenecks actually exist.”',
        iconType: 'trend',
        scores: { ai: 2, software: 1, data: 5 }
      },
      {
        id: 'd',
        title: '“Let me understand the entire process before deciding.”',
        supporting: '“I want to trace every step and dependency thoroughly.”',
        iconType: 'lightbulb',
        scores: { ai: 3, software: 2, data: 3 }
      }
    ]
  },

  // =========================================================================
  // QUESTIONS 7–9: STAGE 3 — SKILLS & EXPOSURE
  // =========================================================================
  {
    id: 7,
    stageIndex: 2,
    stageLabel: 'Skills & Exposure',
    badge: 'Technological Discovery',
    scenario: 'You discover a completely new technology you’ve never used before.',
    question: 'What are you most likely to do?',
    options: [
      {
        id: 'a',
        title: 'Immediately try building something with it.',
        supporting: '“Hands-on construction is the most direct way to master it.”',
        iconType: 'software',
        scores: { ai: 3, software: 5, data: 1 }
      },
      {
        id: 'b',
        title: 'Explore how it could automate or improve something.',
        supporting: '“I look for how it connects with other tools and saves effort.”',
        iconType: 'ai',
        scores: { ai: 5, software: 2, data: 1 }
      },
      {
        id: 'c',
        title: 'Research how it works and understand its underlying logic.',
        supporting: '“I want to dissect the data structures and algorithms.”',
        iconType: 'data',
        scores: { ai: 2, software: 4, data: 4 }
      },
      {
        id: 'd',
        title: 'Look at examples and understand where it could actually be useful.',
        supporting: '“I seek real business impact and practical case studies.”',
        iconType: 'lightbulb',
        scores: { ai: 3, software: 3, data: 3 }
      }
    ]
  },
  {
    id: 8,
    stageIndex: 2,
    stageLabel: 'Skills & Exposure',
    badge: 'Project Preference',
    scenario: 'You have a choice of what kind of hands-on project to take on.',
    question: 'Which type of project would you personally enjoy working on?',
    options: [
      {
        id: 'a',
        title: 'An AI system that handles a real business task.',
        supporting: '“Building autonomous agents, webhooks, and intelligent triggers.”',
        iconType: 'ai',
        scores: { ai: 5, software: 2, data: 1 }
      },
      {
        id: 'b',
        title: 'A complete web or mobile application.',
        supporting: '“Building front-end interfaces, back-end APIs, and databases.”',
        iconType: 'monitor',
        scores: { ai: 1, software: 5, data: 1 }
      },
      {
        id: 'c',
        title: 'A business dashboard showing trends and insights.',
        supporting: '“Designing interactive metrics, executive charts, and SQL pipelines.”',
        iconType: 'trend',
        scores: { ai: 1, software: 1, data: 5 }
      },
      {
        id: 'd',
        title: 'A project where I can experiment and create my own solution.',
        supporting: '“An open sandbox to combine creative ideas and solve novel needs.”',
        iconType: 'experiment',
        scores: { ai: 3, software: 3, data: 2 }
      }
    ]
  },
  {
    id: 9,
    stageIndex: 2,
    stageLabel: 'Skills & Exposure',
    badge: 'Information Handling',
    scenario: 'Imagine you receive a large Excel file containing thousands of records.',
    question: 'What would you be most interested in doing?',
    options: [
      {
        id: 'a',
        title: 'Find patterns and understand what the information is telling us.',
        supporting: '“Discovering trends, outliers, and key business indicators.”',
        iconType: 'data',
        scores: { ai: 1, software: 1, data: 5 }
      },
      {
        id: 'b',
        title: 'Build something useful that works with the information.',
        supporting: '“Writing code or an application that consumes the dataset.”',
        iconType: 'software',
        scores: { ai: 1, software: 5, data: 2 }
      },
      {
        id: 'c',
        title: 'Automate the repetitive work being done with the data.',
        supporting: '“Creating scheduled pipelines so manual entry disappears.”',
        iconType: 'ai',
        scores: { ai: 5, software: 2, data: 3 }
      },
      {
        id: 'd',
        title: 'Explore the information and discover something unexpected.',
        supporting: '“Digging deep to uncover counter-intuitive insights.”',
        iconType: 'lightbulb',
        scores: { ai: 2, software: 1, data: 4 }
      }
    ]
  },

  // =========================================================================
  // QUESTIONS 10–12: STAGE 4 — GOALS / WORK STYLE
  // =========================================================================
  {
    id: 10,
    stageIndex: 3,
    stageLabel: 'Goals',
    badge: 'Team Dynamics',
    scenario: 'You’re working on a team project and everyone has different ideas.',
    question: 'What role feels most natural to you?',
    options: [
      {
        id: 'a',
        title: 'Take responsibility for building the actual solution.',
        supporting: '“I thrive on implementation, execution, and shipping code.”',
        iconType: 'software',
        scores: { ai: 2, software: 5, data: 1 }
      },
      {
        id: 'b',
        title: 'Bring ideas together and figure out how the process can work better.',
        supporting: '“I like connecting the moving pieces into a smooth workflow.”',
        iconType: 'process',
        scores: { ai: 5, software: 2, data: 2 }
      },
      {
        id: 'c',
        title: 'Research the information and help the team make decisions.',
        supporting: '“I anchor team decisions in verified data and objective proof.”',
        iconType: 'data',
        scores: { ai: 2, software: 1, data: 5 }
      },
      {
        id: 'd',
        title: 'Come up with new possibilities and challenge the existing approach.',
        supporting: '“I introduce fresh perspectives and push creative boundaries.”',
        iconType: 'lightbulb',
        scores: { ai: 3, software: 3, data: 2 }
      }
    ]
  },
  {
    id: 11,
    stageIndex: 3,
    stageLabel: 'Goals',
    badge: 'Sense of Achievement',
    scenario: 'Reflecting on what makes engineering worthwhile.',
    question: 'Which outcome would make you most proud of a project?',
    options: [
      {
        id: 'a',
        title: '“People are actually using something I built.”',
        supporting: '“Knowing a live product is in the hands of real users.”',
        iconType: 'monitor',
        scores: { ai: 2, software: 5, data: 1 }
      },
      {
        id: 'b',
        title: '“I created something that performs work automatically.”',
        supporting: '“Watching an autonomous system complete hours of work seamlessly.”',
        iconType: 'ai',
        scores: { ai: 5, software: 2, data: 1 }
      },
      {
        id: 'c',
        title: '“I discovered something important from data that helped someone make a decision.”',
        supporting: '“Providing actionable clarity that changed a business strategy.”',
        iconType: 'trend',
        scores: { ai: 1, software: 1, data: 5 }
      },
      {
        id: 'd',
        title: '“I solved a difficult problem in a way nobody had considered.”',
        supporting: '“Overcoming a steep intellectual challenge with original thinking.”',
        iconType: 'experiment',
        scores: { ai: 3, software: 3, data: 3 }
      }
    ]
  },
  {
    id: 12,
    stageIndex: 3,
    stageLabel: 'Goals',
    badge: 'Sustained Engagement',
    scenario: 'Looking at how you maintain long-term curiosity.',
    question: 'Which type of work would keep you interested for longer?',
    options: [
      {
        id: 'a',
        title: 'Building and improving a product people actually use.',
        supporting: '“Polishing features, engineering architecture, and enhancing performance.”',
        iconType: 'software',
        scores: { ai: 2, software: 5, data: 1 }
      },
      {
        id: 'b',
        title: 'Making systems smarter and reducing manual work.',
        supporting: '“Connecting automated workflows, LLM agents, and compound tools.”',
        iconType: 'ai',
        scores: { ai: 5, software: 2, data: 1 }
      },
      {
        id: 'c',
        title: 'Finding patterns, analysing information and helping people make better decisions.',
        supporting: '“Deep diving into numbers, forecasting outcomes, and diagnosing trends.”',
        iconType: 'data',
        scores: { ai: 1, software: 1, data: 5 }
      },
      {
        id: 'd',
        title: 'Solving different kinds of problems and continuously learning new things.',
        supporting: '“A dynamic environment with multidisciplinary technical variety.”',
        iconType: 'lightbulb',
        scores: { ai: 3, software: 3, data: 2 }
      }
    ]
  },

  // =========================================================================
  // QUESTIONS 13–15: STAGE 5 — CAREER DIRECTION
  // =========================================================================
  {
    id: 13,
    stageIndex: 4,
    stageLabel: 'Your Path',
    badge: 'Business Context',
    scenario: 'Imagine yourself working on a real business problem.',
    question: 'Which challenge sounds most exciting?',
    options: [
      {
        id: 'a',
        title: 'Build a software product from an idea and make it work.',
        supporting: '“Turning product specifications into a deployed, functional app.”',
        iconType: 'software',
        scores: { ai: 2, software: 5, data: 1 }
      },
      {
        id: 'b',
        title: 'Use AI and automation to make a business process smarter.',
        supporting: '“Deploying intelligent workflows that handle complex operations.”',
        iconType: 'ai',
        scores: { ai: 5, software: 2, data: 1 }
      },
      {
        id: 'c',
        title: 'Use data to understand what is happening and why.',
        supporting: '“Building analytics, dashboards, and diagnostic query models.”',
        iconType: 'trend',
        scores: { ai: 1, software: 2, data: 5 }
      },
      {
        id: 'd',
        title: 'Understand the business problem first and design the best possible solution.',
        supporting: '“Holistic systems thinking bridging business pain points and technology.”',
        iconType: 'lightbulb',
        scores: { ai: 3, software: 3, data: 3 }
      }
    ]
  },
  {
    id: 14,
    stageIndex: 4,
    stageLabel: 'Your Path',
    badge: 'Mastery Vision',
    scenario: 'Imagine you could become really good at ONE type of work.',
    question: 'Which would you choose?',
    options: [
      {
        id: 'a',
        title: 'Building software and digital products.',
        supporting: '“Full-stack development, modern frameworks, and scalable infrastructure.”',
        iconType: 'software',
        scores: { ai: 2, software: 5, data: 1 }
      },
      {
        id: 'b',
        title: 'Building AI systems and automations.',
        supporting: '“AI agents, workflow engines, n8n, and custom LLM integrations.”',
        iconType: 'ai',
        scores: { ai: 5, software: 2, data: 1 }
      },
      {
        id: 'c',
        title: 'Working with data, analytics and business intelligence.',
        supporting: '“Advanced SQL, data warehousing, dbt, and executive BI dashboards.”',
        iconType: 'data',
        scores: { ai: 1, software: 1, data: 5 }
      },
      {
        id: 'd',
        title: 'Solving complex real-world problems across different technologies.',
        supporting: '“Versatile technical engineering that adapts to any high-impact challenge.”',
        iconType: 'experiment',
        scores: { ai: 3, software: 3, data: 3 }
      }
    ]
  },
  {
    id: 15,
    stageIndex: 4,
    stageLabel: 'Your Path',
    badge: 'Future Horizon',
    scenario: 'Imagine yourself two years from now.',
    question: 'Which situation sounds most exciting?',
    options: [
      {
        id: 'a',
        title: 'Building software products and turning ideas into working applications.',
        supporting: '“Leading production engineering and shipping applications used by thousands.”',
        iconType: 'software',
        scores: { ai: 2, software: 5, data: 1 }
      },
      {
        id: 'b',
        title: 'Building AI systems and automations that solve real business problems.',
        supporting: '“Architecting agentic AI pipelines and enterprise workflow automation.”',
        iconType: 'ai',
        scores: { ai: 5, software: 2, data: 1 }
      },
      {
        id: 'c',
        title: 'Working with data to uncover insights and support important decisions.',
        supporting: '“Empowering leadership with data intelligence and decision analytics.”',
        iconType: 'data',
        scores: { ai: 1, software: 1, data: 5 }
      },
      {
        id: 'd',
        title: 'Working across different technologies to solve real-world problems and create useful solutions.',
        supporting: '“Spearheading impactful technology initiatives that produce verifiable proof.”',
        iconType: 'lightbulb',
        scores: { ai: 3, software: 3, data: 3 }
      }
    ]
  }
];

export interface PathwayRecommendation {
  id: 'ai-automation' | 'software-product' | 'data-bi';
  title: string;
  badge: string;
  explanation: string;
  reasons: string[];
}

export const RECOMMENDATIONS_BY_PATHWAY: Record<string, PathwayRecommendation> = {
  'ai-automation': {
    id: 'ai-automation',
    title: 'AI & Business Automation',
    badge: 'Intelligent Systems & Workflows',
    explanation:
      'Based on your responses, you show a strong alignment with solving real-world problems through AI, automation and intelligent systems.',
    reasons: [
      'You naturally look for ways to improve repetitive processes and remove manual friction.',
      'You enjoy experimenting with emerging tools and autonomous agents.',
      'You show strong interest in practical problem-solving with direct business impact.',
      'You are curious about how intelligent systems can amplify human productivity.'
    ]
  },
  'software-product': {
    id: 'software-product',
    title: 'Software & Product',
    badge: 'Full-Stack & Product Architecture',
    explanation:
      'Based on your responses, you show a strong alignment with creating tangible software, structured logic, and user-facing digital products.',
    reasons: [
      'You are motivated by building real applications that people can actively use.',
      'You approach challenges with systematic, modular problem-solving and structured debugging.',
      'You enjoy mastering code architecture, databases, and deployment pipelines.',
      'You take pride in ownership and turning conceptual ideas into functional products.'
    ]
  },
  'data-bi': {
    id: 'data-bi',
    title: 'Data & BI',
    badge: 'Analytics & Business Intelligence',
    explanation:
      'Based on your responses, you show a strong alignment with uncovering patterns, structuring evidence, and driving decisions with data.',
    reasons: [
      'You naturally seek the "why" behind numbers and investigate underlying patterns.',
      'You appreciate turning complex, scattered records into clean, decision-grade insights.',
      'You enjoy structuring data models, executive metrics, and visual dashboards.',
      'You anchor your decisions on verifiable facts and analytical clarity.'
    ]
  }
};
