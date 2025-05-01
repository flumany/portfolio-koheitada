
export interface ProjectWork {
  id: string;
  title: string;
  description: string;
  category: string;
  slug: string;
  published: boolean;
  images: string[];
  models?: string[];
  technologies?: string[];
  role?: string;
  duration?: string;
  challenge?: string;
  solution?: string;
  created_at?: string;
  updated_at?: string;
  modelUrl?: string;
  iframes?: string[];
}

export interface ProjectMedia {
  id: string;
  project_id: string;
  type: 'image' | '3d_model';
  file_path: string;
  title?: string;
  description?: string;
  display_order: number;
  created_at?: string;
}

export interface ProjectCategory {
  title: string;
  description: string;
  projects: ProjectWork[];
}

export type ProjectData = Record<string, ProjectCategory>;
