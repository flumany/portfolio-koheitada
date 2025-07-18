
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { formatTextWithLineBreaks } from '@/utils/textUtils';

interface ProjectDescriptionProps {
  title: string;
  description: string;
}

const ProjectDescription: React.FC<ProjectDescriptionProps> = ({ title, description }) => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-md border border-nordic-gray/30">
      <h2 className="text-2xl md:text-3xl font-medium tracking-tight">{title}</h2>
    </div>
  );
};

export default ProjectDescription;
