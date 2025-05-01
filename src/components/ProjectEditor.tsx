
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  fetchProjectBySlug, 
  createProject, 
  updateProject, 
  togglePublishStatus,
  fetchProjectMedia
} from '@/services/projectService';
import { uploadImage, upload3DModel } from '@/services/fileUploadService';
import { ProjectWork, ProjectMedia } from '@/types/project';
import MediaManager from './editor/MediaManager';
import { Loader2, SaveIcon, EyeIcon, BookOpenIcon } from 'lucide-react';

const ProjectEditor: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const [media, setMedia] = useState<ProjectMedia[]>([]);
  
  const [project, setProject] = useState<Partial<ProjectWork>>({
    title: '',
    description: '',
    category: '',
    slug: '',
    published: false,
    images: [],
    models: [],
    technologies: [],
    role: '',
    duration: '',
    challenge: '',
    solution: ''
  });

  // Load project data if editing an existing project
  useEffect(() => {
    const loadProject = async () => {
      if (!slug || slug === 'new') {
        setIsLoading(false);
        return;
      }
      
      try {
        const projectData = await fetchProjectBySlug(slug);
        setProject(projectData);
        
        // Load project media
        const mediaData = await fetchProjectMedia(projectData.id);
        setMedia(mediaData);
        
      } catch (error) {
        console.error('Failed to load project:', error);
        toast({
          title: "Error",
          description: "Failed to load project data.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProject();
  }, [slug]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProject(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (name: string, value: string) => {
    // Split comma-separated string into array, trim whitespace, and filter empty items
    const arrayValue = value.split(',').map(item => item.trim()).filter(item => item);
    setProject(prev => ({ ...prev, [name]: arrayValue }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setProject(prev => ({ ...prev, published: checked }));
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setProject(prev => ({ 
      ...prev, 
      title: value,
      // Only auto-generate slug for new projects or if slug is empty
      slug: (!slug || slug === 'new' || !prev.slug) ? generateSlug(value) : prev.slug
    }));
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setProject(prev => ({ ...prev, slug: generateSlug(value) }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // Validate required fields
      if (!project.title || !project.category || !project.slug) {
        toast({
          title: "Validation Error",
          description: "Title, category, and slug are required.",
          variant: "destructive"
        });
        setIsSaving(false);
        return;
      }
      
      let result: ProjectWork;
      
      if (!slug || slug === 'new') {
        // Create new project
        result = await createProject(project as Omit<ProjectWork, 'id' | 'created_at' | 'updated_at'>);
        toast({
          title: "Success",
          description: "Project created successfully."
        });
        // Redirect to edit page with the new slug
        navigate(`/edit/${result.slug}`, { replace: true });
      } else {
        // Update existing project
        result = await updateProject(project.id!, project);
        toast({
          title: "Success",
          description: "Project updated successfully."
        });
      }
      
      // Update local state with the result
      setProject(result);
      
    } catch (error) {
      console.error('Failed to save project:', error);
      toast({
        title: "Error",
        description: "Failed to save project.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!project.id) return;
    
    setIsPublishing(true);
    
    try {
      const newStatus = !project.published;
      const result = await togglePublishStatus(project.id, newStatus);
      
      setProject(prev => ({ ...prev, published: result.published }));
      
      toast({
        title: newStatus ? "Published" : "Unpublished",
        description: `Project has been ${newStatus ? 'published' : 'unpublished'}.`
      });
      
    } catch (error) {
      console.error('Failed to toggle publish status:', error);
      toast({
        title: "Error",
        description: "Failed to update publish status.",
        variant: "destructive"
      });
    } finally {
      setIsPublishing(false);
    }
  };

  const viewPublishedProject = () => {
    if (project.slug) {
      window.open(`/project/${project.slug}`, '_blank');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-80">
        <Loader2 className="animate-spin h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-medium">
          {slug === 'new' ? 'Create New Project' : 'Edit Project'}
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
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <SaveIcon className="h-4 w-4 mr-2" />}
            Save
          </Button>
          
          {project.id && (
            <>
              <Button
                variant={project.published ? "destructive" : "default"}
                onClick={handlePublish}
                disabled={isPublishing}
              >
                {isPublishing ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                {project.published ? 'Unpublish' : 'Publish'}
              </Button>
              
              {project.published && (
                <Button
                  variant="outline"
                  onClick={viewPublishedProject}
                >
                  <EyeIcon className="h-4 w-4 mr-2" />
                  View
                </Button>
              )}
            </>
          )}
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="border-b">
            <TabsList className="h-14 px-4">
              <TabsTrigger value="details" className="data-[state=active]:bg-muted px-4">Project Details</TabsTrigger>
              <TabsTrigger value="media" className="data-[state=active]:bg-muted px-4">Media</TabsTrigger>
              <TabsTrigger value="content" className="data-[state=active]:bg-muted px-4">Content</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="details" className="p-6">
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input 
                      id="title"
                      name="title"
                      value={project.title}
                      onChange={handleTitleChange}
                      placeholder="Project title"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="slug">URL Slug *</Label>
                    <Input 
                      id="slug"
                      name="slug"
                      value={project.slug}
                      onChange={handleSlugChange}
                      placeholder="project-url-slug"
                      required
                    />
                    <p className="text-sm text-muted-foreground">
                      This will be used in the URL: /project/{project.slug || 'your-slug'}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Input 
                      id="category"
                      name="category"
                      value={project.category}
                      onChange={handleChange}
                      placeholder="e.g. web-design, 3d-design"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description"
                      name="description"
                      value={project.description || ''}
                      onChange={handleChange}
                      placeholder="Brief description of the project"
                      rows={4}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="published"
                      checked={project.published}
                      onCheckedChange={handleSwitchChange}
                    />
                    <Label htmlFor="published">
                      {project.published ? 'Published (visible to public)' : 'Draft (private)'}
                    </Label>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Additional Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="technologies">Technologies (comma-separated)</Label>
                    <Input 
                      id="technologies"
                      name="technologies"
                      value={project.technologies?.join(', ') || ''}
                      onChange={(e) => handleArrayChange('technologies', e.target.value)}
                      placeholder="HTML, CSS, JavaScript"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input 
                      id="role"
                      name="role"
                      value={project.role || ''}
                      onChange={handleChange}
                      placeholder="Your role in the project"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Input 
                      id="duration"
                      name="duration"
                      value={project.duration || ''}
                      onChange={handleChange}
                      placeholder="e.g. 3 months"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="media" className="p-6">
            {project.id ? (
              <MediaManager 
                projectId={project.id} 
                initialMedia={media}
              />
            ) : (
              <div className="text-center p-8">
                <BookOpenIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Save project first</h3>
                <p className="mt-1 text-sm text-gray-500">
                  You need to save the project before adding media.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="content" className="p-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Project Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="challenge">Challenge</Label>
                    <Textarea 
                      id="challenge"
                      name="challenge"
                      value={project.challenge || ''}
                      onChange={handleChange}
                      placeholder="What challenges did you face?"
                      rows={4}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="solution">Solution</Label>
                    <Textarea 
                      id="solution"
                      name="solution"
                      value={project.solution || ''}
                      onChange={handleChange}
                      placeholder="How did you solve these challenges?"
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProjectEditor;
