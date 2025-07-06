
import { useState, useEffect } from 'react';
import { toast } from "@/components/ui/use-toast";
import { fetchProjectBySlug, fetchProjectMedia } from '@/services/projectService';
import { ProjectWork, ProjectMedia } from '@/types/project';

interface UseProjectLoaderProps {
  slug?: string;
  setProject: React.Dispatch<React.SetStateAction<Partial<ProjectWork>>>;
  setTechnologiesInput: (value: string) => void;
  setEmbedCodeInput: (value: string) => void;
  setIframeList: (iframes: string[]) => void;
  project: Partial<ProjectWork>;
}

export const useProjectLoader = ({
  slug,
  setProject,
  setTechnologiesInput,
  setEmbedCodeInput,
  setIframeList,
  project
}: UseProjectLoaderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [media, setMedia] = useState<ProjectMedia[]>([]);

  // Update inputs when project changes
  useEffect(() => {
    setTechnologiesInput((project.technologies || []).join(', '));
    setEmbedCodeInput((project.iframes || []).join('\n\n'));
    setIframeList(project.iframes || []);
  }, [project.id, setTechnologiesInput, setEmbedCodeInput, setIframeList, project.technologies, project.iframes]);

  // Load project data
  useEffect(() => {
    const loadProject = async () => {
      if (!slug || slug === 'new') {
        setIsLoading(false);
        return;
      }
      
      try {
        const projectData = await fetchProjectBySlug(slug);
        setProject(projectData);
        
        const mediaData = await fetchProjectMedia(projectData.id);
        setMedia(mediaData);
        
      } catch (error) {
        console.error('Failed to load project:', error);
        toast({
          title: "Error",
          description: "Failed to load project data.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProject();
  }, [slug, setProject]);

  return {
    isLoading,
    media
  };
};
