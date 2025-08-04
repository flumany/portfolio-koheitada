import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from "./ui/card";

const HeroAnonymousEN: React.FC = () => {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center relative pt-20 overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full wood-bg opacity-30 hidden lg:block" />

      <div className="container-custom relative z-10">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-8 space-y-8">
            <h1 className="text-4xl md:text-6xl font-medium text-nordic-dark leading-tight animate-fade-in">
              <div className="flex flex-col gap-3 mt-4">
                <span className="text-xl md:text-2xl leading-relaxed font-semibold" style={{color: "#a6bdfa"}}>
                  Service/Product Designer specializing in UI, UX, 3D, XR, Physical Products
                </span>
                <span className="text-xl md:text-2xl leading-relaxed font-semibold" style={{color: "#a6bdfa"}}>
                  Certified Human Centered Design Specialist
                </span>
              </div>
            </h1>
            
            <p className="text-lg text-nordic-dark/80 max-w-xl animate-fade-in leading-relaxed" style={{animationDelay: '0.2s'}}>
              Driven by an unwavering passion to enhance people's quality of life and convenience, I constantly strive toward new possibilities. I excel at thinking from others' perspectives and possess intuitive insight to identify essential needs, creating optimal value solutions.
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
            <Card className="overflow-hidden bg-gradient-to-br from-nordic-blue/5 to-nordic-blue/20 border-none animate-fade-in backdrop-blur-sm shadow-xl" style={{animationDelay: '0.6s'}}>
              <CardContent className="p-6">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="aspect-square rounded-md mb-4 flex items-center justify-center relative overflow-hidden group">
                    <img 
                      src="/lovable-uploads/1f814fdf-d820-4075-94dc-db2f878d6252.png" 
                      alt="Profile image" 
                      className="w-full h-full object-cover rounded-md"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-nordic-blue/20 via-transparent to-nordic-beige/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <p className="text-sm text-nordic-dark/70 leading-relaxed">
                    Enhancing user experiences across physical and digital products through innovative design solutions.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroAnonymousEN;