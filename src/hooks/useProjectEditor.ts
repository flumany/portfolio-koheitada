import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "@/components/ui/use-toast";
import { 
  fetchProjectBySlug, 
  createProject, 
  updateProject, 
  togglePublishStatus,
  fetchProjectMedia
} from '@/services/projectService';
import { ProjectWork, ProjectMedia } from '@/types/project';

export const useProjectEditor = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
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
    work_type: '',
    work_type_en: '',
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

  return {
    slug,
    isLoading,
    isSaving,
    isPublishing,
    media,
    project,
    technologiesInput,
    setTechnologiesInput,
    embedCodeInput,
    setEmbedCodeInput,
    figmaUrl,
    setFigmaUrl,
    iframeList,
    setIframeList,
    handleChange,
    handleSwitchChange,
    handleTitleChange,
    handleSlugChange,
    handleSave,
    handlePublish,
    viewPublishedProject
  };
};
