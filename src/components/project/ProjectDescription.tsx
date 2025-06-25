
import React from 'react';

interface ProjectDescriptionProps {
  title: string;
  description: string;
}

const ProjectDescription: React.FC<ProjectDescriptionProps> = ({ title, description }) => {
  return (
    <div className="bg-white rounded-2xl p-8 pb-4 shadow-md border border-nordic-gray/30">
      <h2 className="text-2xl md:text-3xl font-medium mb-0 tracking-tight">{title}</h2>
    </div>
  );
};

export default ProjectDescription;
