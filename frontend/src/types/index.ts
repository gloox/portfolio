

export interface Personal {
    firstName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
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

// Add this interface
export interface Education {
    institution: string;
    degree: string;
    startDate: string;
    endDate: string;
    gpa: string;
    highlights: string[];
}

// Update PortfolioData
export interface PortfolioData {
    personal: any;
    education: any; // <--- ADD THIS
    experience: Experience[];
    projects: Project[];
    skills: Skills;
    extracurricular: Extracurricular[];
    error?: string;
}

