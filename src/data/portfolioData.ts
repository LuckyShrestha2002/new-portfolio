/* ===================================================
   Portfolio Data Layer — TypeScript Version (Firebase)
   =================================================== */
import { db } from '../firebase';
import { collection, getDocs, doc, setDoc, deleteDoc, query, orderBy, writeBatch } from 'firebase/firestore';

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
  orderIdx?: number;
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
  orderIdx?: number;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  description?: string;
  orderIdx?: number;
}

/* --------------------------------------------------
   Firebase Data Access Helpers
-------------------------------------------------- */

// -- Projects --
export async function getProjects(): Promise<Project[]> {
  try {
    const q = query(collection(db, 'projects'), orderBy('orderIdx', 'asc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data() as Project);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function saveProject(project: Project): Promise<void> {
  await setDoc(doc(db, 'projects', project.id), project);
}

export async function deleteProject(id: string): Promise<void> {
  await deleteDoc(doc(db, 'projects', id));
}

// -- Experiences --
export async function getExperiences(): Promise<Experience[]> {
  try {
    const q = query(collection(db, 'experience'), orderBy('orderIdx', 'asc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data() as Experience);
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return [];
  }
}

export async function saveExperience(exp: Experience): Promise<void> {
  await setDoc(doc(db, 'experience', exp.id), exp);
}

export async function deleteExperience(id: string): Promise<void> {
  await deleteDoc(doc(db, 'experience', id));
}

// -- Certifications --
export async function getCertifications(): Promise<Certification[]> {
  try {
    const q = query(collection(db, 'certifications'), orderBy('orderIdx', 'asc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data() as Certification);
  } catch (error) {
    console.error("Error fetching certifications:", error);
    return [];
  }
}

export async function saveCertification(cert: Certification): Promise<void> {
  await setDoc(doc(db, 'certifications', cert.id), cert);
}

export async function deleteCertification(id: string): Promise<void> {
  await deleteDoc(doc(db, 'certifications', id));
}

// -- Bulk reorder operations --
export async function updateProjectsOrder(projects: Project[]): Promise<void> {
  const batch = writeBatch(db);
  projects.forEach((p, idx) => {
    p.orderIdx = idx;
    batch.set(doc(db, 'projects', p.id), p);
  });
  await batch.commit();
}

export async function updateExperienceOrder(experiences: Experience[]): Promise<void> {
  const batch = writeBatch(db);
  experiences.forEach((e, idx) => {
    e.orderIdx = idx;
    batch.set(doc(db, 'experience', e.id), e);
  });
  await batch.commit();
}

export async function updateCertificationsOrder(certs: Certification[]): Promise<void> {
  const batch = writeBatch(db);
  certs.forEach((c, idx) => {
    c.orderIdx = idx;
    batch.set(doc(db, 'certifications', c.id), c);
  });
  await batch.commit();
}
