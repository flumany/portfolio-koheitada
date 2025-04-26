import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

interface ProjectWork {
  id: number;
  title: string;
  description: string;
  image: string;
}

const projectsData: Record<string, ProjectWork[]> = {
  'web-design': [
    { id: 1, title: 'Corporate Website', description: 'Modern web design with focus on user experience', image: '/placeholder.svg' },
    { id: 2, title: 'E-commerce Platform', description: 'Intuitive shopping experience', image: '/placeholder.svg' },
  ],
  'ui-ux-design': [
    { id: 1, title: 'Mobile App Design', description: 'User-centered interface design', image: '/placeholder.svg' },
    { id: 2, title: 'Design System', description: 'Comprehensive UI component library', image: '/placeholder.svg' },
  ],
  '3d-design': [
    { id: 1, title: '3D Product Visualization', description: 'Photorealistic 3D renderings', image: '/placeholder.svg' },
    { id: 2, title: 'Character Design', description: '3D character modeling and rigging', image: '/placeholder.svg' },
  ],
  'ar-development': [
    { id: 1, title: 'AR Product Viewer', description: 'Interactive AR product experience', image: '/placeholder.svg' },
    { id: 2, title: 'AR Navigation', description: 'Augmented reality wayfinding system', image: '/placeholder.svg' },
  ],
  'metaverse': [
    { id: 1, title: 'Virtual Space', description: 'Interactive virtual environment', image: '/placeholder.svg' },
    { id: 2, title: 'Digital Twin', description: 'Virtual replica of physical space', image: '/placeholder.svg' },
  ],
  'nft': [
    { id: 1, title: 'NFT Collection', description: 'Digital art collection', image: '/placeholder.svg' },
    { id: 2, title: 'Generative Art', description: 'Algorithmic NFT artwork', image: '/placeholder.svg' },
  ],
};

const ProjectDetail: React.FC = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const works = category ? projectsData[category] : [];

  if (!works?.length) {
    return <div className="container-custom py-20">Project not found</div>;
  }

  return (
    <div className="container-custom py-20">
      <Button
        variant="ghost"
        className="mb-6 flex items-center gap-2 hover:bg-nordic-beige/20"
        onClick={() => navigate('/')}
      >
        <ArrowLeft size={20} />
        Back to Projects
      </Button>

      <h1 className="text-3xl md:text-4xl font-medium mb-12 text-center">
        {category?.split('-').map(word => word.toUpperCase()).join(' ')}
      </h1>
      
      <Carousel className="max-w-4xl mx-auto">
        <CarouselContent>
          {works.map((work) => (
            <CarouselItem key={work.id}>
              <div className="p-6">
                <img 
                  src={work.image} 
                  alt={work.title} 
                  className="w-full h-[400px] object-cover rounded-lg mb-4"
                />
                <h2 className="text-2xl font-medium mb-2">{work.title}</h2>
                <p className="text-nordic-dark/70">{work.description}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default ProjectDetail;
