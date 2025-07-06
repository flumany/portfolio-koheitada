
import React, { useRef } from 'react';
import { ProjectWork } from '@/types/project';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ProjectCardEN from './ProjectCardEN';

interface CategorySectionENProps {
  category: string;
  projects: ProjectWork[];
  projectImages: {[key: string]: string};
  loading: boolean;
  onProjectClick: (slug: string) => void;
}

const CategorySectionEN: React.FC<CategorySectionENProps> = ({ 
  category, 
  projects, 
  projectImages,
  loading,
  onProjectClick
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const handleWheel = (e: React.WheelEvent) => {
    if (scrollRef.current) {
      e.preventDefault();
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-medium mb-2 capitalize whitespace-normal break-words leading-tight">
          {category.replace('-', ' ')}
        </h3>
        <div className="w-12 h-0.5 bg-nordic-blue mx-auto" />
      </div>
      
      <ScrollArea className="w-full whitespace-nowrap">
        <div 
          ref={scrollRef}
          className="flex space-x-6 pb-4"
          onWheel={handleWheel}
        >
          {projects.map(project => (
            <ProjectCardEN
              key={project.id}
              project={project}
              projectImage={projectImages[project.id]}
              loading={loading}
              onProjectClick={onProjectClick}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default CategorySectionEN;
