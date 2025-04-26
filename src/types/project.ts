
export interface ProjectWork {
  id: number;
  title: string;
  description: string;
  images: string[];
  iframes?: string[];
  models?: string[];
  modelUrl?: string;
  technologies?: string[];
  role?: string;
  duration?: string;
  challenge?: string;
  solution?: string;
}

export interface ProjectCategory {
  title: string;
  description: string;
  projects: ProjectWork[];
}

export type ProjectData = Record<string, ProjectCategory>;
