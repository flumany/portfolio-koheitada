
import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center relative pt-20 overflow-hidden">
      {/* Background wood accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full wood-bg opacity-30 hidden lg:block" />

      <div className="container-custom relative z-10">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-8 space-y-6">
            <h1 className="text-4xl md:text-6xl font-medium text-nordic-dark leading-tight animate-fade-in">
              Scandinavian Simplicity, <br />
              <span className="text-nordic-blue">Creative Design</span>
            </h1>
            
            <p className="text-lg text-nordic-dark/80 max-w-lg animate-fade-in" style={{animationDelay: '0.2s'}}>
              A minimalist portfolio showcasing design works with Scandinavian 
              aesthetics. Simple, functional, and beautiful.
            </p>
            
            <div className="pt-4 animate-fade-in" style={{animationDelay: '0.4s'}}>
              <button 
                onClick={scrollToProjects}
                className="group flex items-center space-x-2 bg-nordic-beige px-6 py-3 rounded-md hover:bg-opacity-80 transition-all"
              >
                <span>View Projects</span>
                <ArrowRight className="transition-transform group-hover:translate-x-1" size={18} />
              </button>
            </div>
          </div>
          
          <div className="md:col-span-4">
            <div className="bg-nordic-blue rounded-lg p-8 animate-fade-in" style={{animationDelay: '0.6s'}}>
              <div className="bg-nordic-white rounded-lg p-6 shadow-sm">
                <div className="aspect-square bg-nordic-gray/20 rounded-md mb-4" />
                <h3 className="font-poppins text-lg mb-2">Designer</h3>
                <p className="text-sm text-nordic-dark/70">
                  Passionate about creating clean, minimalist designs inspired by Scandinavian aesthetics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
