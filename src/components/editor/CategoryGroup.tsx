
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectWork } from '@/types/project';
import { ChevronUp, ChevronDown } from 'lucide-react';
import SortableProjectRow from './SortableProjectRow';

interface CategoryGroupProps {
  category: string;
  projects: ProjectWork[];
  onEdit: (slug: string) => void;
  onDelete: (id: string) => void;
  onTogglePublish: (id: string, currentStatus: boolean) => void;
  onView: (slug: string) => void;
  onMoveCategoryUp: () => void;
  onMoveCategoryDown: () => void;
  onMoveProjectUp: (projectId: string) => void;
  onMoveProjectDown: (projectId: string) => void;
  canMoveCategoryUp: boolean;
  canMoveCategoryDown: boolean;
}

const CategoryGroup: React.FC<CategoryGroupProps> = ({
  category,
  projects,
  onEdit,
  onDelete,
  onTogglePublish,
  onView,
  onMoveCategoryUp,
  onMoveCategoryDown,
  onMoveProjectUp,
  onMoveProjectDown,
  canMoveCategoryUp,
  canMoveCategoryDown,
}) => {
  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium capitalize">
            {category.replace('-', ' ')}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onMoveCategoryUp}
              disabled={!canMoveCategoryUp}
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onMoveCategoryDown}
              disabled={!canMoveCategoryDown}
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {projects.map((project, index) => (
            <SortableProjectRow
              key={project.id}
              project={project}
              onEdit={onEdit}
              onDelete={onDelete}
              onTogglePublish={onTogglePublish}
              onView={onView}
              onMoveUp={() => onMoveProjectUp(project.id)}
              onMoveDown={() => onMoveProjectDown(project.id)}
              canMoveUp={index > 0}
              canMoveDown={index < projects.length - 1}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryGroup;
