
import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PresentationControls, useGLTF, Environment, Stage } from '@react-three/drei';
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ModelViewerProps {
  modelUrl?: string;
  models?: string[];
}

// Model component for 3D viewer
const Model = ({ url }: { url: string }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1} />;
};

const ModelViewer3D: React.FC<ModelViewerProps> = ({ modelUrl, models }) => {
  const [currentModel, setCurrentModel] = useState(0);
  const modelUrls = models || (modelUrl ? [modelUrl] : []);
  
  if (modelUrls.length === 0) {
    return <div className="w-full h-[400px] flex items-center justify-center bg-nordic-gray/10 rounded-lg">
      <p>No 3D models available</p>
    </div>;
  }
  
  return (
    <div className="w-full">
      {modelUrls.length > 1 && (
        <div className="mb-4">
          <Select 
            value={currentModel.toString()} 
            onValueChange={(value) => setCurrentModel(parseInt(value))}
          >
            <SelectTrigger className="w-full sm:w-[240px]">
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              {modelUrls.map((_, index) => (
                <SelectItem key={index} value={index.toString()}>
                  Model {index + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      
      <div className="w-full h-[400px] relative rounded-lg overflow-hidden bg-nordic-gray/10">
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
                <Model url={modelUrls[currentModel]} />
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
    </div>
  );
};

export default ModelViewer3D;
