
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye, GripVertical } from 'lucide-react';
import { ProjectWork } from '@/types/project';

interface SortableProjectRowProps {
  project: ProjectWork;
  onEdit: (slug: string) => void;
  onDelete: (id: string) => void;
  onTogglePublish: (id: string, currentStatus: boolean) => void;
  onView: (slug: string) => void;
}

const SortableProjectRow: React.FC<SortableProjectRowProps> = ({
  project,
  onEdit,
  onDelete,
  onTogglePublish,
  onView
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <TableRow 
      ref={setNodeRef} 
      style={style}
      className={isDragging ? 'bg-muted/50' : ''}
    >
      <TableCell>
        <div className="flex items-center gap-2">
          <div 
            {...attributes} 
            {...listeners}
            className="cursor-grab active:cursor-grabbing p-1 hover:bg-muted rounded"
          >
            <GripVertical className="h-4 w-4 text-muted-foreground" />
          </div>
          <span className="font-medium">{project.title}</span>
        </div>
      </TableCell>
      <TableCell>
        <span 
          className={`px-2 py-1 text-xs rounded-full ${
            project.published 
              ? 'bg-green-100 text-green-800' 
              : 'bg-amber-100 text-amber-800'
          }`}
        >
          {project.published ? 'Published' : 'Draft'}
        </span>
      </TableCell>
      <TableCell>
        {new Date(project.updated_at!).toLocaleDateString()}
      </TableCell>
      <TableCell className="text-right space-x-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onEdit(project.slug)}
        >
          <Edit className="h-4 w-4" />
        </Button>
        
        {project.published && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onView(project.slug)}
          >
            <Eye className="h-4 w-4" />
          </Button>
        )}
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onTogglePublish(project.id, project.published)}
          className={project.published ? 'text-amber-600' : 'text-green-600'}
        >
          {project.published ? '📝' : '📢'}
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(project.id)}
          className="text-red-600"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default SortableProjectRow;
