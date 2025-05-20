
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectCarousel from './ProjectCarousel';
import ModelViewer3D from '../ModelViewer3D';
import { is3DModelFormat } from '@/utils/3dUtils';
import { ProjectWork } from '@/types/project';
import { Skeleton } from "@/components/ui/skeleton";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
  const [activeTab, setActiveTab] = useState('images');
  
  // Determine if there are valid 3D models to display
  const has3DModels = Boolean(
    currentModels.length > 0 || 
    (currentWork.modelUrl && is3DModelFormat(currentWork.modelUrl))
  );

  return (
    <div className="bg-white rounded-2xl p-8 shadow-md mb-8 border border-nordic-gray/30">
      <h2 className="text-2xl md:text-3xl font-medium mb-6 tracking-tight">{currentWork.title}</h2>
      {/* 説明文のデザイン・余白を調整*/}
      <div
        className="prose prose-neutral max-w-none mb-6 break-words"
        style={{
          fontSize: "1.1rem",
          lineHeight: "2",
          letterSpacing: "0.01em",
          wordBreak: "break-word",
        }}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            p: ({ node, ...props }) => <p style={{ marginBottom: "1.3em", whiteSpace: 'pre-line' }} {...props} />,
            ul: ({ node, ...props }) => <ul style={{ marginBottom: "1.3em", paddingLeft: '1.4em' }} {...props} />,
            ol: ({ node, ...props }) => <ol style={{ marginBottom: "1.3em", paddingLeft: '1.4em' }} {...props} />,
            strong: ({ node, ...props }) => <strong style={{ fontWeight: 600 }} {...props} />,
            br: () => <br />,
          }}
        >
          {currentWork.description || ''}
        </ReactMarkdown>
      </div>
      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-72 w-full" />
          <Skeleton className="h-8 w-40" />
        </div>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="mb-6 bg-nordic-offwhite rounded-lg p-1 gap-2 border border-nordic-gray/30 shadow-none">
            <TabsTrigger value="images" className="px-6 py-2 text-base rounded-lg data-[state=active]:bg-accent-blue data-[state=active]:text-nordic-dark data-[state=inactive]:bg-transparent">Images</TabsTrigger>
            {has3DModels && (
              <TabsTrigger value="3d-model" className="px-6 py-2 text-base rounded-lg data-[state=active]:bg-accent-blue data-[state=active]:text-nordic-dark data-[state=inactive]:bg-transparent">3D Model</TabsTrigger>
            )}
          </TabsList>
          <TabsContent value="images" className="focus-visible:outline-none focus-visible:ring-0">
            <ProjectCarousel 
              images={currentImages} 
              iframes={currentWork.iframes || []}
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
  );
};

export default ProjectDisplay;

