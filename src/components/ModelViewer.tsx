
import React, { useState } from 'react';

interface Model {
  id: number;
  title: string;
  thumbnail: string;
  description: string;
}

const ModelViewer: React.FC = () => {
  const models: Model[] = [
    {
      id: 1,
      title: "Wooden Chair",
      thumbnail: "/placeholder.svg",
      description: "Minimalist wooden chair with ergonomic design"
    },
    {
      id: 2,
      title: "Pendant Lamp",
      thumbnail: "/placeholder.svg",
      description: "Simple pendant lamp with natural materials"
    },
    {
      id: 3,
      title: "Coffee Table",
      thumbnail: "/placeholder.svg",
      description: "Low profile coffee table with light wood finish"
    }
  ];

  const [activeModel, setActiveModel] = useState<Model>(models[0]);

  return (
    <section id="models" className="section bg-nordic-offwhite">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-medium mb-4">3D Models</h2>
          <div className="w-16 h-1 bg-nordic-blue mx-auto mb-8" />
          <p className="text-nordic-dark/70">
            Explore my 3D design work with this simple viewer.
            <span className="block mt-2 text-sm italic">
              Note: Full 3D viewer functionality will be implemented with Supabase integration.
            </span>
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-8">
          {/* Model Viewer - Placeholder for actual 3D viewer */}
          <div className="md:col-span-8 bg-white rounded-lg shadow-sm p-4 min-h-[400px] flex flex-col">
            <div className="flex-1 bg-nordic-gray/20 rounded-md flex items-center justify-center">
              {/* This will be replaced with a real 3D viewer */}
              <div className="text-center p-8">
                <img 
                  src={activeModel.thumbnail} 
                  alt={activeModel.title}
                  className="max-h-[300px] mx-auto"
                />
                <p className="mt-4 text-sm text-nordic-dark/70">
                  Full 3D viewer will be integrated in the next update
                </p>
              </div>
            </div>
            <div className="pt-4">
              <h3 className="text-xl font-medium">{activeModel.title}</h3>
              <p className="text-nordic-dark/70">{activeModel.description}</p>
            </div>
          </div>

          {/* Model Selection */}
          <div className="md:col-span-4">
            <h3 className="text-lg font-medium mb-4">Models</h3>
            <div className="space-y-3">
              {models.map(model => (
                <button
                  key={model.id}
                  onClick={() => setActiveModel(model)}
                  className={`w-full text-left p-4 rounded-md transition-all ${
                    activeModel.id === model.id 
                      ? 'bg-nordic-blue bg-opacity-20 border-l-4 border-nordic-blue' 
                      : 'bg-white hover:bg-nordic-gray/10'
                  }`}
                >
                  <h4 className="font-medium">{model.title}</h4>
                  <p className="text-sm text-nordic-dark/70 mt-1">{model.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModelViewer;
