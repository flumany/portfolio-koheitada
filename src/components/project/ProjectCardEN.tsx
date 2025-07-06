
import React from 'react';
import { ProjectWork } from '@/types/project';
import { Monitor, Image as ImageIcon } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";

interface ProjectCardENProps {
  project: ProjectWork;
  projectImage: string;
  loading: boolean;
  onProjectClick: (slug: string) => void;
}

const ProjectCardEN: React.FC<ProjectCardENProps> = ({ 
  project, 
  projectImage, 
  loading, 
  onProjectClick 
}) => {
  // Check if project has iframe as primary content (for detail page preview)
  const hasIframePreview = (project: ProjectWork) => {
    return project.iframes && project.iframes.length > 0;
  };

  return (
    <div 
      className="project-card group cursor-pointer flex-shrink-0 w-80"
      onClick={() => onProjectClick(project.slug)}
    >
      <div className="aspect-[4/3] relative overflow-hidden">
        {loading ? (
          <Skeleton className="w-full h-full" />
        ) : (
          // Always display image preview in project list, even if iframe exists
          <>
            <img 
              src={projectImage || '/placeholder.svg'} 
              alt={project.title_en || project.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              onError={(e) => {
                e.currentTarget.src = '/placeholder.svg';
                console.log(`Image error, using placeholder for ${project.title_en || project.title}`);
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="bg-white/90 p-3 rounded-full">
                {hasIframePreview(project) ? (
                  <Monitor className="text-nordic-dark" size={24} />
                ) : (
                  <ImageIcon className="text-nordic-dark" size={24} />
                )}
              </div>
            </div>
            {hasIframePreview(project) && (
              <div className="absolute top-2 right-2 bg-nordic-blue text-white px-2 py-1 rounded text-xs font-medium">
                Interactive
              </div>
            )}
          </>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="text-white text-sm font-medium uppercase tracking-wider">
            {project.category}
          </span>
        </div>
      </div>
      <div className="p-6 bg-white">
        <h3 className="font-medium text-lg mb-2 break-words leading-tight whitespace-normal">
          {project.title_en || project.title}
        </h3>
      </div>
    </div>
  );
};

export default ProjectCardEN;
