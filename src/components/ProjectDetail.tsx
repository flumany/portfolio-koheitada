
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import ModelViewer3D from './ModelViewer3D';
import ProjectCarousel from './project/ProjectCarousel';
import ProjectSidebar from './project/ProjectSidebar';
import { projectsData } from '@/data/projectsData';
import { getImageUrl, get3DModelUrl } from '@/lib/supabase';
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";

const is3DModelFormat = (url: string): boolean => {
  const validExtensions = ['.glb', '.gltf', '.fbx', '.obj', '.stl', '.usdz'];
  return validExtensions.some(ext => url.toLowerCase().endsWith(ext));
};

const ProjectDetail: React.FC = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const categoryData = category ? projectsData[category] : null;
  const [currentWorkIndex, setCurrentWorkIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('images');
  const [loading, setLoading] = useState(true);
  const [projectImages, setProjectImages] = useState<{[key: string]: string[]}>({});
  const [projectModels, setProjectModels] = useState<{[key: string]: string[]}>({});

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const loadMediaContent = async () => {
      setLoading(true);
      
      if (categoryData?.projects) {
        try {
          const imgResults: {[key: string]: string[]} = {};
          const modelResults: {[key: string]: string[]} = {};
          
          await Promise.all(
            categoryData.projects.map(async (work) => {
              // Load images
              const imagePromises = work.images.map(async (img) => {
                try {
                  return await getImageUrl(img);
                } catch (error) {
                  console.error(`Error loading image: ${img}`, error);
                  return '/placeholder.svg';
                }
              });
              
              imgResults[work.id] = await Promise.all(imagePromises);
              
              // Load 3D models
              if (work.models && work.models.length > 0) {
                const modelPromises = work.models.map(async (modelUrl) => {
                  try {
                    return await get3DModelUrl(modelUrl);
                  } catch (error) {
                    console.error(`Error loading model: ${modelUrl}`, error);
                    return '';
                  }
                });
                
                modelResults[work.id] = await Promise.all(modelPromises);
              }
              
              // Load single model if available
              if (work.modelUrl) {
                try {
                  const modelUrl = await get3DModelUrl(work.modelUrl);
                  if (modelUrl) {
                    if (!modelResults[work.id]) {
                      modelResults[work.id] = [];
                    }
                    modelResults[work.id].push(modelUrl);
                  }
                } catch (error) {
                  console.error(`Error loading main model: ${work.modelUrl}`, error);
                }
              }
            })
          );
          
          setProjectImages(imgResults);
          setProjectModels(modelResults);
        } catch (error) {
          console.error('Error loading project media:', error);
          toast({
            title: "エラーが発生しました",
            description: "プロジェクトメディアの読み込み中にエラーが発生しました。",
            variant: "destructive"
          });
        } finally {
          setLoading(false);
        }
      }
    };
    
    loadMediaContent();
  }, [category, categoryData]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!categoryData?.projects?.length) {
    return <div className="container-custom py-20">Project not found</div>;
  }

  const currentWork = categoryData.projects[currentWorkIndex];
  const currentImages = projectImages[currentWork.id] || currentWork.images || [];
  const currentModels = projectModels[currentWork.id] || [];
  
  const has3DModels = Boolean(
    currentModels.length > 0 || 
    (currentWork.modelUrl && is3DModelFormat(currentWork.modelUrl))
  );

  return (
    <div className="container-custom py-20">
      <Button
        variant="ghost"
        className="flex items-center gap-2 hover:bg-nordic-beige/20 mb-6"
        onClick={() => navigate('/')}
      >
        <ArrowLeft size={20} />
        Back to Projects
      </Button>

      <h1 className="text-3xl md:text-4xl font-medium mb-6 text-center">
        {categoryData.title}
      </h1>

      {categoryData.projects.length > 1 && (
        <ScrollArea className="w-full mb-6 pb-4">
          <div className="flex gap-4 px-4">
            {categoryData.projects.map((work, index) => (
              <button
                key={work.id}
                onClick={() => {
                  setCurrentWorkIndex(index);
                  setActiveTab('images');
                  // Ensure scroll to top when selecting a project
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                  });
                }}
                className={`relative flex-shrink-0 w-48 h-32 rounded-lg overflow-hidden transition-all ${
                  currentWorkIndex === index 
                    ? 'ring-4 ring-nordic-blue ring-offset-2' 
                    : 'hover:ring-2 hover:ring-nordic-blue/50 hover:ring-offset-2'
                }`}
              >
                {loading ? (
                  <Skeleton className="w-full h-full" />
                ) : (
                  <img
                    src={(projectImages[work.id] && projectImages[work.id][0]) || work.images[0] || '/placeholder.svg'}
                    alt={work.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.svg';
                    }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                  <span className="text-white text-sm font-medium truncate">
                    {work.title}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      )}

      <div className="grid md:grid-cols-12 gap-8">
        <div className="md:col-span-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-medium mb-3">{currentWork.title}</h2>
            <p className="text-nordic-dark/70 mb-4">{currentWork.description}</p>
            
            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-72 w-full" />
                <Skeleton className="h-8 w-40" />
              </div>
            ) : (
              <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
                <TabsList className="mb-4">
                  <TabsTrigger value="images">Images</TabsTrigger>
                  {has3DModels && (
                    <TabsTrigger value="3d-model">3D Model</TabsTrigger>
                  )}
                </TabsList>
                
                <TabsContent value="images" className="focus-visible:outline-none focus-visible:ring-0">
                  <ProjectCarousel 
                    images={currentImages} 
                    iframes={currentWork.iframes}
                    title={currentWork.title} 
                  />
                </TabsContent>
                
                {has3DModels && (
                  <TabsContent value="3d-model" className="focus-visible:outline-none focus-visible:ring-0">
                    <ModelViewer3D 
                      modelUrl={currentWork.modelUrl} 
                      models={currentModels.length > 0 ? currentModels : currentWork.models} 
                    />
                  </TabsContent>
                )}
              </Tabs>
            )}
          </div>
        </div>

        <div className="md:col-span-4">
          <ProjectSidebar 
            works={categoryData.projects}
            currentWork={currentWork}
            currentWorkIndex={currentWorkIndex}
            onProjectChange={(index) => {
              setCurrentWorkIndex(index);
              setActiveTab('images');
              // Ensure scroll to top when changing projects in sidebar
              window.scrollTo({
                top: 0,
                behavior: 'smooth'
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
