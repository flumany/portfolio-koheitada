
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from "./ui/card";

const Hero: React.FC = () => {
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
          <div className="md:col-span-8 space-y-6">
            <h1 className="text-4xl md:text-6xl font-medium text-nordic-dark leading-tight animate-fade-in">
              多田 浩平<br />
              <span className="text-nordic-blue">3D Designer / Developer</span>
            </h1>
            
            <p className="text-lg text-nordic-dark/80 max-w-lg animate-fade-in" style={{animationDelay: '0.2s'}}>
              3DCG・メタバースデザイナー / 開発者として、革新的なデジタル体験の創造に取り組んでいます。
            </p>
            
            <div className="pt-4 animate-fade-in" style={{animationDelay: '0.4s'}}>
              <button 
                onClick={scrollToProjects}
                className="group flex items-center space-x-2 bg-nordic-beige px-6 py-3 rounded-md hover:bg-opacity-80 transition-all"
              >
                <span>作品を見る</span>
                <ArrowRight className="transition-transform group-hover:translate-x-1" size={18} />
              </button>
            </div>
          </div>
          
          <div className="md:col-span-4">
            <Card className="overflow-hidden bg-gradient-to-br from-nordic-blue/10 to-nordic-blue/30 border-none animate-fade-in shadow-lg" style={{animationDelay: '0.6s'}}>
              <CardContent className="p-6">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="aspect-square bg-gradient-to-br from-nordic-blue/20 to-nordic-beige/30 rounded-md mb-4 flex items-center justify-center">
                    <span className="text-4xl text-nordic-dark/40">多田</span>
                  </div>
                  <h3 className="font-medium text-lg mb-3 text-nordic-dark">Professional Profile</h3>
                  <p className="text-sm text-nordic-dark/70 leading-relaxed">
                    3D設計とメタバース開発の経験を活かし、次世代のデジタル体験を創造しています。
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

export default Hero;
