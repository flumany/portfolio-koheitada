
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
          <div className="md:col-span-8 space-y-8">
            <h1 className="text-4xl md:text-6xl font-medium text-nordic-dark leading-tight animate-fade-in">
              Kohei Tada<br />
              <div className="flex flex-col gap-3 mt-4">
                <span className="text-xl md:text-2xl leading-relaxed font-semibold text-[#8B5CF6]">
                  Service/Product Designer specializing in UI, UX, 3D, XR, Physical Products
                </span>
                <span className="text-xl md:text-2xl leading-relaxed font-semibold text-[#8B5CF6]">
                  Certified Human Centered Design Specialist
                </span>
              </div>
            </h1>
            
            <p className="text-lg text-nordic-dark/80 max-w-xl animate-fade-in leading-relaxed" style={{animationDelay: '0.2s'}}>
              人々の生活の豊かさや利便性を向上したいという変わらない強い思いを胸に、日々新たな可能性に向けて邁進しています。常に相手の立場に立って思考することができ、直感的な洞察力で本質的なニーズを見抜き、最適な価値を創出することができます。
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
                      alt="Kohei Tada profile" 
                      className="w-full h-full object-cover rounded-md"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-nordic-blue/20 via-transparent to-nordic-beige/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  {/* 「Professional Profile」という見出しを削除し、説明文（日本語も追加） */}
                  <p className="text-sm text-nordic-dark/70 leading-relaxed">
                    Enhancing user experiences across physical and digital products through innovative design solutions.
                  </p>
                  <p className="text-xs text-nordic-dark/50 leading-relaxed mt-2">
                    革新的なデザインによって、フィジカルからデジタルまで領域を横断し、ユーザー体験の向上に貢献しています。
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
