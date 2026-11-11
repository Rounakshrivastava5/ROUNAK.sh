// Single source of truth for all portfolio content.
// Edit this file to update copy, links, projects or experience.

export const profile = {
  name: 'Rounak Shrivastava',
  logo: 'ROUNAK.sh',
  title: 'Senior Full Stack Engineer',
  headline: 'React & Angular | Golang & Python (FastAPI) | AWS | Gen AI',
  bio:
    '4+ years engineering scalable web platforms, high-performance APIs in Go & FastAPI, enterprise frontend micro-architectures, and developer tools. Currently building full-stack applications on AWS with Gen AI workflow integrations.',
  email: 'rounakshrivastava97@gmail.com',
  github: 'https://github.com/Rounakshrivastava5',
  linkedin: 'https://linkedin.com/in/rounakshrivastava',
  // Drop your PDF at /public/Rounak_Shrivastava_Resume.pdf
  resume: '/Rounak_Shrivastava_Resume.pdf',
  resumeFileName: 'Rounak_Shrivastava_Resume.pdf',
  status: 'Available for select opportunities',
  current: {
    role: 'Senior Software Engineer',
    company: 'Reqpedia Technologies Pvt. Ltd.',
    since: 'Oct 2026',
  },
}

export type Metric = { value: number; suffix: string; label: string; note: string }

export const metrics: Metric[] = [
  { value: 40, suffix: '+', label: 'Features Built', note: 'Shipped at enterprise scale' },
  { value: 10, suffix: 'K+', label: 'Active Users', note: 'Enterprise user base served' },
  { value: 30, suffix: '%', label: 'Faster Pages', note: 'Page performance improvement' },
]

export type StackGroup = { id: string; label: string; items: string[] }

export const stack: StackGroup[] = [
  { id: 'lang', label: 'Languages', items: ['Golang', 'Python', 'TypeScript', 'JavaScript'] },
  { id: 'fe', label: 'Frontend', items: ['React', 'Angular', 'RxJS', 'Tailwind CSS', 'Next.js'] },
  {
    id: 'be',
    label: 'Backend & Microservices',
    items: ['FastAPI', 'Gin', 'Node.js', 'REST APIs', 'JWT', 'Pydantic', 'SQLAlchemy'],
  },
  { id: 'data', label: 'Data & Messaging', items: ['PostgreSQL', 'MongoDB', 'Redis', 'Kafka', 'RabbitMQ'] },
  {
    id: 'cloud',
    label: 'Cloud, AI & DevOps',
    items: [
      'AWS Lambda',
      'AWS S3',
      'API Gateway',
      'Docker',
      'CI/CD',
      'Claude Code',
      'Cursor AI',
      'Model Context Protocol',
    ],
  },
]

export type Project = {
  id: string
  index: string
  name: string
  subtitle: string
  description: string
  stack: string[]
  kind: string
  /** Repository URL — replace with the exact repo link. */
  repo: string
  /** Optional live demo / store listing. Card hides the button when absent. */
  demo?: string
  art: 'context' | 'overlay' | 'kanban' | 'timer'
}

export const projects: Project[] = [
  {
    id: 'ai-context-shifter',
    index: 'P-01',
    name: 'AI-Context-Shifter',
    subtitle: 'Chrome Extension (Manifest V3)',
    description:
      'Zero-friction context transfer between Claude, ChatGPT, Gemini, and DeepSeek with automated prompt injection and state preservation.',
    stack: ['JavaScript', 'Manifest V3', 'Chrome APIs', 'LLM State Engine'],
    kind: 'Browser Extension',
    repo: 'https://github.com/Rounakshrivastava5',
    art: 'context',
  },
  {
    id: 'promptly',
    index: 'P-02',
    name: 'Promptly',
    subtitle: 'Universal AI Assistant Overlay & Context Guard',
    description:
      'Floating cross-LLM utility providing token monitoring, predictive context-limit warnings, prompt optimization, and instant chatbot handoff.',
    stack: ['React', 'TypeScript', 'OpenAI API', 'Tailwind CSS'],
    kind: 'AI Tooling',
    repo: 'https://github.com/Rounakshrivastava5',
    art: 'overlay',
  },
  {
    id: 'kanbix',
    index: 'P-03',
    name: 'Kanbix',
    subtitle: 'Real-Time Collaborative Project Canvas',
    description:
      'Distributed Kanban board featuring sub-200ms task synchronization via WebSockets, persistent drag-and-drop state, and modular board permissions.',
    stack: ['React', 'Socket.io', 'Node.js', 'MongoDB'],
    kind: 'Realtime Web App',
    repo: 'https://github.com/Rounakshrivastava5',
    art: 'kanban',
  },
  {
    id: 'code-session-timer',
    index: 'P-04',
    name: 'Code Session Timer',
    subtitle: 'Developer Productivity VS Code Extension',
    description:
      'Non-intrusive session duration tracking, engineering analytics, and smart automated break reminders built natively for VS Code.',
    stack: ['TypeScript', 'VS Code Extension API'],
    kind: 'IDE Extension',
    repo: 'https://github.com/Rounakshrivastava5',
    art: 'timer',
  },
]

export type Role = {
  company: string
  role: string
  start: string
  end: string
  current?: boolean
  summary: string
  highlights: string[]
  kpis: string[]
  tech: string[]
}

export const experience: Role[] = [
  {
    company: 'Reqpedia Technologies Pvt. Ltd.',
    role: 'Senior Software Engineer',
    start: 'Oct 2026',
    end: 'Present',
    current: true,
    summary:
      'Building full-stack web applications using Go, Python, React, and Angular with AWS and Gen AI workflow integrations.',
    highlights: [
      'Designing Go and FastAPI services deployed on AWS Lambda behind API Gateway.',
      'Integrating Gen AI workflows into production React and Angular frontends.',
    ],
    kpis: ['Go + Python', 'AWS', 'Gen AI'],
    tech: ['Go', 'FastAPI', 'React', 'Angular', 'AWS'],
  },
  {
    company: 'Techolution India Pvt. Ltd.',
    role: 'Application Support Engineer (Full Stack)',
    start: 'Dec 2025',
    end: 'Apr 2026',
    summary:
      'Owned reliability and feature delivery across Angular frontends backed by asynchronous FastAPI services.',
    highlights: [
      'Maintained 99%+ application availability across supported production systems.',
      'Reduced production UI bugs by 15% through targeted fixes and regression coverage.',
      'Integrated 10+ Angular modules with asynchronous FastAPI backends.',
    ],
    kpis: ['99%+ uptime', '−15% UI bugs', '10+ modules'],
    tech: ['Angular', 'RxJS', 'FastAPI', 'Python'],
  },
  {
    company: 'Quick Heal Technologies',
    role: 'Software Engineer',
    start: 'Feb 2022',
    end: 'Oct 2025',
    summary:
      'Delivered enterprise security product features end to end, from component libraries to core compliance modules.',
    highlights: [
      'Shipped 40+ enterprise features for 10K+ users and boosted page speed by 30%.',
      'Spearheaded the Monolith → Micro-Frontends migration with 15+ shared component libraries.',
      'Delivered core modules: RBAC, Policy Management, Breach Notification, Data Classification.',
    ],
    kpis: ['40+ features', '10K+ users', '+30% speed', '15+ libraries'],
    tech: ['Angular', 'React', 'TypeScript', 'Micro-Frontends'],
  },
]
