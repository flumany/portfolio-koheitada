
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/components/ui/use-toast";
import { useProjectsEN } from '@/hooks/useProjectsEN';
import { useProjectFiltering } from '@/hooks/useProjectFiltering';
import CategorySectionEN from './project/CategorySectionEN';

const ProjectsEN: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();
  const { loading, projects, projectImages, error } = useProjectsEN();
  const { filteredProjects, categories, groupedProjects } = useProjectFiltering(projects, filter);

  const handleProjectClick = (slug: string) => {
    try {
      navigate(`/en/project/${slug}`);
    } catch (error) {
      console.error('Navigation error:', error);
      toast({
        title: "Error occurred",
        description: "An error occurred while navigating to the project page.",
        variant: "destructive"
      });
    }
  };

  return (
    <section id="projects" className="section bg-nordic-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-medium mb-4">Projects</h2>
          <div className="w-16 h-1 bg-nordic-blue mx-auto mb-8" />
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-md transition-all ${
                filter === category 
                  ? 'text-white' 
                  : 'text-nordic-dark'
              }`}
              style={
                filter === category
                  ? {
                      backgroundColor: "#a6bdfa",
                      border: "1px solid #a6bdfa",
                    }
                  : { backgroundColor: "#ECECEC" }
              }
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <p>{error}</p>
          </div>
        )}

        {filter === 'all' ? (
          // Category-grouped display with horizontal scrolling
          <div className="space-y-16">
            {groupedProjects.map((group) => (
              <CategorySectionEN 
                key={group.category}
                category={group.category}
                projects={group.projects}
                projectImages={projectImages}
                loading={loading}
                onProjectClick={handleProjectClick}
              />
            ))}
            
            {groupedProjects.length === 0 && !loading && (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No projects found</h3>
                <p className="text-nordic-dark/70">
                  Projects will appear here once they are published
                </p>
              </div>
            )}
          </div>
        ) : (
          // Single category display with horizontal scrolling
          <div>
            {groupedProjects.map((group) => (
              <CategorySectionEN 
                key={group.category}
                category={group.category}
                projects={group.projects}
                projectImages={projectImages}
                loading={loading}
                onProjectClick={handleProjectClick}
              />
            ))}
            
            {filteredProjects.length === 0 && !loading && (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No projects found</h3>
                <p className="text-nordic-dark/70">
                  Try selecting a different category
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsEN;
