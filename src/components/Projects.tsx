import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getImageUrl } from '@/lib/supabase';
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { fetchPublishedProjects, fetchProjectMedia } from '@/services/projectService';
import { ProjectWork, ProjectMedia } from '@/types/project';
import { Monitor, Image as ImageIcon } from 'lucide-react';

const Projects: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<ProjectWork[]>([]);
  const [projectImages, setProjectImages] = useState<{[key: string]: string}>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch published projects
        const projectsData = await fetchPublishedProjects();
        setProjects(projectsData);
        
        // Load thumbnail images for projects
        const images: {[key: string]: string} = {};
        
        for (const project of projectsData) {
          try {
            // Fetch the first image for each project
            const mediaData = await fetchProjectMedia(project.id);
            const imageMedia = mediaData.filter(item => item.type === 'image')[0];
            
            if (imageMedia) {
              const imageUrl = await getImageUrl(imageMedia.file_path);
              images[project.id] = imageUrl;
            } else if (project.images && project.images.length > 0) {
              // Fall back to legacy images array
              const imageUrl = await getImageUrl(project.images[0]);
              images[project.id] = imageUrl;
            } else {
              images[project.id] = '/placeholder.svg';
            }
          } catch (error) {
            console.error(`Error loading image for project ${project.id}:`, error);
            images[project.id] = '/placeholder.svg';
          }
        }
        
        setProjectImages(images);
        
      } catch (error) {
        console.error('Error loading projects:', error);
        setError('プロジェクトの読み込み中にエラーが発生しました。');
        toast({
          title: "エラーが発生しました",
          description: "プロジェクトの読み込み中にエラーが発生しました。",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const handleProjectClick = (slug: string) => {
    try {
      navigate(`/project/${slug}`);
    } catch (error) {
      console.error('Navigation error:', error);
      toast({
        title: "エラーが発生しました",
        description: "プロジェクトページへの移動中にエラーが発生しました。",
        variant: "destructive"
      });
    }
  };

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);
    
  // Get unique categories from projects
  const categories = ['all', ...new Set(projects.map(project => project.category))];

  // Group projects by category for display
  const groupedProjects = () => {
    if (filter !== 'all') {
      return [{ category: filter, projects: filteredProjects }];
    }
    
    const grouped = categories.slice(1).map(category => ({
      category,
      projects: projects.filter(project => project.category === category)
    })).filter(group => group.projects.length > 0);
    
    return grouped;
  };

  // Check if project has iframe as primary content
  const hasIframePreview = (project: ProjectWork) => {
    return project.iframes && project.iframes.length > 0;
  };

  const renderProjectCard = (project: ProjectWork) => (
    <div 
      key={project.id} 
      className="project-card group cursor-pointer flex-shrink-0 w-80"
      onClick={() => handleProjectClick(project.slug)}
    >
      <div className="aspect-[4/3] relative overflow-hidden">
        {loading ? (
          <Skeleton className="w-full h-full" />
        ) : hasIframePreview(project) ? (
          // Display iframe preview from HTML embed code
          <div className="relative w-full h-full">
            <div 
              dangerouslySetInnerHTML={{ 
                __html: project.iframes![0].replace(
                  /<iframe([^>]*)>/,
                  '<iframe$1 class="w-full h-full object-cover border-0 pointer-events-none">'
                )
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="bg-white/90 p-3 rounded-full">
                <Monitor className="text-nordic-dark" size={24} />
              </div>
            </div>
            <div className="absolute top-2 right-2 bg-nordic-blue text-white px-2 py-1 rounded text-xs font-medium">
              Web Embed
            </div>
          </div>
        ) : (
          // Display image preview
          <>
            <img 
              src={projectImages[project.id] || '/placeholder.svg'} 
              alt={project.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              onError={(e) => {
                e.currentTarget.src = '/placeholder.svg';
                console.log(`Image error, using placeholder for ${project.title}`);
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="bg-white/90 p-3 rounded-full">
                <ImageIcon className="text-nordic-dark" size={24} />
              </div>
            </div>
          </>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="text-white text-sm font-medium uppercase tracking-wider">
            {project.category}
          </span>
        </div>
      </div>
      <div className="p-6 bg-white">
        <h3 className="font-medium text-lg mb-2">{project.title}</h3>
      </div>
    </div>
  );

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
            {groupedProjects().map((group) => (
              <div key={group.category} className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-medium mb-2 capitalize">
                    {group.category.replace('-', ' ')}
                  </h3>
                  <div className="w-12 h-0.5 bg-nordic-blue mx-auto" />
                </div>
                
                {group.projects.length > 3 ? (
                  <Carousel
                    opts={{
                      align: "start",
                      slidesToScroll: 1,
                    }}
                    className="w-full"
                  >
                    <CarouselContent className="-ml-2 md:-ml-4">
                      {group.projects.map((project) => (
                        <CarouselItem key={project.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                          {renderProjectCard(project)}
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden sm:flex" />
                    <CarouselNext className="hidden sm:flex" />
                  </Carousel>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                    {group.projects.map(renderProjectCard)}
                  </div>
                )}
              </div>
            ))}
            
            {groupedProjects().length === 0 && !loading && (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No projects found</h3>
                <p className="text-nordic-dark/70">
                  Projects will appear here once they are published
                </p>
              </div>
            )}
          </div>
        ) : (
          // Single category display with horizontal scrolling if needed
          <div>
            {filteredProjects.length > 3 ? (
              <Carousel
                opts={{
                  align: "start",
                  slidesToScroll: 1,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {filteredProjects.map((project) => (
                    <CarouselItem key={project.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                      {renderProjectCard(project)}
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden sm:flex" />
                <CarouselNext className="hidden sm:flex" />
              </Carousel>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                {filteredProjects.map(renderProjectCard)}
              </div>
            )}
            
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

export default Projects;
