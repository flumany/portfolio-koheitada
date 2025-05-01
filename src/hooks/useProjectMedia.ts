
import { useState, useEffect } from 'react';
import { ProjectCategory, ProjectWork } from '@/types/project';
import { getImageUrl, get3DModelUrl } from '@/lib/supabase';
import { toast } from "@/components/ui/use-toast";

interface ProjectMediaState {
  loading: boolean;
  projectImages: { [key: string]: string[] };
  projectModels: { [key: string]: string[] };
}

/**
 * Custom hook for loading project media content
 */
export const useProjectMedia = (categoryData: ProjectCategory | null): ProjectMediaState => {
  const [loading, setLoading] = useState(true);
  const [projectImages, setProjectImages] = useState<{[key: string]: string[]}>({});
  const [projectModels, setProjectModels] = useState<{[key: string]: string[]}>({});

  useEffect(() => {
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
  }, [categoryData]);

  return { loading, projectImages, projectModels };
};
