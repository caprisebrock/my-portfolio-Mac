export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  repoUrl?: string;
} 