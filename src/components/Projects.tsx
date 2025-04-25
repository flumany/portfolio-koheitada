
import React, { useState } from 'react';

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
}

const Projects: React.FC = () => {
  const projectsData: Project[] = [
    {
      id: 1,
      title: "UI/UX Design",
      category: "design",
      image: "/placeholder.svg",
      description: "ユーザー体験を重視したデザイン設計"
    },
    {
      id: 2,
      title: "3DCG Design",
      category: "3d",
      image: "/placeholder.svg",
      description: "3DCGを活用したビジュアルデザイン"
    },
    {
      id: 3,
      title: "Metaverse",
      category: "vr",
      image: "/placeholder.svg",
      description: "メタバース空間のデザインと開発"
    },
    {
      id: 4,
      title: "Character/Avatar Design",
      category: "design",
      image: "/placeholder.svg",
      description: "キャラクターとアバターのデザイン"
    },
    {
      id: 5,
      title: "Digital Twin / VR",
      category: "vr",
      image: "/placeholder.svg",
      description: "デジタルツインとVR技術の活用"
    },
    {
      id: 6,
      title: "AR Project",
      category: "ar",
      image: "/placeholder.svg",
      description: "AR技術を活用したプロジェクト開発"
    },
    {
      id: 7,
      title: "3DCG Animation",
      category: "3d",
      image: "/placeholder.svg",
      description: "3DCGアニメーションの制作"
    },
    {
      id: 8,
      title: "Voxel Art",
      category: "3d",
      image: "/placeholder.svg",
      description: "ボクセルアートの制作"
    },
    {
      id: 9,
      title: "NFT",
      category: "blockchain",
      image: "/placeholder.svg",
      description: "NFTデジタルアートの制作"
    }
  ];

  const [filter, setFilter] = useState('all');
  const categories = ['all', 'design', '3d', 'vr', 'ar', 'blockchain'];

  const filteredProjects = filter === 'all' 
    ? projectsData 
    : projectsData.filter(project => project.category === filter);

  return (
    <section id="projects" className="section bg-nordic-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-medium mb-4">Portfolio</h2>
          <div className="w-16 h-1 bg-nordic-blue mx-auto mb-8" />
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(category => (
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <div key={project.id} className="project-card group">
              <div className="aspect-[4/3] relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
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
