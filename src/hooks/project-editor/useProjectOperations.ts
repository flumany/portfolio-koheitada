
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/components/ui/use-toast";
import { 
  createProject, 
  updateProject, 
  togglePublishStatus
} from '@/services/projectService';
import { ProjectWork } from '@/types/project';

interface UseProjectOperationsProps {
  slug?: string;
  project: Partial<ProjectWork>;
  setProject: React.Dispatch<React.SetStateAction<Partial<ProjectWork>>>;
  technologiesInput: string;
  embedCodeInput: string;
  setTechnologiesInput: (value: string) => void;
  setEmbedCodeInput: (value: string) => void;
  setIframeList: (iframes: string[]) => void;
}

export const useProjectOperations = ({
  slug,
  project,
  setProject,
  technologiesInput,
  embedCodeInput,
  setTechnologiesInput,
  setEmbedCodeInput,
  setIframeList
}: UseProjectOperationsProps) => {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    
    try {
      if (!project.title || !project.category || !project.slug) {
        toast({
          title: "Validation Error",
          description: "Title, category, and slug are required.",
          variant: "destructive"
        });
        setIsSaving(false);
        return;
      }
      
      let result: ProjectWork;
      
      const techArray = technologiesInput
        .split(',')
        .map(item => item.trim())
        .filter(item => item);
        
      const embedArray = embedCodeInput
        .split('\n\n')
        .map(item => item.trim())
        .filter(item => item);
      
      if (!slug || slug === 'new') {
        result = await createProject({
          ...project,
          technologies: techArray,
          iframes: embedArray,
        } as Omit<ProjectWork, 'id' | 'created_at' | 'updated_at'>);
        toast({
          title: "Success",
          description: "Project created successfully."
        });
        navigate(`/edit/${result.slug}`, { replace: true });
      } else {
        result = await updateProject(project.id!, {
          ...project,
          technologies: techArray,
          iframes: embedArray,
        });
        toast({
          title: "Success",
          description: "Project updated successfully."
        });
      }
      
      setProject(result);
      setTechnologiesInput((result.technologies || []).join(', '));
      setEmbedCodeInput((result.iframes || []).join('\n\n'));
      setIframeList(result.iframes || []);
      
    } catch (error) {
      console.error('Failed to save project:', error);
      toast({
        title: "Error",
        description: "Failed to save project.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  }, [
    project,
    technologiesInput,
    embedCodeInput,
    slug,
    navigate,
    setProject,
    setTechnologiesInput,
    setEmbedCodeInput,
    setIframeList
  ]);

  const handlePublish = useCallback(async () => {
    if (!project.id) return;
    
    setIsPublishing(true);
    
    try {
      const newStatus = !project.published;
      const result = await togglePublishStatus(project.id, newStatus);
      
      setProject(prev => ({ ...prev, published: result.published }));
      
      toast({
        title: newStatus ? "Published" : "Unpublished",
        description: `Project has been ${newStatus ? 'published' : 'unpublished'}.`
      });
      
    } catch (error) {
      console.error('Failed to toggle publish status:', error);
      toast({
        title: "Error",
        description: "Failed to update publish status.",
        variant: "destructive"
      });
    } finally {
      setIsPublishing(false);
    }
  }, [project.id, project.published, setProject]);

  const viewPublishedProject = useCallback(() => {
    if (project.slug) {
      window.open(`/project/${project.slug}`, '_blank');
    }
  }, [project.slug]);

  return {
    isSaving,
    isPublishing,
    handleSave,
    handlePublish,
    viewPublishedProject
  };
};
