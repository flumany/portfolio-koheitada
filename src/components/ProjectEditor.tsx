
import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useProjectEditor } from '@/hooks/useProjectEditor';
import ProjectEditorHeader from './editor/ProjectEditorHeader';
import ProjectEditorTabs from './editor/ProjectEditorTabs';

const ProjectEditor: React.FC = () => {
  const [activeTab, setActiveTab] = useState('details');
  
  const {
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
  } = useProjectEditor();

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
      
      <ProjectEditorTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        project={project}
        media={media}
        technologiesInput={technologiesInput}
        onTechnologiesChange={setTechnologiesInput}
        embedCodeInput={embedCodeInput}
        onEmbedCodeChange={setEmbedCodeInput}
        figmaUrl={figmaUrl}
        onFigmaUrlChange={setFigmaUrl}
        iframeList={iframeList}
        onIframeListUpdate={setIframeList}
        onTitleChange={handleTitleChange}
        onSlugChange={handleSlugChange}
        onChange={handleChange}
        onSwitchChange={handleSwitchChange}
      />
    </div>
  );
};

export default ProjectEditor;
