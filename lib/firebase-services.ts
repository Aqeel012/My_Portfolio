import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  orderBy, 
  limit,
  where,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import type { Project, AboutMe, ContactInfo, HeroSection, Socials, Profile } from './types';

// Helper function to convert Firestore Timestamp to Date
const convertTimestamp = (timestamp: any): Date | undefined => {
  if (timestamp instanceof Timestamp) {
    return timestamp.toDate();
  }
  return undefined;
};

// ==================== PROJECTS ====================

/**
 * Fetch all projects, ordered by 'value' field (higher value first)
 */
export async function getAllProjects(): Promise<Project[]> {
  try {
    const projectsRef = collection(db, 'projects');
    const q = query(projectsRef, orderBy('value', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: convertTimestamp(data.createdAt),
        updatedAt: convertTimestamp(data.updatedAt),
      } as Project;
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

/**
 * Fetch a single project by ID
 */
export async function getProjectById(projectId: string): Promise<Project | null> {
  try {
    const projectRef = doc(db, 'projects', projectId);
    const projectSnap = await getDoc(projectRef);
    
    if (projectSnap.exists()) {
      const data = projectSnap.data();
      return {
        id: projectSnap.id,
        ...data,
        createdAt: convertTimestamp(data.createdAt),
        updatedAt: convertTimestamp(data.updatedAt),
      } as Project;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

/**
 * Fetch featured projects (limited number)
 */
export async function getFeaturedProjects(limitCount: number = 6): Promise<Project[]> {
  try {
    const projectsRef = collection(db, 'projects');
    const q = query(projectsRef, orderBy('order', 'asc'), limit(limitCount));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: convertTimestamp(data.createdAt),
        updatedAt: convertTimestamp(data.updatedAt),
      } as Project;
    });
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    return [];
  }
}

// ==================== ABOUT ME ====================

/**
 * Fetch About Me information
 * Assumes single document with id 'main'
 */
export async function getAboutMe(): Promise<AboutMe | null> {
  try {
    const aboutRef = doc(db, 'about', 'main');
    const aboutSnap = await getDoc(aboutRef);
    
    if (aboutSnap.exists()) {
      const data = aboutSnap.data();
      return {
        id: aboutSnap.id,
        ...data,
        createdAt: convertTimestamp(data.createdAt),
        updatedAt: convertTimestamp(data.updatedAt),
      } as AboutMe;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching about me:', error);
    return null;
  }
}

// ==================== CONTACT INFO ====================

/**
 * Fetch Contact Information
 * Assumes single document with id 'main'
 */
export async function getContactInfo(): Promise<ContactInfo | null> {
  try {
    const contactRef = doc(db, 'contact', 'main');
    const contactSnap = await getDoc(contactRef);
    
    if (contactSnap.exists()) {
      const data = contactSnap.data();
      return {
        id: contactSnap.id,
        ...data,
        createdAt: convertTimestamp(data.createdAt),
        updatedAt: convertTimestamp(data.updatedAt),
      } as ContactInfo;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching contact info:', error);
    return null;
  }
}

// ==================== HERO SECTION ====================

/**
 * Fetch Hero Section data
 * Assumes single document with id 'main'
 */
export async function getHeroSection(): Promise<HeroSection | null> {
  try {
    const heroRef = doc(db, 'hero', 'main');
    const heroSnap = await getDoc(heroRef);
    
    if (heroSnap.exists()) {
      const data = heroSnap.data();
      return {
        id: heroSnap.id,
        ...data,
        createdAt: convertTimestamp(data.createdAt),
        updatedAt: convertTimestamp(data.updatedAt),
      } as HeroSection;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching hero section:', error);
    return null;
  }
}

// ==================== SOCIALS ====================

/**
 * Fetch Social Media Links
 * Assumes single document with id 'main'
 */
export async function getSocials(): Promise<Socials | null> {
  try {
    const socialsRef = doc(db, 'socials', 'main');
    const socialsSnap = await getDoc(socialsRef);
    
    if (socialsSnap.exists()) {
      const data = socialsSnap.data();
      return {
        id: socialsSnap.id,
        ...data,
        createdAt: convertTimestamp(data.createdAt),
        updatedAt: convertTimestamp(data.updatedAt),
      } as Socials;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching socials:', error);
    return null;
  }
}

// ==================== PROFILE ====================

/**
 * Fetch Profile Image
 * Assumes single document with id 'main'
 */
export async function getProfile(): Promise<Profile | null> {
  try {
    const profileRef = doc(db, 'profile', 'main');
    const profileSnap = await getDoc(profileRef);
    
    if (profileSnap.exists()) {
      const data = profileSnap.data();
      return {
        id: profileSnap.id,
        ...data,
        createdAt: convertTimestamp(data.createdAt),
        updatedAt: convertTimestamp(data.updatedAt),
      } as Profile;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
}
