
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectWork } from '@/types/project';

interface AdditionalDetailsFormProps {
  project: Partial<ProjectWork>;
  technologiesInput: string;
  onTechnologiesChange: (value: string) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
          <CardTitle>Additional Details (Japanese)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="technologies">Technologies (comma-separated)</Label>
            <Input 
              id="technologies"
              name="technologies"
              value={technologiesInput}
              onChange={(e) => onTechnologiesChange(e.target.value)}
              placeholder="HTML, CSS, JavaScript"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Input 
              id="role"
              name="role"
              value={project.role || ''}
              onChange={onChange}
              placeholder="プロジェクトでの役割"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="duration">Duration</Label>
            <Input 
              id="duration"
              name="duration"
              value={project.duration || ''}
              onChange={onChange}
              placeholder="e.g. 3ヶ月"
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Additional Details (English)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="role_en">Role (English)</Label>
            <Input 
              id="role_en"
              name="role_en"
              value={project.role_en || ''}
              onChange={onChange}
              placeholder="Your role in the project"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdditionalDetailsForm;
