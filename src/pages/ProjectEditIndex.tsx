
import React from 'react';
import ProjectList from '@/components/editor/ProjectList';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const ProjectEditIndex: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container-custom py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-medium">Project Editor</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/')}>
            Back to Home
          </Button>
          <Button
            variant="ghost"
            onClick={async () => {
              await supabase.auth.signOut();
              navigate('/auth');
            }}
          >
            ログアウト
          </Button>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <ProjectList />
      </div>
    </div>
  );
};

export default ProjectEditIndex;
