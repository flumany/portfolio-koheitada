
import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PresentationControls, useGLTF, Environment, Stage } from '@react-three/drei';
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface ModelViewerProps {
  modelUrl?: string;
  models?: string[];
}

// Helper function to check if URL is a valid 3D model format
const is3DModelFormat = (url: string): boolean => {
  const validExtensions = ['.glb', '.gltf', '.fbx', '.obj', '.stl', '.usdz'];
  return validExtensions.some(ext => url.toLowerCase().endsWith(ext));
};

// Model component for 3D viewer with error handling
const Model = ({ url }: { url: string }) => {
  const [error, setError] = useState<string | null>(null);
  
  // Only try to load the model if it's a valid 3D format
  if (!is3DModelFormat(url)) {
    console.warn(`Skipping invalid 3D model format: ${url}`);
    return null;
  }
  
  try {
    const { scene } = useGLTF(url, undefined, undefined, 
      (error) => {
        console.error('Error loading model:', error);
        setError(`Failed to load model: ${error.message}`);
      }
    );
    
    if (error) {
      return null;
    }
    
    return <primitive object={scene} scale={1} />;
  } catch (err) {
    console.error('Error in Model component:', err);
    return null;
  }
};

const ModelViewer3D: React.FC<ModelViewerProps> = ({ modelUrl, models }) => {
  const [currentModel, setCurrentModel] = useState(0);
  const [loadErrors, setLoadErrors] = useState<{[url: string]: boolean}>({});
  
  // Filter only valid 3D model formats
  const validModels = (models || [])
    .filter(url => is3DModelFormat(url))
    .filter(url => !loadErrors[url])
    .concat(modelUrl && is3DModelFormat(modelUrl) && !loadErrors[modelUrl] ? [modelUrl] : []);
  
  // Effect to pre-check models by making HEAD requests
  useEffect(() => {
    const checkModelUrls = async () => {
      const errors: {[url: string]: boolean} = {};
      
      const allModels = [...(models || [])];
      if (modelUrl) allModels.push(modelUrl);
      
      for (const url of allModels) {
        if (is3DModelFormat(url)) {
          try {
            const response = await fetch(url, { method: 'HEAD' });
            if (!response.ok) {
              console.warn(`Model not available: ${url}`);
              errors[url] = true;
            }
          } catch (e) {
            console.warn(`Error checking model: ${url}`, e);
            errors[url] = true;
          }
        }
      }
      
      setLoadErrors(errors);
    };
    
    checkModelUrls();
  }, [modelUrl, models]);
  
  if (validModels.length === 0) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center bg-nordic-gray/10 rounded-lg flex-col gap-2">
        <AlertCircle className="h-8 w-8 text-amber-500" />
        <p>No valid 3D models available</p>
      </div>
    );
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
