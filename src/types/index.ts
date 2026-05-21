export interface Interests {
  books: string[];
  hobbies: string[];
}

export interface Personal {
  title: string;
  email: string;
  location: string;
  summary: string;
  interests: Interests;
}

export interface Education {
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  gpa: string;
  highlights: string[];
}

export interface Experience {
  company: string;
  role: string;
  dates: string;
  location: string;
  description: string;
  bullets: string[];
}

export interface Project {
  name: string;
  role: string;
  dates: string;
  technologies: string[];
  description: string;
  bullets: string[];
}

export interface Skills {
  languages: string[];
  librariesFrameworks: string[];
  developmentTools: string[];
}

export interface Extracurricular {
  activity: string;
  organization: string;
  date: string;
  details: string;
}

export interface PortfolioData {
  personal: Personal;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: Skills;
  extracurricular: Extracurricular[];
  error?: string;
}
