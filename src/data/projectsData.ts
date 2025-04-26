
import { ProjectData } from '../types/project';

export const projectsData: ProjectData = {
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
      description: 'Photorealistic 3D renderings for product marketing and presentations',
      images: [
        '/placeholder.svg',
        '/placeholder.svg',
        'https://images.unsplash.com/photo-1483058712412-4245e9b90334'
      ],
      models: ['/placeholder.svg', '/placeholder.svg'], // Multiple 3D models
      technologies: ['Blender', 'Cinema 4D', 'KeyShot', 'Substance Painter'],
      role: '3D Artist & Product Visualizer',
      duration: '3 weeks per product line',
      challenge: 'Achieving photorealistic materials and lighting while maintaining fast render times for client revisions.',
      solution: 'Used physically-based rendering techniques with HDRI lighting and optimized material workflows.'
    },
    { 
      id: 2, 
      title: 'Character Design', 
      description: 'Stylized 3D character modeling and rigging for animation and games',
      images: [
        '/placeholder.svg',
        'https://images.unsplash.com/photo-1527576539890-dfa815648363',
        '/placeholder.svg'
      ],
      models: ['/placeholder.svg', '/placeholder.svg'], // Multiple 3D models
      technologies: ['ZBrush', 'Maya', 'Substance Painter', 'Marvelous Designer'],
      role: 'Character Artist & Rigger',
      duration: '2 months',
      challenge: 'Creating expressive and animatable characters with efficient topology for game engines.',
      solution: 'Developed a modular character system with detailed sculpts and optimized topology for real-time applications.'
    },
    { 
      id: 3, 
      title: 'Architectural Visualization', 
      description: 'Immersive 3D architectural environments and walkthroughs',
      images: [
        '/placeholder.svg',
        'https://images.unsplash.com/photo-1487887235947-a955ef187fcc',
        '/placeholder.svg'
      ],
      models: ['/placeholder.svg'],
      technologies: ['3ds Max', 'V-Ray', 'Corona Renderer', 'Unreal Engine'],
      role: 'Architectural Visualizer',
      duration: '6 weeks',
      challenge: 'Creating photorealistic architectural visualizations that accurately represent the final built structure.',
      solution: 'Combined precise CAD data with advanced lighting techniques and environmental details to achieve photorealism.'
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
