
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getImageUrl } from '@/lib/supabase';
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";

const Projects: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [projectImages, setProjectImages] = useState<{[key: string]: string}>({});
  const [error, setError] = useState<string | null>(null);

  // Updated projectsData with correct hierarchical structure
  const projectsCategories = [
    {
      id: 1,
      title: "Web Design",
      category: "design",
      image: "/placeholder.svg",
      description: "User-centered web design solutions",
      slug: "web-design"
    },
    {
      id: 2,
      title: "UI/UX Design",
      category: "design",
      image: "/placeholder.svg",
      description: "Creating intuitive user experiences",
      slug: "ui-ux-design"
    },
    {
      id: 3,
      title: "3D Design",
      category: "3D",
      image: "/project2.jpg",
      description: "3DCGを活用したビジュアルデザイン",
      slug: "3d-design"
    },
    {
      id: 4,
      title: "Metaverse",
      category: "VR",
      image: "/placeholder.svg",
      description: "メタバース空間のデザインと開発",
      slug: "metaverse"
    },
    {
      id: 5,
      title: "Character/Avatar Design",
      category: "3D",
      image: "/placeholder.svg",
      description: "キャラクターとアバターのデザイン",
      slug: "character-avatar-design" // Fixed this slug to be unique
    },
    {
      id: 6,
      title: "AR Development",
      category: "AR",
      image: "/placeholder.svg",
      description: "AR技術を活用したプロジェクト開発",
      slug: "ar-development"
    },
    {
      id: 7,
      title: "NFT Collection",
      category: "NFT",
      image: "/placeholder.svg",
      description: "NFTデジタルアートの制作",
      slug: "nft"
    }
  ];

  useEffect(() => {
    const loadImages = async () => {
      setLoading(true);
      setError(null);
      try {
        const images: {[key: string]: string} = {};
        
        // Load all images in parallel
        await Promise.all(
          projectsCategories.map(async (project) => {
            try {
              if (project.image && !project.image.startsWith('http')) {
                const url = await getImageUrl(project.image);
                images[project.id] = url;
              } else {
                images[project.id] = project.image || '/placeholder.svg';
              }
            } catch (error) {
              console.error(`Error loading image for project ${project.id}:`, error);
              images[project.id] = '/placeholder.svg';
            }
          })
        );
        
        setProjectImages(images);
      } catch (error) {
        console.error('Error loading project images:', error);
        setError('プロジェクト画像の読み込み中にエラーが発生しました。');
        toast({
          title: "エラーが発生しました",
          description: "プロジェクト画像の読み込み中にエラーが発生しました。",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadImages();
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
    ? projectsCategories 
    : projectsCategories.filter(project => project.category === filter);

  return (
    <section id="projects" className="section bg-nordic-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-medium mb-4">Projects</h2>
          <p className="text-nordic-dark/70 mb-8">Explore my latest works and creative endeavors</p>
          <div className="w-16 h-1 bg-nordic-blue mx-auto mb-8" />
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {['all', 'design', '3D', 'VR', 'AR', 'NFT'].map((category) => (
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
                    src={projectImages[project.id] || project.image || '/placeholder.svg'} 
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
        </div>
      </div>
    </section>
  );
};

export default Projects;
