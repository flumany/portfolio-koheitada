
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectCarousel from './ProjectCarousel';
import ModelViewer3D from '../ModelViewer3D';
import WebEmbedTab from './WebEmbedTab';
import { is3DModelFormat } from '@/utils/3dUtils';
import { ProjectWork } from '@/types/project';
import { Skeleton } from "@/components/ui/skeleton";
import { parseIframeContent } from '@/utils/iframeUtils';

interface ProjectDisplayProps {
  currentWork: ProjectWork;
  currentImages: string[];
  currentModels: string[];
  loading: boolean;
}

const ProjectDisplay: React.FC<ProjectDisplayProps> = ({
  currentWork,
  currentImages,
  currentModels,
  loading
}) => {
  // iframesコンテンツを解析してページごとに分割
  const parsedPages = currentWork.iframes && currentWork.iframes.length > 0
    ? currentWork.iframes.flatMap(iframe => parseIframeContent(iframe))
    : [];

  const hasIframes = Boolean(parsedPages.length > 0);
  const hasImages = Boolean(currentImages.length > 0);
  const has3DModels = Boolean(
    currentModels.length > 0 || 
    (currentWork.modelUrl && is3DModelFormat(currentWork.modelUrl))
  );
  
  // UI/UX Designカテゴリーかどうかをチェック
  const isUIUXDesign = currentWork.category === 'UI/UX Design';
  
  // デフォルトタブの優先順位: Web Embed > Images > 3D Model
  const getDefaultTab = () => {
    if (hasIframes) return 'web-embed';
    if (hasImages) return 'images';
    if (has3DModels) return '3d-model';
    return 'images';
  };

  const [activeTab, setActiveTab] = useState(getDefaultTab());

  return (
    <div className="space-y-8">
      {/* Project Description Section */}
      <div className="bg-white rounded-2xl p-8 shadow-md border border-nordic-gray/30">
        <p className="text-nordic-dark/70 leading-relaxed">
          {currentWork.description}
        </p>
      </div>

      {/* Combined Title and Media Tabs Section */}
      <div className="bg-white rounded-2xl p-8 shadow-md border border-nordic-gray/30">
        {/* Project Title */}
        <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-6">
          {currentWork.title}
        </h2>

        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-72 w-full" />
            <Skeleton className="h-8 w-40" />
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-3">
            <TabsList className="mb-7 bg-nordic-offwhite rounded-lg p-1 gap-2 border border-nordic-gray/30 shadow-none">
              {hasIframes && (
                <TabsTrigger value="web-embed" className="px-6 py-2 text-base rounded-lg data-[state=active]:bg-accent-blue data-[state=active]:text-nordic-dark data-[state=inactive]:bg-transparent transition-all">
                  {isUIUXDesign ? 'Final Product' : 'Web Embed'}
                </TabsTrigger>
              )}
              {hasImages && (
                <TabsTrigger value="images" className="px-6 py-2 text-base rounded-lg data-[state=active]:bg-accent-blue data-[state=active]:text-nordic-dark data-[state=inactive]:bg-transparent transition-all">
                  {isUIUXDesign ? 'Prototype' : 'Images'}
                </TabsTrigger>
              )}
              {has3DModels && (
                <TabsTrigger value="3d-model" className="px-6 py-2 text-base rounded-lg data-[state=active]:bg-accent-blue data-[state=active]:text-nordic-dark data-[state=inactive]:bg-transparent transition-all">
                  3D Model
                </TabsTrigger>
              )}
            </TabsList>
            
            {hasIframes && (
              <TabsContent value="web-embed" className="focus-visible:outline-none focus-visible:ring-0">
                <WebEmbedTab iframes={currentWork.iframes || []} />
              </TabsContent>
            )}
            
            {hasImages && (
              <TabsContent value="images" className="focus-visible:outline-none focus-visible:ring-0">
                <ProjectCarousel 
                  images={currentImages} 
                  iframes={[]}
                  title={currentWork.title} 
                />
              </TabsContent>
            )}
            
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
  );
};

export default ProjectDisplay;
