
import React from 'react';
import ProjectList from '@/components/editor/ProjectList';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const ProjectEditIndex: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container-custom py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-medium">Project Editor</h1>
        <Button variant="outline" onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <ProjectList />
      </div>
    </div>
  );
};

export default ProjectEditIndex;
