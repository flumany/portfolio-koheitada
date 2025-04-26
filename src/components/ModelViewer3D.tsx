
import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PresentationControls, useGLTF, Environment, Stage } from '@react-three/drei';
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ModelViewerProps {
  modelUrl?: string;
  models?: string[];
}

// Helper function to check if URL is a valid 3D model format
const is3DModelFormat = (url: string): boolean => {
  const validExtensions = ['.glb', '.gltf', '.fbx', '.obj', '.stl', '.usdz'];
  return validExtensions.some(ext => url.toLowerCase().endsWith(ext));
};

// Model component for 3D viewer
const Model = ({ url }: { url: string }) => {
  // Only try to load the model if it's a valid 3D format
  if (!is3DModelFormat(url)) {
    console.warn(`Skipping invalid 3D model format: ${url}`);
    return null;
  }
  
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1} />;
};

const ModelViewer3D: React.FC<ModelViewerProps> = ({ modelUrl, models }) => {
  const [currentModel, setCurrentModel] = useState(0);
  
  // Filter only valid 3D model formats
  const validModels = (models || [])
    .filter(url => is3DModelFormat(url))
    .concat(modelUrl && is3DModelFormat(modelUrl) ? [modelUrl] : []);
  
  if (validModels.length === 0) {
    return <div className="w-full h-[400px] flex items-center justify-center bg-nordic-gray/10 rounded-lg">
      <p>No valid 3D models available</p>
    </div>;
  }
  
  return (
    <div className="w-full">
      {validModels.length > 1 && (
        <div className="mb-4">
          <Select 
            value={currentModel.toString()} 
            onValueChange={(value) => setCurrentModel(parseInt(value))}
          >
            <SelectTrigger className="w-full sm:w-[240px]">
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              {validModels.map((_, index) => (
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
                <Model url={validModels[currentModel]} />
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
