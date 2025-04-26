
export interface ProjectWork {
  id: number;
  title: string;
  description: string;
  images: string[];
  models?: string[]; // Changed from modelUrl to models array
  technologies?: string[];
  role?: string;
  duration?: string;
  challenge?: string;
  solution?: string;
}

export type ProjectCategory = 'web-design' | 'ui-ux-design' | '3d-design' | 'ar-development' | 'metaverse' | 'nft';
export type ProjectData = Record<string, ProjectWork[]>;
