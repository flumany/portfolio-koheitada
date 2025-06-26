
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpenIcon, Loader2 } from 'lucide-react';
import { 
  fetchProjectBySlug, 
  createProject, 
  updateProject, 
  togglePublishStatus,
  fetchProjectMedia
} from '@/services/projectService';
import { ProjectWork, ProjectMedia } from '@/types/project';
import MediaManager from './editor/MediaManager';
import ProjectEditorHeader from './editor/ProjectEditorHeader';
import BasicInfoForm from './editor/BasicInfoForm';
import AdditionalDetailsForm from './editor/AdditionalDetailsForm';
import ContentForm from './editor/ContentForm';

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
    title_en: '',
    description: '',
    description_en: '',
    category: '',
    slug: '',
    published: false,
    images: [],
    models: [],
    technologies: [],
    role: '',
    role_en: '',
    duration: '',
    challenge: '',
    challenge_en: '',
    solution: '',
    solution_en: '',
    iframes: []
  });

  const [technologiesInput, setTechnologiesInput] = useState('');
  const [embedCodeInput, setEmbedCodeInput] = useState('');
  const [figmaUrl, setFigmaUrl] = useState('');
  const [iframeList, setIframeList] = useState<string[]>([]);

  useEffect(() => {
    setTechnologiesInput((project.technologies || []).join(', '));
    setEmbedCodeInput((project.iframes || []).join('\n\n'));
    setIframeList(project.iframes || []);
  }, [project.id]);

  useEffect(() => {
    const loadProject = async () => {
      if (!slug || slug === 'new') {
        setIsLoading(false);
        return;
      }
      
      try {
        const projectData = await fetchProjectBySlug(slug);
        setProject(projectData);
        
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
      
      const techArray = technologiesInput
        .split(',')
        .map(item => item.trim())
        .filter(item => item);
        
      const embedArray = embedCodeInput
        .split('\n\n')
        .map(item => item.trim())
        .filter(item => item);
      
      if (!slug || slug === 'new') {
        result = await createProject({
          ...project,
          technologies: techArray,
          iframes: embedArray,
        } as Omit<ProjectWork, 'id' | 'created_at' | 'updated_at'>);
        toast({
          title: "Success",
          description: "Project created successfully."
        });
        navigate(`/edit/${result.slug}`, { replace: true });
      } else {
        result = await updateProject(project.id!, {
          ...project,
          technologies: techArray,
          iframes: embedArray,
        });
        toast({
          title: "Success",
          description: "Project updated successfully."
        });
      }
      
      setProject(result);
      setTechnologiesInput((result.technologies || []).join(', '));
      setEmbedCodeInput((result.iframes || []).join('\n\n'));
      setIframeList(result.iframes || []);
      
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
      <ProjectEditorHeader
        isNewProject={slug === 'new'}
        project={project}
        isSaving={isSaving}
        isPublishing={isPublishing}
        onSave={handleSave}
        onPublish={handlePublish}
        onViewProject={viewPublishedProject}
      />
      
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
            <BasicInfoForm
              project={project}
              onTitleChange={handleTitleChange}
              onSlugChange={handleSlugChange}
              onChange={handleChange}
              onSwitchChange={handleSwitchChange}
            />
            
            <AdditionalDetailsForm
              project={project}
              technologiesInput={technologiesInput}
              onTechnologiesChange={setTechnologiesInput}
              onChange={handleChange}
            />
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
            <ContentForm
              project={project}
              figmaUrl={figmaUrl}
              embedCodeInput={embedCodeInput}
              iframeList={iframeList}
              onFigmaUrlChange={setFigmaUrl}
              onEmbedCodeChange={setEmbedCodeInput}
              onIframeListUpdate={setIframeList}
              onChange={handleChange}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProjectEditor;
