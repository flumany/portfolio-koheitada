
export interface ProjectWork {
  id: string;
  title: string;
  title_en?: string;
  description: string;
  description_en?: string;
  category: string;
  slug: string;
  published: boolean;
  images: string[];
  models?: string[];
  technologies?: string[];
  role?: string;
  role_en?: string;
  work_type?: string;
  work_type_en?: string;
  duration?: string;
  challenge?: string;
  challenge_en?: string;
  solution?: string;
  solution_en?: string;
  created_at?: string;
  updated_at?: string;
  modelUrl?: string;
  iframes?: string[];
  display_order?: number;
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
