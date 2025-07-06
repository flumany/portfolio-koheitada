
import { useCallback } from 'react';
import { ProjectWork } from '@/types/project';

interface UseProjectHandlersProps {
  project: Partial<ProjectWork>;
  setProject: React.Dispatch<React.SetStateAction<Partial<ProjectWork>>>;
  slug?: string;
}

export const useProjectHandlers = ({ project, setProject, slug }: UseProjectHandlersProps) => {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProject(prev => ({ ...prev, [name]: value }));
  }, [setProject]);

  const handleSwitchChange = useCallback((checked: boolean) => {
    setProject(prev => ({ ...prev, published: checked }));
  }, [setProject]);

  const generateSlug = useCallback((title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
  }, []);

  const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setProject(prev => ({ 
      ...prev, 
      title: value,
      slug: (!slug || slug === 'new' || !prev.slug) ? generateSlug(value) : prev.slug
    }));
  }, [setProject, slug, generateSlug]);

  const handleSlugChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setProject(prev => ({ ...prev, slug: generateSlug(value) }));
  }, [setProject, generateSlug]);

  return {
    handleChange,
    handleSwitchChange,
    handleTitleChange,
    handleSlugChange
  };
};
