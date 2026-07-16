// src/types/index.ts

// Definiamo la struttura per i link social (GitHub, LinkedIn, ecc.)
export interface SocialLink {
    platform: string;
    url: string;
    icon: string; // Stringa per identificare l'icona (es. "github", "linkedin")
}
  
// Struttura della sezione Hero (l'intestazione)
export interface HeroSection {
    name: string;
    role: string;
    tagline: string; // La frase a effetto sotto il ruolo
    resumeUrl?: string; // Il '?' significa che è opzionale (non mettere il CV subito)
    socials: SocialLink[];
}

// Piccolo "quick fact" mostrato nella card flottante della sezione About
// (es. { icon: "mappin", label: "Base", value: "Italia" })
export interface AboutHighlight {
    icon: "mappin" | "calendar" | "code" | "coffee";
    label: string;
    value: string;
}
  
// Struttura della sezione About
export interface AboutSection {
    title: string;
    description: string[]; // Un array di paragrafi per gestire meglio il testo
    profileImage: string; // Percorso dell'immagine (es. "/images/profile.jpg")
    highlights?: AboutHighlight[]; // Opzionale: quick facts mostrati sotto forma di card
}
  
// Struttura per le Skills
export interface Skill {
    name: string;
    category: "Cybersecurity" | "Software Development" | "Tools e AI"; 
    icon?: string; 
}
  
// Struttura per i Progetti
export interface Project {
    id: number;
    title: string;
    description: string;
    techStack: string[];
    imageUrl: string;
    repoLink: string;
    liveLink?: string; // Link opzionale alla demo live
    featured: boolean; 
  }

export interface Education {
    id: number;
    degree: string;     // Es: Laurea in Informatica
    school: string;     // Es: Università della Calabria
    date: string;       // Es: 2019 - 2022
    description?: string; // Opzionale: Voto, tesi, materie principali
}
  
export interface Experience {
    id: number;
    role: string;
    company: string;
    date: string;
    description: string;
}
  
// L'Interfaccia "Madre" che raggruppa tutto
export interface PortfolioData {
    hero: HeroSection;
    about: AboutSection;
    skills: Skill[];
    projects: Project[];
    education: Education[]; 
    experience?: Experience[];
  }

