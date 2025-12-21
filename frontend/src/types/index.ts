export interface Experience {
    company: string;
    title: string;
    years: string;
    description: string;
}

export interface Personal {
    firstName: string;
    title: string;
    email: string;
    phone: string;
}

export interface PortfolioData {
    personal: Personal;
    experience: Experience[];
    projects: any[]; // Placeholder for Project interface
    error?: string;
}