
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpenIcon } from 'lucide-react';
import { ProjectWork, ProjectMedia } from '@/types/project';
import MediaManager from './MediaManager';
import BasicInfoForm from './BasicInfoForm';
import AdditionalDetailsForm from './AdditionalDetailsForm';
import ContentForm from './ContentForm';

interface ProjectEditorTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  project: Partial<ProjectWork>;
  media: ProjectMedia[];
  technologiesInput: string;
  onTechnologiesChange: (value: string) => void;
  embedCodeInput: string;
  onEmbedCodeChange: (value: string) => void;
  figmaUrl: string;
  onFigmaUrlChange: (value: string) => void;
  iframeList: string[];
  onIframeListUpdate: (iframes: string[]) => void;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSlugChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSwitchChange: (checked: boolean) => void;
}

const ProjectEditorTabs: React.FC<ProjectEditorTabsProps> = ({
  activeTab,
  onTabChange,
  project,
  media,
  technologiesInput,
  onTechnologiesChange,
  embedCodeInput,
  onEmbedCodeChange,
  figmaUrl,
  onFigmaUrlChange,
  iframeList,
  onIframeListUpdate,
  onTitleChange,
  onSlugChange,
  onChange,
  onSwitchChange
}) => {
  return (
    <div className="bg-white shadow rounded-lg">
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
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
            onTitleChange={onTitleChange}
            onSlugChange={onSlugChange}
            onChange={onChange}
            onSwitchChange={onSwitchChange}
          />
          
          <AdditionalDetailsForm
            project={project}
            technologiesInput={technologiesInput}
            onTechnologiesChange={onTechnologiesChange}
            onChange={onChange}
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
            onFigmaUrlChange={onFigmaUrlChange}
            onEmbedCodeChange={onEmbedCodeChange}
            onIframeListUpdate={onIframeListUpdate}
            onChange={onChange}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectEditorTabs;
