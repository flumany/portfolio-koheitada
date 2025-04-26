
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ModelViewer3D from './ModelViewer3D';
import ProjectCarousel from './project/ProjectCarousel';
import ProjectSidebar from './project/ProjectSidebar';
import { projectsData } from '@/data/projectsData';

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

  return (
    <div className="container-custom py-20">
      <Button
        variant="ghost"
        className="mb-6 flex items-center gap-2 hover:bg-nordic-beige/20"
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
                {currentWork.modelUrl && (
                  <TabsTrigger value="3d-model">3D Model</TabsTrigger>
                )}
              </TabsList>
              
              <TabsContent value="images" className="focus-visible:outline-none focus-visible:ring-0">
                <ProjectCarousel images={currentWork.images} title={currentWork.title} />
              </TabsContent>
              
              {currentWork.modelUrl && (
                <TabsContent value="3d-model" className="focus-visible:outline-none focus-visible:ring-0">
                  <ModelViewer3D modelUrl={currentWork.modelUrl} />
                </TabsContent>
              )}
            </Tabs>
          </div>
        </div>

        <div className="md:col-span-4">
          <ProjectSidebar 
            works={works}
            currentWork={currentWork}
            currentWorkIndex={currentWorkIndex}
            onProjectChange={setCurrentWorkIndex}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
