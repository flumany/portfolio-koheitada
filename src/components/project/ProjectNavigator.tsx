
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { ProjectWork } from '@/types/project';

interface ProjectNavigatorProps {
  categoryTitle: string;
  projects: ProjectWork[];
  currentIndex: number;
  onProjectSelect: (index: number) => void;
  loading: boolean;
  projectImages: {[key: string]: string[]};
}

const ProjectNavigator: React.FC<ProjectNavigatorProps> = ({ 
  categoryTitle, 
  projects, 
  currentIndex, 
  onProjectSelect,
  loading,
  projectImages
}) => {
  const navigate = useNavigate();

  return (
    <>
      <Button
        variant="ghost"
        className="flex items-center gap-2 hover:bg-nordic-beige/20 mb-6"
        onClick={() => navigate('/')}
      >
        <ArrowLeft size={20} />
        Back to Projects
      </Button>

      <h1 className="text-3xl md:text-4xl font-medium mb-6 text-center">
        {categoryTitle}
      </h1>

      {projects.length > 1 && (
        <ScrollArea className="w-full mb-6 pb-4">
          <div className="flex gap-4 px-4">
            {projects.map((work, index) => (
              <button
                key={work.id}
                onClick={() => onProjectSelect(index)}
                className={`relative flex-shrink-0 w-48 h-32 rounded-lg overflow-hidden transition-all ${
                  currentIndex === index 
                    ? 'ring-4 ring-nordic-blue ring-offset-2' 
                    : 'hover:ring-2 hover:ring-nordic-blue/50 hover:ring-offset-2'
                }`}
              >
                {loading ? (
                  <Skeleton className="w-full h-full" />
                ) : (
                  <img
                    src={(projectImages[work.id] && projectImages[work.id][0]) || work.images[0] || '/placeholder.svg'}
                    alt={work.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.svg';
                    }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                  <span className="text-white text-sm font-medium truncate">
                    {work.title}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      )}
    </>
  );
};

export default ProjectNavigator;
