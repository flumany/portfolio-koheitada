
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useScrollPosition } from '../hooks/useScrollPosition';
import ProjectNavigator from './project/ProjectNavigator';
import ProjectDisplay from './project/ProjectDisplay';
import ProjectSidebarEN from './project/ProjectSidebarEN';
import { fetchProjectBySlug, fetchProjectMedia } from '@/services/projectService';
import { ProjectWork, ProjectMedia } from '@/types/project';
import { getImageUrl, get3DModelUrl } from '@/lib/supabase';
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from 'lucide-react';

const ProjectDetailEN: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { saveScrollPosition } = useScrollPosition();
  
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<ProjectWork | null>(null);
  const [projectImages, setProjectImages] = useState<string[]>([]);
  const [projectModels, setProjectModels] = useState<string[]>([]);
  const [media, setMedia] = useState<ProjectMedia[]>([]);
  
  useEffect(() => {
    const loadProject = async () => {
      if (!slug) {
        navigate('/en');
        return;
      }
      
      setLoading(true);
      
      try {
        // Fetch project data
        const projectData = await fetchProjectBySlug(slug);
        
        // If project is not published, redirect to home
        if (!projectData.published) {
          navigate('/en');
          toast({
            title: "Not Found",
            description: "The requested project is not available."
          });
          return;
        }
        
        setProject(projectData);
        
        // Fetch project media
        const mediaData = await fetchProjectMedia(projectData.id);
        setMedia(mediaData);
        
        // Process media into image URLs and model URLs
        const images: string[] = [];
        const models: string[] = [];
        
        for (const item of mediaData) {
          try {
            if (item.type === 'image') {
              const imageUrl = await getImageUrl(item.file_path);
              images.push(imageUrl);
            } else {
              const modelUrl = await get3DModelUrl(item.file_path);
              models.push(modelUrl);
            }
          } catch (error) {
            console.error(`Error processing media ${item.id}:`, error);
          }
        }
        
        setProjectImages(images);
        setProjectModels(models);
        
      } catch (error) {
        console.error('Error loading project:', error);
        toast({
          title: "Error",
          description: "Failed to load project data.",
          variant: "destructive"
        });
        navigate('/en');
      } finally {
        setLoading(false);
      }
    };
    
    loadProject();
  }, [slug, navigate]);

  // Handler for back button
  const handleBackToProjects = () => {
    console.log('Navigating back to home page');
    navigate('/en');
  };

  // Save scroll position on component unmount
  useEffect(() => {
    return () => {
      console.log('ProjectDetailEN unmounting, saving scroll position');
      saveScrollPosition();
    };
  }, [saveScrollPosition]);

  if (loading) {
    return (
      <div className="container-custom py-20 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container-custom py-20">
        Project not found
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Language Switch Button */}
      <div className="fixed top-24 right-4 z-40">
        <Link 
          to={`/project/${slug}`}
          className="flex items-center gap-2 bg-nordic-beige px-4 py-2 rounded-md text-sm hover:bg-opacity-80 transition-all border border-nordic-gray/20 shadow-sm"
        >
          <span className="text-xs bg-white px-2 py-1 rounded text-nordic-dark font-medium">English</span>
          <span>日本語</span>
        </Link>
      </div>

      <div className="container-custom pt-8 pb-20">
        <ProjectNavigator 
          categoryTitle={project.category}
          projects={[project]}
          currentIndex={0}
          onProjectSelect={() => {}}
          loading={false}
          projectImages={{[project.id]: projectImages}}
          onBackToProjects={handleBackToProjects}
        />

        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-8">
            <ProjectDisplay 
              currentWork={{
                ...project,
                title: project.title_en || project.title,
                description: project.description_en || project.description
              }}
              currentImages={projectImages}
              currentModels={projectModels}
              loading={false}
            />
          </div>

          <div className="md:col-span-4">
            <ProjectSidebarEN 
              works={[project]}
              currentWork={project}
              currentWorkIndex={0}
              onProjectChange={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailEN;
