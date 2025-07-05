
import React from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectWork } from '@/types/project';

interface AdditionalDetailsFormProps {
  project: Partial<ProjectWork>;
  technologiesInput: string;
  onTechnologiesChange: (value: string) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const AdditionalDetailsForm: React.FC<AdditionalDetailsFormProps> = ({
  project,
  technologiesInput,
  onTechnologiesChange,
  onChange
}) => {
  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 mt-6">
      <Card>
        <CardHeader>
          <CardTitle>Project Details (Japanese)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Input 
              id="role"
              name="role"
              value={project.role || ''}
              onChange={onChange}
              placeholder="e.g. UI/UXデザイナー、プロダクトデザイナー"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="work_type">Work Type</Label>
            <Input 
              id="work_type"
              name="work_type"
              value={project.work_type || ''}
              onChange={onChange}
              placeholder="e.g. クライアントワーク、個人プロジェクト、受託開発"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="duration">Duration</Label>
            <Input 
              id="duration"
              name="duration"
              value={project.duration || ''}
              onChange={onChange}
              placeholder="e.g. 3ヶ月、2週間"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="technologies">Technologies</Label>
            <Input 
              id="technologies"
              value={technologiesInput}
              onChange={(e) => onTechnologiesChange(e.target.value)}
              placeholder="e.g. React, TypeScript, Figma (comma separated)"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="challenge">Challenge</Label>
            <Textarea 
              id="challenge"
              name="challenge"
              value={project.challenge || ''}
              onChange={onChange}
              placeholder="プロジェクトの課題"
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="solution">Solution</Label>
            <Textarea 
              id="solution"
              name="solution"
              value={project.solution || ''}
              onChange={onChange}
              placeholder="解決策"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Project Details (English)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="role_en">Role (English)</Label>
            <Input 
              id="role_en"
              name="role_en"
              value={project.role_en || ''}
              onChange={onChange}
              placeholder="e.g. UI/UX Designer, Product Designer"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="work_type_en">Work Type (English)</Label>
            <Input 
              id="work_type_en"
              name="work_type_en"
              value={project.work_type_en || ''}
              onChange={onChange}
              placeholder="e.g. Client Work, Personal Project, Contract Development"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="challenge_en">Challenge (English)</Label>
            <Textarea 
              id="challenge_en"
              name="challenge_en"
              value={project.challenge_en || ''}
              onChange={onChange}
              placeholder="Project challenges"
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="solution_en">Solution (English)</Label>
            <Textarea 
              id="solution_en"
              name="solution_en"
              value={project.solution_en || ''}
              onChange={onChange}
              placeholder="Solutions implemented"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdditionalDetailsForm;
