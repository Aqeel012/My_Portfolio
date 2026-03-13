// Project data structure
export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  date: string;
  category: string;
  imageUrl?: string; // Optional image URL for project card
  features: string[];
  technologies: Technology[];
  challenges: string;
  outcome: string;
  order?: number; // For controlling display order
  value?: number; // Priority value for sorting (higher = displayed first)
  createdAt?: Date;
  updatedAt?: Date;
}

// Technology used in a project
export interface Technology {
  name: string;
  description: string;
}

// About Me section data
export interface AboutMe {
  id: string;
  name: string;
  title: string;
  bio: string[];
  profileImageUrl?: string;
  skills: Skill[];
  experience?: string;
  education?: string;
  resumeUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Skill with optional proficiency level
export interface Skill {
  name: string;
  category: string;
  proficiency?: number; // 1-100
  icon?: string; // Icon name or URL
}

// Contact information
export interface ContactInfo {
  id: string;
  email: string;
  github?: string;
  linkedin?: string;
  whatsapp?: string;
  phone?: string;
  location?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Hero section data
export interface HeroSection {
  id: string;
  heading: string;
  subheading: string;
  description: string;
  heroImageUrl?: string;
  ctaPrimaryText?: string;
  ctaPrimaryLink?: string;
  ctaSecondaryText?: string;
  ctaSecondaryLink?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Social media links
export interface Socials {
  id: string;
  github?: string;
  linkedin?: string;
  whatsapp?: string;
  email?: string;
  twitter?: string;
  instagram?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Profile image
export interface Profile {
  id: string;
  imageUrl: string;
  altText?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
