import { JourneyStage, CareerTrack, LearningToProofMilestone, ProofArtifact } from '../types';

export const JOURNEY_STAGES: JourneyStage[] = [
  {
    id: 'discover',
    step: '01',
    name: 'DISCOVER',
    tagline: 'Pinpoint your baseline with zero ambiguity',
    learnerState: '“I know where I currently stand.”',
    accent: 'cyan',
    accentHex: '#0D9488',
    badge: 'DIAGNOSTIC AUDIT',
    details: 'Diagnostic skill matrix mapping strengths, gaps, and an exact production trajectory tailored to your background.',
    artifacts: ['Skill Gap Assessment', 'Personalized Roadmap', 'Track Fit Index']
  },
  {
    id: 'learn',
    step: '02',
    name: 'LEARN',
    tagline: 'Deep structural mental models, not rote tutorials',
    learnerState: '“I know the core systems and mechanics.”',
    accent: 'violet',
    accentHex: '#7C3AED',
    badge: 'DEEP CONCEPTS',
    details: 'High-density architectural learning focusing on why systems work, failure modes, and industry conventions.',
    artifacts: ['Architecture Breakdowns', 'System Design Docs', 'Pattern Library']
  },
  {
    id: 'practice',
    step: '03',
    name: 'PRACTICE',
    tagline: 'High-repetition engineering drills under real constraints',
    learnerState: '“I can write and refactor under pressure.”',
    accent: 'coral',
    accentHex: '#EA580C',
    badge: 'IN-PERSON LABS',
    details: 'Live production workflows with linting, edge-case debugging, test suites, and strict industry tooling.',
    artifacts: ['Drill Repositories', 'Refactoring Logs', 'Test Coverages']
  },
  {
    id: 'build',
    step: '04',
    name: 'BUILD',
    tagline: 'Ship complex, tangible multi-tiered applications',
    learnerState: '“I know what I will build from ground up.”',
    accent: 'electric',
    accentHex: '#2563EB',
    badge: 'PRODUCTION BUILDS',
    details: 'No toy clones. Full-stack workflows, scalable databases, real API integrations, and continuous deployment.',
    artifacts: ['Live Architecture', 'Production Repos', 'API Contracts']
  },
  {
    id: 'prove',
    step: '05',
    name: 'PROVE',
    tagline: 'Verified Git history, code defense, and audited benchmarks',
    learnerState: '“I can prove what I can do.”',
    accent: 'lime',
    accentHex: '#16A34A',
    badge: 'VERIFIED PROOF',
    details: 'Defend your code live to senior practitioners. Verify every commit, line of architecture, and operational decision.',
    artifacts: ['Audit Certificate', 'Recorded Defense', 'Live Deployed URLs']
  },
  {
    id: 'launch',
    step: '06',
    name: 'LAUNCH',
    tagline: 'Transform engineering proof into high-signal career pitch',
    learnerState: '“My work speaks with undeniable credibility.”',
    accent: 'pink',
    accentHex: '#DB2777',
    badge: 'CAREER LAUNCHPAD',
    details: 'Proof dossiers, LinkedIn positioning, portfolio artifact packaging, and direct technical interview preparation.',
    artifacts: ['Proof Dossier', 'Tech Portfolio', 'Pitch Deck']
  },
  {
    id: 'get-seen',
    step: '07',
    name: 'GET SEEN',
    tagline: 'Put your verified proof directly in front of engineering leaders',
    learnerState: '“The industry can see and verify my work.”',
    accent: 'electric',
    accentHex: '#2563EB',
    badge: 'INDUSTRY VISIBILITY',
    details: 'Hiring network distribution, technical showcases, and shareable verified credentials reviewed by tech recruiters.',
    artifacts: ['Public Proof Profile', 'Hiring Radar', 'Network Intros']
  }
];

export const CAREER_TRACKS: CareerTrack[] = [
  {
    id: 'ai-automation',
    code: '01',
    title: 'AI & Business Automation',
    subtitle: 'From LLM foundations to autonomous enterprise multi-agent workflows',
    accent: 'violet',
    accentHex: '#7C3AED',
    whoItIsFor: 'Engineers, technical consultants, and product leaders seeking to build autonomous agentic workflows and LLM systems.',
    whatYouLearn: [
      'Agentic architectures & tool calling loops',
      'Vector DBs, embedding strategies & hybrid RAG',
      'API orchestration & enterprise webhook pipelines',
      'Model evaluation, hallucination mitigation & guardrails'
    ],
    tools: ['Python', 'LangChain/LangGraph', 'Gemini / Claude APIs', 'FastAPI', 'Qdrant / pgvector', 'Docker'],
    projects: [
      'Enterprise Document Analysis & Triaging Agent with Live Audit Trail',
      'Autonomous Customer Operations Coordinator with Human-in-the-Loop',
      'Multi-Source Financial Intelligence Extractor with Vector Grounding'
    ],
    proofOutcome: 'Live deployed agent services with verifiable telemetry, evaluation benchmarks, and live defense session.',
    careerRoles: ['AI Engineer', 'Automation Architect', 'Applied AI Consultant', 'Solutions Engineer']
  },
  {
    id: 'software-product',
    code: '02',
    title: 'Software & Product',
    subtitle: 'Full-stack engineering, resilient distributed systems, and real product execution',
    accent: 'cyan',
    accentHex: '#0D9488',
    whoItIsFor: 'Aspiring and transitioning software engineers ready to escape tutorial purgatory and build resilient production systems.',
    whatYouLearn: [
      'TypeScript, modern React & reactive state management',
      'RESTful & GraphQL microservice design with Express/Node',
      'Relational modeling (PostgreSQL), index optimization & transactions',
      'CI/CD pipelines, containerization & automated testing'
    ],
    tools: ['TypeScript', 'React', 'Node.js / Express', 'PostgreSQL', 'Docker', 'Jest / Playwright', 'Tailwind CSS'],
    projects: [
      'Collaborative Real-Time Workspace with Conflict Resolution',
      'High-Throughput Order Management & Event-Driven Ledger',
      'Scalable Multi-Tenant SaaS Engine with Role-Based Access'
    ],
    proofOutcome: 'Production GitHub repository with 150+ granular commits, deployed URLs with 99.9% uptime, and architectural defense.',
    careerRoles: ['Full Stack Engineer', 'Frontend Specialist', 'Backend Systems Developer', 'Product Engineer']
  },
  {
    id: 'data-bi',
    code: '03',
    title: 'Data & BI',
    subtitle: 'Modern data stack, automated analytical pipelines, and strategic decision dashboards',
    accent: 'coral',
    accentHex: '#EA580C',
    whoItIsFor: 'Analysts, mathematicians, and engineers who want to build end-to-end data pipelines and actionable BI architectures.',
    whatYouLearn: [
      'Advanced SQL analytics, window functions & dimensional modeling',
      'ELT/ETL pipeline architecture with Python & dbt',
      'Data warehousing & partitioning strategies',
      'Interactive executive BI dashboards & metric stores'
    ],
    tools: ['SQL (Postgres/Snowflake)', 'Python (Pandas, Polars)', 'dbt', 'Superset / Tableau', 'Airflow', 'DuckDB'],
    projects: [
      'End-to-End E-commerce Revenue & Retention Pipeline with dbt',
      'Real-Time Logistics Telemetry Pipeline & Anomaly Detector',
      'Executive KPI Cohort & Lifetime Value Modeling Dashboard'
    ],
    proofOutcome: 'Automated reproducible data warehouse transformations, public dbt docs, and live interactive BI dashboards.',
    careerRoles: ['Data Engineer', 'Analytics Engineer', 'BI Developer', 'Senior Data Analyst']
  }
];

export const TIMELINE_MILESTONES: LearningToProofMilestone[] = [
  {
    step: '01',
    title: 'Diagnostic Audit',
    subtitle: 'Personalized Skill Matrix',
    description: 'Direct 1-on-1 assessment of logic, systems comprehension, and coding baseline to generate your bespoke learning blueprint.',
    accent: 'cyan',
    accentHex: '#0D9488',
    keyDeliverable: 'Verified Skill Matrix & Gap Dossier',
    proofType: 'audit'
  },
  {
    step: '02',
    title: 'In-Person Labs',
    subtitle: 'Production Workflows',
    description: 'Immersive coding under strict engineering constraints, code reviews from staff engineers, and real sprint cadences.',
    accent: 'coral',
    accentHex: '#EA580C',
    keyDeliverable: '12 Production Drill Repositories with PR History',
    proofType: 'labs'
  },
  {
    step: '03',
    title: 'Live Proof & Defense',
    subtitle: 'Verified Git & Live URLs',
    description: 'Oral technical defense of your architecture, algorithmic decisions, and edge-case handling before an engineering panel.',
    accent: 'lime',
    accentHex: '#16A34A',
    keyDeliverable: 'Public Proof Artifact with Pass Verification',
    proofType: 'defense'
  },
  {
    step: '04',
    title: 'Career Launchpad',
    subtitle: 'Profile & Pitch System',
    description: 'Converting raw code and verified metrics into high-impact portfolio storytelling, executive GitHub profiles, and pitch decks.',
    accent: 'pink',
    accentHex: '#DB2777',
    keyDeliverable: 'Executive Dossier & Pitch Video System',
    proofType: 'launchpad'
  },
  {
    step: '05',
    title: 'Industry Visibility',
    subtitle: 'Sharable Proof Artifacts',
    description: 'Direct distribution to vetted hiring partners, tech leaders, and community showcases with cryptographically verifiable work.',
    accent: 'electric',
    accentHex: '#2563EB',
    keyDeliverable: 'Verified Public Radar Placement',
    proofType: 'visibility'
  }
];

export const PROOF_ARTIFACTS: ProofArtifact[] = [
  {
    id: 'art-01',
    title: 'Multi-Agent Support & Triaging Cluster',
    type: 'live_url',
    status: 'DEPLOYED',
    track: 'AI & Business Automation',
    description: 'Autonomous multi-agent system handling tier-2 escalations with deterministic tool-use bounds and live token telemetry.',
    metrics: '99.4% intent accuracy • Sub-800ms latency'
  },
  {
    id: 'art-02',
    title: 'Real-Time Event Sourcing Order Engine',
    type: 'git_repo',
    status: 'VERIFIED',
    track: 'Software & Product',
    description: 'Distributed ledger with Postgres ACID transaction isolation, idempotent webhook handlers, and full Cypress test suite.',
    metrics: '184 verified commits • 94% test coverage'
  },
  {
    id: 'art-03',
    title: 'dbt Core Retail Analytics Warehouse',
    type: 'code_defense',
    status: 'DEFENDED',
    track: 'Data & BI',
    description: 'Multi-layer dimensional star schema modeling 1.2M events with automated schema testing and incremental updates.',
    metrics: 'Defended in front of Staff Data Eng panel'
  }
];
