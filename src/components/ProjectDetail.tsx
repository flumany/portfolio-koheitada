
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProjectNavigator from './project/ProjectNavigator';
import ProjectDisplay from './project/ProjectDisplay';
import ProjectSidebar from './project/ProjectSidebar';
import { projectsData } from '@/data/projectsData';
import { useProjectMedia } from '@/hooks/useProjectMedia';

const ProjectDetail: React.FC = () => {
  const { category } = useParams();
  const categoryData = category ? projectsData[category] : null;
  const [currentWorkIndex, setCurrentWorkIndex] = useState(0);
  
  const { loading, projectImages, projectModels } = useProjectMedia(categoryData);

  // Scroll to top when component mounts or project changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category, currentWorkIndex]);

  if (!categoryData?.projects?.length) {
    return <div className="container-custom py-20">Project not found</div>;
  }

  const currentWork = categoryData.projects[currentWorkIndex];
  const currentImages = projectImages[currentWork.id] || currentWork.images || [];
  const currentModels = projectModels[currentWork.id] || [];

  const handleProjectSelect = (index: number) => {
    setCurrentWorkIndex(index);
    // Ensure scroll to top when selecting a project
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="container-custom py-20">
      <ProjectNavigator 
        categoryTitle={categoryData.title}
        projects={categoryData.projects}
        currentIndex={currentWorkIndex}
        onProjectSelect={handleProjectSelect}
        loading={loading}
        projectImages={projectImages}
      />

      <div className="grid md:grid-cols-12 gap-8">
        <div className="md:col-span-8">
          <ProjectDisplay 
            currentWork={currentWork}
            currentImages={currentImages}
            currentModels={currentModels}
            loading={loading}
          />
        </div>

        <div className="md:col-span-4">
          <ProjectSidebar 
            works={categoryData.projects}
            currentWork={currentWork}
            currentWorkIndex={currentWorkIndex}
            onProjectChange={handleProjectSelect}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
