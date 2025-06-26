
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Loader2, SaveIcon, EyeIcon } from 'lucide-react';
import { ProjectWork } from '@/types/project';

interface ProjectEditorHeaderProps {
  isNewProject: boolean;
  project: Partial<ProjectWork>;
  isSaving: boolean;
  isPublishing: boolean;
  onSave: () => void;
  onPublish: () => void;
  onViewProject: () => void;
}

const ProjectEditorHeader: React.FC<ProjectEditorHeaderProps> = ({
  isNewProject,
  project,
  isSaving,
  isPublishing,
  onSave,
  onPublish,
  onViewProject
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl md:text-3xl font-medium">
        {isNewProject ? 'Create New Project' : 'Edit Project'}
      </h1>
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          onClick={() => navigate('/edit')}
        >
          Back to Projects
        </Button>
        
        <Button
          variant="outline"
          onClick={onSave}
          disabled={isSaving}
        >
          {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <SaveIcon className="h-4 w-4 mr-2" />}
          Save
        </Button>
        
        {project.id && (
          <>
            <Button
              variant={project.published ? "destructive" : "default"}
              onClick={onPublish}
              disabled={isPublishing}
            >
              {isPublishing ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              {project.published ? 'Unpublish' : 'Publish'}
            </Button>
            
            {project.published && (
              <Button
                variant="outline"
                onClick={onViewProject}
              >
                <EyeIcon className="h-4 w-4 mr-2" />
                View
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectEditorHeader;
