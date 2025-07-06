
import { useParams } from 'react-router-dom';
import { useProjectState } from './project-editor/useProjectState';
import { useProjectHandlers } from './project-editor/useProjectHandlers';
import { useProjectOperations } from './project-editor/useProjectOperations';
import { useProjectLoader } from './project-editor/useProjectLoader';

export const useProjectEditor = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const {
    project,
    setProject,
    technologiesInput,
    setTechnologiesInput,
    embedCodeInput,
    setEmbedCodeInput,
    figmaUrl,
    setFigmaUrl,
    iframeList,
    setIframeList
  } = useProjectState();

  const {
    handleChange,
    handleSwitchChange,
    handleTitleChange,
    handleSlugChange
  } = useProjectHandlers({ project, setProject, slug });

  const {
    isSaving,
    isPublishing,
    handleSave,
    handlePublish,
    viewPublishedProject
  } = useProjectOperations({
    slug,
    project,
    setProject,
    technologiesInput,
    embedCodeInput,
    setTechnologiesInput,
    setEmbedCodeInput,
    setIframeList
  });

  const {
    isLoading,
    media
  } = useProjectLoader({
    slug,
    setProject,
    setTechnologiesInput,
    setEmbedCodeInput,
    setIframeList,
    project
  });

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
