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
  getCategoryOrder,
  updateProject
} from '@/services/projectService';
import { Loader2, Plus } from 'lucide-react';
import CategoryGroup from './CategoryGroup';

const ProjectList: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<ProjectWork[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryOrder, setCategoryOrder] = useState<string[]>([]);
  
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

  const handleMoveCategoryUp = async (categoryIndex: number) => {
    if (categoryIndex === 0) return;
    
    const newCategoryOrder = [...categoryOrder];
    [newCategoryOrder[categoryIndex - 1], newCategoryOrder[categoryIndex]] = 
    [newCategoryOrder[categoryIndex], newCategoryOrder[categoryIndex - 1]];
    
    setCategoryOrder(newCategoryOrder);
    
    try {
      await updateCategoryOrder(newCategoryOrder);
      console.log('Category moved up successfully');
      toast({
        title: "Success",
        description: "Category order updated successfully."
      });
    } catch (error) {
      console.error('Error updating category order:', error);
      setCategoryOrder(categoryOrder); // Revert on error
      toast({
        title: "Error",
        description: `Failed to update category order: ${error.message || 'Unknown error'}`,
        variant: "destructive"
      });
    }
  };

  const handleMoveCategoryDown = async (categoryIndex: number) => {
    if (categoryIndex === categoryOrder.length - 1) return;
    
    const newCategoryOrder = [...categoryOrder];
    [newCategoryOrder[categoryIndex], newCategoryOrder[categoryIndex + 1]] = 
    [newCategoryOrder[categoryIndex + 1], newCategoryOrder[categoryIndex]];
    
    setCategoryOrder(newCategoryOrder);
    
    try {
      await updateCategoryOrder(newCategoryOrder);
      console.log('Category moved down successfully');
      toast({
        title: "Success",
        description: "Category order updated successfully."
      });
    } catch (error) {
      console.error('Error updating category order:', error);
      setCategoryOrder(categoryOrder); // Revert on error
      toast({
        title: "Error",
        description: `Failed to update category order: ${error.message || 'Unknown error'}`,
        variant: "destructive"
      });
    }
  };

  const handleMoveProjectUp = async (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    const categoryProjects = projects
      .filter(p => p.category === project.category)
      .sort((a, b) => (a.display_order || 0) - (b.display_order || 0));

    const currentIndex = categoryProjects.findIndex(p => p.id === projectId);
    if (currentIndex === 0) return;

    // Swap positions
    const newOrder = [...categoryProjects];
    [newOrder[currentIndex - 1], newOrder[currentIndex]] = 
    [newOrder[currentIndex], newOrder[currentIndex - 1]];

    // Update local state optimistically
    const updatedProjects = projects.map(p => {
      const orderIndex = newOrder.findIndex(np => np.id === p.id);
      if (orderIndex !== -1) {
        return { ...p, display_order: orderIndex };
      }
      return p;
    });

    setProjects(updatedProjects);

    try {
      await updateProjectOrderInCategory(newOrder.map(p => p.id));
      toast({
        title: "Success",
        description: "Project order updated successfully."
      });
    } catch (error) {
      console.error('Error updating project order:', error);
      setProjects(projects);
      toast({
        title: "Error",
        description: "Failed to update project order.",
        variant: "destructive"
      });
    }
  };

  const handleMoveProjectDown = async (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    const categoryProjects = projects
      .filter(p => p.category === project.category)
      .sort((a, b) => (a.display_order || 0) - (b.display_order || 0));

    const currentIndex = categoryProjects.findIndex(p => p.id === projectId);
    if (currentIndex === categoryProjects.length - 1) return;

    // Swap positions
    const newOrder = [...categoryProjects];
    [newOrder[currentIndex], newOrder[currentIndex + 1]] = 
    [newOrder[currentIndex + 1], newOrder[currentIndex]];

    // Update local state optimistically
    const updatedProjects = projects.map(p => {
      const orderIndex = newOrder.findIndex(np => np.id === p.id);
      if (orderIndex !== -1) {
        return { ...p, display_order: orderIndex };
      }
      return p;
    });

    setProjects(updatedProjects);

    try {
      await updateProjectOrderInCategory(newOrder.map(p => p.id));
      toast({
        title: "Success",
        description: "Project order updated successfully."
      });
    } catch (error) {
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
        <div className="space-y-8">
          {groupedProjects.map((group, categoryIndex) => (
            <CategoryGroup
              key={group.category}
              category={group.category}
              projects={group.projects}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onTogglePublish={handleTogglePublish}
              onView={handleView}
              onMoveCategoryUp={() => handleMoveCategoryUp(categoryIndex)}
              onMoveCategoryDown={() => handleMoveCategoryDown(categoryIndex)}
              onMoveProjectUp={handleMoveProjectUp}
              onMoveProjectDown={handleMoveProjectDown}
              canMoveCategoryUp={categoryIndex > 0}
              canMoveCategoryDown={categoryIndex < groupedProjects.length - 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectList;
