
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { fetchPublishedProjectsWithOrder } from '@/services/projectService';
import { ProjectWork } from '@/types/project';
import { getImageUrl } from '@/lib/supabase';

const ProjectsEN = () => {
  const [projects, setProjects] = useState<ProjectWork[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projectsData = await fetchPublishedProjectsWithOrder();
        setProjects(projectsData);
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  // Group projects by category
  const projectsByCategory = projects.reduce((acc, project) => {
    if (!acc[project.category]) {
      acc[project.category] = [];
    }
    acc[project.category].push(project);
    return acc;
  }, {} as Record<string, ProjectWork[]>);

  // Get unique categories
  const categories = ['All', ...Object.keys(projectsByCategory)];

  // Filter projects based on selected category
  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projectsByCategory[selectedCategory] || [];

  const handleImageNavigation = (projectId: string, direction: 'prev' | 'next', totalImages: number) => {
    setCurrentImageIndex(prev => {
      const currentIndex = prev[projectId] || 0;
      let newIndex;
      
      if (direction === 'next') {
        newIndex = (currentIndex + 1) % totalImages;
      } else {
        newIndex = currentIndex === 0 ? totalImages - 1 : currentIndex - 1;
      }
      
      return { ...prev, [projectId]: newIndex };
    });
  };

  const getProjectImage = async (project: ProjectWork, index: number = 0) => {
    if (project.images && project.images[index]) {
      try {
        const imageUrl = await getImageUrl(project.images[index]);
        return imageUrl;
      } catch (error) {
        console.error('Error getting image URL:', error);
        return '/placeholder.svg';
      }
    }
    return '/placeholder.svg';
  };

  if (loading) {
    return (
      <section id="projects" className="py-20 bg-gradient-to-b from-nordic-offwhite to-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-medium mb-4">Projects</h2>
            <div className="w-24 h-1 bg-accent-blue mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden animate-pulse">
                <div className="h-64 bg-gray-200"></div>
                <CardContent className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-nordic-offwhite to-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-medium mb-4">Projects</h2>
          <div className="w-24 h-1 bg-accent-blue mx-auto"></div>
        </div>

        {/* Category Filter */}
        <ScrollArea className="w-full mb-8">
          <div className="flex gap-2 px-4 py-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap ${
                  selectedCategory === category 
                    ? 'bg-accent-blue hover:bg-accent-blue/90' 
                    : 'hover:bg-accent-blue/10'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </ScrollArea>

        {/* Projects by Category */}
        {selectedCategory === 'All' ? (
          Object.entries(projectsByCategory).map(([category, categoryProjects]) => (
            <div key={category} className="mb-16">
              <h3 className="text-2xl font-medium mb-8 text-center">{category}</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryProjects.map((project) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    currentImageIndex={currentImageIndex[project.id] || 0}
                    onImageNavigation={handleImageNavigation}
                    getProjectImage={getProjectImage}
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                currentImageIndex={currentImageIndex[project.id] || 0}
                onImageNavigation={handleImageNavigation}
                getProjectImage={getProjectImage}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

// Project Card Component
const ProjectCard = ({ 
  project, 
  currentImageIndex, 
  onImageNavigation, 
  getProjectImage 
}: {
  project: ProjectWork;
  currentImageIndex: number;
  onImageNavigation: (projectId: string, direction: 'prev' | 'next', totalImages: number) => void;
  getProjectImage: (project: ProjectWork, index: number) => Promise<string>;
}) => {
  const [imageUrl, setImageUrl] = useState('/placeholder.svg');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadImage = async () => {
      setIsLoading(true);
      try {
        const url = await getProjectImage(project, currentImageIndex);
        setImageUrl(url);
      } catch (error) {
        console.error('Error loading image:', error);
        setImageUrl('/placeholder.svg');
      } finally {
        setIsLoading(false);
      }
    };

    loadImage();
  }, [project, currentImageIndex, getProjectImage]);

  const totalImages = project.images?.length || 0;

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-nordic-gray/20">
      <div className="relative h-64 overflow-hidden">
        {isLoading ? (
          <div className="w-full h-full bg-gray-200 animate-pulse" />
        ) : (
          <img
            src={imageUrl}
            alt={project.title_en || project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.src = '/placeholder.svg';
            }}
          />
        )}
        
        {/* Image Navigation */}
        {totalImages > 1 && (
          <>
            <Button
              variant="ghost"
              size="sm"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1"
              onClick={(e) => {
                e.preventDefault();
                onImageNavigation(project.id, 'prev', totalImages);
              }}
            >
              <ChevronLeft size={16} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1"
              onClick={(e) => {
                e.preventDefault();
                onImageNavigation(project.id, 'next', totalImages);
              }}
            >
              <ChevronRight size={16} />
            </Button>
            
            {/* Image Counter */}
            <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
              {currentImageIndex + 1} / {totalImages}
            </div>
          </>
        )}
      </div>
      
      <CardContent className="p-6">
        <Link to={`/en/project/${project.slug}`}>
          <h3 className="text-xl font-medium mb-2 group-hover:text-accent-blue transition-colors">
            {project.title_en || project.title}
          </h3>
          <p className="text-nordic-dark/70 text-sm line-clamp-3">
            {project.description_en || project.description}
          </p>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ProjectsEN;
