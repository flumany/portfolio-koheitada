
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProjectNavigator from './project/ProjectNavigator';
import ProjectDisplay from './project/ProjectDisplay';
import ProjectSidebar from './project/ProjectSidebar';
import { fetchProjectBySlug, fetchProjectMedia } from '@/services/projectService';
import { ProjectWork, ProjectMedia } from '@/types/project';
import { getImageUrl, get3DModelUrl } from '@/lib/supabase';
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from 'lucide-react';
import { projectsData } from '@/data/projectsData';

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<ProjectWork | null>(null);
  const [projectImages, setProjectImages] = useState<string[]>([]);
  const [projectModels, setProjectModels] = useState<string[]>([]);
  const [media, setMedia] = useState<ProjectMedia[]>([]);
  
  useEffect(() => {
    const loadProject = async () => {
      if (!slug) {
        navigate('/');
        return;
      }
      
      setLoading(true);
      
      try {
        console.log('Loading project with slug:', slug);
        
        // First try to load from Supabase
        try {
          const projectData = await fetchProjectBySlug(slug);
          
          // If project is not published, redirect to home
          if (!projectData.published) {
            navigate('/');
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
          
        } catch (supabaseError) {
          console.log('Supabase load failed, trying static data:', supabaseError);
          
          // Fallback to static data
          let foundProject: ProjectWork | null = null;
          
          // Search through all categories for the project
          for (const category of Object.values(projectsData)) {
            const project = category.projects.find(p => p.slug === slug);
            if (project) {
              foundProject = project;
              break;
            }
          }
          
          if (!foundProject) {
            navigate('/');
            toast({
              title: "Not Found",
              description: "The requested project is not available."
            });
            return;
          }
          
          if (!foundProject.published) {
            navigate('/');
            toast({
              title: "Not Found",
              description: "The requested project is not available."
            });
            return;
          }
          
          setProject(foundProject);
          
          // Use static images and models from the project data
          const images = foundProject.images || [];
          const models = foundProject.models || [];
          
          setProjectImages(images);
          setProjectModels(models);
        }
        
      } catch (error) {
        console.error('Error loading project:', error);
        toast({
          title: "Error",
          description: "Failed to load project data.",
          variant: "destructive"
        });
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    
    loadProject();
  }, [slug, navigate]);

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
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project not found</h1>
          <p className="text-gray-600 mb-8">The requested project could not be found.</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  console.log('Project loaded:', project);
  console.log('Project images:', projectImages);
  console.log('Project models:', projectModels);

  return (
    <div className="container-custom py-20">
      <ProjectNavigator 
        categoryTitle={project.category}
        projects={[project]} // For now, only showing the current project
        currentIndex={0}
        onProjectSelect={() => {}}
        loading={false}
        projectImages={{[project.id]: projectImages}}
      />

      <div className="grid md:grid-cols-12 gap-8">
        <div className="md:col-span-8">
          <ProjectDisplay 
            currentWork={project}
            currentImages={projectImages}
            currentModels={projectModels}
            loading={false}
          />
        </div>

        <div className="md:col-span-4">
          <ProjectSidebar 
            works={[project]}
            currentWork={project}
            currentWorkIndex={0}
            onProjectChange={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
