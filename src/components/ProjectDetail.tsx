import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useScrollPosition } from '../hooks/useScrollPosition';
import ProjectNavigator from './project/ProjectNavigator';
import ProjectDisplay from './project/ProjectDisplay';
import ProjectSidebar from './project/ProjectSidebar';
import { fetchProjectBySlug, fetchProjectMedia } from '@/services/projectService';
import { ProjectWork, ProjectMedia } from '@/types/project';
import { getImageUrl, get3DModelUrl } from '@/lib/supabase';
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from 'lucide-react';

const ProjectDetail: React.FC = () => {
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
        navigate('/');
        return;
      }
      
      setLoading(true);
      
      try {
        // Fetch project data
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

  // 戻るボタンのハンドラー
  const handleBackToProjects = () => {
    console.log('ProjectDetail: handleBackToProjects - saving scroll position before navigation');
    // 現在のスクロール位置を明示的に保存
    saveScrollPosition();
    
    // ホームページのスクロール位置を保存してから遷移
    setTimeout(() => {
      navigate('/');
    }, 10);
  };

  // コンポーネントアンマウント時にスクロール位置を保存
  useEffect(() => {
    return () => {
      console.log('ProjectDetail: Component unmounting - saving scroll position');
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
    <div className="container-custom py-20">
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
