
import { useState, useEffect } from 'react';
import { getImageUrl } from '@/lib/supabase';
import { toast } from "@/components/ui/use-toast";
import { fetchPublishedProjectsWithOrder, fetchProjectMedia } from '@/services/projectService';
import { ProjectWork } from '@/types/project';

export const useProjectsEN = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<ProjectWork[]>([]);
  const [projectImages, setProjectImages] = useState<{[key: string]: string}>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch published projects with proper category ordering
        const projectsData = await fetchPublishedProjectsWithOrder();
        setProjects(projectsData);
        
        // Load thumbnail images for projects
        const images: {[key: string]: string} = {};
        
        for (const project of projectsData) {
          try {
            // Fetch the first image for each project
            const mediaData = await fetchProjectMedia(project.id);
            const imageMedia = mediaData.filter(item => item.type === 'image')[0];
            
            if (imageMedia) {
              const imageUrl = await getImageUrl(imageMedia.file_path);
              images[project.id] = imageUrl;
            } else if (project.images && project.images.length > 0) {
              // Fall back to legacy images array
              const imageUrl = await getImageUrl(project.images[0]);
              images[project.id] = imageUrl;
            } else {
              images[project.id] = '/placeholder.svg';
            }
          } catch (error) {
            console.error(`Error loading image for project ${project.id}:`, error);
            images[project.id] = '/placeholder.svg';
          }
        }
        
        setProjectImages(images);
        
      } catch (error) {
        console.error('Error loading projects:', error);
        setError('An error occurred while loading projects.');
        toast({
          title: "Error occurred",
          description: "An error occurred while loading projects.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  return {
    loading,
    projects,
    projectImages,
    error
  };
};
