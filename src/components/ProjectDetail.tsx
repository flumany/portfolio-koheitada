
import React, { Suspense, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Info } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PresentationControls, useGLTF, Environment, Stage } from '@react-three/drei';
import { Skeleton } from "@/components/ui/skeleton";

interface ProjectWork {
  id: number;
  title: string;
  description: string;
  images: string[];
  modelUrl?: string;
  technologies?: string[];
  role?: string;
  duration?: string;
  challenge?: string;
  solution?: string;
}

// Model component for 3D viewer
const Model = ({ url }: { url: string }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1} />;
};

const projectsData: Record<string, ProjectWork[]> = {
  'web-design': [
    { 
      id: 1, 
      title: 'Corporate Website', 
      description: 'Modern web design with focus on user experience',
      images: ['/placeholder.svg', '/placeholder.svg'],
      technologies: ['HTML5', 'CSS3', 'JavaScript'],
      role: 'UI/UX Designer',
      duration: '2 months',
      challenge: 'Creating a responsive and intuitive interface for corporate clients.',
      solution: 'Implemented a clean, minimalist design with intuitive navigation.'
    },
    { 
      id: 2, 
      title: 'E-commerce Platform', 
      description: 'Intuitive shopping experience',
      images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
      technologies: ['React', 'Node.js', 'MongoDB'],
      role: 'Lead Designer',
      duration: '3 months',
      challenge: 'Designing a seamless shopping experience from browsing to checkout.',
      solution: 'Created a streamlined user flow with minimal steps to purchase.'
    },
  ],
  'ui-ux-design': [
    { 
      id: 1, 
      title: 'Mobile App Design', 
      description: 'User-centered interface design',
      images: ['/placeholder.svg', '/placeholder.svg'],
      technologies: ['Figma', 'Adobe XD', 'Sketch'],
      role: 'UX Designer',
      duration: '6 weeks',
      challenge: 'Designing for small screens while maintaining functionality.',
      solution: 'Employed progressive disclosure and gestural interactions.'
    },
    { 
      id: 2, 
      title: 'Design System', 
      description: 'Comprehensive UI component library',
      images: ['/placeholder.svg', '/placeholder.svg'],
      technologies: ['Storybook', 'React', 'Styled Components'],
      role: 'Design Systems Engineer',
      duration: '4 months',
      challenge: 'Creating a cohesive and scalable design system.',
      solution: 'Developed atomic components with detailed documentation.'
    },
  ],
  '3d-design': [
    { 
      id: 1, 
      title: '3D Product Visualization', 
      description: 'Photorealistic 3D renderings',
      images: ['/placeholder.svg', '/placeholder.svg'],
      modelUrl: '/placeholder.svg', // replace with actual 3D model when available
      technologies: ['Blender', 'Cinema 4D', 'KeyShot'],
      role: '3D Artist',
      duration: '3 weeks',
      challenge: 'Achieving photorealistic materials and lighting.',
      solution: 'Used physically-based rendering and HDRI lighting.'
    },
    { 
      id: 2, 
      title: 'Character Design', 
      description: '3D character modeling and rigging',
      images: ['/placeholder.svg', '/placeholder.svg'],
      modelUrl: '/placeholder.svg', // replace with actual 3D model when available
      technologies: ['ZBrush', 'Maya', 'Substance Painter'],
      role: 'Character Artist',
      duration: '2 months',
      challenge: 'Creating expressive and animatable characters.',
      solution: 'Developed detailed sculpts with efficient topology.'
    },
  ],
  'ar-development': [
    { 
      id: 1, 
      title: 'AR Product Viewer', 
      description: 'Interactive AR product experience',
      images: ['/placeholder.svg', '/placeholder.svg'],
      technologies: ['ARKit', 'Unity', 'C#'],
      role: 'AR Developer',
      duration: '6 weeks',
      challenge: 'Ensuring accurate product placement in real environments.',
      solution: 'Implemented plane detection and realistic shadows.'
    },
    { 
      id: 2, 
      title: 'AR Navigation', 
      description: 'Augmented reality wayfinding system',
      images: ['/placeholder.svg', '/placeholder.svg'],
      technologies: ['ARCore', 'Android SDK', 'Kotlin'],
      role: 'Lead AR Developer',
      duration: '3 months',
      challenge: 'Creating accurate indoor navigation without GPS.',
      solution: 'Used visual markers and relative positioning algorithms.'
    },
  ],
  'metaverse': [
    { 
      id: 1, 
      title: 'Virtual Space', 
      description: 'Interactive virtual environment',
      images: ['/placeholder.svg', '/placeholder.svg'],
      modelUrl: '/placeholder.svg', // replace with actual 3D model when available
      technologies: ['Three.js', 'WebXR', 'JavaScript'],
      role: 'Metaverse Designer',
      duration: '2 months',
      challenge: 'Creating an immersive space that runs efficiently in browsers.',
      solution: 'Optimized assets and implemented progressive loading.'
    },
    { 
      id: 2, 
      title: 'Digital Twin', 
      description: 'Virtual replica of physical space',
      images: ['/placeholder.svg', '/placeholder.svg'],
      modelUrl: '/placeholder.svg', // replace with actual 3D model when available
      technologies: ['Unity', 'Photogrammetry', 'C#'],
      role: 'Technical Director',
      duration: '4 months',
      challenge: 'Achieving high fidelity while maintaining performance.',
      solution: 'Used LOD techniques and optimized textures.'
    },
  ],
  'nft': [
    { 
      id: 1, 
      title: 'NFT Collection', 
      description: 'Digital art collection',
      images: ['/placeholder.svg', '/placeholder.svg'],
      technologies: ['Ethereum', 'Solidity', 'IPFS'],
      role: 'Digital Artist',
      duration: '6 weeks',
      challenge: 'Creating unique art pieces with programmatic variations.',
      solution: 'Developed a custom algorithm for generating traits.'
    },
    { 
      id: 2, 
      title: 'Generative Art', 
      description: 'Algorithmic NFT artwork',
      images: ['/placeholder.svg', '/placeholder.svg'],
      technologies: ['p5.js', 'React', 'Web3.js'],
      role: 'Creative Coder',
      duration: '2 months',
      challenge: 'Balancing randomness with artistic intent.',
      solution: 'Created controlled chaos using seeded random functions.'
    },
  ],
};

const ProjectDetail: React.FC = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const works = category ? projectsData[category] : [];
  const [currentWorkIndex, setCurrentWorkIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('images');

  if (!works?.length) {
    return <div className="container-custom py-20">Project not found</div>;
  }

  const currentWork = works[currentWorkIndex];

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

      <h1 className="text-3xl md:text-4xl font-medium mb-6 text-center">
        {category?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
      </h1>

      <div className="grid md:grid-cols-12 gap-8">
        <div className="md:col-span-8">
          <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <h2 className="text-2xl font-medium mb-3">{currentWork.title}</h2>
            <p className="text-nordic-dark/70 mb-4">{currentWork.description}</p>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
              <TabsList className="mb-4">
                <TabsTrigger value="images">Images</TabsTrigger>
                {currentWork.modelUrl && (
                  <TabsTrigger value="3d-model">3D Model</TabsTrigger>
                )}
              </TabsList>
              
              <TabsContent value="images" className="focus-visible:outline-none focus-visible:ring-0">
                <Carousel className="w-full">
                  <CarouselContent>
                    {currentWork.images.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="p-1">
                          <img 
                            src={image} 
                            alt={`${currentWork.title} - Image ${index + 1}`} 
                            className="w-full h-[400px] object-cover rounded-lg"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </TabsContent>
              
              {currentWork.modelUrl && (
                <TabsContent value="3d-model" className="focus-visible:outline-none focus-visible:ring-0">
                  <div className="w-full h-[400px] rounded-lg overflow-hidden bg-nordic-gray/10">
                    <Suspense fallback={<Skeleton className="w-full h-full" />}>
                      <Canvas dpr={[1, 2]} shadows>
                        <color attach="background" args={['#f5f5f5']} />
                        <PresentationControls
                          global
                          rotation={[0, 0, 0]}
                          polar={[-Math.PI / 4, Math.PI / 4]}
                          azimuth={[-Math.PI / 4, Math.PI / 4]}
                        >
                          <Stage environment="city" intensity={0.5}>
                            <Model url={currentWork.modelUrl} />
                          </Stage>
                        </PresentationControls>
                        <OrbitControls enableZoom={true} />
                        <Environment preset="city" />
                      </Canvas>
                    </Suspense>
                    <div className="absolute bottom-2 right-2 text-xs text-nordic-dark/50">
                      Drag to rotate, scroll to zoom
                    </div>
                  </div>
                </TabsContent>
              )}
            </Tabs>
          </div>
        </div>

        <div className="md:col-span-4">
          <div className="bg-white rounded-lg p-6 shadow-sm mb-6 sticky top-20">
            <h3 className="text-xl font-medium mb-4 flex items-center gap-2">
              <Info size={18} />
              Project Details
            </h3>

            {works.length > 1 && (
              <div className="mb-6">
                <h4 className="text-sm font-medium text-nordic-dark/70 mb-2">Projects</h4>
                <div className="flex flex-wrap gap-2">
                  {works.map((work, index) => (
                    <button
                      key={work.id}
                      onClick={() => setCurrentWorkIndex(index)}
                      className={`px-3 py-1 text-sm rounded-full transition-all ${
                        currentWorkIndex === index 
                          ? 'bg-nordic-blue text-white' 
                          : 'bg-nordic-gray/20 hover:bg-nordic-gray/30'
                      }`}
                    >
                      {work.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentWork.technologies && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-nordic-dark/70 mb-2">Technologies</h4>
                <div className="flex flex-wrap gap-1">
                  {currentWork.technologies.map((tech, index) => (
                    <span key={index} className="bg-nordic-beige/50 px-2 py-1 text-xs rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {currentWork.role && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-nordic-dark/70 mb-1">Role</h4>
                <p className="text-sm">{currentWork.role}</p>
              </div>
            )}

            {currentWork.duration && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-nordic-dark/70 mb-1">Duration</h4>
                <p className="text-sm">{currentWork.duration}</p>
              </div>
            )}

            {currentWork.challenge && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-nordic-dark/70 mb-1">Challenge</h4>
                <p className="text-sm">{currentWork.challenge}</p>
              </div>
            )}

            {currentWork.solution && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-nordic-dark/70 mb-1">Solution</h4>
                <p className="text-sm">{currentWork.solution}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
