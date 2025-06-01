
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProjectWork } from '@/types/project';
import { 
  Pencil, 
  Trash2, 
  Eye, 
  ChevronUp, 
  ChevronDown 
} from 'lucide-react';

interface SortableProjectRowProps {
  project: ProjectWork;
  onEdit: (slug: string) => void;
  onDelete: (id: string) => void;
  onTogglePublish: (id: string, currentStatus: boolean) => void;
  onView: (slug: string) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
}

const SortableProjectRow: React.FC<SortableProjectRowProps> = ({
  project,
  onEdit,
  onDelete,
  onTogglePublish,
  onView,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown,
}) => {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
      <div className="flex items-center gap-4">
        <div className="flex flex-col gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={onMoveUp}
            disabled={!canMoveUp}
            className="p-1 h-7 w-7"
          >
            <ChevronUp className="h-3 w-3" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onMoveDown}
            disabled={!canMoveDown}
            className="p-1 h-7 w-7"
          >
            <ChevronDown className="h-3 w-3" />
          </Button>
        </div>
        
        <div>
          <h3 className="font-medium">{project.title}</h3>
          <p className="text-sm text-gray-500">{project.description}</p>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant={project.published ? "default" : "secondary"}>
              {project.published ? 'Published' : 'Draft'}
            </Badge>
            <span className="text-xs text-gray-400">/{project.slug}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(project.slug)}
        >
          <Pencil className="h-4 w-4" />
        </Button>
        
        <Button
          variant={project.published ? "destructive" : "default"}
          size="sm"
          onClick={() => onTogglePublish(project.id, project.published)}
        >
          {project.published ? 'Unpublish' : 'Publish'}
        </Button>
        
        {project.published && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onView(project.slug)}
          >
            <Eye className="h-4 w-4" />
          </Button>
        )}
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDelete(project.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default SortableProjectRow;
