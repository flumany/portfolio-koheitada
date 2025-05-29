
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProjectWork } from '@/types/project';
import { fetchProjects, deleteProject, togglePublishStatus } from '@/services/projectService';
import { Loader2, Plus, Edit, Trash2, Eye, ArrowUpDown } from 'lucide-react';

type SortOption = 'title' | 'category' | 'created_at' | 'updated_at' | 'published';
type SortOrder = 'asc' | 'desc';

const ProjectList: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<ProjectWork[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>('updated_at');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  
  useEffect(() => {
    loadProjects();
  }, []);
  
  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await fetchProjects();
      setProjects(data);
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
  
  const sortedProjects = React.useMemo(() => {
    return [...projects].sort((a, b) => {
      let aValue: any = a[sortBy];
      let bValue: any = b[sortBy];
      
      // Handle different data types
      if (sortBy === 'published') {
        aValue = a.published ? 1 : 0;
        bValue = b.published ? 1 : 0;
      } else if (sortBy === 'created_at' || sortBy === 'updated_at') {
        aValue = new Date(aValue || '').getTime();
        bValue = new Date(bValue || '').getTime();
      } else if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [projects, sortBy, sortOrder]);
  
  const handleSort = (field: SortOption) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
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
      loadProjects();
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
    try {
      await togglePublishStatus(id, !currentStatus);
      toast({
        title: "Success",
        description: `Project ${!currentStatus ? 'published' : 'unpublished'} successfully.`
      });
      loadProjects();
    } catch (error) {
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
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Sort by:</span>
            <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="category">Category</SelectItem>
                <SelectItem value="published">Status</SelectItem>
                <SelectItem value="created_at">Created Date</SelectItem>
                <SelectItem value="updated_at">Updated Date</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            >
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>
          <Button onClick={() => navigate('/edit/new')}>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>
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
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('title')}
                >
                  <div className="flex items-center gap-1">
                    Title
                    {sortBy === 'title' && (
                      <ArrowUpDown className="h-3 w-3" />
                    )}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('category')}
                >
                  <div className="flex items-center gap-1">
                    Category
                    {sortBy === 'category' && (
                      <ArrowUpDown className="h-3 w-3" />
                    )}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('published')}
                >
                  <div className="flex items-center gap-1">
                    Status
                    {sortBy === 'published' && (
                      <ArrowUpDown className="h-3 w-3" />
                    )}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('updated_at')}
                >
                  <div className="flex items-center gap-1">
                    Last Updated
                    {sortBy === 'updated_at' && (
                      <ArrowUpDown className="h-3 w-3" />
                    )}
                  </div>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.title}</TableCell>
                  <TableCell>{project.category}</TableCell>
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
                      onClick={() => handleEdit(project.slug)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    
                    {project.published && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleView(project.slug)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    )}
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleTogglePublish(project.id, project.published)}
                      className={project.published ? 'text-amber-600' : 'text-green-600'}
                    >
                      {project.published ? '📝' : '📢'}
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(project.id)}
                      className="text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
