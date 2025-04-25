
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
      title: "ECサイトリニューアル",
      category: "web",
      image: "/placeholder.svg",
      description: "React.jsを使用したECサイトのフロントエンド開発"
    },
    {
      id: 2,
      title: "社内業務システム開発",
      category: "web",
      image: "/placeholder.svg",
      description: "Vue.jsとLaravelを使用した業務効率化システムの開発"
    },
    {
      id: 3,
      title: "チャットアプリケーション",
      category: "mobile",
      image: "/placeholder.svg",
      description: "WebSocketを使用したリアルタイムチャットアプリの開発"
    },
    {
      id: 4,
      title: "顧客管理システム",
      category: "web",
      image: "/placeholder.svg",
      description: "Node.jsとMySQLを使用した顧客管理システムの開発"
    },
    {
      id: 5,
      title: "ポートフォリオサイト",
      category: "web",
      image: "/placeholder.svg",
      description: "React.jsとTailwind CSSを使用した個人ポートフォリオの制作"
    },
    {
      id: 6,
      title: "予約管理システム",
      category: "web",
      image: "/placeholder.svg",
      description: "Vue.jsとFirebaseを使用した予約システムの開発"
    }
  ];

  const [filter, setFilter] = useState('all');
  const categories = ['all', 'interior', 'branding', 'web', 'mobile'];

  const filteredProjects = filter === 'all' 
    ? projectsData 
    : projectsData.filter(project => project.category === filter);

  return (
    <section id="projects" className="section bg-nordic-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-medium mb-4">Projects</h2>
          <div className="w-16 h-1 bg-nordic-blue mx-auto mb-8" />
          <p className="text-nordic-dark/70">
            A selection of my work showcasing clean, minimal design with functionality at its core.
          </p>
        </div>

        {/* Filter Buttons */}
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

        {/* Projects Grid */}
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
              <div className="p-6">
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
