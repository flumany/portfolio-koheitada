
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ModelViewer3D from './ModelViewer3D';
import ProjectCarousel from './project/ProjectCarousel';
import ProjectSidebar from './project/ProjectSidebar';
import { projectsData } from '@/data/projectsData';

// Helper function to check if URL is a valid 3D model format
const is3DModelFormat = (url: string): boolean => {
  const validExtensions = ['.glb', '.gltf', '.fbx', '.obj', '.stl', '.usdz'];
  return validExtensions.some(ext => url.toLowerCase().endsWith(ext));
};

const ProjectDetail: React.FC = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const works = category ? projectsData[category] : [];
  const [currentWorkIndex, setCurrentWorkIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('images');

  if (!works?.length) {
    return <div className="container-custom py-20">Project not found</div>;
  }

  const currentWork = works[currentWorkIndex];
  
  const goToPreviousProject = () => {
    if (currentWorkIndex > 0) {
      setCurrentWorkIndex(currentWorkIndex - 1);
      setActiveTab('images');
    }
  };

  const goToNextProject = () => {
    if (currentWorkIndex < works.length - 1) {
      setCurrentWorkIndex(currentWorkIndex + 1);
      setActiveTab('images');
    }
  };

  // Helper to determine if the project has valid 3D models
  const has3DModels = Boolean(
    (currentWork.modelUrl && is3DModelFormat(currentWork.modelUrl)) || 
    (currentWork.models && currentWork.models.some(url => is3DModelFormat(url)))
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
        {category?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
      </h1>

      <div className="grid md:grid-cols-12 gap-8">
        <div className="md:col-span-8">
          <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <h2 className="text-2xl font-medium mb-3">{currentWork.title}</h2>
            <p className="text-nordic-dark/70 mb-4">{currentWork.description}</p>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
              <TabsList className="mb-4">
                <TabsTrigger value="images">Images</TabsTrigger>
                {has3DModels && (
                  <TabsTrigger value="3d-model">3D Model</TabsTrigger>
                )}
              </TabsList>
              
              <TabsContent value="images" className="focus-visible:outline-none focus-visible:ring-0">
                <ProjectCarousel 
                  images={currentWork.images} 
                  iframes={currentWork.iframes}
                  title={currentWork.title} 
                />
              </TabsContent>
              
              {has3DModels && (
                <TabsContent value="3d-model" className="focus-visible:outline-none focus-visible:ring-0">
                  <ModelViewer3D 
                    modelUrl={currentWork.modelUrl} 
                    models={currentWork.models} 
                  />
                </TabsContent>
              )}
            </Tabs>
          </div>

          {works.length > 1 && (
            <div className="flex items-center justify-between gap-4 mb-6">
              <Button 
                variant="outline" 
                size="lg"
                onClick={goToPreviousProject}
                disabled={currentWorkIndex === 0}
                className="flex-1 py-8"
              >
                <ArrowLeft size={20} className="mr-2" />
                Previous Project
              </Button>
              <span className="text-sm font-medium">
                {currentWorkIndex + 1} of {works.length}
              </span>
              <Button 
                variant="outline" 
                size="lg"
                onClick={goToNextProject}
                disabled={currentWorkIndex === works.length - 1}
                className="flex-1 py-8"
              >
                Next Project
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </div>
          )}
        </div>

        <div className="md:col-span-4">
          <ProjectSidebar 
            works={works}
            currentWork={currentWork}
            currentWorkIndex={currentWorkIndex}
            onProjectChange={(index) => {
              setCurrentWorkIndex(index);
              setActiveTab('images');
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
