
import React from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectWork } from '@/types/project';

interface BasicInfoFormProps {
  project: Partial<ProjectWork>;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSlugChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSwitchChange: (checked: boolean) => void;
}

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({
  project,
  onTitleChange,
  onSlugChange,
  onChange,
  onSwitchChange
}) => {
  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information (Japanese)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input 
              id="title"
              name="title"
              value={project.title}
              onChange={onTitleChange}
              placeholder="プロジェクトタイトル"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="slug">URL Slug *</Label>
            <Input 
              id="slug"
              name="slug"
              value={project.slug}
              onChange={onSlugChange}
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
              onChange={onChange}
              placeholder="e.g. UI/UX Design, 3DCG Design"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description"
              name="description"
              value={project.description || ''}
              onChange={onChange}
              placeholder="プロジェクトの概要"
              rows={4}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="published"
              checked={project.published}
              onCheckedChange={onSwitchChange}
            />
            <Label htmlFor="published">
              {project.published ? 'Published (visible to public)' : 'Draft (private)'}
            </Label>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Basic Information (English)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title_en">Title (English)</Label>
            <Input 
              id="title_en"
              name="title_en"
              value={project.title_en || ''}
              onChange={onChange}
              placeholder="Project Title"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description_en">Description (English)</Label>
            <Textarea 
              id="description_en"
              name="description_en"
              value={project.description_en || ''}
              onChange={onChange}
              placeholder="Brief description of the project"
              rows={4}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BasicInfoForm;
