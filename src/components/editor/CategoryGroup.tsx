
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProjectWork } from '@/types/project';
import SortableProjectRow from './SortableProjectRow';
import { GripVertical } from 'lucide-react';

interface CategoryGroupProps {
  category: string;
  projects: ProjectWork[];
  onEdit: (slug: string) => void;
  onDelete: (id: string) => void;
  onTogglePublish: (id: string, currentStatus: boolean) => void;
  onView: (slug: string) => void;
}

const CategoryGroup: React.FC<CategoryGroupProps> = ({
  category,
  projects,
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
  } = useSortable({ id: category });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style}
      className={`bg-white border rounded-lg overflow-hidden ${isDragging ? 'shadow-lg' : 'shadow'}`}
    >
      <div className="bg-gray-50 px-4 py-3 border-b flex items-center gap-3">
        <div 
          {...attributes} 
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-200 rounded"
        >
          <GripVertical className="h-4 w-4 text-gray-500" />
        </div>
        <h3 className="text-lg font-medium capitalize">
          {category.replace('-', ' ')} ({projects.length})
        </h3>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <SortableProjectRow
              key={project.id}
              project={project}
              onEdit={onEdit}
              onDelete={onDelete}
              onTogglePublish={onTogglePublish}
              onView={onView}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CategoryGroup;
