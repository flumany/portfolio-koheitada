
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
  const handleWorkTypeChange = (value: 'client' | 'personal') => {
    // Create a synthetic event to maintain consistency with other form handlers
    const event = {
      target: { name: 'work_type', value }
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(event);
  };

  const handleWorkTypeEnChange = (value: 'client' | 'personal') => {
    const event = {
      target: { name: 'work_type_en', value }
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(event);
  };

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

          <div className="space-y-3">
            <Label>Work Type</Label>
            <RadioGroup
              value={project.work_type || 'personal'}
              onValueChange={handleWorkTypeChange}
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="client" id="client-jp" />
                <Label htmlFor="client-jp">クライアントワーク</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="personal" id="personal-jp" />
                <Label htmlFor="personal-jp">自主制作</Label>
              </div>
            </RadioGroup>
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

          <div className="space-y-3">
            <Label>Work Type (English)</Label>
            <RadioGroup
              value={project.work_type_en || 'personal'}
              onValueChange={handleWorkTypeEnChange}
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="client" id="client-en" />
                <Label htmlFor="client-en">Client Work</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="personal" id="personal-en" />
                <Label htmlFor="personal-en">Personal Project</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdditionalDetailsForm;
