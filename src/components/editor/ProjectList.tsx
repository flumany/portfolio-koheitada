import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ProjectWork } from '@/types/project';
import { 
  fetchProjectsWithOrder, 
  deleteProject, 
  togglePublishStatus, 
  updateProjectOrderInCategory,
  updateCategoryOrder,
  getCategoryOrder
} from '@/services/projectService';
import { Loader2, Plus } from 'lucide-react';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import CategoryGroup from './CategoryGroup';

const ProjectList: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<ProjectWork[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryOrder, setCategoryOrder] = useState<string[]>([]);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  
  useEffect(() => {
    loadProjectsAndCategories();
  }, []);
  
  const loadProjectsAndCategories = async () => {
    setLoading(true);
    try {
      console.log('Loading projects and categories...');
      const [projectsData, categoryOrderData] = await Promise.all([
        fetchProjectsWithOrder(),
        getCategoryOrder()
      ]);
      
      console.log('Projects loaded:', projectsData);
      console.log('Category order loaded:', categoryOrderData);
      
      setProjects(projectsData);
      
      // Get current categories from projects
      const currentCategories = [...new Set(projectsData.map(p => p.category))];
      console.log('Current categories:', currentCategories);
      
      // Merge with saved order, putting new categories at the end
      const mergedOrder = [
        ...categoryOrderData.filter(cat => currentCategories.includes(cat)),
        ...currentCategories.filter(cat => !categoryOrderData.includes(cat))
      ];
      
      console.log('Merged category order:', mergedOrder);
      setCategoryOrder(mergedOrder);
    } catch (error) {
      console.error('Error loading projects:', error);
      toast({
        title: "Error",
        description: "Failed to load projects.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Memoize grouped projects to ensure consistent updates
  const groupedProjects = useMemo(() => {
    return categoryOrder.map(category => ({
      category,
      projects: projects
        .filter(project => project.category === category)
        .sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
    })).filter(group => group.projects.length > 0);
  }, [categoryOrder, projects]);
  
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    console.log('Drag ended:', { activeId, overId });

    // Check if we're dragging categories
    if (categoryOrder.includes(activeId) && categoryOrder.includes(overId)) {
      console.log('Reordering categories');
      const oldIndex = categoryOrder.indexOf(activeId);
      const newIndex = categoryOrder.indexOf(overId);
      const newCategoryOrder = arrayMove(categoryOrder, oldIndex, newIndex);
      
      // Update state immediately for UI feedback (optimistic update)
      setCategoryOrder(newCategoryOrder);
      
      try {
        console.log('Saving new category order:', newCategoryOrder);
        await updateCategoryOrder(newCategoryOrder);
        console.log('Category order saved successfully');
        toast({
          title: "Success",
          description: "Category order updated successfully."
        });
      } catch (error) {
        console.error('Error updating category order:', error);
        // Revert on error
        setCategoryOrder(categoryOrder);
        toast({
          title: "Error",
          description: "Failed to update category order.",
          variant: "destructive"
        });
      }
      return;
    }

    // Handle project reordering within categories
    const activeProject = projects.find(p => p.id === activeId);
    const overProject = projects.find(p => p.id === overId);
    
    if (!activeProject) {
      console.log('Active project not found');
      return;
    }

    // If dropping over a category, move to end of that category
    if (categoryOrder.includes(overId)) {
      console.log('Moving project to category:', overId);
      const targetCategory = overId;
      
      if (activeProject.category === targetCategory) return; // Same category, no change needed
      
      const categoryProjects = projects.filter(p => p.category === targetCategory);
      const newOrder = categoryProjects.length;
      
      // Optimistic update: Update project category and order immediately
      const updatedProjects = projects.map(p => {
        if (p.id === activeProject.id) {
          return { ...p, category: targetCategory, display_order: newOrder };
        }
        return p;
      });
      
      console.log('Optimistic update - moving project to new category');
      setProjects(updatedProjects);
      
      try {
        await updateProjectOrderInCategory([...categoryProjects.map(p => p.id), activeProject.id]);
        console.log('Project moved successfully');
        toast({
          title: "Success",
          description: "Project moved successfully."
        });
      } catch (error) {
        // Revert on error
        console.error('Error moving project:', error);
        setProjects(projects);
        toast({
          title: "Error",
          description: "Failed to move project.",
          variant: "destructive"
        });
      }
      return;
    }

    if (!overProject) {
      console.log('Over project not found');
      return;
    }

    // Only allow reordering within the same category for project-to-project drops
    if (activeProject.category !== overProject.category) {
      console.log('Cannot reorder projects across categories');
      return;
    }

    console.log('Reordering projects within category:', activeProject.category);
    const categoryProjects = projects.filter(p => p.category === activeProject.category);
    const oldIndex = categoryProjects.findIndex(p => p.id === activeId);
    const newIndex = categoryProjects.findIndex(p => p.id === overId);
    
    if (oldIndex === -1 || newIndex === -1) return;
    
    const reorderedProjects = arrayMove(categoryProjects, oldIndex, newIndex);
    
    // Optimistic update: Update projects with new display_order immediately
    const updatedProjects = projects.map(project => {
      if (project.category === activeProject.category) {
        const reorderedIndex = reorderedProjects.findIndex(p => p.id === project.id);
        if (reorderedIndex !== -1) {
          return { ...project, display_order: reorderedIndex };
        }
      }
      return project;
    });
    
    console.log('Optimistic update - reordering within category');
    setProjects(updatedProjects);

    try {
      console.log('Saving project order:', reorderedProjects.map(p => p.id));
      await updateProjectOrderInCategory(reorderedProjects.map(p => p.id));
      console.log('Project order saved successfully');
      toast({
        title: "Success",
        description: "Project order updated successfully."
      });
    } catch (error) {
      // Revert on error
      console.error('Error updating project order:', error);
      setProjects(projects);
      toast({
        title: "Error",
        description: "Failed to update project order.",
        variant: "destructive"
      });
    }
  };
  
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      return;
    }
    
    try {
      await deleteProject(id);
      toast({
        title: "Success",
        description: "Project deleted successfully."
      });
      // Reload projects after delete to ensure consistency
      loadProjectsAndCategories();
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        title: "Error",
        description: "Failed to delete project.",
        variant: "destructive"
      });
    }
  };
  
  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    // Optimistic update: Update local state immediately
    setProjects(prevProjects => 
      prevProjects.map(project => 
        project.id === id 
          ? { ...project, published: !currentStatus }
          : project
      )
    );
    
    try {
      await togglePublishStatus(id, !currentStatus);
      toast({
        title: "Success",
        description: `Project ${!currentStatus ? 'published' : 'unpublished'} successfully.`
      });
    } catch (error) {
      // Revert on error
      setProjects(prevProjects => 
        prevProjects.map(project => 
          project.id === id 
            ? { ...project, published: currentStatus }
            : project
        )
      );
      console.error('Error toggling publish status:', error);
      toast({
        title: "Error",
        description: "Failed to update publish status.",
        variant: "destructive"
      });
    }
  };
  
  const handleEdit = (slug: string) => {
    navigate(`/edit/${slug}`);
  };
  
  const handleView = (slug: string) => {
    window.open(`/project/${slug}`, '_blank');
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-80">
        <Loader2 className="animate-spin h-8 w-8" />
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">Projects</h2>
        <Button onClick={() => navigate('/edit/new')}>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>
      
      {projects.length === 0 ? (
        <div className="text-center py-8 border rounded-lg">
          <h3 className="text-lg font-medium">No projects yet</h3>
          <p className="text-gray-500 mt-1">Create your first project to get started</p>
          <Button className="mt-4" onClick={() => navigate('/edit/new')}>
            <Plus className="mr-2 h-4 w-4" />
            Create Project
          </Button>
        </div>
      ) : (
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext 
            items={categoryOrder}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-8">
              {groupedProjects.map((group) => (
                <CategoryGroup
                  key={group.category}
                  category={group.category}
                  projects={group.projects}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onTogglePublish={handleTogglePublish}
                  onView={handleView}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
};

export default ProjectList;
