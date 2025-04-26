
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PresentationControls, useGLTF, Environment, Stage } from '@react-three/drei';
import { Skeleton } from "@/components/ui/skeleton";

interface ModelViewerProps {
  modelUrl: string;
}

// Model component for 3D viewer
const Model = ({ url }: { url: string }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1} />;
};

const ModelViewer3D: React.FC<ModelViewerProps> = ({ modelUrl }) => {
  return (
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
              <Model url={modelUrl} />
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
  );
};

export default ModelViewer3D;
