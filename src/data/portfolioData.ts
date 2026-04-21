/* ===================================================
   Portfolio Data Layer — TypeScript Version
   =================================================== */

export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  category: 'Web' | 'Cloud' | 'Mobile' | 'AI/ML' | 'Other';
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  location?: string;
  description: string;
  skills: string[];
  type: 'Work' | 'Education' | 'Freelance' | 'Internship' | 'Other';
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  description?: string;
}

const KEYS = {
  PROJECTS: 'portfolio_projects',
  EXPERIENCE: 'portfolio_experience',
  CERTIFICATIONS: 'portfolio_certifications',
};

// Default seed data
export const INITIAL_DATA = {
  projects: [
    {
      id: 'p1',
      title: 'MERN Auth',
      description: 'A full-stack authentication system built with MongoDB, Express, React, and Node.js. Features JWT tokens, protected routes, and email verification.',
      image: '/assets/mern-auth.png',
      category: 'Web',
      techStack: ['React.js', 'Tailwind CSS', 'HTML', 'JavaScript'],
      liveUrl: 'https://mern-auth-project-six.vercel.app',
      githubUrl: 'https://github.com/LuckyShrestha2002',
      featured: true,
    },
    {
      id: 'p2',
      title: 'MERN Online Bookstore',
      description: 'A complete e-commerce bookstore with user authentication, cart management, order tracking, and admin dashboard built with the MERN stack.',
      image: '/assets/12.png',
      category: 'Web',
      techStack: ['React.js', 'Tailwind CSS', 'HTML', 'JavaScript'],
      liveUrl: 'https://bookstore-application-frontend--tau.vercel.app',
      githubUrl: 'https://github.com/LuckyShrestha2002',
      featured: true,
    },
    {
      id: 'p3',
      title: 'Cover Letter Generator',
      description: 'An AI-powered cover letter generator that creates professional, personalized cover letters based on job description and candidate profile.',
      image: '/assets/13.png',
      category: 'Web',
      techStack: ['HTML', 'Tailwind CSS', 'JavaScript'],
      liveUrl: 'https://luckyshrestha2002.github.io/cover-letter',
      githubUrl: 'https://github.com/LuckyShrestha2002/cover-letter',
      featured: false,
    },
    {
      id: 'p4',
      title: 'Budget App',
      description: 'A personal finance tracker to monitor income and expenses. Features real-time budget tracking, category breakdown, and spending analytics.',
      image: '/assets/14.png',
      category: 'Web',
      techStack: ['HTML', 'Tailwind CSS', 'JavaScript'],
      liveUrl: 'https://luckyshrestha2002.github.io/Budget-app',
      githubUrl: 'https://github.com/LuckyShrestha2002/Budget-app',
      featured: false,
    },
  ] as Project[],

  experience: [
    {
      id: 'e1',
      company: 'Self-Employed / Freelance',
      role: 'Full Stack Web Developer',
      duration: 'Jan 2024 – Present',
      location: 'Remote',
      description: 'Designing and building modern web applications for clients. Specialized in building sleek, high-performance UIs using React.js and Tailwind CSS. Handled cloud deployments and NEC certified professional standards.',
      skills: ['React.js', 'Tailwind CSS', 'HTML', 'JavaScript', 'Git'],
      type: 'Freelance',
    },
    {
      id: 'e2',
      company: 'Tribhuvan University — IOE',
      role: 'Computer Engineer',
      duration: 'Nov 2020 – 2024',
      location: 'Kathmandu, Nepal',
      description: 'Bachelor of Engineering in Computer Engineering. NEC Certified engineer. Focused on software architecture, web technologies, and scalable systems.',
      skills: ['Software Design', 'Project Management', 'Computer Engineering', 'NEC Certified', 'C/C++', 'JS'],
      type: 'Education',
    },
  ] as Experience[],

  certifications: [
    {
      id: 'c1',
      name: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services',
      date: '2024',
      credentialUrl: '',
      description: 'Demonstrates foundational knowledge of AWS cloud services, architecture, security, and pricing.',
    },
    {
      id: 'c2',
      name: 'React — The Complete Guide',
      issuer: 'Udemy',
      date: '2023',
      credentialUrl: '',
      description: 'Comprehensive course covering React fundamentals, hooks, context API, Redux, and Next.js.',
    },
    {
      id: 'c3',
      name: 'JavaScript Algorithms & Data Structures',
      issuer: 'freeCodeCamp',
      date: '2023',
      credentialUrl: '',
      description: 'Certification covering ES6+, functional programming, OOP, and common algorithms in JavaScript.',
    },
  ] as Certification[],
};

/* --------------------------------------------------
   Core Helpers
-------------------------------------------------- */

export function getLocalData<T>(key: string): T | null {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : null;
  } catch { return null; }
}

export function saveLocalData<T>(key: string, data: T): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch { return false; }
}

export function initPortfolioData() {
  if (!localStorage.getItem(KEYS.PROJECTS)) saveLocalData(KEYS.PROJECTS, INITIAL_DATA.projects);
  if (!localStorage.getItem(KEYS.EXPERIENCE)) saveLocalData(KEYS.EXPERIENCE, INITIAL_DATA.experience);
  if (!localStorage.getItem(KEYS.CERTIFICATIONS)) saveLocalData(KEYS.CERTIFICATIONS, INITIAL_DATA.certifications);
}

export function getProjects(): Project[] {
  return getLocalData<Project[]>(KEYS.PROJECTS) || INITIAL_DATA.projects;
}

export function getExperiences(): Experience[] {
  return getLocalData<Experience[]>(KEYS.EXPERIENCE) || INITIAL_DATA.experience;
}

export function getCertifications(): Certification[] {
  return getLocalData<Certification[]>(KEYS.CERTIFICATIONS) || INITIAL_DATA.certifications;
}
