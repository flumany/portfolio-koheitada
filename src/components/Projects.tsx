
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getImageUrl } from '@/lib/supabase';
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";
import { fetchPublishedProjects, fetchProjectMedia } from '@/services/projectService';
import { ProjectWork, ProjectMedia } from '@/types/project';

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

  return (
    <section id="projects" className="section bg-nordic-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-medium mb-4">Projects</h2>
          <p className="text-nordic-dark/70 mb-8">Explore my latest works and creative endeavors</p>
          <div className="w-16 h-1 bg-nordic-blue mx-auto mb-8" />
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-md transition-all ${
                filter === category 
                  ? 'bg-nordic-blue text-nordic-white' 
                  : 'bg-nordic-gray/30 hover:bg-nordic-gray/50'
              }`}
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <div 
              key={project.id} 
              className="project-card group cursor-pointer"
              onClick={() => handleProjectClick(project.slug)}
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                {loading ? (
                  <Skeleton className="w-full h-full" />
                ) : (
                  <img 
                    src={projectImages[project.id] || '/placeholder.svg'} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.svg';
                      console.log(`Image error, using placeholder for ${project.title}`);
                    }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white text-sm font-medium uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="p-6 bg-white">
                <h3 className="font-medium text-lg mb-2">{project.title}</h3>
                <p className="text-nordic-dark/70 text-sm">{project.description}</p>
              </div>
            </div>
          ))}
          
          {filteredProjects.length === 0 && !loading && (
            <div className="col-span-3 text-center py-12">
              <h3 className="text-xl font-medium mb-2">No projects found</h3>
              <p className="text-nordic-dark/70">
                {filter !== 'all' ? 'Try selecting a different category' : 'Projects will appear here once they are published'}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
